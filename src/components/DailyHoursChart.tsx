import React from 'react';
import { LanguageCode, ShiftRecord } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface DailyHoursChartProps {
  shifts: ShiftRecord[];
  currentLang: LanguageCode;
}

export const DailyHoursChart: React.FC<DailyHoursChartProps> = ({
  shifts,
  currentLang,
}) => {
  const t = TRANSLATIONS[currentLang];
  // Generate 7 days ending today or showing all recent shifts
  const displayShifts = shifts.slice(-7);
  const maxHours = Math.max(12, ...displayShifts.map((s) => s.hours));

  return (
    <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span>{t.chartTitle}</span>
          </h4>
          <p className="text-xs text-slate-400">
            {t.chartSubtitle}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" aria-hidden="true"></span>
            <span className="text-slate-300">{t.chartLegendRegular}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" aria-hidden="true"></span>
            <span className="text-amber-300 font-bold">{t.chartLegendOvertime}</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas / Columns */}
      <div className="relative pt-6 pb-2">
        {/* 8-Hour Threshold Guideline */}
        <div
          className="absolute left-0 right-0 border-b-2 border-dashed border-emerald-500/40 z-10 pointer-events-none flex items-center justify-end pr-1"
          style={{ bottom: `${(8 / maxHours) * 160 + 32}px` }}
        >
          <span className="text-[10px] font-bold text-emerald-400 bg-slate-900/90 px-1.5 py-0.5 rounded border border-emerald-500/30">
            {t.chartStandardLimit}
          </span>
        </div>

        {/* Bars Container */}
        <div
          className="grid grid-flow-col auto-cols-fr gap-2 sm:gap-4 items-end h-44 px-1"
          role="region"
          aria-label={t.chartAriaLabel}
        >
          {displayShifts.length === 0 ? (
            <div className="col-span-full h-full flex items-center justify-center text-xs text-slate-500 italic">
              {t.chartEmptyState}
            </div>
          ) : (
            displayShifts.map((shift) => {
              const regH = shift.regularHours;
              const otH = shift.overtimeHours;
              const totalH = shift.hours;

              const regHeightPercent = (regH / maxHours) * 100;
              const otHeightPercent = (otH / maxHours) * 100;

              return (
                <div
                  key={shift.id || shift.date}
                  className="flex flex-col items-center h-full justify-end group focus-within:ring-2 focus-within:ring-amber-400 rounded-lg p-0.5"
                  tabIndex={0}
                  aria-label={`${shift.dayName} ${shift.date}: ${totalH}h (${regH}h, ${otH}h)`}
                >
                  {/* Total hours label above bar */}
                  <span className="text-[11px] font-mono font-bold text-slate-300 mb-1">
                    {totalH}h
                  </span>

                  {/* Stacked Bar */}
                  <div className="w-full max-w-[36px] flex flex-col justify-end bg-slate-800/60 rounded-t-lg overflow-hidden h-[150px] relative border border-slate-700/60 shadow-inner">
                    {/* Overtime Portion (Amber) */}
                    {otH > 0 && (
                      <div
                        style={{ height: `${otHeightPercent}%` }}
                        className="w-full bg-gradient-to-t from-amber-500 to-amber-400 flex items-center justify-center transition-all group-hover:brightness-110"
                        title={`${otH}h ${t.overtimeHours}`}
                      >
                        <span className="text-[9px] font-black text-slate-950 font-mono">
                          +{otH}
                        </span>
                      </div>
                    )}

                    {/* Regular Portion (Emerald) */}
                    {regH > 0 && (
                      <div
                        style={{ height: `${regHeightPercent}%` }}
                        className="w-full bg-gradient-to-t from-emerald-600 to-emerald-500 flex items-center justify-center transition-all group-hover:brightness-110"
                        title={`${regH}h ${t.regularHours}`}
                      >
                        <span className="text-[9px] font-black text-white font-mono">
                          {regH}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Date / Day Label */}
                  <div className="text-center mt-2">
                    <span className="block text-[11px] font-bold text-slate-200 uppercase">
                      {t.formatDay(shift.dayName)}
                    </span>
                    <span className="block text-[9px] text-slate-400 font-mono">
                      {shift.date.slice(5)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
