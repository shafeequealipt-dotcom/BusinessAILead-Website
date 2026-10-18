import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Globe, MapPin, Megaphone, TrendingUp, Sparkles, type LucideIcon } from 'lucide-react';

/*
  Two looks share one codebase. "refined" is the upgraded design (mega menu, flat icon tiles,
  proof chip, large-type footer). "classic" is the design as it shipped before, kept as the
  rollback. The choice is stored in the browser so a visitor, or the owner, stays on their pick.
*/
export type DesignMode = 'refined' | 'classic';
const STORAGE_KEY = 'bal-design';

interface DesignValue {
  mode: DesignMode;
  refined: boolean;
  setMode: (m: DesignMode) => void;
}

const DesignContext = createContext<DesignValue>({ mode: 'refined', refined: true, setMode: () => {} });
export const useDesign = () => useContext(DesignContext);

const readStored = (): DesignMode => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'classic' ? 'classic' : 'refined';
  } catch {
    return 'refined';
  }
};

export const DesignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<DesignMode>(readStored);

  useEffect(() => {
    document.documentElement.dataset.design = mode;
  }, [mode]);

  const setMode = useCallback((m: DesignMode) => {
    setModeState(m);
    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {
      /* storage blocked: the choice simply lasts for this visit */
    }
  }, []);

  return (
    <DesignContext.Provider value={{ mode, refined: mode === 'refined', setMode }}>
      {children}
    </DesignContext.Provider>
  );
};

/** Small segmented switch that lets anyone roll back to the classic design in one click. */
export const DesignToggle: React.FC = () => {
  const { mode, setMode } = useDesign();
  const opts: { id: DesignMode; label: string }[] = [
    { id: 'refined', label: 'Refined' },
    { id: 'classic', label: 'Classic' },
  ];
  return (
    <div
      role="group"
      aria-label="Design version"
      className="fixed z-30 left-3 bottom-4 flex items-center gap-1 p-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-[0_10px_24px_-10px_rgba(15,23,42,0.4)] text-[12px] font-semibold"
    >
      <span className="pl-2.5 pr-1 text-slate-500 hidden sm:inline">Design</span>
      {opts.map((o) => (
        <button
          key={o.id}
          id={`design-${o.id}`}
          onClick={() => setMode(o.id)}
          aria-pressed={mode === o.id}
          className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
            mode === o.id ? 'bg-slate-950 text-white' : 'text-slate-600 hover:text-slate-950'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
};

type Tone = 'emerald' | 'sky' | 'amber' | 'violet' | 'rose';
// [tile background, icon colour]
const TONES: Record<Tone, [string, string]> = {
  emerald: ['#e3f7ee', '#047857'],
  sky: ['#e3f0fd', '#1d5fb8'],
  amber: ['#fdf0d5', '#b45309'],
  violet: ['#eee8fd', '#5b32c0'],
  rose: ['#fde6ea', '#b3203f'],
};

/** A flat, softly tinted rounded tile around a lucide glyph. */
export const IconTile: React.FC<{ icon: LucideIcon; tone?: Tone; size?: number; className?: string }> = ({
  icon: Icon,
  tone = 'emerald',
  size = 48,
  className = '',
}) => {
  const [bg, fg] = TONES[tone];
  return (
    <span
      aria-hidden="true"
      className={`grid place-items-center shrink-0 rounded-[28%] ${className}`}
      style={{ width: size, height: size, background: bg, color: fg }}
    >
      <Icon style={{ width: size * 0.46, height: size * 0.46 }} strokeWidth={2} />
    </span>
  );
};

/** Flat tile in the refined design, the plain classic treatment otherwise. */
export const IconBadge: React.FC<{
  icon: LucideIcon;
  tone?: Tone;
  size?: number;
  classic?: React.ReactNode;
}> = ({ icon: Icon, tone, size = 48, classic }) => {
  const { refined } = useDesign();
  if (refined) return <IconTile icon={Icon} tone={tone} size={size} />;
  return <>{classic ?? <Icon className="w-5 h-5 text-emerald-600" aria-hidden="true" />}</>;
};

export const SERVICE_ICONS: { icon: LucideIcon; tone: Tone }[] = [
  { icon: MapPin, tone: 'emerald' },
  { icon: Globe, tone: 'sky' },
  { icon: Megaphone, tone: 'amber' },
  { icon: TrendingUp, tone: 'violet' },
];

export { Sparkles };
