import React, { useState, useEffect } from 'react';
import {
  Clock,
  DollarSign,
  AlertTriangle,
  Play,
  Square,
  Volume2,
  VolumeX,
  Flame,
  Zap,
  Droplets,
  TrendingDown,
  CheckCircle2,
  Sparkles,
  EyeOff,
  Send,
  PlusCircle,
} from 'lucide-react';
import {
  HazardCategory,
  HazardReport,
  LanguageCode,
  SectorConfig,
  Worker,
} from '../types';
import {
  calculateWeeklyPay,
} from '../utils/fairshift-calculations';
import {
  speakText,
  stopSpeaking,
  TRANSLATIONS,
} from '../utils/translations';
import { DailyHoursChart } from './DailyHoursChart';
import { VoiceInputButton } from './VoiceInputButton';

interface WorkerAppProps {
  workers: Worker[];
  activeWorkerId: string;
  onSelectWorker: (id: string) => void;
  sectorConfig: SectorConfig;
  currentLang: LanguageCode;
  hazards: HazardReport[];
  onCheckIn: (workerId: string) => Promise<void>;
  onCheckOut: (workerId: string, hours?: number) => Promise<void>;
  onLogShift: (workerId: string, hours: number) => Promise<void>;
  onSubmitHazard: (report: {
    category: HazardCategory;
    description: string;
    voiceTranscript?: string;
    isAnonymous: boolean;
    workerId?: string | null;
    reporterName: string;
    locationNote?: string;
  }) => Promise<void>;
}

