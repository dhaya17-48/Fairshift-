import {
  HazardCategory,
  HazardReport,
  HazardStatus,
  SectorConfig,
  SectorType,
  ShiftRecord,
  Worker,
} from '../types';
import { calculateDailyShift } from '../utils/fairshift-calculations';

export const SECTOR_CONFIGS: Record<SectorType, SectorConfig> = {
  construction: {
    id: 'construction',
    name: 'Construction Site',
    icon: 'HardHat',
    hourlyRate: 100, // ₹100/h
    description: 'Infrastructure development & civil works',
    locationExample: 'Metro Line Pier #42, North Zone',
  },
  college: {
    id: 'college',
    name: 'College Campus',
    icon: 'GraduationCap',
    hourlyRate: 80, // ₹80/h
    description: 'Higher education facilities & campus upkeep',
    locationExample: 'Engineering Block & Central Library',
  },
};

export function getPastDate(daysAgo: number): { date: string; dayName: string } {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const date = d.toISOString().split('T')[0];
  const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
  return { date, dayName };
}

export function createShift(
  id: string,
  workerId: string,
  daysAgo: number,
  hours: number
): ShiftRecord {
  const { date, dayName } = getPastDate(daysAgo);
  const { regularHours, overtimeHours } = calculateDailyShift(hours);
  return {
    id,
    workerId,
    date,
    dayName,
    hours,
    regularHours,
    overtimeHours,
  };
}

