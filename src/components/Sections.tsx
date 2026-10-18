import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Check, Minus, Star, ExternalLink, Plus, MessageCircle } from 'lucide-react';
import {
  AFTER, BEFORE, CASE_STUDY, CLIENTS, FAQ, INCLUDED, MONTHS, NOT_INCLUDED, PRICE, SERVICES,
  WHATSAPP_DISPLAY, waLink,
} from '../content';
import { IconBadge, SERVICE_ICONS, useDesign } from '../design';

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500 font-semibold">{children}</p>
);

const Section: React.FC<{ id: string; children: React.ReactNode; className?: string }> = ({ id, children, className = '' }) => (
  <section id={id} className={`w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-16 sm:py-24 scroll-mt-4 ${className}`}>
    {children}
  </section>
);

const Heading: React.FC<{ eyebrow: string; title: string; lede?: string }> = ({ eyebrow, title, lede }) => (
  <div className="max-w-2xl mb-10 sm:mb-12 space-y-3">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.08] text-slate-900">{title}</h2>
    {lede && <p className="text-base text-slate-600 leading-relaxed">{lede}</p>}
  </div>
);

/** Counts up once when it scrolls into view. The final value is the initial text, so no JS still reads right. */
const CountUp: React.FC<{ to: number; suffix?: string }> = ({ to, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(to);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let t0 = 0;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const k = Math.min(1, (ts - t0) / 1400);
      setVal(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    setVal(0);
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref} className="tabular-nums">{val}{val === to ? suffix : ''}</span>;
};

export const ResultsSection: React.FC = () => (
  <Section id="results">
    <div className="rounded-3xl bg-slate-950 text-white p-6 sm:p-10 lg:p-14 grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-start">
      <div className="space-y-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400 font-semibold">Tested on our own clinic first</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.08]">Before we sold it, we ran it on a real clinic in Varthur.</h2>
        <p className="text-slate-400 leading-relaxed">
          Dr. Nafia's Homoeopathic Medical Centre was close to invisible on Google. We rebuilt the website, fixed the Google profile and switched on the AI agents. These are the daily numbers before and after.
        </p>
        <p className="text-xs text-slate-500">Figures from the clinic's Google Business Profile insights and WhatsApp. Results vary by business, area and competition.</p>
      </div>
      <div className="grid gap-3">
        {CASE_STUDY.map((r) => (
          <div key={r.label} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto_auto] items-center gap-x-5 gap-y-1 p-5 rounded-2xl border border-white/10">
            <div>
              <p className="font-semibold">{r.label}</p>
              <p className="text-xs text-slate-400">{r.sub}</p>
            </div>
            <span className="hidden sm:block font-mono text-lg text-slate-500 line-through decoration-2">{r.before}</span>
            <span className="hidden sm:block text-slate-500" aria-hidden="true">→</span>
            <span className="font-['Outfit'] font-extrabold text-4xl sm:text-5xl text-amber-300 sm:min-w-[3.2ch] text-right">
              <CountUp to={r.after} suffix={r.suffix} />
            </span>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

export const ServicesSection: React.FC = () => {
  const { refined } = useDesign();
  return (
  <Section id="services" className="!pt-4">
    <Heading
      eyebrow="Before and after"
      title="The same month, two ways."
      lede="What a typical local business does on its own, and what changes once the plan is running."
    />
    <div className="grid md:grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200">
      <div className="bg-[#f3f6fa] p-7 sm:p-9">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate-500 font-bold">Doing it alone</h3>
        <ul className="mt-6 flex flex-col gap-4">
          {BEFORE.map((t) => (
            <li key={t} className="flex gap-3 text-[15px] text-slate-500">
              <Minus aria-hidden className="w-4 h-4 mt-1 shrink-0 text-slate-400" />
              <span className="line-through decoration-slate-400/50">{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-7 sm:p-9">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-emerald-700 font-bold">With Business AI Leads</h3>
        <ul className="mt-6 flex flex-col gap-4">
          {AFTER.map((t) => (
            <li key={t} className="flex gap-3 text-[15px] text-slate-900">
              <Check aria-hidden className="w-4 h-4 mt-1 shrink-0 text-emerald-600" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {SERVICES.map((s, i) => (
        <article key={s.title} className={`group bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_8px_24px_rgba(15,23,42,0.06)] ${refined ? 'hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(15,23,42,0.25)] transition duration-300' : ''}`}>
          {refined && (
            <div className="mb-5">
              <IconBadge icon={SERVICE_ICONS[i].icon} tone={SERVICE_ICONS[i].tone} size={52} />
            </div>
          )}
          <h3 className="text-lg font-bold text-slate-900 leading-snug">{s.title}</h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.text}</p>
        </article>
      ))}
    </div>
  </Section>
  );
};

export const ClientsSection: React.FC = () => (
  <Section id="clients" className="!pt-4">
    <Heading eyebrow="Our clients" title="Clinics that patients now find on Google." />
    <div className="grid md:grid-cols-2 gap-4 lg:gap-5">
      {CLIENTS.map((c) => (
        <article key={c.site} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_12px_36px_rgba(15,23,42,0.08)]">
          <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 border-b border-slate-100" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-200" /><span className="w-2.5 h-2.5 rounded-full bg-slate-200" /><span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
            <span className="ml-2 font-mono text-xs text-slate-500">{c.site}</span>
          </div>
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-start gap-4">
              <span className="w-12 h-12 rounded-2xl bg-slate-950 text-white font-bold grid place-items-center shrink-0">{c.initials}</span>
              <div>
                <h3 className="text-xl font-bold text-slate-900 leading-snug">{c.name}</h3>
                <p className="text-sm text-slate-500">{c.place} · {c.doctors}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-lg bg-amber-100 px-3 py-2 text-[13px] font-semibold text-slate-900">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {c.rating} on Google · {c.reviews} reviews
              </span>
              {c.work.map((w) => (
                <span key={w} className="rounded-lg bg-slate-100 px-3 py-2 text-[13px] font-semibold text-slate-700">{w}</span>
              ))}
            </div>
            <a href={`https://${c.site}`} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900 hover:underline underline-offset-4">
              Visit {c.site} <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </article>
      ))}
    </div>
  </Section>
);

export const PricingSection: React.FC<{ onPlanClick: () => void }> = ({ onPlanClick }) => (
  <Section id="pricing" className="!pt-4">
    <Heading eyebrow="Pricing" title="One plan. Clear about what's in and what's not." />

    <ol className="grid md:grid-cols-3 border-t-[3px] border-slate-900 mb-14">
      {MONTHS.map((m) => (
        <li key={m.tag} className="pt-6 pr-6 pb-4 space-y-2 relative">
          <span className="absolute -top-[10px] left-0 w-[17px] h-[17px] rounded-full bg-amber-300 border-[3px] border-slate-900" aria-hidden="true" />
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-emerald-700 font-bold">{m.tag}</p>
          <h3 className="text-xl font-bold text-slate-900">{m.title}</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{m.text}</p>
        </li>
      ))}
    </ol>

    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-4 lg:gap-5">
      <div className="rounded-3xl bg-slate-950 text-white p-8 sm:p-10 flex flex-col gap-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400 font-semibold">Local Growth Plan · 3 months</p>
        <div>
          <p className="font-['Outfit'] font-extrabold text-5xl sm:text-6xl tracking-tight tabular-nums">{PRICE.setup}</p>
          <p className="text-sm text-slate-400 mt-1">one-time setup, {PRICE.gstNote}</p>
        </div>
        <p className="flex items-baseline gap-3 pt-5 border-t border-white/15">
          <span className="font-['Outfit'] font-extrabold text-3xl text-amber-300 tabular-nums">+ {PRICE.monthly}</span>
          <span className="text-slate-300">/ month for AI and servers</span>
        </p>
        <ul className="space-y-2 text-sm text-slate-200">
          <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />Stop whenever you want. No lock-in, no penalty.</li>
          <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />Your Google profile, domain and ad account stay in your name.</li>
          <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />Free local ranking report before you decide.</li>
        </ul>
        <motion.button
          onClick={onPlanClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="self-start px-6 py-3 rounded-full bg-white text-slate-950 text-sm font-bold cursor-pointer"
        >
          See the full scope
        </motion.button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="font-bold text-slate-900 mb-3">Included</h3>
          <ul className="space-y-2.5 text-sm text-slate-800">
            {INCLUDED.map((t) => <li key={t} className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />{t}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="font-bold text-slate-900 mb-3">Not included</h3>
          <ul className="space-y-2.5 text-sm text-slate-600">
            {NOT_INCLUDED.map((t) => <li key={t} className="flex gap-2"><Minus className="w-4 h-4 mt-0.5 text-rose-400 shrink-0" />{t}</li>)}
          </ul>
        </div>
        <div className="sm:col-span-2 rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="font-bold text-slate-900 mb-2">What we need from you</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Manager access to your Google profile and Meta business account, your photos, prices and offers, and quick replies when customers message you. The {PRICE.monthly} monthly fee keeps the AI running. If it stays unpaid after a short grace period, the automations pause until you pay. Google allows AI automation only on profiles verified for 60+ days; newer profiles are optimised by hand until then.
          </p>
        </div>
      </div>
    </div>
  </Section>
);

export const FaqSection: React.FC = () => {
  const [open, setOpen] = useState(0);
  return (
    <Section id="faq" className="!pt-4">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14">
        <Heading eyebrow="FAQ" title="Questions owners ask us." lede={`Something else on your mind? Message ${WHATSAPP_DISPLAY} on WhatsApp.`} />
        <div className="space-y-2.5">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="bg-white rounded-xl border border-slate-200">
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-bold text-slate-900 cursor-pointer"
                  >
                    {f.q}
                    <Plus className={`w-5 h-5 shrink-0 text-slate-500 transition-transform ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                </h3>
                {isOpen && (
                  <p id={`faq-${i}`} className="px-5 pb-5 text-sm text-slate-600 leading-relaxed max-w-[62ch]">{f.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export const ReportCta: React.FC = () => (
  <Section id="report" className="!pt-4">
    <div className="rounded-3xl bg-amber-300 text-[#1b1606] p-8 sm:p-12 lg:p-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
      <div className="space-y-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] font-semibold opacity-70">Free · within 24 hours</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05]">See where you rank before you spend a rupee.</h2>
        <p className="text-lg max-w-[52ch]">
          WhatsApp <code className="font-mono bg-[#1b1606] text-amber-300 px-2.5 py-0.5 rounded-md">GROW</code> to {WHATSAPP_DISPLAY} with your business name. We send a local ranking report built from real Google data.
        </p>
        <ul className="font-semibold list-disc pl-5 space-y-1">
          <li>A ranking map of your area</li>
          <li>Your top 3 competitors</li>
          <li>3 things they do that you don't</li>
        </ul>
        <a
          href={waLink('GROW')}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25d366] text-white font-bold shadow-lg hover:brightness-95 transition"
        >
          <MessageCircle className="w-5 h-5" /> Send “GROW” on WhatsApp
        </a>
      </div>
      <HeatMap />
    </div>
  </Section>
);

// Example ranks: worse with distance from the business at the centre.
const RANKS = [9,6,5,4,6,11,20,6,3,2,2,3,7,14,4,2,1,1,2,5,12,4,2,1,1,2,4,9,5,3,2,2,3,6,13,8,6,4,3,5,9,20,14,10,8,7,9,15,20];
const heat = (r: number) => (r <= 3 ? '#1fa855' : r <= 6 ? '#8cc63f' : r <= 10 ? '#ffcd3c' : r <= 15 ? '#f59a3c' : '#e2553f');

const HeatMap: React.FC = () => (
  <div className="bg-[#fffdf4] rounded-2xl p-4 sm:p-5 shadow-[0_20px_40px_-26px_rgba(0,0,0,0.5)]" role="img" aria-label="Example ranking map from a sample report">
    <div className="flex justify-between items-center gap-2 mb-3 font-mono text-[11px] font-bold uppercase tracking-wider text-[#5b5333]">
      <span>“clinic near me” · rank by location</span>
      <em className="not-italic bg-[#1b1606] text-amber-300 px-2 py-1 rounded">Example</em>
    </div>
    <div className="grid grid-cols-7 gap-1.5">
      {RANKS.map((r, i) => (
        <span
          key={i}
          className="aspect-square rounded-full grid place-items-center font-mono text-[11px] sm:text-xs font-bold"
          style={{ background: heat(r), color: r > 6 && r <= 10 ? '#1b1606' : '#fff' }}
        >
          {r >= 20 ? '20+' : r}
        </span>
      ))}
    </div>
    <div className="flex justify-between mt-3 font-mono text-[11px] text-[#5b5333]">
      <span>● 1–3 found first</span><span>● 20+ not found</span>
    </div>
  </div>
);

const ClassicFooter: React.FC = () => (
  <footer className="w-full bg-slate-950 text-slate-400 mt-8">
    <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] text-sm">
      <div className="space-y-3">
        <p className="font-bold text-lg text-white">Business AI Leads</p>
        <p className="max-w-[36ch]">AI-powered local growth for clinics, salons, laundries, restaurants and shops across India.</p>
      </div>
      <div className="space-y-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white font-bold mb-3">Contact</p>
        <p>WhatsApp: <a className="text-white hover:underline" href={waLink('Hi')} target="_blank" rel="noopener">{WHATSAPP_DISPLAY}</a></p>
        <p>businessaileads.in</p>
      </div>
      <div className="space-y-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white font-bold mb-3">Explore</p>
        {[['#services', 'What we do'], ['#pricing', 'Pricing'], ['#report', 'Free ranking report'], ['#faq', 'FAQ']].map(([h, t]) => (
          <p key={h}><a className="text-white hover:underline" href={h}>{t}</a></p>
        ))}
      </div>
    </div>
    <div className="border-t border-white/10 max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-6 text-xs flex flex-wrap justify-between gap-3">
      <span>© 2026 Business AI Leads</span>
      <span>Google and Meta are trademarks of their owners. Rankings depend on Google and can't be guaranteed.</span>
    </div>
  </footer>
);

/* Refined footer: a closing call-to-action band, link columns, and an oversized faded wordmark. */
const RefinedFooter: React.FC = () => (
  <footer className="w-full bg-slate-950 text-slate-400 mt-8 overflow-hidden">
    <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 pt-16 sm:pt-20">
      <div className="rounded-3xl bg-white/[0.04] border border-white/10 p-7 sm:p-10 grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-emerald-300 font-bold">Ready when you are</p>
          <p className="mt-2 font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-[1.08]">
            Your next customer is searching right now.
          </p>
        </div>
        <a
          href={waLink('GROW')}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#25d366] text-white font-bold shadow-[0_14px_30px_-12px_rgba(37,211,102,0.8)] hover:brightness-95 transition"
        >
          <MessageCircle className="w-5 h-5" /> Get my free report
        </a>
      </div>

      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] text-sm py-14">
        <div className="space-y-3">
          <p className="font-bold text-lg text-white">Business AI Leads</p>
          <p className="max-w-[36ch]">AI-powered local growth for clinics, salons, laundries, restaurants and shops across India.</p>
        </div>
        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white font-bold mb-3">Contact</p>
          <p>WhatsApp: <a className="text-white hover:underline" href={waLink('Hi')} target="_blank" rel="noopener">{WHATSAPP_DISPLAY}</a></p>
          <p>businessaileads.in</p>
        </div>
        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white font-bold mb-3">Explore</p>
          {[['#services', 'What we do'], ['#clients', 'Clients'], ['#pricing', 'Pricing'], ['#faq', 'FAQ']].map(([h, l]) => (
            <p key={h}><a className="text-white hover:underline" href={h}>{l}</a></p>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-xs flex flex-wrap justify-between gap-3">
        <span>© 2026 Business AI Leads</span>
        <span>Google and Meta are trademarks of their owners. Rankings depend on Google and can't be guaranteed.</span>
      </div>
    </div>

    <div aria-hidden="true" className="wordmark-fade select-none text-center font-['Montserrat'] font-black uppercase leading-[0.8] tracking-[-0.04em] text-white/[0.07] text-[8.6vw] whitespace-nowrap -mb-[1.2vw]">
      Business AI Leads
    </div>
  </footer>
);

export const Footer: React.FC = () => {
  const { refined } = useDesign();
  return refined ? <RefinedFooter /> : <ClassicFooter />;
};
