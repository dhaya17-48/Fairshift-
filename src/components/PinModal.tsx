import React, { useState } from 'react';
import { Lock, KeyRound, AlertCircle, X, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PinModal: React.FC<PinModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pin || pin.length < 4) {
      setError('Please enter a 4-digit PIN');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const authorized = await api.verifyAdminPin(pin);
      if (authorized) {
        onSuccess();
      } else {
        setError('Incorrect PIN. Please check the ADMIN_PIN secret.');
        setPin('');
      }
    } catch {
      setError('Verification service unavailable');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyClick = (val: string) => {
    if (val === 'clear') {
      setPin('');
      setError(null);
    } else if (val === 'backspace') {
      setPin((prev) => prev.slice(0, -1));
      setError(null);
    } else if (pin.length < 8) {
      setPin((prev) => prev + val);
      setError(null);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pin-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-2xl p-6 shadow-2xl relative text-slate-100">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close PIN modal"
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg focus-visible:ring-2 focus-visible:ring-amber-400 outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Lock className="w-6 h-6" />
          </div>
          <h2 id="pin-modal-title" className="text-xl font-black text-white">
            Admin Authentication
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Protected management view for site coordinators &amp; safety officers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-pin-input" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Enter Admin Security PIN
            </label>
            <div className="relative">
              <input
                id="admin-pin-input"
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={8}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(null);
                }}
                placeholder="••••"
                autoFocus
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-center text-2xl tracking-[0.5em] font-mono font-bold text-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400 outline-none"
                aria-describedby={error ? 'pin-error' : undefined}
              />
              <KeyRound className="absolute right-3.5 top-3.5 w-5 h-5 text-slate-500 pointer-events-none" />
            </div>
            {error && (
              <p id="pin-error" role="alert" className="text-xs text-rose-400 mt-2 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>

          {/* Quick Keypad for Mobile Touch Ease */}
          <div className="grid grid-cols-3 gap-2 pt-1" aria-label="PIN Keypad">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => {
                  if (k === 'C') handleKeyClick('clear');
                  else if (k === '⌫') handleKeyClick('backspace');
                  else handleKeyClick(k);
                }}
                className={`py-3 text-lg font-bold rounded-xl transition-all active:scale-95 border focus-visible:ring-2 focus-visible:ring-amber-400 outline-none ${
                  k === 'C' || k === '⌫'
                    ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                    : 'bg-slate-800/80 border-slate-700 text-slate-100 hover:bg-slate-700 hover:text-amber-400'
                }`}
                aria-label={k === 'C' ? 'Clear PIN' : k === '⌫' ? 'Backspace' : `Digit ${k}`}
              >
                {k}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || pin.length < 4}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black rounded-xl transition-all shadow-lg shadow-amber-500/20 text-sm flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-400 outline-none cursor-pointer disabled:cursor-not-allowed"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Unlock Admin Dashboard'}</span>
            </button>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 text-center">
            Default test PIN is <span className="font-mono font-bold text-amber-400">2026</span> (configured in Secrets / <code className="text-slate-300">ADMIN_PIN</code>).
          </div>
        </form>
      </div>
    </div>
  );
};
