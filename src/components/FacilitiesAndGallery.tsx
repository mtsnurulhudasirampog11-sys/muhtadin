import React, { useState } from 'react';
import { 
  Building2, 
  Image as ImageIcon, 
  Sparkles, 
  Maximize2, 
  X, 
  Check, 
  Monitor, 
  BookOpen, 
  Trophy, 
  Heart,
  Home
} from 'lucide-react';
import { FACILITIES_LIST } from '../data/mockData';

export const FacilitiesAndGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>('Semua');

  const galleryItems = [
    {
      title: 'Praktek Ujian Berbasis Komputer (CBT) di Lab Komputer',
      category: 'Akademik & IT',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      caption: 'Siswa kelas VII dan VIII antusias melaksanakan asesmen digital dengan fasilitas komputer modern.'
    },
    {
      title: 'Halaqah Tahfidzul Qur\'an Ba\'da Shalat Subuh',
      category: 'Keagamaan',
      image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80',
      caption: 'Kegiatan setoran hafalan Al-Qur\'an bersama ustadz pembina di lingkungan masjid madrasah.'
    },
    {
      title: 'Penjelajahan Alam & Kemah Pramuka di Kaki Gunung Slamet',
      category: 'Pramuka',
      image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80',
      caption: 'Gugus Depan MTs Nurul Huda Mendala mengasah kemandirian santri di alam perbukitan Sirampog yang sejuk.'
    },
    {
      title: 'Penampilan Grup Hadrah Sholawat Nurul Musthofa',
      category: 'Seni Islami',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      caption: 'Regu rebana madrasah saat memeriahkan peringatan Maulid Nabi Muhammad SAW.'
    },
    {
      title: 'Turnamen Futsal Antar Madrasah Se-Kabupaten Brebes',
      category: 'Olahraga',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      caption: 'Tim Futsal MTs Nurul Huda Mendala sukses meraih juara umum di ajang PORSENI.'
    },
    {
      title: 'Suasana Literasi di Perpustakaan Madrasah',
      category: 'Akademik & IT',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
      caption: 'Santri membaca referensi buku ilmu pengetahuan dan kitab turats di ruang baca ber-AC.'
    }
  ];

  const categories = ['Semua', 'Keagamaan', 'Akademik & IT', 'Olahraga', 'Pramuka', 'Seni Islami'];

  const filteredGallery = galleryItems.filter((item) => {
    return galleryFilter === 'Semua' || item.category === galleryFilter;
  });

  return (
    <section id="fasilitas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Sarana & Dokumentasi
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Fasilitas Representatif & <br />
            <span className="text-emerald-700">Galeri Kegiatan Santri</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Didukung sarana prasarana penunjang yang memadai demi kelancaran proses kegiatan belajar mengajar yang nyaman, asri, dan islami.
          </p>
        </div>

        {/* 1. Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACILITIES_LIST.map((fac) => (
            <div 
              key={fac.id}
              className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 hover:shadow-xl hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={fac.imageUrl}
                  alt={fac.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-bold text-white flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>{fac.name}</span>
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {fac.description}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-emerald-700">
                  <span>Standar Akreditasi A</span>
                  <span>Tersedia</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Gallery Header & Filter */}
        <div className="pt-8 border-t border-slate-100 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Galeri Aktivitas Siswa MTs Nurul Huda
              </h3>
              <p className="text-xs text-slate-500">
                Potret keseharian santri dalam berkarya, beribadah, dan berprestasi
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    galleryFilter === cat
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedImage(item.image)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 aspect-[4/3]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/40 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                    {item.category}
                  </span>
                  <h4 className="font-bold text-sm leading-snug line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-200 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-amber-400 text-sm font-bold flex items-center gap-1 cursor-pointer"
            >
              <X className="w-6 h-6" />
              <span>Tutup</span>
            </button>
            <img
              src={selectedImage}
              alt="Perbesar Foto"
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