export function getInitialWorkers(): Record<SectorType, Worker[]> {
  return {
    construction: [
      {
        id: 'c-1',
        name: 'Ramesh Kumar',
        role: 'Masonry Specialist',
        sector: 'construction',
        phoneLastDigits: '8910',
        avatarColor: 'from-amber-600 to-amber-800',
        activeShiftStartTime: null,
        shifts: [
          createShift('cs-1-1', 'c-1', 5, 8),
          createShift('cs-1-2', 'c-1', 4, 8),
          createShift('cs-1-3', 'c-1', 3, 9),
          createShift('cs-1-4', 'c-1', 2, 8),
          createShift('cs-1-5', 'c-1', 1, 8),
        ],
      },
      {
        id: 'c-2',
        name: 'Sunita Devi',
        role: 'Concrete & Pouring Lead',
        sector: 'construction',
        phoneLastDigits: '4123',
        avatarColor: 'from-orange-600 to-red-700',
        activeShiftStartTime: null,
        shifts: [
          createShift('cs-2-1', 'c-2', 4, 8),
          createShift('cs-2-2', 'c-2', 3, 8),
          createShift('cs-2-3', 'c-2', 2, 8),
          createShift('cs-2-4', 'c-2', 1, 8),
        ],
      },
      {
        id: 'c-3',
        name: 'Rajesh Verma',
        role: 'Heavy Rigging & Crane Ops',
        sector: 'construction',
        phoneLastDigits: '7732',
        avatarColor: 'from-blue-600 to-cyan-800',
        activeShiftStartTime: null,
        shifts: [
          createShift('cs-3-1', 'c-3', 4, 10),
          createShift('cs-3-2', 'c-3', 3, 10),
          createShift('cs-3-3', 'c-3', 2, 9),
          createShift('cs-3-4', 'c-3', 1, 8),
        ],
      },
      {
        id: 'c-4',
        name: 'Arjun Yadav',
        role: 'Steel & Rebar Fabricator',
        sector: 'construction',
        phoneLastDigits: '5561',
        avatarColor: 'from-purple-600 to-indigo-900',
        activeShiftStartTime: null,
        // High hours >48h to demonstrate FATIGUE ALERT in admin dashboard!
        shifts: [
          createShift('cs-4-1', 'c-4', 5, 11),
          createShift('cs-4-2', 'c-4', 4, 10),
          createShift('cs-4-3', 'c-4', 3, 11),
          createShift('cs-4-4', 'c-4', 2, 10),
          createShift('cs-4-5', 'c-4', 1, 10), // Total = 52 hours (>48h)
        ],
      },
      {
        id: 'c-5',
        name: 'Lakshmi Bai',
        role: 'Site Safety & Scaffolding Helper',
        sector: 'construction',
        phoneLastDigits: '9021',
        avatarColor: 'from-emerald-600 to-teal-800',
        activeShiftStartTime: null,
        // Overtime = 2 + 2 + 3 = 7h (>6h OT) -> Medium Quit Risk demo!
        shifts: [
          createShift('cs-5-1', 'c-5', 4, 10),
          createShift('cs-5-2', 'c-5', 3, 10),
          createShift('cs-5-3', 'c-5', 2, 11),
          createShift('cs-5-4', 'c-5', 1, 8),
        ],
      },
    ],
    college: [
      {
        id: 'u-1',
        name: 'Priya Sharma',
        role: 'Campus Facilities Tech',
        sector: 'college',
        phoneLastDigits: '3341',
        avatarColor: 'from-sky-600 to-blue-800',
        activeShiftStartTime: null,
        shifts: [
          createShift('us-1-1', 'u-1', 5, 8),
          createShift('us-1-2', 'u-1', 4, 8),
          createShift('us-1-3', 'u-1', 3, 8),
          createShift('us-1-4', 'u-1', 2, 8),
          createShift('us-1-5', 'u-1', 1, 8),
        ],
      },
      {
        id: 'u-2',
        name: 'Rahul Das',
        role: 'Science Laboratory Assistant',
        sector: 'college',
        phoneLastDigits: '6719',
        avatarColor: 'from-emerald-600 to-green-800',
        activeShiftStartTime: null,
        shifts: [
          createShift('us-2-1', 'u-2', 4, 7),
          createShift('us-2-2', 'u-2', 3, 8),
          createShift('us-2-3', 'u-2', 2, 7),
          createShift('us-2-4', 'u-2', 1, 8),
        ],
      },
      {
        id: 'u-3',
        name: 'Ananya Roy',
        role: 'Central Library Logistics',
        sector: 'college',
        phoneLastDigits: '1882',
        avatarColor: 'from-pink-600 to-rose-800',
        activeShiftStartTime: null,
        shifts: [
          createShift('us-3-1', 'u-3', 4, 8),
          createShift('us-3-2', 'u-3', 3, 8),
          createShift('us-3-3', 'u-3', 2, 8),
          createShift('us-3-4', 'u-3', 1, 8),
        ],
      },
      {
        id: 'u-4',
        name: 'Mohammed Farooq',
        role: 'Hostel Maintenance & Electrical',
        sector: 'college',
        phoneLastDigits: '4490',
        avatarColor: 'from-amber-600 to-yellow-800',
        activeShiftStartTime: null,
        // 6 consecutive days worked -> Demonstrates 6+ day fatigue alert!
        shifts: [
          createShift('us-4-1', 'u-4', 6, 7),
          createShift('us-4-2', 'u-4', 5, 7),
          createShift('us-4-3', 'u-4', 4, 7),
          createShift('us-4-4', 'u-4', 3, 7),
          createShift('us-4-5', 'u-4', 2, 7),
          createShift('us-4-6', 'u-4', 1, 7),
        ],
      },
      {
        id: 'u-5',
        name: 'Kavita Nair',
        role: 'Student Dining Hall Staff',
        sector: 'college',
        phoneLastDigits: '7238',
        avatarColor: 'from-teal-600 to-cyan-900',
        activeShiftStartTime: null,
        shifts: [
          createShift('us-5-1', 'u-5', 4, 8),
          createShift('us-5-2', 'u-5', 3, 8),
          createShift('us-5-3', 'u-5', 2, 9),
          createShift('us-5-4', 'u-5', 1, 8),
        ],
      },
    ],
  };
}

