import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsCounter } from './components/StatsCounter';
import { ProfileSection } from './components/ProfileSection';
import { ProgramExcellence } from './components/ProgramExcellence';
import { InformationSystem } from './components/InformationSystem';
import { PPDBPortal } from './components/PPDBPortal';
import { FacilitiesAndGallery } from './components/FacilitiesAndGallery';
import { ContactAndLocation } from './components/ContactAndLocation';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { MessageCircle, Sparkles, ArrowUp } from 'lucide-react';
import { SCHOOL_INFO } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Scroll listener for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppHelpdesk = () => {
    const text = encodeURIComponent(
      `Assalamu'alaikum Panitia PPDB MTs Nurul Huda Mendala, saya ingin berkonsultasi mengenai pendaftaran siswa baru.`
    );
    window.open(`https://wa.me/${SCHOOL_INFO.contact.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      
      {/* Sticky Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAdminModal={() => setIsAdminOpen(true)}
      />

      {/* Main Page Routing Views */}
      <main className="flex-1">
        {activeTab === 'beranda' && (
          <div>
            <HeroSection
              onRegisterClick={() => {
                setActiveTab('ppdb');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onCheckStatusClick={() => {
                setActiveTab('ppdb');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreClick={() => {
                setActiveTab('profil');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <StatsCounter />

            <div className="py-8"></div>

            <ProfileSection />

            <ProgramExcellence
              onRegisterClick={() => {
                setActiveTab('ppdb');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Preview of PPDB CTA in Home */}
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white py-16">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-3.5 py-1.5 rounded-full inline-block">
                  Penerimaan Siswa Baru T.A. 2026/2027
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  Bergabunglah Bersama MTs Nurul Huda Mendala
                </h2>
                <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                  Daftarkan putra-putri Anda sekarang juga secara online dari ponsel pintar Anda. Mudah, cepat, dan berkas tersimpan aman di cloud madrasah.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setActiveTab('ppdb');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-black text-sm rounded-xl shadow-lg transition transform active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Buka Formulir PPDB Online</span>
                  </button>
                  <button
                    onClick={handleWhatsAppHelpdesk}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold rounded-xl backdrop-blur-xs transition cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Konsultasi WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            <InformationSystem />

            <FacilitiesAndGallery />

            <ContactAndLocation />
          </div>
        )}

        {activeTab === 'profil' && (
          <div>
            <ProfileSection />
            <StatsCounter />
            <div className="py-10"></div>
            <FacilitiesAndGallery />
          </div>
        )}

        {activeTab === 'program' && (
          <div>
            <ProgramExcellence
              onRegisterClick={() => {
                setActiveTab('ppdb');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {activeTab === 'sistem-informasi' && (
          <div>
            <InformationSystem />
          </div>
        )}

        {activeTab === 'ppdb' && (
          <div>
            <PPDBPortal />
          </div>
        )}

        {activeTab === 'fasilitas' && (
          <div>
            <FacilitiesAndGallery />
          </div>
        )}

        {activeTab === 'kontak' && (
          <div>
            <ContactAndLocation />
          </div>
        )}
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5 items-end">
        
        {/* WhatsApp Helpdesk Floating Bubble */}
        <button
          onClick={handleWhatsAppHelpdesk}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 cursor-pointer"
          title="Hubungi Panitia PPDB via WhatsApp"
        >
          <MessageCircle className="w-5 h-5 text-amber-300" />
          <span className="hidden sm:inline">WhatsApp Panitia</span>
        </button>

        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-2.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full shadow-md backdrop-blur-xs transition transform active:scale-95 cursor-pointer"
            aria-label="Kembali ke atas"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Backoffice Panitia Admin Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        openAdminModal={() => setIsAdminOpen(true)}
      />

    </div>
  );
}
