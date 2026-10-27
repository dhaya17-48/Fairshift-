import React from 'react';
import {
  Building2,
  GraduationCap,
  Languages,
  ShieldCheck,
  UserCheck,
  Lock,
} from 'lucide-react';
import { LanguageCode, SectorType } from '../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../utils/translations';

interface HeaderProps {
  activeSector: SectorType;
  onSectorChange: (sector: SectorType) => void;
  currentLang: LanguageCode;
  onLangChange: (lang: LanguageCode) => void;
  isAdminView: boolean;
  onToggleView: (toAdmin: boolean) => void;
  hourlyRate: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeSector,
  onSectorChange,
  currentLang,
  onLangChange,
  isAdminView,
  onToggleView,
  hourlyRate,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-md">
      {/* Top Banner: UN SDG 8 Tag & App Branding */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20">
            <span className="text-xl">⚖️</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-white font-sans">
                {t.appName}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {t.unSdgBadge}
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {t.appTagline}
            </p>
          </div>
        </div>

        {/* Action Controls: View Switcher (Worker / Admin) & Language */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="relative inline-flex items-center">
            <label htmlFor="lang-switcher" className="sr-only">
              {t.selectLanguage}
            </label>
            <div className="flex items-center bg-slate-800/90 border border-slate-700 rounded-lg px-2 py-1.5 focus-within:ring-2 focus-within:ring-amber-400">
              <Languages className="w-4 h-4 text-amber-400 mr-1.5 flex-shrink-0" aria-hidden="true" />
              <select
                id="lang-switcher"
                value={currentLang}
                onChange={(e) => onLangChange(e.target.value as LanguageCode)}
                className="bg-transparent text-xs sm:text-sm font-semibold text-slate-100 outline-none cursor-pointer pr-1"
                aria-label={t.selectLanguage}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                    {lang.nativeLabel} ({lang.label})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mode Switcher: Worker App vs Admin Dashboard */}
          <nav aria-label={t.navAriaLabel} className="flex items-center bg-slate-800/90 p-1 rounded-lg border border-slate-700">
            <button
              type="button"
              onClick={() => onToggleView(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold rounded-md transition-all focus-visible:ring-2 focus-visible:ring-amber-400 outline-none ${
                !isAdminView
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
              aria-pressed={!isAdminView}
              aria-label={t.workerApp}
            >
              <UserCheck className="w-4 h-4" aria-hidden="true" />
              <span>{t.workerApp}</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleView(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold rounded-md transition-all focus-visible:ring-2 focus-visible:ring-amber-400 outline-none ${
                isAdminView
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
              aria-pressed={isAdminView}
              aria-label={t.adminDashboard}
            >
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.adminDashboard}</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Sector Bar: Construction Site vs College Campus */}
      <div className="bg-slate-950/80 border-t border-slate-800/80 px-3 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium hidden md:inline">
              {t.activeSectorLabel}
            </span>
            <div className="inline-flex p-1 bg-slate-900 border border-slate-700 rounded-xl" role="group" aria-label={t.activeSectorLabel}>
              <button
                type="button"
                onClick={() => onSectorChange('construction')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-amber-400 outline-none ${
                  activeSector === 'construction'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-pressed={activeSector === 'construction'}
              >
                <Building2 className="w-4 h-4 text-amber-400" aria-hidden="true" />
                <span>{t.sectorConstruction}</span>
                <span className="ml-1 text-[11px] px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-black">
                  ₹100/h
                </span>
              </button>

              <button
                type="button"
                onClick={() => onSectorChange('college')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all focus-visible:ring-2 focus-visible:ring-amber-400 outline-none ${
                  activeSector === 'college'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-pressed={activeSector === 'college'}
              >
                <GraduationCap className="w-4 h-4 text-blue-400" aria-hidden="true" />
                <span>{t.sectorCollege}</span>
                <span className="ml-1 text-[11px] px-1.5 py-0.5 rounded bg-blue-500 text-white font-black">
                  ₹80/h
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
            <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.overtimeBannerText} (₹{hourlyRate * 2}/h)</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
