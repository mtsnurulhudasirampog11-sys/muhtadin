import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  Heart, 
  ExternalLink, 
  ShieldCheck,
  Award
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/mockData';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openAdminModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, openAdminModal }) => {
  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Main Footer Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Madrasah Profile (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-amber-300 shadow-md">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg sm:text-xl tracking-tight">
                  {SCHOOL_INFO.name}
                </h3>
                <p className="text-xs text-emerald-400 font-medium">
                  {SCHOOL_INFO.foundation}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Madrasah Tsanawiyah bernuansa pesantren dan berwawasan teknologi di Desa Mendala, Kecamatan Sirampog, Kabupaten Brebes. Berkomitmen mendidik generasi penerus yang sholeh, cerdas, mandiri, dan berakhlak mulia.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Terakreditasi A (Unggul)</span>
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono text-slate-300 bg-slate-800 border border-slate-700">
                NPSN: {SCHOOL_INFO.npsn}
              </span>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => handleNav('beranda')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Beranda Utama
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('profil')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Profil & Visi Misi
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('program')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Program Unggulan & Tahfidz
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('sistem-informasi')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Sistem Informasi & Pengumuman
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('ppdb')}
                  className="hover:text-emerald-400 transition cursor-pointer text-amber-300 font-bold"
                >
                  PPDB Online 2026/2027
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('fasilitas')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Fasilitas & Galeri Madrasah
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('kontak')}
                  className="hover:text-emerald-400 transition cursor-pointer"
                >
                  Kontak & Lokasi Kampus
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Sekretariat & Jam Pelayanan (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Sekretariat PPDB
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{SCHOOL_INFO.address.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">WA: {SCHOOL_INFO.contact.whatsappFormatted}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono">{SCHOOL_INFO.contact.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={openAdminModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-slate-700 transition cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Masuk Portal Panitia PPDB</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950/60 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} MTs Nurul Huda Mendala Sirampog. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex items-center gap-3">
            <span>Kementerian Agama RI</span>
            <span>•</span>
            <span>Kabupaten Brebes</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