export function getInitialHazards(): HazardReport[] {
  return [
    {
      id: 'h-c-1',
      sector: 'construction',
      category: 'fall',
      description: 'Loose scaffolding plank on 3rd floor west facade without safety toe-board.',
      voiceTranscript: 'Scaffolding plank loose 3rd floor, slipping hazard for bricklayers.',
      isAnonymous: false,
      workerId: 'c-1',
      reporterName: 'Ramesh Kumar',
      status: 'Open',
      createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
      locationNote: 'West Tower Level 3',
    },
    {
      id: 'h-c-2',
      sector: 'construction',
      category: 'electric',
      description: 'Submersible water pump cable has frayed insulation near wet puddle.',
      voiceTranscript: 'High voltage wire exposed next to water pump.',
      isAnonymous: true,
      workerId: null,
      reporterName: 'Anonymous Worker',
      status: 'In review',
      createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
      locationNote: 'Basement Sump Area',
    },
    {
      id: 'h-c-3',
      sector: 'construction',
      category: 'fire',
      description: 'Used solvent rags and paint cans stacked beside welding generator.',
      voiceTranscript: 'Chemical solvents stacked next to active welding spark area.',
      isAnonymous: false,
      workerId: 'c-3',
      reporterName: 'Rajesh Verma',
      status: 'Fixed',
      createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
      locationNote: 'Generator Bay 2',
    },
    {
      id: 'h-u-1',
      sector: 'college',
      category: 'wet_floor',
      description: 'Chemical water leakage outside Organic Chemistry lab 204.',
      voiceTranscript: 'Very slippery floor near lab 204 entrance, students slipping.',
      isAnonymous: false,
      workerId: 'u-2',
      reporterName: 'Rahul Das',
      status: 'Open',
      createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      locationNote: 'Science Block 2nd Floor',
    },
    {
      id: 'h-u-2',
      sector: 'college',
      category: 'fall',
      description: 'Unsecured mobile ladder left blocking emergency staircase exit.',
      voiceTranscript: 'Heavy metal ladder left unattended across stairs.',
      isAnonymous: true,
      workerId: null,
      reporterName: 'Anonymous Worker',
      status: 'Fixed',
      createdAt: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
      locationNote: 'Central Library Stairwell B',
    },
  ];
}

// In-Memory and LocalStorage fallback store for client / Vercel deployment
const STORAGE_PREFIX = 'fairshift_v1_';

function safeGetStorage<T>(key: string, defaultVal: T): T {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? JSON.parse(raw) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function safeSetStorage<T>(key: string, val: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(val));
  } catch {
    // ignore
  }
}

let memoryWorkers: Record<SectorType, Worker[]> = safeGetStorage(
  'workers',
  getInitialWorkers()
);
let memoryHazards: HazardReport[] = safeGetStorage('hazards', getInitialHazards());

