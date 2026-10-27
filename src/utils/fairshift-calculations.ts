/**
 * FairShift Calculation Engine
 * Implements shift partitioning, 2x overtime compensation, statutory deductions,
 * fatigue limit verification (UN SDG 8), and worker retention/quit risk scoring.
 */

import { FatigueAssessment, QuitRiskLevel, ShiftRecord, WeeklyPaySummary } from '../types';

export const DEDUCTION_RATE = 0.08; // 8% statutory & welfare deduction
export const DAILY_REGULAR_LIMIT = 8; // Hours over 8 are overtime
export const OVERTIME_MULTIPLIER = 2.0; // 2x pay for overtime hours
export const FATIGUE_WEEKLY_HOURS_THRESHOLD = 48; // Over 48 hours is fatigue alert
export const FATIGUE_CONSECUTIVE_DAYS_THRESHOLD = 6; // 6+ days in a row is fatigue alert
export const QUIT_RISK_OVERTIME_THRESHOLD = 6; // 6+ overtime hours qualifies for Medium risk

/**
 * Splits daily worked hours into regular hours and 2x overtime hours.
 */
export function calculateDailyShift(hours: number): {
  regularHours: number;
  overtimeHours: number;
} {
  const safeHours = Math.max(0, Number(hours) || 0);
  const regularHours = Math.min(safeHours, DAILY_REGULAR_LIMIT);
  const overtimeHours = Math.max(0, safeHours - DAILY_REGULAR_LIMIT);
  return {
    regularHours: round(regularHours),
    overtimeHours: round(overtimeHours),
  };
}

/**
 * Calculates weekly pay including regular pay, 2x overtime pay, 8% deductions, and take-home pay.
 */
export function calculateWeeklyPay(
  shifts: Pick<ShiftRecord, 'hours'>[],
  hourlyRate: number
): WeeklyPaySummary {
  const rate = Math.max(0, Number(hourlyRate) || 0);
  let totalRegularHours = 0;
  let totalOvertimeHours = 0;

  for (const shift of shifts) {
    const { regularHours, overtimeHours } = calculateDailyShift(shift.hours);
    totalRegularHours += regularHours;
    totalOvertimeHours += overtimeHours;
  }

  const regularHours = round(totalRegularHours);
  const overtimeHours = round(totalOvertimeHours);
  const totalHours = round(regularHours + overtimeHours);

  const regularPay = round(regularHours * rate);
  const overtimePay = round(overtimeHours * rate * OVERTIME_MULTIPLIER);
  const grossPay = round(regularPay + overtimePay);
  const deductions = round(grossPay * DEDUCTION_RATE);
  const takeHomePay = round(grossPay - deductions);

  return {
    regularHours,
    overtimeHours,
    totalHours,
    hourlyRate: rate,
    regularPay,
    overtimePay,
    grossPay,
    deductions,
    takeHomePay,
  };
}

/**
 * Computes maximum consecutive days worked from an array of shifts.
 */
export function calculateConsecutiveDaysWorked(
  shifts: { date: string; hours: number }[]
): number {
  const workingDates = Array.from(
    new Set(
      shifts
        .filter((s) => s.hours > 0)
        .map((s) => s.date)
    )
  ).sort();

  if (workingDates.length === 0) return 0;
  if (workingDates.length === 1) return 1;

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < workingDates.length; i++) {
    const prev = new Date(workingDates[i - 1] + 'T00:00:00Z').getTime();
    const curr = new Date(workingDates[i] + 'T00:00:00Z').getTime();
    const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      currentStreak += 1;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    } else {
      currentStreak = 1;
    }
  }

  return maxStreak;
}

/**
 * Checks for worker fatigue:
 * Alert is triggered if weekly total hours > 48 OR consecutive days worked >= 6.
 */
export function checkFatigue(
  shifts: { date: string; hours: number }[]
): FatigueAssessment {
  const weeklyTotalHours = round(
    shifts.reduce((sum, s) => sum + (Math.max(0, Number(s.hours)) || 0), 0)
  );
  const consecutiveDays = calculateConsecutiveDaysWorked(shifts);

  const exceedsWeeklyHours = weeklyTotalHours > FATIGUE_WEEKLY_HOURS_THRESHOLD;
  const exceedsConsecutiveDays =
    consecutiveDays >= FATIGUE_CONSECUTIVE_DAYS_THRESHOLD;
  const isFatigued = exceedsWeeklyHours || exceedsConsecutiveDays;

  let reason = 'Safe working hours';
  if (exceedsWeeklyHours && exceedsConsecutiveDays) {
    reason = `Excessive load: ${weeklyTotalHours}h (>48h) & ${consecutiveDays} consecutive days (>=6d)`;
  } else if (exceedsWeeklyHours) {
    reason = `Weekly limit exceeded: ${weeklyTotalHours}h worked (safe max is 48h)`;
  } else if (exceedsConsecutiveDays) {
    reason = `Consecutive days exceeded: ${consecutiveDays} days in a row without rest (max 5d)`;
  }

  return {
    isFatigued,
    weeklyTotalHours,
    consecutiveDays,
    exceedsWeeklyHours,
    exceedsConsecutiveDays,
    reason,
  };
}

/**
 * Assesses worker quit risk based on fatigue and overtime burden.
 * - High: worker is fatigued (>48h or 6+ days in a row)
 * - Medium: not fatigued, but has 6+ hours of overtime
 * - Low: safe workload (<6h overtime and not fatigued)
 */
export function calculateQuitRisk(
  shifts: { date: string; hours: number }[]
): QuitRiskLevel {
  const fatigue = checkFatigue(shifts);
  if (fatigue.isFatigued) {
    return 'High';
  }

  let totalOvertimeHours = 0;
  for (const s of shifts) {
    const { overtimeHours } = calculateDailyShift(s.hours);
    totalOvertimeHours += overtimeHours;
  }

  if (totalOvertimeHours >= QUIT_RISK_OVERTIME_THRESHOLD) {
    return 'Medium';
  }

  return 'Low';
}

function round(val: number): number {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}
