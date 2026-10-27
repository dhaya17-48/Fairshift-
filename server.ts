import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  HazardCategory,
  HazardReport,
  HazardStatus,
  SectorConfig,
  SectorType,
  ShiftRecord,
  Worker,
} from './src/types';
import { calculateDailyShift } from './src/utils/fairshift-calculations';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const ADMIN_PIN = (process.env.ADMIN_PIN || '2026').trim();

app.use(express.json({ limit: '1mb' }));

// Sector Configurations
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

// Seed shifts helper for past 6 days
function getPastDate(daysAgo: number): { date: string; dayName: string } {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const date = d.toISOString().split('T')[0];
  const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
  return { date, dayName };
}

function createShift(
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

// Initial Seed Workers
function getInitialWorkers(): Record<SectorType, Worker[]> {
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

function getInitialHazards(): HazardReport[] {
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

// In-Memory persistent store across requests
let workersStore = getInitialWorkers();
let hazardsStore = getInitialHazards();

// Helper: sanitize string input
function sanitizeText(str: unknown, maxLen = 500): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // strip HTML brackets
    .trim()
    .slice(0, maxLen);
}

// ================= API ENDPOINTS ================= //

// 1. Get Sector Configs
app.get('/api/sectors', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: SECTOR_CONFIGS,
  });
});

// 2. Get Workers for a Sector
app.get('/api/workers', (req: Request, res: Response) => {
  const sector = (req.query.sector as SectorType) || 'construction';
  if (!workersStore[sector]) {
    res.status(400).json({ success: false, error: 'Invalid sector' });
    return;
  }
  res.json({
    success: true,
    data: workersStore[sector],
  });
});

// 3. Worker Check In
app.post('/api/workers/:id/checkin', (req: Request, res: Response) => {
  const { id } = req.params;
  const sector = (req.body.sector as SectorType) || 'construction';

  const workers = workersStore[sector] || [];
  const worker = workers.find((w) => w.id === id);

  if (!worker) {
    res.status(404).json({ success: false, error: 'Worker not found' });
    return;
  }

  worker.activeShiftStartTime = new Date().toISOString();
  res.json({ success: true, data: worker });
});

// 4. Worker Check Out
app.post('/api/workers/:id/checkout', (req: Request, res: Response) => {
  const { id } = req.params;
  const sector = (req.body.sector as SectorType) || 'construction';
  const customHours = req.body.hours ? Number(req.body.hours) : null;

  const workers = workersStore[sector] || [];
  const worker = workers.find((w) => w.id === id);

  if (!worker) {
    res.status(404).json({ success: false, error: 'Worker not found' });
    return;
  }

  let hoursWorked = 8; // default to a full 8-hour shift if checking out
  if (customHours && customHours > 0) {
    hoursWorked = Math.min(24, Math.round(customHours * 10) / 10);
  } else if (worker.activeShiftStartTime) {
    const elapsedMs = Date.now() - new Date(worker.activeShiftStartTime).getTime();
    const elapsedHours = elapsedMs / (1000 * 60 * 60);
    // Minimum 0.5 hours for demo realism, maximum 24
    hoursWorked = Math.max(0.5, Math.min(24, Math.round(elapsedHours * 10) / 10));
    // If it was just clocked in a few seconds ago during testing, provide a reasonable shift (e.g. 8.5h to show OT)
    if (hoursWorked < 1) {
      hoursWorked = 8.5; // realistic full shift with 0.5h overtime
    }
  }

  const { date, dayName } = getPastDate(0);
  const { regularHours, overtimeHours } = calculateDailyShift(hoursWorked);

  const newShift: ShiftRecord = {
    id: `shift-${Date.now()}`,
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
  // Replace or append for today
  const existingTodayIndex = worker.shifts.findIndex((s) => s.date === date);
  if (existingTodayIndex >= 0) {
    worker.shifts[existingTodayIndex] = newShift;
  } else {
    worker.shifts.push(newShift);
  }

  res.json({ success: true, data: worker, shift: newShift });
});

// 5. Add / Log Shift manually (for testing hours, overtime, simulation)
app.post('/api/workers/:id/shifts', (req: Request, res: Response) => {
  const { id } = req.params;
  const sector = (req.body.sector as SectorType) || 'construction';
  const rawHours = Number(req.body.hours);
  const targetDate = req.body.date
    ? sanitizeText(req.body.date, 10)
    : getPastDate(0).date;

  if (isNaN(rawHours) || rawHours <= 0 || rawHours > 24) {
    res.status(400).json({ success: false, error: 'Hours must be between 0.5 and 24' });
    return;
  }

  const workers = workersStore[sector] || [];
  const worker = workers.find((w) => w.id === id);

  if (!worker) {
    res.status(404).json({ success: false, error: 'Worker not found' });
    return;
  }

  const d = new Date(targetDate + 'T00:00:00Z');
  const dayName = isNaN(d.getTime())
    ? 'Today'
    : d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });

  const { regularHours, overtimeHours } = calculateDailyShift(rawHours);
  const newShift: ShiftRecord = {
    id: `shift-manual-${Date.now()}`,
    workerId: worker.id,
    date: targetDate,
    dayName,
    hours: rawHours,
    regularHours,
    overtimeHours,
  };

  const existingIndex = worker.shifts.findIndex((s) => s.date === targetDate);
  if (existingIndex >= 0) {
    worker.shifts[existingIndex] = newShift;
  } else {
    worker.shifts.push(newShift);
  }

  res.json({ success: true, data: worker, shift: newShift });
});

