/**
 * FairShift Types and Interfaces
 * UN SDG 8: Decent Work and Economic Growth
 */

export type SectorType = 'construction' | 'college';

export type LanguageCode = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'kn';

export type HazardCategory = 'fall' | 'fire' | 'electric' | 'wet_floor';

export type HazardStatus = 'Open' | 'In review' | 'Fixed';

export type QuitRiskLevel = 'High' | 'Medium' | 'Low';

export interface ShiftRecord {
  id: string;
  workerId: string;
  date: string; // YYYY-MM-DD
  dayName: string; // Mon, Tue, etc.
  hours: number;
  regularHours: number;
  overtimeHours: number;
  startTime?: string;
  endTime?: string;
}

export interface Worker {
  id: string;
  name: string;
  role: string;
  sector: SectorType;
  phoneLastDigits?: string;
  avatarColor: string;
  activeShiftStartTime?: string | null; // ISO string if currently clocked in
  shifts: ShiftRecord[];
}

export interface HazardReport {
  id: string;
  sector: SectorType;
  category: HazardCategory;
  description: string;
  voiceTranscript?: string;
  isAnonymous: boolean;
  workerId?: string | null;
  reporterName: string;
  status: HazardStatus;
  createdAt: string; // ISO string
  locationNote?: string;
}

export interface SectorConfig {
  id: SectorType;
  name: string;
  icon: string;
  hourlyRate: number; // ₹100/h construction, ₹80/h college
  description: string;
  locationExample: string;
}

export interface WeeklyPaySummary {
  regularHours: number;
  overtimeHours: number;
  totalHours: number;
  hourlyRate: number;
  regularPay: number;
  overtimePay: number; // 2x rate
  grossPay: number;
  deductions: number; // 8% statutory/welfare deduction
  takeHomePay: number;
}

export interface FatigueAssessment {
  isFatigued: boolean;
  weeklyTotalHours: number;
  consecutiveDays: number;
  exceedsWeeklyHours: boolean; // >48h
  exceedsConsecutiveDays: boolean; // >=6 days in a row
  reason: string;
}

export interface WorkerDashboardItem {
  worker: Worker;
  weeklyPay: WeeklyPaySummary;
  fatigue: FatigueAssessment;
  quitRisk: QuitRiskLevel;
}
