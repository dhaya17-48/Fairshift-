import React, { useState } from 'react';
import {
  Users,
  AlertOctagon,
  Flame,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingDown,
  Zap,
  Droplets,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  HazardCategory,
  HazardReport,
  HazardStatus,
  QuitRiskLevel,
  SectorConfig,
  SectorType,
  Worker,
  WorkerDashboardItem,
} from '../types';
import {
  calculateQuitRisk,
  calculateWeeklyPay,
  checkFatigue,
} from '../utils/fairshift-calculations';

interface AdminDashboardProps {
  sector: SectorType;
  sectorConfig: SectorConfig;
  workers: Worker[];
  hazards: HazardReport[];
  onUpdateHazardStatus: (id: string, status: HazardStatus) => Promise<void>;
  onLogShiftForWorker: (workerId: string, hours: number) => Promise<void>;
  onResetSeedData: () => Promise<void>;
  onLockAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  sectorConfig,
  workers,
  hazards,
  onUpdateHazardStatus,
  onLogShiftForWorker,
  onResetSeedData,
  onLockAdmin,
}) => {
  const [selectedWorkerDetail, setSelectedWorkerDetail] = useState<Worker | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  // Filter hazards for current sector
  const sectorHazards = hazards.filter((h) => h.sector === sectorConfig.id);

  // Compute stats for each worker
  const workerItems: WorkerDashboardItem[] = workers.map((worker) => {
    const weeklyPay = calculateWeeklyPay(worker.shifts, sectorConfig.hourlyRate);
    const fatigue = checkFatigue(worker.shifts);
    const quitRisk = calculateQuitRisk(worker.shifts);
    return {
      worker,
      weeklyPay,
      fatigue,
      quitRisk,
    };
  });

  // Aggregated KPIs
  const totalStaff = workers.length;
  const fatigueAlertsCount = workerItems.filter((i) => i.fatigue.isFatigued).length;
  const openHazardsCount = sectorHazards.filter((h) => h.status === 'Open').length;
  const weeklyOvertimeHours = Math.round(
    workerItems.reduce((acc, i) => acc + i.weeklyPay.overtimeHours, 0) * 10
  ) / 10;

  const handleStatusChange = async (id: string, newStatus: HazardStatus) => {
    setIsUpdatingStatus(id);
    try {
      await onUpdateHazardStatus(id, newStatus);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const handleSimulateOvertime = async (workerId: string) => {
    // Add a 10h shift (2h overtime) to test fatigue and quit risk changes
    await onLogShiftForWorker(workerId, 10);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Admin Title & Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Site Administration &amp; SDG 8 Compliance
            </h1>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              PIN Verified
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitoring workforce fatigue, fair compensation (₹{sectorConfig.hourlyRate}/h + 2x OT), and workplace hazard remediation for{' '}
            <strong className="text-amber-400">{sectorConfig.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isResetting}
            onClick={async () => {
              setIsResetting(true);
              try {
                await onResetSeedData();
              } finally {
                setIsResetting(false);
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 rounded-xl border border-slate-700 transition-all focus-visible:ring-2 focus-visible:ring-amber-400 outline-none cursor-pointer"
            title="Reset workers and hazards back to initial demo seeds"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
            <span>Reset Demo Data</span>
          </button>

          <button
            type="button"
            onClick={onLockAdmin}
            className="flex items-center gap-1.5 px-3 py-2 bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-xs font-bold text-rose-300 rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-amber-400 outline-none cursor-pointer"
            title="Lock admin dashboard and require PIN to re-enter"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock Dashboard</span>
          </button>
        </div>
      </div>

      {/* 4 Required Metric Cards */}
      <section aria-labelledby="kpi-heading" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <h2 id="kpi-heading" className="sr-only">
          Key Performance Indicators
        </h2>

        {/* Card 1: Staff */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Staff
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-white font-mono">
            {totalStaff}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Active workers in {sectorConfig.name}
          </p>
        </div>

        {/* Card 2: Fatigue Alerts */}
        <div className={`border rounded-2xl p-5 shadow-lg relative overflow-hidden ${
          fatigueAlertsCount > 0
            ? 'bg-rose-950/40 border-rose-600/50 ring-1 ring-rose-500/40'
            : 'bg-slate-900/90 border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Fatigue Alerts
            </span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
              <AlertOctagon className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-rose-300 font-mono">
            {fatigueAlertsCount}
          </div>
          <p className="text-xs text-rose-300/80 mt-1">
            &gt;48h/week or 6+ consecutive days
          </p>
        </div>

        {/* Card 3: Open Hazards */}
        <div className={`border rounded-2xl p-5 shadow-lg relative overflow-hidden ${
          openHazardsCount > 0
            ? 'bg-amber-950/40 border-amber-600/50'
            : 'bg-slate-900/90 border-slate-800'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Open Hazards
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-amber-300 font-mono">
            {openHazardsCount}
          </div>
          <p className="text-xs text-amber-300/80 mt-1">
            Requiring immediate site remediation
          </p>
        </div>

        {/* Card 4: Weekly Overtime */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Weekly Overtime
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-white font-mono">
            {weeklyOvertimeHours} <span className="text-base font-bold text-amber-400">hrs</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Compensated at 2x rate (₹{sectorConfig.hourlyRate * 2}/h)
          </p>
        </div>
      </section>

      {/* Workforce Roster & Quit Risk Table */}
      <section aria-labelledby="workers-table-heading" className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id="workers-table-heading" className="text-lg font-black text-white">
              Worker Workload &amp; Quit Risk Assessment
            </h2>
            <p className="text-xs text-slate-400">
              Quit Risk rule: <strong className="text-rose-400">High</strong> if fatigued (&gt;48h or 6+ days in a row) • <strong className="text-amber-400">Medium</strong> if 6+ overtime hours • <strong className="text-emerald-400">Low</strong> if standard load.
            </p>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-950/60">
                <th scope="col" className="py-3 px-4">Worker</th>
                <th scope="col" className="py-3 px-3">Role</th>
                <th scope="col" className="py-3 px-3 text-center">Days Worked</th>
                <th scope="col" className="py-3 px-3 text-right">Regular (h)</th>
                <th scope="col" className="py-3 px-3 text-right">Overtime (h)</th>
                <th scope="col" className="py-3 px-3 text-right">Total (h)</th>
                <th scope="col" className="py-3 px-3 text-center">Fatigue Alert</th>
                <th scope="col" className="py-3 px-3 text-center">Quit Risk</th>
                <th scope="col" className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono text-xs">
              {workerItems.map(({ worker, weeklyPay, fatigue, quitRisk }) => {
                const consecutiveDays = fatigue.consecutiveDays;

                // Quit Risk Badge styling
                let quitRiskBadge = (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold font-sans bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Low
                  </span>
                );
                if (quitRisk === 'Medium') {
                  quitRiskBadge = (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold font-sans bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      Medium (6+ OT)
                    </span>
                  );
                } else if (quitRisk === 'High') {
                  quitRiskBadge = (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold font-sans bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                      High (Fatigued)
                    </span>
                  );
                }

                return (
                  <tr
                    key={worker.id}
                    className={`hover:bg-slate-800/50 transition-colors ${
                      fatigue.isFatigued ? 'bg-rose-950/15' : ''
                    }`}
                  >
                    {/* Worker Name & Avatar */}
                    <td className="py-3 px-4 font-sans font-bold text-white flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${worker.avatarColor} flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {worker.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span>{worker.name}</span>
                          {worker.activeShiftStartTime && (
                            <span className="w-2 h-2 rounded-full bg-emerald-400" title="Currently on active shift" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 block font-mono">
                          ID: ••••{worker.phoneLastDigits || '00'}
                        </span>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3 px-3 font-sans text-xs text-slate-300">
                      {worker.role}
                    </td>

                    {/* Days Worked */}
                    <td className="py-3 px-3 text-center text-slate-200">
                      <span className="font-bold">{worker.shifts.length}</span>
                      <span className="text-[10px] text-slate-400 block font-sans">
                        ({consecutiveDays} streak)
                      </span>
                    </td>

                    {/* Regular Hours */}
                    <td className="py-3 px-3 text-right text-slate-200">
                      {weeklyPay.regularHours}h
                    </td>

                    {/* Overtime Hours */}
                    <td className="py-3 px-3 text-right font-bold text-amber-400">
                      {weeklyPay.overtimeHours > 0 ? `+${weeklyPay.overtimeHours}h` : '0h'}
                    </td>

                    {/* Total Hours */}
                    <td className="py-3 px-3 text-right font-bold text-white">
                      {weeklyPay.totalHours}h
                    </td>

                    {/* Fatigue Alert */}
                    <td className="py-3 px-3 text-center font-sans">
                      {fatigue.isFatigued ? (
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow-sm">
                          <AlertOctagon className="w-3.5 h-3.5" />
                          <span>FATIGUE</span>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Safe</span>
                        </span>
                      )}
                    </td>

                    {/* Quit Risk */}
                    <td className="py-3 px-3 text-center">
                      {quitRiskBadge}
                    </td>

                    {/* Quick Simulation Actions */}
                    <td className="py-3 px-4 text-right font-sans">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleSimulateOvertime(worker.id)}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded text-[11px] font-bold border border-slate-700 focus-visible:ring-2 focus-visible:ring-amber-400 outline-none"
                          title="Simulate adding +10h shift (2h OT) to see live risk change"
                        >
                          +10h Test
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedWorkerDetail(worker)}
                          className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 rounded text-[11px] font-bold transition-all focus-visible:ring-2 focus-visible:ring-amber-400 outline-none"
                        >
                          Audit
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Hazard Remediation List (Move status: Open, In review, Fixed) */}
      <section aria-labelledby="hazard-mgmt-heading" className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id="hazard-mgmt-heading" className="text-lg font-black text-white">
              Workplace Hazard Remediation Queue
            </h2>
            <p className="text-xs text-slate-400">
              Review filed hazards and update resolution status (<strong className="text-amber-400">Open</strong> → <strong className="text-blue-400">In review</strong> → <strong className="text-emerald-400">Fixed</strong>)
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-lg">
            {sectorHazards.length} Total in {sectorConfig.name}
          </span>
        </div>

        <div className="space-y-3">
          {sectorHazards.length === 0 ? (
            <div className="p-8 text-center text-slate-500 italic">
              No hazards currently recorded in this sector.
            </div>
          ) : (
            sectorHazards.map((item) => {
              const isBusy = isUpdatingStatus === item.id;

              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 bg-slate-950/80 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-slate-700"
                >
                  {/* Left: Hazard info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-slate-800 text-amber-400">
                        {item.category === 'fall' && <TrendingDown className="w-4 h-4" />}
                        {item.category === 'fire' && <Flame className="w-4 h-4 text-rose-400" />}
                        {item.category === 'electric' && <Zap className="w-4 h-4 text-yellow-400" />}
                        {item.category === 'wet_floor' && <Droplets className="w-4 h-4 text-cyan-400" />}
                      </span>

                      <span className="text-xs font-black uppercase tracking-wider text-white">
                        {item.category.replace('_', ' ')}
                      </span>

                      {item.locationNote && (
                        <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          📍 {item.locationNote}
                        </span>
                      )}

                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          item.status === 'Open'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : item.status === 'In review'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}
                      >
                        Status: {item.status}
                      </span>
                    </div>

                    <p className="text-sm text-slate-200">
                      {item.description}
                    </p>

                    {item.voiceTranscript && item.voiceTranscript !== item.description && (
                      <p className="text-xs text-amber-300/80 italic">
                        🎙️ Voice Audio Transcript: &ldquo;{item.voiceTranscript}&rdquo;
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1">
                      <span>
                        Reporter: <strong className="text-slate-400">{item.isAnonymous ? '🔒 Anonymous Worker' : item.reporterName}</strong>
                      </span>
                      <span>
                        Reported: {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  {/* Right: Status Action Buttons (Open -> In review -> Fixed) */}
                  <div className="flex items-center gap-1.5 flex-shrink-0" role="group" aria-label="Hazard resolution status controls">
                    <button
                      type="button"
                      disabled={isBusy || item.status === 'Open'}
                      onClick={() => handleStatusChange(item.id, 'Open')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-amber-400 outline-none cursor-pointer disabled:cursor-not-allowed ${
                        item.status === 'Open'
                          ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      Open
                    </button>

                    <button
                      type="button"
                      disabled={isBusy || item.status === 'In review'}
                      onClick={() => handleStatusChange(item.id, 'In review')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-blue-400 outline-none cursor-pointer disabled:cursor-not-allowed ${
                        item.status === 'In review'
                          ? 'bg-blue-600 text-white shadow-md font-black'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      In review
                    </button>

                    <button
                      type="button"
                      disabled={isBusy || item.status === 'Fixed'}
                      onClick={() => handleStatusChange(item.id, 'Fixed')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 outline-none cursor-pointer disabled:cursor-not-allowed flex items-center gap-1 ${
                        item.status === 'Fixed'
                          ? 'bg-emerald-600 text-white shadow-md font-black'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Fixed</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Worker Audit Modal (Detailed Shift Log inspection) */}
      {selectedWorkerDetail && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
        >
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-black text-white">
                  {selectedWorkerDetail.name} &bull; Shift Audit
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedWorkerDetail.role} &bull; {sectorConfig.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedWorkerDetail(null)}
                className="text-slate-400 hover:text-white p-1 text-sm font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {selectedWorkerDetail.shifts.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No shifts on record.</p>
              ) : (
                selectedWorkerDetail.shifts.map((s) => (
                  <div
                    key={s.id}
                    className="p-3 bg-slate-950 rounded-xl flex items-center justify-between text-xs font-mono border border-slate-800"
                  >
                    <div>
                      <span className="font-bold text-white block">
                        {s.date} ({s.dayName})
                      </span>
                      <span className="text-[11px] text-slate-400 font-sans">
                        {s.regularHours}h regular + {s.overtimeHours}h overtime (2x)
                      </span>
                    </div>
                    <span className="text-sm font-black text-amber-400">
                      {s.hours}h total
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedWorkerDetail(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