// 6. Get Hazards
app.get('/api/hazards', (req: Request, res: Response) => {
  const sector = req.query.sector as SectorType | undefined;
  let list = hazardsStore;
  if (sector && (sector === 'construction' || sector === 'college')) {
    list = list.filter((h) => h.sector === sector);
  }
  // Sort newest first
  list = [...list].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  res.json({ success: true, data: list });
});

// 7. Report a Hazard
app.post('/api/hazards', (req: Request, res: Response) => {
  const {
    sector,
    category,
    description,
    voiceTranscript,
    isAnonymous,
    workerId,
    reporterName,
    locationNote,
  } = req.body;

  const validCategories: HazardCategory[] = ['fall', 'fire', 'electric', 'wet_floor'];
  if (!validCategories.includes(category)) {
    res.status(400).json({ success: false, error: 'Invalid hazard category' });
    return;
  }

  const sanitizedDesc = sanitizeText(description, 1000);
  const sanitizedVoice = sanitizeText(voiceTranscript, 1000);
  const sanitizedLocation = sanitizeText(locationNote, 150);

  if (!sanitizedDesc && !sanitizedVoice) {
    res.status(400).json({
      success: false,
      error: 'Hazard report must include text or a voice transcription',
    });
    return;
  }

  // CRITICAL SECURITY & PRIVACY REQUIREMENT:
  // "Anonymous reports must not store the worker ID"
  const anonymousFlag = Boolean(isAnonymous);
  const finalWorkerId = anonymousFlag ? null : sanitizeText(workerId, 50) || null;
  const finalReporterName = anonymousFlag
    ? 'Anonymous Worker'
    : sanitizeText(reporterName, 100) || 'Field Worker';

  const newReport: HazardReport = {
    id: `hazard-${Date.now()}`,
    sector: sector === 'college' ? 'college' : 'construction',
    category,
    description: sanitizedDesc || sanitizedVoice,
    voiceTranscript: sanitizedVoice || undefined,
    isAnonymous: anonymousFlag,
    workerId: finalWorkerId,
    reporterName: finalReporterName,
    status: 'Open',
    createdAt: new Date().toISOString(),
    locationNote: sanitizedLocation || undefined,
  };

  hazardsStore.unshift(newReport);
  res.status(201).json({ success: true, data: newReport });
});

// 8. Update Hazard Status (Open -> In review -> Fixed)
app.patch('/api/hazards/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses: HazardStatus[] = ['Open', 'In review', 'Fixed'];
  if (!validStatuses.includes(status)) {
    res.status(400).json({ success: false, error: 'Invalid status' });
    return;
  }

  const item = hazardsStore.find((h) => h.id === id);
  if (!item) {
    res.status(404).json({ success: false, error: 'Hazard report not found' });
    return;
  }

  item.status = status;
  res.json({ success: true, data: item });
});

// 9. Admin PIN Verification
app.post('/api/admin/verify-pin', (req: Request, res: Response) => {
  const { pin } = req.body;
  const inputPin = typeof pin === 'string' ? pin.trim() : '';

  if (inputPin === ADMIN_PIN) {
    res.json({ success: true, authorized: true });
  } else {
    res.status(401).json({
      success: false,
      authorized: false,
      error: 'Invalid PIN. Please check your credentials.',
    });
  }
});

// 10. Reset Store to Default Seeds (convenience for demo/testing)
app.post('/api/reset', (_req: Request, res: Response) => {
  workersStore = getInitialWorkers();
  hazardsStore = getInitialHazards();
  res.json({ success: true, message: 'Store reset to fresh seed data' });
});

// ================= DEV / PROD SERVER SETUP ================= //

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    // Serve static client build
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    // In dev mode, mount Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[FairShift] Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[FairShift] Failed to start server:', err);
  process.exit(1);
});