export const WorkerApp: React.FC<WorkerAppProps> = ({
  workers,
  activeWorkerId,
  onSelectWorker,
  sectorConfig,
  currentLang,
  hazards,
  onCheckIn,
  onCheckOut,
  onLogShift,
  onSubmitHazard,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [activeTab, setActiveTab] = useState<'shift' | 'payslip' | 'hazards'>('shift');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Active worker
  const currentWorker = workers.find((w) => w.id === activeWorkerId) || workers[0];

  // Shift timer state
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Check out simulation modal / quick picker
  const [checkoutHours, setCheckoutHours] = useState<number>(8.5);
  const [manualHours, setManualHours] = useState<number>(9);
  const [isSubmittingShift, setIsSubmittingShift] = useState(false);

  // Hazard reporting form state
  const [selectedCategory, setSelectedCategory] = useState<HazardCategory>('fall');
  const [hazardText, setHazardText] = useState('');
  const [voiceNote, setVoiceNote] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [locationNote, setLocationNote] = useState('');
  const [isSubmittingHazard, setIsSubmittingHazard] = useState(false);
  const [hazardSuccessMsg, setHazardSuccessMsg] = useState(false);

  // Calculate weekly pay summary
  const paySummary = calculateWeeklyPay(
    currentWorker?.shifts || [],
    sectorConfig.hourlyRate
  );

  // Sector name in active language
  const localizedSectorName =
    sectorConfig.id === 'construction' ? t.sectorConstruction : t.sectorCollege;

  // Live timer for active shift
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (currentWorker?.activeShiftStartTime) {
      const startMs = new Date(currentWorker.activeShiftStartTime).getTime();
      const updateElapsed = () => {
        const diffSec = Math.max(0, Math.floor((Date.now() - startMs) / 1000));
        setElapsedSeconds(diffSec);
      };
      updateElapsed();
      interval = setInterval(updateElapsed, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentWorker?.activeShiftStartTime]);

  // Clean audio on unmount or tab change
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [activeTab]);

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleReadAloud = () => {
    if (isAudioPlaying) {
      stopSpeaking();
      setIsAudioPlaying(false);
      return;
    }

    const script = t.speechTextTemplate(
      paySummary.takeHomePay,
      paySummary.regularHours,
      paySummary.overtimeHours,
      paySummary.deductions
    );

    setIsAudioPlaying(true);
    const started = speakText(script, currentLang, () => {
      setIsAudioPlaying(false);
    });

    if (!started) {
      setIsAudioPlaying(false);
    }
  };

  const handleHazardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hazardText.trim() && !voiceNote.trim()) return;

    setIsSubmittingHazard(true);
    try {
      await onSubmitHazard({
        category: selectedCategory,
        description: hazardText.trim(),
        voiceTranscript: voiceNote.trim() || undefined,
        isAnonymous,
        workerId: isAnonymous ? null : currentWorker.id,
        reporterName: isAnonymous ? t.anonymousReporter : currentWorker.name,
        locationNote: locationNote.trim() || undefined,
      });

      setHazardText('');
      setVoiceNote('');
      setLocationNote('');
      setHazardSuccessMsg(true);
      setTimeout(() => setHazardSuccessMsg(false), 4000);
    } finally {
      setIsSubmittingHazard(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-24 px-3 sm:px-4 pt-3">
      {/* 1. Worker Identity Card & Switcher (Accessible quick selection among seeded workers) */}
      <section
        aria-label={t.switchWorker}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg mb-4"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${
                currentWorker?.avatarColor || 'from-amber-500 to-amber-700'
              } flex items-center justify-center text-white font-black text-lg shadow-md`}
            >
              {currentWorker?.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  {currentWorker?.name}
                </h2>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700 font-mono">
                  {t.workerIdPrefix} ••••{currentWorker?.phoneLastDigits || '00'}
                </span>
              </div>
              <p className="text-xs text-amber-400 font-medium">
                {t.formatRole(currentWorker?.role || '')} • {localizedSectorName}
              </p>
            </div>
          </div>

          {/* Quick worker selector */}
          <div className="text-right">
            <label htmlFor="worker-select" className="block text-[10px] text-slate-400 font-bold uppercase mb-1">
              {t.switchWorker}
            </label>
            <select
              id="worker-select"
              value={activeWorkerId}
              onChange={(e) => onSelectWorker(e.target.value)}
              className="bg-slate-800 text-xs text-white border border-slate-700 rounded-lg px-2 py-1.5 focus-visible:ring-2 focus-visible:ring-amber-400 outline-none cursor-pointer"
              aria-label={t.switchWorker}
            >
              {workers.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} ({t.formatRole(w.role)})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Clock-In Status Indicator */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                currentWorker?.activeShiftStartTime
                  ? 'bg-emerald-400 animate-ping'
                  : 'bg-slate-600'
              }`}
              aria-hidden="true"
            />
            <span className="font-bold text-slate-300">
              {currentWorker?.activeShiftStartTime
                ? t.checkedInStatus
                : t.checkedOutStatus}
            </span>
          </div>

          <div className="text-slate-400 font-mono">
            {t.activeSectorInfo(sectorConfig.hourlyRate)}
          </div>
        </div>
      </section>

      {/* 2. Mobile-First Bottom-Friendly Big Tabs (Large Touch targets) */}
      <nav
        aria-label={t.navAriaLabel}
        className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 mb-5"
      >
        <button
          type="button"
          onClick={() => setActiveTab('shift')}
          className={`py-3 px-2 rounded-xl text-center font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1 transition-all focus-visible:ring-2 focus-visible:ring-amber-400 outline-none cursor-pointer ${
            activeTab === 'shift'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
          aria-pressed={activeTab === 'shift'}
        >
          <Clock className="w-5 h-5" aria-hidden="true" />
          <span>{t.tabShift}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('payslip')}
          className={`py-3 px-2 rounded-xl text-center font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1 transition-all focus-visible:ring-2 focus-visible:ring-amber-400 outline-none cursor-pointer ${
            activeTab === 'payslip'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
          aria-pressed={activeTab === 'payslip'}
        >
          <DollarSign className="w-5 h-5" aria-hidden="true" />
          <span>{t.tabPayslip}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hazards')}
          className={`py-3 px-2 rounded-xl text-center font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1 transition-all focus-visible:ring-2 focus-visible:ring-amber-400 outline-none cursor-pointer ${
            activeTab === 'hazards'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
          aria-pressed={activeTab === 'hazards'}
        >
          <AlertTriangle className="w-5 h-5" aria-hidden="true" />
          <span>{t.tabHazards}</span>
        </button>
      </nav>

      {/* ================= TAB 1: SHIFT TRACKING ================= */}
      {activeTab === 'shift' && (
        <section aria-labelledby="shift-tracking-heading" className="space-y-4">
          <h3 id="shift-tracking-heading" className="sr-only">
            {t.shiftTrackingAria}
          </h3>

          {/* Primary Action Card: High-contrast large check in / out button */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center shadow-xl">
            {currentWorker?.activeShiftStartTime ? (
              // Clocked IN state
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" aria-hidden="true"></span>
                  <span>{t.checkedInStatus}</span>
                </div>

                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-widest block font-bold mb-1">
                    {t.activeShiftDuration}
                  </span>
                  <div
                    className="text-5xl sm:text-6xl font-mono font-black text-white tracking-tight"
                    aria-live="polite"
                  >
                    {formatTimer(elapsedSeconds)}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    {t.startedAt} {new Date(currentWorker.activeShiftStartTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {/* Big Tactile CHECK OUT Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onCheckOut(currentWorker.id, checkoutHours)}
                    className="w-full min-h-[72px] bg-rose-600 hover:bg-rose-500 active:scale-98 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-rose-600/30 transition-all focus-visible:ring-4 focus-visible:ring-rose-400 outline-none cursor-pointer"
                    aria-label={t.checkOutAria}
                  >
                    <Square className="w-7 h-7 fill-white" aria-hidden="true" />
                    <span>{t.checkOut}</span>
                  </button>
                </div>

                {/* Shift Hours adjustment for instant demo testing */}
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-left">
                  <label htmlFor="checkout-hours-select" className="block text-xs font-bold text-slate-300 mb-1">
                    {t.completedShiftHoursLabel}
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      id="checkout-hours-select"
                      value={checkoutHours}
                      onChange={(e) => setCheckoutHours(Number(e.target.value))}
                      className="bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-sm font-bold flex-1"
                      aria-label={t.completedShiftHoursLabel}
                    >
                      <option value={8}>{t.opt8h}</option>
                      <option value={8.5}>{t.opt8_5h}</option>
                      <option value={9}>{t.opt9h}</option>
                      <option value={10}>{t.opt10h}</option>
                      <option value={12}>{t.opt12h}</option>
                    </select>
                  </div>
                  <p className="text-[11px] text-amber-400 mt-1">
                    {t.overtimeCreditHelp} (₹{sectorConfig.hourlyRate * 2}/h).
                  </p>
                </div>
              </div>
            ) : (
              // Clocked OUT state
              <div className="space-y-6">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-widest block font-bold mb-1">
                    {t.readyToBeginWork}
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-white">
                    {localizedSectorName}
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    {t.sdgGuaranteeText}
                  </p>
                </div>

                {/* Big Tactile CHECK IN Button */}
                <button
                  type="button"
                  onClick={() => onCheckIn(currentWorker.id)}
                  className="w-full min-h-[76px] bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-slate-950 font-black text-2xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/25 transition-all focus-visible:ring-4 focus-visible:ring-emerald-400 outline-none cursor-pointer"
                  aria-label={t.checkInAria}
                >
                  <Play className="w-8 h-8 fill-slate-950" aria-hidden="true" />
                  <span>{t.checkIn}</span>
                </button>

                {/* Manual Shift Logger / Quick Add for demo convenience */}
                <div className="mt-4 pt-4 border-t border-slate-800 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <PlusCircle className="w-4 h-4 text-amber-400" aria-hidden="true" />
                      <span>{t.quickAddShift}</span>
                    </span>
                    <span className="text-[11px] text-emerald-400 font-bold">
                      {t.overtimeNotice}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mb-3">
                    {t.addShiftHelp}
                  </p>

                  <div className="flex items-center gap-2">
                    <select
                      value={manualHours}
                      onChange={(e) => setManualHours(Number(e.target.value))}
                      className="bg-slate-950 border border-slate-700 text-white rounded-xl p-3 text-sm font-bold flex-1"
                      aria-label={t.hoursSelectAria}
                    >
                      <option value={7}>{t.opt7h}</option>
                      <option value={8}>{t.opt8h}</option>
                      <option value={9}>{t.opt9h}</option>
                      <option value={10}>{t.opt10h}</option>
                      <option value={11}>{t.opt11h}</option>
                      <option value={12}>{t.opt12h}</option>
                    </select>

                    <button
                      type="button"
                      disabled={isSubmittingShift}
                      onClick={async () => {
                        setIsSubmittingShift(true);
                        try {
                          await onLogShift(currentWorker.id, manualHours);
                        } finally {
                          setIsSubmittingShift(false);
                        }
                      }}
                      className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm transition-all focus-visible:ring-2 focus-visible:ring-amber-400 outline-none cursor-pointer"
                    >
                      {isSubmittingShift ? t.savingShift : t.addShiftButton}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Pay Preview Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">
                {t.weeklyTakeHome}
              </span>
              <div className="text-2xl font-black text-emerald-400">
                ₹{paySummary.takeHomePay.toLocaleString('en-IN')}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('payslip')}
              className="text-xs font-bold px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg border border-slate-700 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-amber-400 outline-none cursor-pointer"
            >
              <span>{t.viewPayslip}</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      )}

      {/* ================= TAB 2: PAYSLIP & HOURS CHART ================= */}
      {activeTab === 'payslip' && (
        <section aria-labelledby="payslip-heading" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 id="payslip-heading" className="text-lg font-black text-white">
                {t.payslipTitle}
              </h3>
              <p className="text-xs text-slate-400">
                {t.payslipSubtitle(sectorConfig.hourlyRate)}
              </p>
            </div>

            {/* Read-Aloud Voice Button */}
            <button
              type="button"
              onClick={handleReadAloud}
              className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-amber-400 outline-none cursor-pointer ${
                isAudioPlaying
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
              }`}
              aria-label={isAudioPlaying ? t.stopAudio : t.readAloud}
            >
              {isAudioPlaying ? (
                <>
                  <VolumeX className="w-4 h-4" aria-hidden="true" />
                  <span>{t.stopAudio}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" aria-hidden="true" />
                  <span>{t.readAloud}</span>
                </>
              )}
            </button>
          </div>

          {isAudioPlaying && (
            <div
              role="status"
              className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 font-semibold flex items-center gap-2 animate-fade-in"
            >
              <Sparkles className="w-4 h-4 flex-shrink-0 animate-spin" aria-hidden="true" />
              <span>{t.audioPlaying}</span>
            </div>
          )}

          {/* Daily Hours Bar Chart (Localized) */}
          <DailyHoursChart shifts={currentWorker?.shifts || []} currentLang={currentLang} />

          {/* Transparent Payslip Line Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            {/* 1. Regular Hours & Pay */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-sm font-bold text-slate-200 block">
                  {t.regularHours}
                </span>
                <span className="text-xs text-slate-400">
                  {t.regularHoursCalc(paySummary.regularHours, sectorConfig.hourlyRate)}
                </span>
              </div>
              <span className="text-base font-mono font-bold text-slate-100">
                ₹{paySummary.regularPay.toLocaleString('en-IN')}
              </span>
            </div>

            {/* 2. Overtime Hours & Pay (2x Highlighted) */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 bg-amber-500/5 -mx-5 px-5 py-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-amber-300 block">
                    {t.overtimeHours}
                  </span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
                    {t.overtimeBadge}
                  </span>
                </div>
                <span className="text-xs text-amber-400/80">
                  {t.overtimeHoursCalc(paySummary.overtimeHours, sectorConfig.hourlyRate * 2)}
                </span>
              </div>
              <span className="text-base font-mono font-black text-amber-400">
                +₹{paySummary.overtimePay.toLocaleString('en-IN')}
              </span>
            </div>

            {/* 3. Gross Pay */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{t.grossPay} {t.grossHoursCalc(paySummary.totalHours)}</span>
              <span className="font-mono font-bold text-slate-200">
                ₹{paySummary.grossPay.toLocaleString('en-IN')}
              </span>
            </div>

            {/* 4. Statutory Deductions (8%) */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-sm font-bold text-rose-300 block">
                  {t.deductions}
                </span>
                <span className="text-xs text-slate-400">
                  {t.deductionsSubtitle}
                </span>
              </div>
              <span className="text-base font-mono font-bold text-rose-400">
                -₹{paySummary.deductions.toLocaleString('en-IN')}
              </span>
            </div>

            {/* 5. TAKE-HOME PAY (Highlight) */}
            <div className="pt-2 flex items-center justify-between bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-black text-emerald-400 block">
                  {t.takeHomePay}
                </span>
                <span className="text-[11px] text-slate-400">
                  {t.directCompensation}
                </span>
              </div>
              <div className="text-3xl font-black text-emerald-300 font-mono">
                ₹{paySummary.takeHomePay.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= TAB 3: HAZARD REPORTING ================= */}
      {activeTab === 'hazards' && (
        <section aria-labelledby="hazard-heading" className="space-y-5">
          <div>
            <h3 id="hazard-heading" className="text-lg font-black text-white">
              {t.hazardTitle}
            </h3>
            <p className="text-xs text-slate-400">
              {t.hazardSubtitle}
            </p>
          </div>

          {hazardSuccessMsg && (
            <div
              role="alert"
              className="p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl text-sm text-emerald-300 font-bold flex items-center gap-2.5 animate-bounce"
            >
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" aria-hidden="true" />
              <span>{t.hazardSuccessAlert}</span>
            </div>
          )}

          <form onSubmit={handleHazardSubmit} className="space-y-4">
            {/* Step 1: Choose Hazard Icon (Fall, Fire, Electric, Wet Floor) */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                {t.hazardStep1}
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Fall */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory('fall')}
                  className={`p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-400 outline-none cursor-pointer ${
                    selectedCategory === 'fall'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                  aria-pressed={selectedCategory === 'fall'}
                >
                  <TrendingDown className="w-8 h-8 text-amber-400" aria-hidden="true" />
                  <span className="text-xs font-black">{t.hazardFall}</span>
                </button>

                {/* Fire */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory('fire')}
                  className={`p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-400 outline-none cursor-pointer ${
                    selectedCategory === 'fire'
                      ? 'bg-rose-500/20 border-rose-400 text-rose-300 ring-2 ring-rose-400'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                  aria-pressed={selectedCategory === 'fire'}
                >
                  <Flame className="w-8 h-8 text-rose-400" aria-hidden="true" />
                  <span className="text-xs font-black">{t.hazardFire}</span>
                </button>

                {/* Electric */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory('electric')}
                  className={`p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-400 outline-none cursor-pointer ${
                    selectedCategory === 'electric'
                      ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 ring-2 ring-yellow-400'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                  aria-pressed={selectedCategory === 'electric'}
                >
                  <Zap className="w-8 h-8 text-yellow-400" aria-hidden="true" />
                  <span className="text-xs font-black">{t.hazardElectric}</span>
                </button>

                {/* Wet Floor */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory('wet_floor')}
                  className={`p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-400 outline-none cursor-pointer ${
                    selectedCategory === 'wet_floor'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 ring-2 ring-cyan-400'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                  aria-pressed={selectedCategory === 'wet_floor'}
                >
                  <Droplets className="w-8 h-8 text-cyan-400" aria-hidden="true" />
                  <span className="text-xs font-black">{t.hazardWetFloor}</span>
                </button>
              </div>
            </div>

            {/* Step 2: Voice or Text Description */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                {t.hazardStep2}
              </label>

              {/* Web Speech API Voice Button */}
              <VoiceInputButton
                currentLang={currentLang}
                onTranscript={(transcript) => {
                  setVoiceNote(transcript);
                  if (!hazardText) setHazardText(transcript);
                }}
                label={t.voiceNoteStart}
                stopLabel={t.voiceNoteStop}
              />

              {voiceNote && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300">
                  <span className="font-bold block text-slate-400 text-[10px] uppercase">
                    {t.recognizedVoiceLabel}
                  </span>
                  &ldquo;{voiceNote}&rdquo;
                </div>
              )}

              {/* Text Input area */}
              <div>
                <label htmlFor="hazard-desc-input" className="sr-only">
                  {t.hazardDescAria}
                </label>
                <textarea
                  id="hazard-desc-input"
                  rows={3}
                  value={hazardText}
                  onChange={(e) => setHazardText(e.target.value)}
                  placeholder={t.descriptionPlaceholder}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-white placeholder-slate-500 focus-visible:ring-2 focus-visible:ring-amber-400 outline-none resize-none"
                />
              </div>

              {/* Quick sample chips for one-tap convenience */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  t.chipLooseWire,
                  t.chipWaterPuddle,
                  t.chipMissingGuardrail,
                  t.chipBlockedExit,
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() =>
                      setHazardText((prev) => (prev ? `${prev}, ${chip}` : chip))
                    }
                    className="text-[11px] px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
                  >
                    + {chip}
                  </button>
                ))}
              </div>

              {/* Location Note (Optional) */}
              <div>
                <label htmlFor="hazard-loc-input" className="block text-xs font-medium text-slate-400 mb-1">
                  {t.locationLabel}
                </label>
                <input
                  id="hazard-loc-input"
                  type="text"
                  value={locationNote}
                  onChange={(e) => setLocationNote(e.target.value)}
                  placeholder={t.locationPlaceholder}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus-visible:ring-2 focus-visible:ring-amber-400 outline-none"
                />
              </div>
            </div>

            {/* Step 3: Optional Anonymous Sending Toggle */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300" aria-hidden="true">
                  <EyeOff className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-white block">
                    {t.sendAnonymously}
                  </span>
                  <p className="text-xs text-slate-400">
                    {t.sendAnonymouslyDesc}
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="sr-only peer"
                  aria-label={t.sendAnonymously}
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmittingHazard || (!hazardText.trim() && !voiceNote.trim())}
              className="w-full min-h-[64px] bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black text-lg rounded-2xl flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/20 transition-all focus-visible:ring-4 focus-visible:ring-amber-400 outline-none cursor-pointer disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" aria-hidden="true" />
              <span>{isSubmittingHazard ? t.submitting : t.submitHazard}</span>
            </button>
          </form>

          {/* Status of Recent Hazards (Workers see Open, In review, Fixed) */}
          <div className="pt-4 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center justify-between">
              <span>{t.recentHazards}</span>
              <span className="text-xs text-slate-400 font-normal">
                {hazards.length} {t.hazardsLoggedCount}
              </span>
            </h4>

            {hazards.length === 0 ? (
              <p className="text-xs text-slate-500 italic text-center py-4">
                {t.noHazardsReported}
              </p>
            ) : (
              hazards.map((h) => {
                let statusBadge = (
                  <span className="text-[11px] px-2.5 py-1 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {t.statusOpen}
                  </span>
                );
                if (h.status === 'In review') {
                  statusBadge = (
                    <span className="text-[11px] px-2.5 py-1 rounded-full font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                      {t.statusInReview}
                    </span>
                  );
                } else if (h.status === 'Fixed') {
                  statusBadge = (
                    <span className="text-[11px] px-2.5 py-1 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.statusFixed}</span>
                    </span>
                  );
                }

                return (
                  <div
                    key={h.id}
                    className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {h.category === 'fall' && <TrendingDown className="w-4 h-4 text-amber-400" aria-hidden="true" />}
                        {h.category === 'fire' && <Flame className="w-4 h-4 text-rose-400" aria-hidden="true" />}
                        {h.category === 'electric' && <Zap className="w-4 h-4 text-yellow-400" aria-hidden="true" />}
                        {h.category === 'wet_floor' && <Droplets className="w-4 h-4 text-cyan-400" aria-hidden="true" />}
                        <span className="text-xs font-black uppercase text-slate-200">
                          {h.category === 'fall' && t.hazardFall}
                          {h.category === 'fire' && t.hazardFire}
                          {h.category === 'electric' && t.hazardElectric}
                          {h.category === 'wet_floor' && t.hazardWetFloor}
                        </span>
                      </div>
                      {statusBadge}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300">
                      {h.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/80">
                      <span>
                        {t.reporterLabel} {h.isAnonymous ? `🔒 ${t.anonymousReporter}` : h.reporterName}
                      </span>
                      <span>
                        {new Date(h.createdAt).toLocaleDateString()} {new Date(h.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      )}
    </div>
  );
};
