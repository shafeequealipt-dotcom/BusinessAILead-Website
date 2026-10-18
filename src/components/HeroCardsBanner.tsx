import React from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight, Globe, MapPin, Megaphone } from 'lucide-react';
import { PRICE, waLink } from '../content';
import { IconTile, SERVICE_ICONS, useDesign } from '../design';

interface HeroCardsBannerProps {
  onPlanClick: () => void;
  onServicesClick: () => void;
  onResultsClick: () => void;
}

export const HeroCardsBanner: React.FC<HeroCardsBannerProps> = ({
  onPlanClick,
  onServicesClick,
  onResultsClick,
}) => {
  const { refined } = useDesign();
  return (
    <div
      id="floating-cards-section"
      className="relative z-30 w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 -mt-12 sm:-mt-14 lg:-mt-16"
    >
      {/* Floating price pill centred over the middle card */}
      <div className="relative flex justify-center z-40 mb-[-18px] sm:mb-[-20px]">
        <motion.button
          id="btn-plan-pill"
          onClick={onPlanClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#0a0c10] text-white text-xs sm:text-sm tracking-wide shadow-[0_10px_25px_rgba(0,0,0,0.45)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.6)] transition-shadow cursor-pointer border border-slate-700/80"
        >
          <span className="font-semibold">See the Plan {PRICE.setup}</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 items-stretch w-full">
        {/* LEFT: what the plan covers */}
        <motion.div
          id="card-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 shadow-[0_12px_36px_rgba(15,23,42,0.12)] border border-white/80 hover:shadow-[0_16px_44px_rgba(15,23,42,0.18)] transition-shadow duration-300 flex flex-col justify-between group min-h-[220px] lg:min-h-[250px]"
        >
          {refined ? (
            <div className="flex items-center gap-2.5" aria-hidden="true">
              {SERVICE_ICONS.slice(0, 3).map(({ icon, tone }) => (
                <IconTile key={tone} icon={icon} tone={tone} size={44} />
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2.5" aria-hidden="true">
            {[Globe, MapPin, Megaphone].map((Icon, i) => (
              <span key={i} className="w-9 h-9 rounded-full border-[1.5px] border-slate-800 bg-slate-50 grid place-items-center group-hover:scale-105 transition-transform">
                <Icon className="w-4 h-4 text-slate-900" />
              </span>
            ))}
            </div>
          )}

          <h3 className="my-3 text-lg sm:text-[19px] lg:text-[20px] font-medium leading-[1.32] text-slate-900 tracking-tight">
            Your Website, Google Profile And Meta Ads,{' '}
            <span className="font-semibold">Run By AI In One Plan.</span>
          </h3>

          <button
            id="btn-services"
            onClick={onServicesClick}
            className="self-start inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-slate-900 underline underline-offset-4 decoration-slate-900/80 hover:text-emerald-800 hover:decoration-emerald-800 transition-colors cursor-pointer group/link"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
          </button>
        </motion.div>

        {/* CENTRE: headline card */}
        <motion.div
          id="card-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 shadow-[0_14px_40px_rgba(15,23,42,0.15)] border border-slate-100 hover:shadow-[0_18px_48px_rgba(15,23,42,0.2)] transition-shadow duration-300 flex flex-col items-center justify-center text-center min-h-[220px] lg:min-h-[250px]"
        >
          <div className="space-y-3 max-w-sm mx-auto">
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-slate-900 tracking-tight leading-[1.2]">
              More Calls From People
              <br />
              Searching Near You
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-[320px] mx-auto">
              We set it up, AI keeps it running every week, and you get a free local ranking report on WhatsApp within 24 hours.
            </p>
            <a
              id="btn-free-report"
              href={waLink('GROW')}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 mt-1 px-5 py-2.5 rounded-full bg-[#25d366] text-white text-[13px] font-bold hover:brightness-95 transition"
            >
              WhatsApp “GROW” for the free report
            </a>
          </div>
        </motion.div>

        {/* RIGHT: ratings across both clients */}
        <motion.div
          id="card-right"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 shadow-[0_12px_36px_rgba(15,23,42,0.12)] border border-white/80 hover:shadow-[0_16px_44px_rgba(15,23,42,0.18)] transition-shadow duration-300 flex flex-col justify-between group min-h-[220px] lg:min-h-[250px]"
        >
          <div className="flex items-center gap-1.5">
            <Star className="w-[18px] h-[18px] text-amber-400 fill-amber-400" aria-hidden="true" />
            <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight">4.9 – 5.0</span>
            <span className="text-xs text-slate-500">on Google</span>
          </div>

          <button
            id="hero-reviews-cluster"
            onClick={onResultsClick}
            className="flex items-center gap-3 py-1 text-left cursor-pointer"
            aria-label="See client results"
          >
            <span className="flex -space-x-2.5 items-center" aria-hidden="true">
              {['DN', 'DT'].map((t) => (
                <span key={t} className="w-9 h-9 rounded-full bg-slate-900 text-white text-[11px] font-bold grid place-items-center border-2 border-white ring-1 ring-slate-200">{t}</span>
              ))}
            </span>
            <span className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">313+</span>
              <span className="text-xs text-slate-500">Google reviews, 2 clinics</span>
            </span>
          </button>

          <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
            Dr. Nafia’s clinic in Varthur and Dr. Talal’s clinic in Kochi both run on this plan.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
