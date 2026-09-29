import React, { useState } from 'react';
import { 
  GraduationCap, 
  Menu, 
  X, 
  Phone, 
  UserCheck, 
  FileText, 
  Building2, 
  BookOpen, 
  ShieldCheck, 
  Award,
  Sparkles
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/mockData';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAdminModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openAdminModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil Madrasah' },
    { id: 'program', label: 'Keunggulan' },
    { id: 'sistem-informasi', label: 'Sistem Informasi' },
    { id: 'ppdb', label: 'PPDB Online 2026' },
    { id: 'fasilitas', label: 'Fasilitas & Galeri' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Assalamu'alaikum Panitia PPDB MTs Nurul Huda Mendala, saya ingin bertanya mengenai informasi pendaftaran siswa baru.`
    );
    window.open(`https://wa.me/${SCHOOL_INFO.contact.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-100 transition-all">
      {/* Top Banner Alert / Info Bar */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-emerald-950 uppercase tracking-wide">
              PPDB 2026/2027
            </span>
            <span>Gelombang 1 Dibuka: Gratis Biaya Pendaftaran & Beasiswa Tahfidz</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-100 text-xs">
            <button 
              onClick={handleWhatsApp}
              className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>WA Panitia: {SCHOOL_INFO.contact.whatsappFormatted}</span>
            </button>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline font-mono">NPSN: {SCHOOL_INFO.npsn}</span>
            <span className="hidden md:inline">•</span>
            <button 
              onClick={openAdminModal}
              className="flex items-center gap-1 bg-emerald-900/60 hover:bg-emerald-900 px-2.5 py-0.5 rounded text-amber-300 font-medium transition cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Portal Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & School Identity */}
          <div 
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform duration-300 border-2 border-emerald-400/40">
              <GraduationCap className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-emerald-950 tracking-tight leading-none group-hover:text-emerald-700 transition">
                  MTs Nurul Huda
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-1.5 py-0.5 rounded">
                  Mendala
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1 hidden sm:block">
                Kec. Sirampog, Kab. Brebes • Terakreditasi A
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'text-emerald-800 bg-emerald-50 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('ppdb')}
              className="relative inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-emerald-600/25 hover:shadow-lg transition-all transform active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Daftar PPDB</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => handleNavClick('ppdb')}
              className="sm:hidden bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg"
            >
              PPDB
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-emerald-700 hover:bg-slate-100 focus:outline-none transition cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-emerald-100 shadow-xl px-4 pt-3 pb-6 animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-left text-sm font-semibold transition cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-emerald-50 text-emerald-800 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                )}
              </button>
            ))}

            <div className="pt-4 border-t border-slate-100 mt-2 space-y-2">
              <button
                onClick={() => handleNavClick('ppdb')}
                className="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md text-sm cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Pendaftaran Siswa Baru (PPDB)</span>
              </button>
              
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-1.5 py-2.5 border border-emerald-600 text-emerald-700 rounded-lg text-xs font-bold bg-emerald-50/50 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WA Panitia</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAdminModal();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-800 text-amber-300 rounded-lg text-xs font-bold cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Portal Panitia</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
