import React, { useState } from 'react';
import { Pause, Play, Phone, MessageCircle, Search, Star, MapPin, Sparkles, CalendarCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useDesign } from '../design';

// Competitor pins scattered around the map, as [left%, top%].
const OTHER_PINS: [number, number][] = [
  [12, 22], [24, 58], [33, 16], [64, 12], [86, 20], [90, 54], [8, 70], [70, 62],
];

/*
  The Visor layout puts a looping video in this frame. This version draws the scene in code
  instead: a night map of the client's area, the oversized headline, and a Google result card
  in front of the headline, the way the model's head covers the type in the original.
*/
export const HeroScene: React.FC = () => {
  const [paused, setPaused] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const { refined } = useDesign();

  return (
    <div className={`relative w-full h-full overflow-hidden select-none bg-[#0b1220] ${paused ? 'paused' : ''}`}>
      {/* LAYER 1: map ground */}
      <div className="absolute inset-0 map-roads" aria-hidden="true" />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 38%, rgba(16,185,129,0.14), transparent 70%), linear-gradient(180deg, transparent 55%, rgba(2,6,23,0.85))' }}
      />
      {OTHER_PINS.map(([x, y]) => (
        <MapPin
          key={`${x}-${y}`}
          aria-hidden="true"
          className="absolute w-5 h-5 sm:w-6 sm:h-6 text-slate-500/70 -translate-x-1/2 -translate-y-full"
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      ))}

      {refined && <div className="absolute inset-0 hero-glow" aria-hidden="true" />}

      {/* Proof chip, top-right (refined design) */}
      {refined && (
        <div className="absolute top-4 right-4 z-30 hidden sm:flex items-center gap-2.5 pl-1.5 pr-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
          <span className="flex -space-x-2" aria-hidden="true">
            {['DN', 'DT'].map((t) => (
              <span key={t} className="w-6 h-6 rounded-full bg-white text-slate-900 text-[9px] font-bold grid place-items-center border-2 border-slate-900/40">{t}</span>
            ))}
          </span>
          <span className="text-[11px] sm:text-xs font-semibold leading-none">
            <span className="text-amber-300">★ 4.9–5.0</span> · 313+ Google reviews
          </span>
        </div>
      )}

      {/* Area chip, top-left */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-semibold text-white/90">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        People searching within 5 km
      </div>

      {/* LAYER 2: oversized headline */}
      <div className="absolute inset-x-0 bottom-[17%] sm:bottom-[6%] z-10 flex justify-center pointer-events-none px-4">
        <h1
          id="hero-main-title"
          className="font-['Montserrat','Outfit',sans-serif] font-black uppercase tracking-[-0.035em] text-white leading-none text-[9.4vw] lg:text-[8.6vw] xl:text-[122px] whitespace-nowrap drop-shadow-[0_6px_30px_rgba(0,0,0,0.5)]"
        >
          Get Found First
        </h1>
      </div>

      {/* LAYER 3: the Google result card in front of the headline */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 -translate-x-1/2 top-[11%] sm:top-[12%] bottom-[31%] sm:bottom-[17%] z-20 w-[58%] sm:w-[40%] lg:w-[33%] max-w-[420px] flex flex-col"
        role="img"
        aria-label="Illustration: a clinic shown first in a Google Maps search, with call and WhatsApp buttons"
      >
        <div className="h-full rounded-2xl sm:rounded-3xl bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 overflow-hidden">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 sm:py-2 text-[11px] sm:text-sm text-slate-800">
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 shrink-0" />
            <span className="truncate">homeopathy clinic near me</span>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-emerald-50 ring-2 ring-emerald-400 p-2.5 sm:p-3.5 flex items-start gap-2.5">
            <span className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 rounded-full bg-emerald-500 text-white grid place-items-center text-[11px] sm:text-xs font-bold">1</span>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-slate-900 text-[11px] sm:text-sm leading-tight">Dr. Nafia's Homoeopathic Medical Centre</p>
              <p className="mt-0.5 flex items-center gap-1 text-[10px] sm:text-xs text-slate-500">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> 4.9 · Varthur · Open now
              </p>
              <div className="mt-2 hidden sm:flex gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-800"><Phone className="w-3 h-3" /> Call</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#25d366] px-2.5 py-1 text-[11px] font-semibold text-white"><MessageCircle className="w-3 h-3" /> WhatsApp</span>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex flex-col gap-1.5 opacity-50">
            {['Another clinic nearby · 2.4 km', 'A third clinic · 3.1 km'].map((t, i) => (
              <div key={t} className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-slate-600">
                <span className="w-6 h-6 rounded-full bg-slate-100 grid place-items-center font-bold text-slate-500">{i + 2}</span>
                {t}
              </div>
            ))}
          </div>

          <div className="mt-auto flex items-end justify-between gap-2 rounded-xl sm:rounded-2xl bg-slate-950 text-white px-3 sm:px-4 py-2 sm:py-3">
            <div>
              <p className="text-[9px] sm:text-[11px] uppercase tracking-widest text-white/60 font-semibold">Calls a day</p>
              <p className="font-['Outfit'] font-extrabold text-lg sm:text-3xl leading-none mt-1">
                <span className="text-white/40 line-through decoration-2 text-sm sm:text-xl mr-2">0</span>45
              </p>
            </div>
            <CalendarCheck className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-400" aria-hidden="true" />
          </div>
        </div>
      </motion.div>

      {/* LAYER 4: the business pin, with a hover / tap detail card */}
      <button
        type="button"
        id="pin-hotspot"
        onMouseEnter={() => setPinOpen(true)}
        onMouseLeave={() => setPinOpen(false)}
        onFocus={() => setPinOpen(true)}
        onBlur={() => setPinOpen(false)}
        onClick={() => setPinOpen((o) => !o)}
        aria-expanded={pinOpen}
        aria-label="What the Google profile agent does"
        className="absolute z-30 left-[80%] top-[36%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 grid place-items-center rounded-full cursor-pointer"
      >
        <span className="ripple absolute left-1/2 top-1/2 w-40 h-40 rounded-full border-2 border-emerald-400/60" aria-hidden="true" />
        <span className="absolute w-6 h-6 rounded-full border border-white/70 animate-ping opacity-60" aria-hidden="true" />
        <span className="w-4 h-4 rounded-full border-2 border-white bg-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.9)]" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {pinOpen && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.94 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-40 right-[4%] top-[44%] sm:top-[45%] w-[200px] sm:w-[230px] p-3 sm:p-3.5 rounded-xl bg-white/[0.14] backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.37)] pointer-events-none"
            aria-live="polite"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest">Google profile agent</span>
            </div>
            <p className="text-[13px] font-bold text-white leading-snug mb-1.5">Keeps your listing active every week</p>
            <ul className="grid gap-1 pt-1.5 border-t border-white/20 text-[11px] text-white/90">
              <li className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-emerald-300" /> Weekly Google posts</li>
              <li className="flex items-center gap-1.5"><Star className="w-3 h-3 text-emerald-300" /> Reply drafts for reviews</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-emerald-300" /> Photos, hours, services</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LAYER 5: motion control, bottom-right */}
      <div className="absolute bottom-4 right-4 z-30">
        <button
          id="btn-toggle-motion"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Play animation' : 'Pause animation'}
          title={paused ? 'Play animation' : 'Pause animation'}
          className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 shadow-lg active:scale-90 transition-transform cursor-pointer"
        >
          {paused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
