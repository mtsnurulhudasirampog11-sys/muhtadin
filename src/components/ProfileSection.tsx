import React from 'react';
import { 
  Compass, 
  Target, 
  HeartHandshake, 
  Quote, 
  Check, 
  Award, 
  Building,
  GraduationCap
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/mockData';

export const ProfileSection: React.FC = () => {
  const missions = [
    "Menumbuhkembangkan penghayatan dan pengamalan ajaran Islam berlandaskan Ahlussunnah wal Jama'ah An-Nahdliyyah.",
    "Melaksanakan pembelajaran aktif, inovatif, kreatif, dan berorientasi pada penguasaan sains, teknologi serta literasi numerasi.",
    "Mengembangkan program unggulan Tahfidzul Qur'an untuk membekali hafalan dan pemahaman Al-Qur'an sejak dini.",
    "Membina kemandirian, kedisiplinan dan kepedulian sosial melalui kegiatan kepramukaan, organisasi santri, dan keolahragaan.",
    "Menciptakan lingkungan madrasah yang religius, bersih, hijau, sehat, dan ramah anak di kawasan pegunungan Mendala Sirampog."
  ];

  const characterValues = [
    { title: "Religius", desc: "Taat beribadah, rajin sholat berjamaah & menjaga adab mulia." },
    { title: "Qur'ani", desc: "Cinta membaca, menghafal, dan mengamalkan nilai Al-Qur'an." },
    { title: "Cerdas & Riset", desc: "Kritis, kreatif, dan adaptif terhadap kecanggihan teknologi." },
    { title: "Mandiri", desc: "Bertanggung jawab, tahan banting, dan berjiwa wirausaha." }
  ];

  return (
    <section id="profil" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Profil & Identitas Madrasah
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Mengenal Lebih Dekat <br />
            <span className="text-emerald-700">MTs Nurul Huda Mendala</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Lembaga pendidikan Islam setingkat Sekolah Menengah Pertama (SMP) di bawah naungan Kementerian Agama RI yang memadukan kurikulum nasional, keagamaan pesantren, dan kemajuan teknologi.
          </p>
        </div>

        {/* Sambutan Kepala Madrasah */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-emerald-100/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Foto Kepala */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-4 border-emerald-600/30 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
                    alt={SCHOOL_INFO.principal.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-amber-400 text-emerald-950 p-2 rounded-xl shadow-md">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>

              <h4 className="font-extrabold text-slate-900 text-base sm:text-lg mt-4">
                {SCHOOL_INFO.principal.name}
              </h4>
              <p className="text-xs font-semibold text-emerald-700">
                {SCHOOL_INFO.principal.title}
              </p>
              <span className="text-[11px] text-slate-500 mt-1">
                Pengabdi Pendidikan Madrasah Sirampog
              </span>
            </div>

            {/* Pesan Kepala */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                <Quote className="w-5 h-5 text-amber-500" />
                <span>Sambutan Kepala Madrasah</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                "Mendidik dengan Hati, Menyiapkan Generasi Emas yang Rabbani"
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Assalamu'alaikum Warahmatullahi Wabarakatuh.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Puji syukur ke hadirat Allah SWT. Selamat datang di portal resmi MTs Nurul Huda Mendala, Sirampog, Brebes. Kami berkomitmen untuk menyajikan pendidikan tingkat Tsanawiyah yang bermutu tinggi, berkarakter santri, dan berdaya saing global.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dengan dukungan tenaga pendidik yang kompeten, sarana laboratorium komputer, asrama pesantren mitra, serta kurikulum terintegrasi, kami membimbing putra-putri bapak/ibu tidak hanya menguasai sains dan matematika, melainkan juga khatam dan fasih membaca serta menghafal Al-Qur'an.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Wassalamu'alaikum Warahmatullahi Wabarakatuh</span>
                <span className="font-semibold text-emerald-800">Mendala, Sirampog</span>
              </div>
            </div>

          </div>
        </div>

        {/* Visi & Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card Visi */}
          <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-3xl p-8 shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
                Visi Madrasah
              </span>
              <h3 className="text-2xl font-black text-white leading-snug">
                "Terwujudnya Generasi Muslim yang Berakhlakul Karimah, Unggul dalam Prestasi, Mandiri, dan Berwawasan Global."
              </h3>
              <p className="text-emerald-100/90 text-sm leading-relaxed pt-2">
                Menjadi episentrum pendidikan madrasah terpercaya di wilayah Brebes Selatan yang melahirkan lulusan berintegritas tinggi dan berdaya saing di tingkat regional maupun nasional.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs text-emerald-200">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-400" />
                <span>Akreditasi A BAN-SM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-400" />
                <span>Kurikulum Merdeka Plus</span>
              </div>
            </div>
          </div>

          {/* Card Misi */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                Misi Madrasah
              </span>
              <h3 className="text-2xl font-black text-slate-900 leading-snug">
                Langkah Strategis Pembinaan
              </h3>
              
              <ul className="space-y-3 pt-2">
                {missions.map((misi, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{misi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Nilai Karakter Utama */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              4 Pilar Karakter MTs Nurul Huda Mendala
            </h3>
            <p className="text-xs text-slate-500">
              Menjadi dasar kepribadian setiap santri dan siswi madrasah
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {characterValues.map((val, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-100 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-2">
                  0{idx + 1}
                </div>
                <h4 className="font-bold text-sm text-slate-900">{val.title}</h4>
                <p className="text-xs text-slate-600 mt-1">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
