import React, { useState, useEffect, useCallback } from 'react';
import {
  HazardCategory,
  HazardReport,
  HazardStatus,
  LanguageCode,
  SectorConfig,
  SectorType,
  Worker,
} from './types';
import { api } from './services/api';
import { Header } from './components/Header';
import { WorkerApp } from './components/WorkerApp';
import { AdminDashboard } from './components/AdminDashboard';
import { PinModal } from './components/PinModal';
import { TRANSLATIONS } from './utils/translations';
import { clientStore } from './services/store';

// Default fallback configs while loading
const DEFAULT_SECTOR_CONFIGS: Record<SectorType, SectorConfig> = {
  construction: {
    id: 'construction',
    name: 'Construction Site',
    icon: 'HardHat',
    hourlyRate: 100,
    description: 'Infrastructure development & civil works',
    locationExample: 'Metro Line Pier #42, North Zone',
  },
  college: {
    id: 'college',
    name: 'College Campus',
    icon: 'GraduationCap',
    hourlyRate: 80,
    description: 'Higher education facilities & campus upkeep',
    locationExample: 'Engineering Block & Central Library',
  },
};

export default function App() {
  const [sector, setSector] = useState<SectorType>('construction');
  const [sectorConfigs, setSectorConfigs] = useState<Record<SectorType, SectorConfig>>(
    DEFAULT_SECTOR_CONFIGS
  );
  const [lang, setLang] = useState<LanguageCode>('en');
  const t = TRANSLATIONS[lang];

  // Workers & Hazards - initialized immediately with seeded workers
  const [workers, setWorkers] = useState<Worker[]>(() => clientStore.getWorkers('construction'));
  const [activeWorkerId, setActiveWorkerId] = useState<string>(() => {
    const list = clientStore.getWorkers('construction');
    return list[0]?.id || 'c-1';
  });
  const [hazards, setHazards] = useState<HazardReport[]>(() => clientStore.getHazards('construction'));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Admin access & authentication
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);

  // Feedback announcement for screen readers
  const [ariaAnnouncement, setAriaAnnouncement] = useState<string>('');

  const announce = (msg: string) => {
    setAriaAnnouncement(msg);
    setTimeout(() => setAriaAnnouncement(''), 3000);
  };

  // 1. Fetch initial sector configs
  useEffect(() => {
    async function loadSectors() {
      try {
        const configs = await api.getSectors();
        if (configs) setSectorConfigs(configs);
      } catch (err) {
        console.warn('Could not load sector configs from API:', err);
      }
    }
    loadSectors();
  }, []);

  // 2. Fetch workers and hazards for current sector
  const loadData = useCallback(async () => {
    try {
      const [workersData, hazardsData] = await Promise.all([
        api.getWorkers(sector),
        api.getHazards(sector),
      ]);
      if (workersData && workersData.length > 0) {
        setWorkers(workersData);
        const exists = workersData.some((w) => w.id === activeWorkerId);
        if (!exists) {
          setActiveWorkerId(workersData[0].id);
        }
      }
      if (hazardsData && hazardsData.length > 0) {
        setHazards(hazardsData);
      }
    } catch (err) {
      console.warn('Failed to fetch sector data:', err);
    }
  }, [sector, activeWorkerId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle Sector Change
  const handleSectorChange = (newSector: SectorType) => {
    if (newSector === sector) return;
    setSector(newSector);
    const sectorWorkers = clientStore.getWorkers(newSector);
    setWorkers(sectorWorkers);
    if (sectorWorkers.length > 0) {
      setActiveWorkerId(sectorWorkers[0].id);
    }
    const sectorHazards = clientStore.getHazards(newSector);
    setHazards(sectorHazards);
    const targetName = newSector === 'construction' ? t.sectorConstruction : t.sectorCollege;
    announce(t.announceSectorSwitched(targetName));
  };

  // Handle Mode Toggle (Worker vs Admin)
  const handleToggleView = (toAdmin: boolean) => {
    if (toAdmin) {
      if (isAdminAuthenticated) {
        setIsAdminView(true);
      } else {
        setIsPinModalOpen(true);
      }
    } else {
      setIsAdminView(false);
    }
  };

  const handleAdminAuthSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsPinModalOpen(false);
    setIsAdminView(true);
    announce('Admin dashboard unlocked successfully.');
  };

  const handleLockAdmin = () => {
    setIsAdminAuthenticated(false);
    setIsAdminView(false);
    announce('Admin view locked.');
  };

  // Shift & Clock Handlers
  const handleCheckIn = async (workerId: string) => {
    try {
      const updated = await api.checkInWorker(workerId, sector);
      setWorkers((prev) =>
        prev.map((w) => (w.id === workerId ? updated : w))
      );
      announce(t.announceShiftClockedIn);
    } catch (err: any) {
      alert(err.message || t.errorCheckInFailed);
    }
  };

  const handleCheckOut = async (workerId: string, hours?: number) => {
    try {
      const { worker } = await api.checkOutWorker(workerId, sector, hours);
      setWorkers((prev) =>
        prev.map((w) => (w.id === workerId ? worker : w))
      );
      announce(t.announceShiftClockedOut);
    } catch (err: any) {
      alert(err.message || t.errorCheckOutFailed);
    }
  };

  const handleLogShift = async (workerId: string, hours: number) => {
    try {
      const { worker } = await api.addManualShift(workerId, sector, hours);
      setWorkers((prev) =>
        prev.map((w) => (w.id === workerId ? worker : w))
      );
      announce(t.announceShiftLogged(hours));
    } catch (err: any) {
      alert(err.message || t.errorLogShiftFailed);
    }
  };

  // Hazard Handlers
  const handleSubmitHazard = async (reportData: {
    category: HazardCategory;
    description: string;
    voiceTranscript?: string;
    isAnonymous: boolean;
    workerId?: string | null;
    reporterName: string;
    locationNote?: string;
  }) => {
    const created = await api.createHazard({
      ...reportData,
      sector,
    });
    setHazards((prev) => [created, ...prev]);
    announce(t.announceHazardReported);
  };

  const handleUpdateHazardStatus = async (id: string, status: HazardStatus) => {
    const updated = await api.updateHazardStatus(id, status);
    setHazards((prev) =>
      prev.map((h) => (h.id === id ? updated : h))
    );
    announce(`Hazard status updated to ${status}.`);
  };

  const handleResetSeedData = async () => {
    await api.resetData();
    await loadData();
    announce('All seed workers and hazards restored.');
  };

  const activeSectorConfig = sectorConfigs[sector] || DEFAULT_SECTOR_CONFIGS[sector];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Hidden Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-500 focus:text-slate-950 focus:font-bold focus:rounded-lg"
      >
        {t.skipToContent}
      </a>

      {/* Screen Reader Live Announcement Region */}
      <div
        role="status"
        aria-live="polite"
        className="sr-only"
      >
        {ariaAnnouncement}
      </div>

      {/* Top Header */}
      <Header
        activeSector={sector}
        onSectorChange={handleSectorChange}
        currentLang={lang}
        onLangChange={setLang}
        isAdminView={isAdminView}
        onToggleView={handleToggleView}
        hourlyRate={activeSectorConfig.hourlyRate}
      />

      {/* Main Content Area */}
      <div id="main-content" className="flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 space-y-3">
            <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
            <p className="text-sm font-bold text-slate-400">{t.loadingApp}</p>
          </div>
        ) : isAdminView ? (
          <AdminDashboard
            sector={sector}
            sectorConfig={activeSectorConfig}
            workers={workers}
            hazards={hazards}
            onUpdateHazardStatus={handleUpdateHazardStatus}
            onLogShiftForWorker={handleLogShift}
            onResetSeedData={handleResetSeedData}
            onLockAdmin={handleLockAdmin}
          />
        ) : (
          <WorkerApp
            workers={workers}
            activeWorkerId={activeWorkerId}
            onSelectWorker={setActiveWorkerId}
            sectorConfig={activeSectorConfig}
            currentLang={lang}
            hazards={hazards}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
            onLogShift={handleLogShift}
            onSubmitHazard={handleSubmitHazard}
          />
        )}
      </div>

      {/* Admin PIN Entry Modal */}
      <PinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={handleAdminAuthSuccess}
      />

      {/* Localized Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 px-4 text-center text-xs text-slate-500">
        <p>{t.appFooter}</p>
      </footer>
    </div>
  );
}
