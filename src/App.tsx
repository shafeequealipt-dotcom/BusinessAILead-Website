import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroScene } from './components/HeroScene';
import { HeroCardsBanner } from './components/HeroCardsBanner';
import { InteractiveModals } from './components/InteractiveModals';
import {
  ClientsSection, FaqSection, Footer, PricingSection, ReportCta, ResultsSection, ServicesSection,
} from './components/Sections';
import { ModalId, waLink } from './content';
import { MessageCircle } from 'lucide-react';
import { DesignProvider, DesignToggle } from './design';

function AppBody() {
  const [activeNav, setActiveNav] = useState('');
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);

  return (
    <div id="top" className="min-h-screen bg-[#eaf1f7] flex flex-col items-center justify-start selection:bg-emerald-500 selection:text-white">
      {/* Navbar in its own row, hero frame cleanly below it */}
      <header className="w-full max-w-[1440px] px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 flex flex-col gap-3 sm:gap-4">
        <Navbar
          activeNav={activeNav}
          onNavClick={setActiveNav}
          onGetStartedClick={() => setActiveModal('get-started')}
        />
        <div
          id="header-16-9-frame"
          className="relative w-full aspect-[16/9] min-h-[500px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-[580px] max-h-[720px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-black"
        >
          <HeroScene />
        </div>
      </header>

      <HeroCardsBanner
        onPlanClick={() => setActiveModal('plan')}
        onServicesClick={() => setActiveModal('services')}
        onResultsClick={() => setActiveModal('results')}
      />

      <main className="w-full">
        <ResultsSection />
        <ServicesSection />
        <ClientsSection />
        <PricingSection onPlanClick={() => setActiveModal('plan')} />
        <FaqSection />
        <ReportCta />
      </main>

      <Footer />

      <a
        href={waLink('GROW')}
        target="_blank"
        rel="noopener"
        aria-label="Chat with us on WhatsApp"
        className="fixed z-30 right-4 bottom-4 w-14 h-14 rounded-full bg-[#25d366] text-white grid place-items-center shadow-[0_12px_26px_-10px_rgba(0,0,0,0.5)] hover:brightness-95 transition"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      <InteractiveModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}

export default function App() {
  return (
    <DesignProvider>
      <AppBody />
      <DesignToggle />
    </DesignProvider>
  );
}
