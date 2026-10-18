import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, MapPin, Globe, Megaphone, MessageCircle } from 'lucide-react';
import { IconBadge } from '../design';
import { ModalId, PRICE, CASE_STUDY, INCLUDED, NOT_INCLUDED, waLink } from '../content';

interface InteractiveModalsProps {
  activeModal: ModalId | null;
  onClose: () => void;
}

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-xs uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
    {children}
  </span>
);

export const InteractiveModals: React.FC<InteractiveModalsProps> = ({ activeModal, onClose }) => {
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [area, setArea] = useState('');

  // Close on Escape.
  useEffect(() => {
    if (!activeModal) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeModal, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `GROW\nName: ${name}\nBusiness: ${business}\nArea: ${area}`;
    window.open(waLink(text), '_blank', 'noopener');
    onClose();
  };

  return (
    <AnimatePresence>
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Details"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 z-10"
          >
            <button
              id="modal-close-btn"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'plan' && (
              <div className="space-y-5">
                <div>
                  <Tag>Local Growth Plan · 3 months</Tag>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2">{PRICE.setup} setup, then {PRICE.monthly} a month</h3>
                  <p className="text-sm text-slate-500 mt-1">{PRICE.gstNote}. Stop anytime, no lock-in, no penalty.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <ul className="space-y-2">
                    {INCLUDED.map((t) => (
                      <li key={t} className="flex gap-2 text-slate-800"><Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />{t}</li>
                    ))}
                  </ul>
                  <ul className="space-y-2">
                    {NOT_INCLUDED.map((t) => (
                      <li key={t} className="flex gap-2 text-slate-500"><X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />{t}</li>
                    ))}
                  </ul>
                </div>
                <a
                  href={waLink('I want the Local Growth Plan')}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#25d366] text-white font-semibold hover:brightness-95 transition"
                >
                  <MessageCircle className="w-4 h-4" /> Talk to us on WhatsApp
                </a>
              </div>
            )}

            {activeModal === 'get-started' && (
              <div className="space-y-5">
                <div>
                  <Tag>Free · within 24 hours</Tag>
                  <h3 className="text-2xl font-bold text-slate-900 pt-2">Get your free ranking report</h3>
                  <p className="text-sm text-slate-600 mt-1">Tell us who you are. This opens WhatsApp with your details filled in, so you can send them to us.</p>
                </div>
                <form onSubmit={submit} className="space-y-4">
                  {[
                    { id: 'f-name', label: 'Your name', v: name, set: setName, ph: 'e.g. Priya' },
                    { id: 'f-biz', label: 'Business name', v: business, set: setBusiness, ph: 'e.g. Bloom Family Salon' },
                    { id: 'f-area', label: 'Area and city', v: area, set: setArea, ph: 'e.g. Whitefield, Bengaluru' },
                  ].map((f) => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="block text-xs font-semibold text-slate-700 uppercase mb-1">{f.label}</label>
                      <input
                        id={f.id}
                        type="text"
                        required
                        value={f.v}
                        onChange={(e) => f.set(e.target.value)}
                        placeholder={f.ph}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                      />
                    </div>
                  ))}
                  <button type="submit" className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors">
                    Continue on WhatsApp
                  </button>
                </form>
              </div>
            )}

            {activeModal === 'services' && (
              <div className="space-y-5">
                <div>
                  <Tag>What the plan covers</Tag>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2">One plan, three things that bring customers</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { Icon: MapPin, t: 'Google Business Profile + AI agent', d: 'Set up right, then a weekly post and review reply drafts.' },
                    { Icon: Globe, t: 'Website + AI agent', d: 'Fast mobile site with call and WhatsApp buttons.' },
                    { Icon: Megaphone, t: 'Meta Ads', d: 'Set up and run for your area. 2 creatives free.' },
                  ].map(({ Icon, t, d }) => (
                    <div key={t} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                      <IconBadge icon={Icon} tone={t === 'Meta Ads' ? 'amber' : t.startsWith('Website') ? 'sky' : 'emerald'} size={36} classic={<Icon className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />} />
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">{t}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500">Google allows AI automation only on profiles verified for 60+ days. Newer profiles are optimised by hand until then.</p>
              </div>
            )}

            {activeModal === 'results' && (
              <div className="space-y-5">
                <div>
                  <Tag>Dr. Nafia's clinic, Varthur</Tag>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2">What changed, per day</h3>
                  <p className="text-sm text-slate-500">Before and after the plan. Results vary by business, area and competition.</p>
                </div>
                <dl className="space-y-2">
                  {CASE_STUDY.map((r) => (
                    <div key={r.label} className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                      <dt className="text-sm font-semibold text-slate-900">{r.label}<span className="block text-xs font-normal text-slate-500">{r.sub}</span></dt>
                      <dd className="font-['Outfit'] text-xl font-extrabold text-slate-900 tabular-nums">
                        <span className="text-slate-400 line-through text-base mr-2">{r.before}</span>{r.after}{r.suffix}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
