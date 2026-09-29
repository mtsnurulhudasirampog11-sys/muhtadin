import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Cpu, 
  Languages, 
  Trophy, 
  Music, 
  Compass, 
  Check, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface ProgramExcellenceProps {
  onRegisterClick: () => void;
}

export const ProgramExcellence: React.FC<ProgramExcellenceProps> = ({ onRegisterClick }) => {
  const [activeTab, setActiveTab] = useState<'programs' | 'extracurriculars'>('programs');

  const mainPrograms = [
    {
      title: "Program Kelas Tahfidzul Qur'an",
      badge: "Program Favorit",
      desc: "Bimbingan hafalan Al-Qur'an intensif dengan metode talaqqi dan muroja'ah harian dibimbing oleh Hafidz/Hafidzah bersanad.",
      features: [
        "Target hafalan minimal 3 sampai 5 Juz",
        "Setoran rutin harian ba'da shalat subuh / dhuha",
        "Ujian tahfidz terbuka (Tasmi' 1x duduk)",
        "Wisuda Tahfidz dan sertifikat bersanad"
      ],
      icon: BookOpen,
      color: "border-emerald-500 bg-emerald-50/40 text-emerald-800"
    },
    {
      title: "Madrasah Riset & Sains Terapan",
      badge: "Juara KSM",
      desc: "Pembinaan intensif persiapan Kompetisi Sains Madrasah (KSM) dan Olimpiade Sains Nasional tingkat Kabupaten Brebes & Provinsi Jawa Tengah.",
      features: [
        "Bimbingan khusus Matematika & IPA Terintegrasi",
        "Praktikum laboratorium berkala",
        "Klinik bimbingan belajar intensif",
        "Tryout CBT rutin berbasis komputer"
      ],
      icon: Sparkles,
      color: "border-amber-500 bg-amber-50/40 text-amber-900"
    },
    {
      title: "Informatika, Komputer & Robotika",
      badge: "Era Digital",
      desc: "Membekali peserta didik dengan kecakapan teknologi komputer, pengoperasian software perkantoran, internet sehat, dan dasar coding.",
      features: [
        "Praktik 1 siswa 1 komputer di Lab Multimedia",
        "Pelatihan Desain Grafis Canva & Dasar Editing",
        "Ekstrakurikuler pengenalan logika coding & robotika",
        "Simulasi ANBK dan Ujian Berbasis Komputer (CBT)"
      ],
      icon: Cpu,
      color: "border-teal-500 bg-teal-50/40 text-teal-900"
    },
    {
      title: "Bilingual & Kajian Kitab Salaf",
      badge: "Karakter Santri",
      desc: "Pemberdayaan keterampilan muhadatsah bahasa Arab & English conversation serta pendalaman kitab turats (kitab kuning).",
      features: [
        "Pemberian kosa kata (Mufradat / Vocabulary) harian",
        "Kajian kitab Safinatun Najah, Aqidatul Awam & Ta'limul Muta'allim",
        "Pembiasaan kultum 3 bahasa saat muhadharah",
        "Terbuka opsi mondok di Pesantren Mitra"
      ],
      icon: Languages,
      color: "border-indigo-500 bg-indigo-50/40 text-indigo-900"
    }
  ];

  const extracurriculars = [
    { name: "Pramuka Gudep MTs Nurul Huda", cat: "Wajib / Kepanduan", desc: "Latihan rutin kepemimpinan, pionering, penjelajahan alam pegunungan Mendala Sirampog, dan Jambore." },
    { name: "Seni Rebana & Hadrah Modern", cat: "Kesenian Islami", desc: "Regu hadrah sholawat berprestasi yang kerap tampil di peringatan hari besar Islam dan hajatan warga." },
    { name: "PMR (Palang Merah Remaja)", cat: "Sosial & Kesehatan", desc: "Pembekalan pertolongan pertama, simulasi tanggap darurat, dan aksi peduli sesama." },
    { name: "Paskibra Madrasah", cat: "Kedisiplinan", desc: "Pelatihan baris berbaris presisi, petugas upacara bendera hari Senin dan peringatan HUT RI." },
    { name: "Futsal & Bola Voli", cat: "Olahraga", desc: "Latihan teknik bertanding, turnamen antar-madrasah se-Kabupaten Brebes dan Jawa Tengah." },
    { name: "Khat & Kaligrafi Arab", cat: "Seni & Literasi", desc: "Mempelajari kaidah khath Naskhi, Tsuluts, dan Diwani untuk lomba MTQ dan pajangan madrasah." },
    { name: "Klub Jurnalistik & Mading", cat: "Literasi Digital", desc: "Peliputan kegiatan sekolah, pembuatan majalah dinding berkala, dan penulisan karya santri." },
    { name: "Tenis Meja & Bulutangkis", cat: "Olahraga", desc: "Sarana mengasah ketangkasan fisik dan stamina siswa di hall olahraga madrasah." }
  ];

  return (
    <section id="program" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Keunggulan & Kurikulum
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Program Pendidikan Berbasis <br />
            <span className="text-emerald-700">Integrasi Ilmu Agama & Sains</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Di MTs Nurul Huda Mendala, siswa dibina secara holistik baik aspek spiritualitas (ruhiyah), intelektualitas (fikriyah), maupun ragawi (jasadiyah).
          </p>

          {/* Toggle Tab */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setActiveTab('programs')}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'programs'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              4 Program Unggulan
            </button>
            <button
              onClick={() => setActiveTab('extracurriculars')}
              className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'extracurriculars'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ekstrakurikuler & Minat Bakat
            </button>
          </div>
        </div>

        {/* Content Tab 1: 4 Program Unggulan */}
        {activeTab === 'programs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {mainPrograms.map((prog, idx) => {
              const Icon = prog.icon;
              return (
                <div 
                  key={idx}
                  className="rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all bg-white flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                        {prog.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">
                      {prog.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {prog.desc}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {prog.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      onClick={onRegisterClick}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Daftar Jalur Ini di PPDB</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Content Tab 2: Ekstrakurikuler */}
        {activeTab === 'extracurriculars' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {extracurriculars.map((ekskul, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 hover:bg-emerald-50/40 hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    {ekskul.cat}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mt-2">
                    {ekskul.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {ekskul.desc}
                  </p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200/60 text-[11px] font-semibold text-slate-500">
                  Didampingi Pelatih Ahli
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Banner Beasiswa */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-900 p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Kemudahan Finansial & Beasiswa Pendidikan
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Biaya Pendidikan Terjangkau dengan Beragam Skema Beasiswa
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl">
              MTs Nurul Huda Mendala berkomitmen membuka akses seluas-luasnya. Tersedia Beasiswa Tahfidz Qur'an, Beasiswa Peringkat Kelas dari SD/MI, serta Beasiswa Afirmasi Yatim/Piatu & Program Indonesia Pintar (PIP).
            </p>
          </div>
          <button
            onClick={onRegisterClick}
            className="shrink-0 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow transition transform active:scale-95 cursor-pointer"
          >
            Ajukan Pendaftaran Beasiswa
          </button>
        </div>

      </div>
    </section>
  );
};
