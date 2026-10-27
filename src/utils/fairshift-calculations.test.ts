import { describe, expect, it } from 'vitest';
import {
  calculateConsecutiveDaysWorked,
  calculateDailyShift,
  calculateQuitRisk,
  calculateWeeklyPay,
  checkFatigue,
} from './fairshift-calculations';

describe('FairShift Calculations (UN SDG 8)', () => {
  describe('calculateDailyShift (8h regular, >8h overtime)', () => {
    it('handles zero or negative hours safely', () => {
      expect(calculateDailyShift(0)).toEqual({ regularHours: 0, overtimeHours: 0 });
      expect(calculateDailyShift(-5)).toEqual({ regularHours: 0, overtimeHours: 0 });
    });

    it('identifies regular shift hours up to 8 hours', () => {
      expect(calculateDailyShift(5)).toEqual({ regularHours: 5, overtimeHours: 0 });
      expect(calculateDailyShift(8)).toEqual({ regularHours: 8, overtimeHours: 0 });
    });

    it('splits hours over 8 into regular and overtime', () => {
      expect(calculateDailyShift(9)).toEqual({ regularHours: 8, overtimeHours: 1 });
      expect(calculateDailyShift(10)).toEqual({ regularHours: 8, overtimeHours: 2 });
      expect(calculateDailyShift(12)).toEqual({ regularHours: 8, overtimeHours: 4 });
    });
  });

  describe('calculateWeeklyPay (hourly rate, 2x overtime, 8% deduction)', () => {
    it('computes standard pay for Construction site (₹100/h)', () => {
      // 5 shifts of 8 hours = 40 regular hours, 0 overtime
      const shifts = [
        { hours: 8 },
        { hours: 8 },
        { hours: 8 },
        { hours: 8 },
        { hours: 8 },
      ];
      const result = calculateWeeklyPay(shifts, 100);

      expect(result.regularHours).toBe(40);
      expect(result.overtimeHours).toBe(0);
      expect(result.totalHours).toBe(40);
      expect(result.regularPay).toBe(4000); // 40 * 100
      expect(result.overtimePay).toBe(0);
      expect(result.grossPay).toBe(4000);
      expect(result.deductions).toBe(320); // 8% of 4000
      expect(result.takeHomePay).toBe(3680); // 4000 - 320
    });

    it('correctly applies 2x overtime rate for overtime hours on Construction site', () => {
      // 5 shifts of 10 hours = 40 regular hours + 10 overtime hours
      const shifts = [
        { hours: 10 },
        { hours: 10 },
        { hours: 10 },
        { hours: 10 },
        { hours: 10 },
      ];
      const result = calculateWeeklyPay(shifts, 100);

      expect(result.regularHours).toBe(40);
      expect(result.overtimeHours).toBe(10);
      expect(result.totalHours).toBe(50);
      expect(result.regularPay).toBe(4000); // 40 * 100
      expect(result.overtimePay).toBe(2000); // 10 * 100 * 2 = 2000
      expect(result.grossPay).toBe(6000);
      expect(result.deductions).toBe(480); // 8% of 6000
      expect(result.takeHomePay).toBe(5520); // 6000 - 480
    });

    it('computes pay for College Campus rate (₹80/h)', () => {
      // 4 shifts of 7 hours = 28 regular hours, 0 overtime
      const shifts = [
        { hours: 7 },
        { hours: 7 },
        { hours: 7 },
        { hours: 7 },
      ];
      const result = calculateWeeklyPay(shifts, 80);

      expect(result.regularHours).toBe(28);
      expect(result.overtimeHours).toBe(0);
      expect(result.regularPay).toBe(2240); // 28 * 80
      expect(result.overtimePay).toBe(0);
      expect(result.grossPay).toBe(2240);
      expect(result.deductions).toBe(179.2); // 8% of 2240
      expect(result.takeHomePay).toBe(2060.8);
    });

    it('handles College Campus overtime at 2x (₹160/h)', () => {
      // 1 shift of 11 hours = 8 regular + 3 overtime
      const shifts = [{ hours: 11 }];
      const result = calculateWeeklyPay(shifts, 80);

      expect(result.regularHours).toBe(8);
      expect(result.overtimeHours).toBe(3);
      expect(result.regularPay).toBe(640); // 8 * 80
      expect(result.overtimePay).toBe(480); // 3 * 80 * 2
      expect(result.grossPay).toBe(1120);
      expect(result.deductions).toBe(89.6);
      expect(result.takeHomePay).toBe(1030.4);
    });
  });

  describe('calculateConsecutiveDaysWorked', () => {
    it('returns 0 for empty shifts', () => {
      expect(calculateConsecutiveDaysWorked([])).toBe(0);
    });

    it('counts consecutive calendar days correctly', () => {
      const shifts = [
        { date: '2026-10-20', hours: 8 },
        { date: '2026-10-21', hours: 8 },
        { date: '2026-10-22', hours: 8 },
        { date: '2026-10-24', hours: 8 }, // skipped 23rd
        { date: '2026-10-25', hours: 8 },
      ];
      expect(calculateConsecutiveDaysWorked(shifts)).toBe(3);
    });

    it('detects 6 consecutive days', () => {
      const shifts = [
        { date: '2026-10-19', hours: 6 },
        { date: '2026-10-20', hours: 6 },
        { date: '2026-10-21', hours: 6 },
        { date: '2026-10-22', hours: 6 },
        { date: '2026-10-23', hours: 6 },
        { date: '2026-10-24', hours: 6 },
      ];
      expect(calculateConsecutiveDaysWorked(shifts)).toBe(6);
    });
  });

  describe('checkFatigue (over 48 hours or 6+ days in a row)', () => {
    it('reports no fatigue for a safe 40-hour 5-day week', () => {
      const shifts = [
        { date: '2026-10-19', hours: 8 },
        { date: '2026-10-20', hours: 8 },
        { date: '2026-10-21', hours: 8 },
        { date: '2026-10-22', hours: 8 },
        { date: '2026-10-23', hours: 8 },
      ];
      const assessment = checkFatigue(shifts);
      expect(assessment.isFatigued).toBe(false);
      expect(assessment.exceedsWeeklyHours).toBe(false);
      expect(assessment.exceedsConsecutiveDays).toBe(false);
    });

    it('triggers fatigue alert if weekly hours exceed 48h', () => {
      // 5 shifts of 10 hours = 50 hours (>48h)
      const shifts = [
        { date: '2026-10-19', hours: 10 },
        { date: '2026-10-20', hours: 10 },
        { date: '2026-10-21', hours: 10 },
        { date: '2026-10-22', hours: 10 },
        { date: '2026-10-24', hours: 10 }, // not consecutive, but 50 hours
      ];
      const assessment = checkFatigue(shifts);
      expect(assessment.isFatigued).toBe(true);
      expect(assessment.exceedsWeeklyHours).toBe(true);
      expect(assessment.weeklyTotalHours).toBe(50);
    });

    it('triggers fatigue alert if worker works 6+ days in a row even under 48h', () => {
      // 6 shifts of 6 hours = 36 hours (<48h), but 6 days consecutive
      const shifts = [
        { date: '2026-10-19', hours: 6 },
        { date: '2026-10-20', hours: 6 },
        { date: '2026-10-21', hours: 6 },
        { date: '2026-10-22', hours: 6 },
        { date: '2026-10-23', hours: 6 },
        { date: '2026-10-24', hours: 6 },
      ];
      const assessment = checkFatigue(shifts);
      expect(assessment.isFatigued).toBe(true);
      expect(assessment.exceedsConsecutiveDays).toBe(true);
      expect(assessment.consecutiveDays).toBe(6);
    });
  });

  describe('calculateQuitRisk (High if fatigued, Medium if 6+ OT hours, else Low)', () => {
    it('assigns High quit risk to fatigued workers', () => {
      const shifts = [
        { date: '2026-10-19', hours: 10 },
        { date: '2026-10-20', hours: 10 },
        { date: '2026-10-21', hours: 10 },
        { date: '2026-10-22', hours: 10 },
        { date: '2026-10-23', hours: 10 }, // 50 hours -> fatigued
      ];
      expect(calculateQuitRisk(shifts)).toBe('High');
    });

    it('assigns Medium quit risk if not fatigued but 6+ hours of overtime', () => {
      // 4 days of 10 hours: 40 total hours (not >48h, not 6 consecutive days)
      // Overtime = 2 * 4 = 8 hours (>=6h)
      const shifts = [
        { date: '2026-10-19', hours: 10 },
        { date: '2026-10-20', hours: 10 },
        { date: '2026-10-22', hours: 10 },
        { date: '2026-10-24', hours: 10 },
      ];
      expect(calculateQuitRisk(shifts)).toBe('Medium');
    });

    it('assigns Low quit risk for manageable workloads', () => {
      // 4 days of 8 hours + 1 day of 9 hours: 41 hours total, 1 OT hour
      const shifts = [
        { date: '2026-10-19', hours: 8 },
        { date: '2026-10-20', hours: 8 },
        { date: '2026-10-21', hours: 8 },
        { date: '2026-10-22', hours: 8 },
        { date: '2026-10-23', hours: 9 },
      ];
      expect(calculateQuitRisk(shifts)).toBe('Low');
    });
  });
});
