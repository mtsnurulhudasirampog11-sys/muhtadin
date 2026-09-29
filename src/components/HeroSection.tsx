import React from 'react';
import { 
  ArrowRight, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  GraduationCap, 
  Laptop, 
  Search, 
  Sparkles, 
  Users, 
  ShieldCheck 
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/mockData';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onCheckStatusClick: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onCheckStatusClick,
  onExploreClick
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-950 text-white">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Ambient Lighting Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Text (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badges */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30 backdrop-blur-sm">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Terakreditasi A (Unggul) BAN-SM</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-800/80 text-emerald-200 border border-emerald-700/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>NSM: {SCHOOL_INFO.nsm} • Sirampog Brebes</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.15]">
              Selamat Datang di <br />
              <span className="bg-gradient-to-r from-amber-300 via-emerald-200 to-teal-200 bg-clip-text text-transparent">
                MTs Nurul Huda Mendala
              </span>
            </h1>

            {/* Tagline / Subtitle */}
            <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Mewujudkan generasi muslim yang bertakwa, berakhlakul karimah, unggul dalam bidang sains & teknologi, serta mencintai Al-Qur'an. Berlokasi asri dan kondusif di Desa Mendala, Sirampog, Brebes.
            </p>

            {/* Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-lg mx-auto lg:mx-0 text-left text-sm text-emerald-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Program Khusus Tahfidzul Qur'an</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Lab Komputer Multimedia & Robotika</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Beasiswa Prestasi & Yatim Piatu</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pembiasaan Ibadah Praktis & Adab</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onRegisterClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-extrabold text-sm text-emerald-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-600 shadow-lg shadow-amber-400/20 hover:shadow-xl transition-all transform active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Daftar PPDB Online 2026</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onCheckStatusClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all cursor-pointer"
              >
                <Search className="w-4 h-4 text-amber-300" />
                <span>Cek Status Pendaftaran</span>
              </button>
            </div>
            
            <p className="text-xs text-emerald-300/80 pt-1">
              *Pendaftaran Gelombang 1 Bebas Biaya Formulir Pendaftaran
            </p>
          </div>

          {/* Right Visual Card / Infographic (Right 5 Cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-gradient-to-b from-white/15 to-white/5 border border-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-7 shadow-2xl">
              
              {/* Badge Overlay */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div>
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                    PPDB T.A. 2026/2027
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Penerimaan Siswa Baru
                  </h3>
                </div>
                <div className="px-3 py-1 bg-emerald-500/30 border border-emerald-400/50 rounded-full text-xs font-semibold text-emerald-300">
                  Status: Dibuka
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="space-y-4">
                <div className="flex items-start gap-3.5 bg-black/20 p-3.5 rounded-2xl border border-white/5">
                  <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-300 shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Jalur Tahfidz & Prestasi</h4>
                    <p className="text-xs text-emerald-200/80 mt-0.5">
                      Bebas SPP hingga 1 tahun dan seragam gratis bagi penghafal minimal 2 Juz Al-Qur'an.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 bg-black/20 p-3.5 rounded-2xl border border-white/5">
                  <div className="p-2.5 rounded-xl bg-teal-400/20 text-teal-300 shrink-0">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Kelas Digital & Riset</h4>
                    <p className="text-xs text-emerald-200/80 mt-0.5">
                      Kurikulum terintegrasi literasi digital, Asesmen Komputer, dan pembinaan olimpiade sains madrasah.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 bg-black/20 p-3.5 rounded-2xl border border-white/5">
                  <div className="p-2.5 rounded-xl bg-emerald-400/20 text-emerald-300 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Lingkungan Asri & Aman</h4>
                    <p className="text-xs text-emerald-200/80 mt-0.5">
                      Udara pegunungan Sirampog yang sejuk, bebas bising perkotaan, ramah anak, dan diasuh ustadz berdedikasi.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <button
                  onClick={onExploreClick}
                  className="text-xs font-semibold text-amber-300 hover:text-amber-200 underline underline-offset-4 transition cursor-pointer"
                >
                  Pelajari Visi, Misi & Kurikulum Madrasah &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
