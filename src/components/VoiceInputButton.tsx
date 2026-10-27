import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../utils/translations';

interface VoiceInputButtonProps {
  currentLang: LanguageCode;
  onTranscript: (text: string) => void;
  label: string;
  stopLabel: string;
}

// Extend Window interface for Web Speech API SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({
  currentLang,
  onTranscript,
  label,
  stopLabel,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const toggleListening = () => {
    setErrorMessage(null);

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setErrorMessage(t.voiceNotSupported);
      return;
    }

    try {
      const recognition = new SpeechRecognitionAPI();
      recognitionRef.current = recognition;

      const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang);
      recognition.lang = langObj ? langObj.bcp47 : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          onTranscript(transcript.trim());
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'not-allowed') {
          setErrorMessage(t.voiceMicBlocked);
        } else if (event.error !== 'no-speech') {
          setErrorMessage(t.voiceInitError);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
      setErrorMessage(t.voiceInitError);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <button
        type="button"
        onClick={toggleListening}
        className={`w-full py-4 px-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 text-base sm:text-lg shadow-md border focus-visible:ring-2 focus-visible:ring-amber-400 outline-none cursor-pointer ${
          isListening
            ? 'bg-rose-600 text-white border-rose-400 animate-pulse'
            : 'bg-slate-800 hover:bg-slate-700/90 text-amber-300 border-amber-500/40 hover:border-amber-400'
        }`}
        aria-pressed={isListening}
        aria-label={isListening ? stopLabel : label}
      >
        {isListening ? (
          <>
            <MicOff className="w-6 h-6 text-white" aria-hidden="true" />
            <span>{stopLabel}</span>
          </>
        ) : (
          <>
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Mic className="w-5 h-5 text-amber-400" aria-hidden="true" />
            </div>
            <span>{label}</span>
          </>
        )}
      </button>

      {isListening && (
        <div role="status" className="text-center text-xs text-rose-300 font-semibold animate-pulse flex items-center justify-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500 inline-block animate-ping"></span>
          <span>{t.voiceNoteListening}</span>
        </div>
      )}

      {errorMessage && (
        <p role="alert" className="text-xs text-amber-300 bg-amber-950/50 border border-amber-800/60 p-2 rounded-lg flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400" />
          <span>{errorMessage}</span>
        </p>
      )}

      {!isSupported && !errorMessage && (
        <p className="text-[11px] text-slate-400 text-center">
          {t.voiceFallbackNote}
        </p>
      )}
    </div>
  );
};
