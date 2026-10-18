import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, ChevronDown, MessageCircle } from 'lucide-react';
import { NAV_ITEMS, SERVICES, waLink } from '../content';
import { IconBadge, SERVICE_ICONS, useDesign } from '../design';

interface NavbarProps {
  onGetStartedClick: () => void;
  onNavClick: (item: string) => void;
  activeNav: string;
}

// Navbar sits in its own row above the hero frame, never over it.
export const Navbar: React.FC<NavbarProps> = ({ onGetStartedClick, onNavClick, activeNav }) => {
  const { refined } = useDesign();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLLIElement>(null);

  // Close the mega menu on Escape, on an outside click, and when the design is rolled back.
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMegaOpen(false);
    const onDown = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onDown);
    };
  }, [megaOpen]);

  useEffect(() => {
    if (!refined) setMegaOpen(false);
  }, [refined]);

  const linkClass = (isActive: boolean) =>
    `relative text-sm font-medium py-1 transition-colors duration-200 ${
      isActive ? 'text-slate-950 font-semibold' : 'text-slate-700 hover:text-slate-950'
    }`;

  return (
    <nav aria-label="Main" className="relative z-40 w-full px-2 sm:px-4 py-2 sm:py-3">
      <div className="w-full flex items-center justify-between gap-4">
        <a
          href="#top"
          id="nav-logo"
          className="flex items-center gap-2 text-slate-800 hover:text-slate-950 group"
          onClick={() => onNavClick('')}
        >
          <span className="relative w-5 h-5 flex items-center justify-center" aria-hidden="true">
            <span className="w-4.5 h-4.5 border-[1.75px] border-slate-800 rounded-[3px] group-hover:scale-105 transition-transform" />
            <span className="absolute w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </span>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-800">
            Business AI Leads
          </span>
        </a>

        <ul id="desktop-nav-links" className="hidden md:flex items-center gap-7 lg:gap-10 list-none m-0 p-0">
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.label;
            const isMega = refined && item.id === 'services';

            if (isMega) {
              return (
                <li
                  key={item.id}
                  ref={megaRef}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                >
                  <button
                    id="nav-link-services"
                    type="button"
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    aria-controls="mega-menu"
                    onClick={() => setMegaOpen((o) => !o)}
                    className={`${linkClass(isActive || megaOpen)} inline-flex items-center gap-1 cursor-pointer`}
                  >
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        id="mega-menu"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50"
                      >
                        <div className="w-[min(880px,88vw)] grid grid-cols-[1.35fr_1fr] gap-2 p-2 rounded-3xl bg-white border border-slate-200 shadow-[0_30px_70px_-20px_rgba(15,23,42,0.35)]">
                          <ul className="grid grid-cols-2 gap-1 p-2 list-none m-0">
                            {SERVICES.map((s, i) => (
                              <li key={s.title}>
                                <a
                                  href="#services"
                                  onClick={() => {
                                    onNavClick(item.label);
                                    setMegaOpen(false);
                                  }}
                                  className="group flex gap-3 p-3 rounded-2xl hover:bg-slate-50 focus-visible:bg-slate-50"
                                >
                                  <IconBadge icon={SERVICE_ICONS[i].icon} tone={SERVICE_ICONS[i].tone} size={40} />
                                  <span className="min-w-0">
                                    <span className="block text-[13px] font-bold text-slate-900 leading-snug">{s.title}</span>
                                    <span className="block mt-0.5 text-xs text-slate-500 leading-snug line-clamp-2">{s.text}</span>
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>

                          <div className="rounded-2xl bg-slate-950 text-white p-5 flex flex-col justify-between gap-5">
                            <div>
                              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-300 font-bold">Free · 24 hours</p>
                              <p className="mt-2 font-['Outfit'] text-xl font-extrabold leading-tight">See where you rank before you spend a rupee.</p>
                              <p className="mt-2 text-xs text-slate-400 leading-relaxed">A ranking map of your area and your top 3 competitors, on WhatsApp.</p>
                            </div>
                            <a
                              href={waLink('GROW')}
                              target="_blank"
                              rel="noopener"
                              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#25d366] text-white text-[13px] font-bold hover:brightness-95 transition"
                            >
                              <MessageCircle className="w-4 h-4" /> Send “GROW”
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            }

            return (
              <li key={item.id}>
                <a
                  id={`nav-link-${item.id}`}
                  href={item.href}
                  onClick={() => onNavClick(item.label)}
                  aria-current={isActive ? 'true' : undefined}
                  className={linkClass(isActive)}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-slate-900 rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center">
          <motion.button
            id="btn-get-started-nav"
            onClick={onGetStartedClick}
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="group px-6 py-2.5 rounded-full bg-slate-950 hover:bg-black text-white text-sm font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-shadow cursor-pointer flex items-center gap-1"
          >
            Get Started
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>

        <div className="flex md:hidden items-center">
          <button
            id="btn-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="p-2 rounded-lg bg-white/60 text-slate-800 backdrop-blur-md border border-slate-300 hover:bg-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="md:hidden absolute left-2 right-2 mt-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 p-5 shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  href={item.href}
                  onClick={() => {
                    onNavClick(item.label);
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-2.5 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 font-medium text-base transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-200">
                <button
                  id="btn-get-started-mobile"
                  onClick={() => {
                    onGetStartedClick();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-full bg-slate-900 text-white font-semibold text-sm shadow-md hover:bg-black active:scale-95 transition-all"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