export const clientStore = {
  getWorkers(sector: SectorType): Worker[] {
    const all = safeGetStorage('workers', memoryWorkers);
    if (!all[sector] || all[sector].length === 0) {
      all[sector] = getInitialWorkers()[sector];
      safeSetStorage('workers', all);
      memoryWorkers = all;
    }
    return all[sector];
  },

  checkInWorker(id: string, sector: SectorType): Worker {
    const all = safeGetStorage('workers', memoryWorkers);
    const worker = (all[sector] || []).find((w) => w.id === id);
    if (!worker) throw new Error('Worker not found');

    worker.activeShiftStartTime = new Date().toISOString();
    safeSetStorage('workers', all);
    memoryWorkers = all;
    return worker;
  },

  checkOutWorker(
    id: string,
    sector: SectorType,
    hours?: number
  ): { worker: Worker; shift: ShiftRecord } {
    const all = safeGetStorage('workers', memoryWorkers);
    const worker = (all[sector] || []).find((w) => w.id === id);
    if (!worker) throw new Error('Worker not found');

    let hoursWorked = 8;
    if (hours && hours > 0) {
      hoursWorked = Math.min(24, Math.round(hours * 10) / 10);
    } else if (worker.activeShiftStartTime) {
      const elapsedMs = Date.now() - new Date(worker.activeShiftStartTime).getTime();
      const elapsedHours = elapsedMs / (1000 * 60 * 60);
      hoursWorked = Math.max(0.5, Math.min(24, Math.round(elapsedHours * 10) / 10));
      if (hoursWorked < 1) hoursWorked = 8.5;
    }

    const { date, dayName } = getPastDate(0);
    const { regularHours, overtimeHours } = calculateDailyShift(hoursWorked);

    const newShift: ShiftRecord = {
      id: `shift-local-${Date.now()}`,
      workerId: worker.id,
      date,
      dayName,
      hours: hoursWorked,
      regularHours,
      overtimeHours,
      startTime: worker.activeShiftStartTime || new Date().toISOString(),
      endTime: new Date().toISOString(),
    };

    worker.activeShiftStartTime = null;
    const existingIndex = worker.shifts.findIndex((s) => s.date === date);
    if (existingIndex >= 0) {
      worker.shifts[existingIndex] = newShift;
    } else {
      worker.shifts.push(newShift);
    }

    safeSetStorage('workers', all);
    memoryWorkers = all;
    return { worker, shift: newShift };
  },

  addManualShift(
    id: string,
    sector: SectorType,
    hours: number,
    date?: string
  ): { worker: Worker; shift: ShiftRecord } {
    const all = safeGetStorage('workers', memoryWorkers);
    const worker = (all[sector] || []).find((w) => w.id === id);
    if (!worker) throw new Error('Worker not found');

    const targetDate = date || getPastDate(0).date;
    const d = new Date(targetDate + 'T00:00:00Z');
    const dayName = isNaN(d.getTime())
      ? 'Today'
      : d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });

    const { regularHours, overtimeHours } = calculateDailyShift(hours);
    const newShift: ShiftRecord = {
      id: `shift-manual-${Date.now()}`,
      workerId: worker.id,
      date: targetDate,
      dayName,
      hours,
      regularHours,
      overtimeHours,
    };

    const existingIndex = worker.shifts.findIndex((s) => s.date === targetDate);
    if (existingIndex >= 0) {
      worker.shifts[existingIndex] = newShift;
    } else {
      worker.shifts.push(newShift);
    }

    safeSetStorage('workers', all);
    memoryWorkers = all;
    return { worker, shift: newShift };
  },

  getHazards(sector?: SectorType): HazardReport[] {
    const all = safeGetStorage('hazards', memoryHazards);
    let list = all;
    if (sector) {
      list = list.filter((h) => h.sector === sector);
    }
    return [...list].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  createHazard(data: {
    sector: SectorType;
    category: HazardCategory;
    description: string;
    voiceTranscript?: string;
    isAnonymous: boolean;
    workerId?: string | null;
    reporterName: string;
    locationNote?: string;
  }): HazardReport {
    const all = safeGetStorage('hazards', memoryHazards);
    const isAnon = Boolean(data.isAnonymous);

    const newReport: HazardReport = {
      id: `hazard-local-${Date.now()}`,
      sector: data.sector,
      category: data.category,
      description: data.description || data.voiceTranscript || 'Unspecified hazard',
      voiceTranscript: data.voiceTranscript || undefined,
      isAnonymous: isAnon,
      workerId: isAnon ? null : data.workerId || null,
      reporterName: isAnon ? 'Anonymous Worker' : data.reporterName || 'Field Worker',
      status: 'Open',
      createdAt: new Date().toISOString(),
      locationNote: data.locationNote || undefined,
    };

    all.unshift(newReport);
    safeSetStorage('hazards', all);
    memoryHazards = all;
    return newReport;
  },

  updateHazardStatus(id: string, status: HazardStatus): HazardReport {
    const all = safeGetStorage('hazards', memoryHazards);
    const item = all.find((h) => h.id === id);
    if (!item) throw new Error('Hazard not found');
    item.status = status;
    safeSetStorage('hazards', all);
    memoryHazards = all;
    return item;
  },

  verifyAdminPin(pin: string): boolean {
    const clean = (pin || '').trim();
    // Default PIN: 2026 (or 1234)
    return clean === '2026' || clean === '1234';
  },

  resetStore(): void {
    const initialWorkers = getInitialWorkers();
    const initialHazards = getInitialHazards();
    safeSetStorage('workers', initialWorkers);
    safeSetStorage('hazards', initialHazards);
    memoryWorkers = initialWorkers;
    memoryHazards = initialHazards;
  },
};
