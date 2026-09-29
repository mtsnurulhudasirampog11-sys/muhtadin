import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Calendar, 
  FileDown, 
  GraduationCap, 
  Search, 
  Tag, 
  Clock, 
  Download, 
  Eye, 
  BookOpen, 
  CheckCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { TEACHERS_LIST, INITIAL_ANNOUNCEMENTS } from '../data/mockData';
import { fetchSchoolAnnouncements } from '../services/firebase';
import type { AnnouncementItem } from '../types';

export const InformationSystem: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'announcements' | 'calendar' | 'teachers' | 'downloads'>('announcements');
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(INITIAL_ANNOUNCEMENTS);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');

  // Load announcements from Firestore
  useEffect(() => {
    async function loadData() {
      const data = await fetchSchoolAnnouncements();
      if (data && data.length > 0) {
        setAnnouncements(data);
      }
    }
    loadData();
  }, []);

  const categories = ['Semua', 'PPDB', 'Akademik', 'Prestasi', 'Kegiatan', 'Umum'];

  const filteredAnnouncements = announcements.filter((item) => {
    const matchesCat = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesQuery = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const calendarEvents = [
    { month: 'Juli 2026', title: 'Masa Ta\'aruf Siswa Madrasah (MATSAMA)', date: '13 - 16 Juli 2026', status: 'Wajib' },
    { month: 'Agustus 2026', title: 'Peringatan HUT RI & Lomba Santri', date: '17 Agustus 2026', status: 'Kegiatan' },
    { month: 'September 2026', title: 'Asesmen Sumatif Tengah Semester (ASTS)', date: '21 - 26 September 2026', status: 'Akademik' },
    { month: 'Oktober 2026', title: 'Hari Santri Nasional (Karnaval & Apel Akbar)', date: '22 Oktober 2026', status: 'Keagamaan' },
    { month: 'Desember 2026', title: 'Asesmen Akhir Semester & Pembagian Rapor', date: '01 - 18 Desember 2026', status: 'Akademik' },
    { month: 'Januari 2027', title: 'Awal Masuk Semester Genap & Pembukaan PPDB Gel. 1', date: '04 Januari 2027', status: 'PPDB' }
  ];

  const downloadDocuments = [
    {
      title: 'Brosur Resmi PPDB MTs Nurul Huda Mendala 2026/2027',
      fileSize: '2.4 MB',
      type: 'PDF',
      desc: 'Panduan lengkap persyaratan, rincian beasiswa, dan profil madrasah.',
      date: '2026'
    },
    {
      title: 'Formulir Pendaftaran Siswa Baru (Format Fisik / Offline)',
      fileSize: '650 KB',
      type: 'PDF',
      desc: 'Formulir cetak bagi calon wali murid yang mendaftar langsung ke kantor sekretariat.',
      date: '2026'
    },
    {
      title: 'Kalender Pendidikan Madrasah Tahun Ajaran 2026/2027',
      fileSize: '1.1 MB',
      type: 'PDF',
      desc: 'Jadwal hari efektif belajar, masa ujian, dan hari libur resmi Kemenag RI.',
      date: '2026'
    },
    {
      title: 'Surat Pernyataan Kesanggupan & Tata Tertib Siswa',
      fileSize: '480 KB',
      type: 'DOCX',
      desc: 'Dokumen komitmen santri dan wali murid terhadap disiplin madrasah.',
      date: '2026'
    }
  ];

  return (
    <section id="sistem-informasi" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Sistem Informasi Madrasah (SIM)
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pusat Informasi & Layanan Digital
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Akses cepat informasi pengumuman sekolah, agenda kegiatan akademik, profil dewan guru, dan pusat unduhan berkas resmi.
          </p>

          {/* Sub Navigation Bar */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 p-1.5 bg-white rounded-2xl shadow-xs border border-slate-200 max-w-2xl mx-auto">
            <button
              onClick={() => setActiveSubTab('announcements')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeSubTab === 'announcements'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span>Pengumuman & Berita</span>
            </button>

            <button
              onClick={() => setActiveSubTab('calendar')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeSubTab === 'calendar'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Kalender Akademik</span>
            </button>

            <button
              onClick={() => setActiveSubTab('teachers')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeSubTab === 'teachers'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Direktori Guru</span>
            </button>

            <button
              onClick={() => setActiveSubTab('downloads')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeSubTab === 'downloads'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileDown className="w-4 h-4" />
              <span>Unduhan Dokumen</span>
            </button>
          </div>
        </div>

        {/* 1. TAB PENGUMUMAN & BERITA */}
        {activeSubTab === 'announcements' && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari berita atau pengumuman..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* List Announcements */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAnnouncements.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        item.category === 'PPDB' 
                          ? 'bg-amber-100 text-amber-800'
                          : item.category === 'Prestasi'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.category}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.date}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-slate-900 leading-snug line-clamp-2">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Oleh: {item.author}
                    </span>
                    <button
                      onClick={() => setSelectedAnnouncement(item)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Baca Lengkap</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredAnnouncements.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
                Tidak ada pengumuman yang sesuai dengan pencarian Anda.
              </div>
            )}
          </div>
        )}

        {/* 2. TAB KALENDER AKADEMIK */}
        {activeSubTab === 'calendar' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Kalender Pendidikan Madrasah TA 2026/2027
                </h3>
                <p className="text-xs text-slate-500">
                  Pedoman jadwal waktu pembelajaran dan aktivitas penting madrasah
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                Semester Ganjil & Genap
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {calendarEvents.map((ev, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-emerald-50/40 transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] uppercase font-bold">{ev.month.split(' ')[0].slice(0, 3)}</span>
                    <span className="text-sm font-black">{idx + 1}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      {ev.status} • {ev.month}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 mt-0.5">
                      {ev.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {ev.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. TAB DIREKTORI GURU */}
        {activeSubTab === 'teachers' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEACHERS_LIST.map((teacher) => (
                <div 
                  key={teacher.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4 hover:shadow-md transition"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img
                      src={teacher.photoUrl}
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 leading-tight">
                      {teacher.name}
                    </h4>
                    <span className="text-xs font-semibold text-emerald-700 block mt-1">
                      {teacher.role}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {teacher.education}
                    </span>
                    {teacher.subjects && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {teacher.subjects.map((sub, sIdx) => (
                          <span key={sIdx} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                            {sub}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. TAB UNDUHAN DOKUMEN */}
        {activeSubTab === 'downloads' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">
                Pusat Unduhan Berkas Madrasah
              </h3>
              <p className="text-xs text-slate-500">
                Dokumen resmi yang dapat diunduh untuk keperluan pendaftaran atau administrasi madrasah
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {downloadDocuments.map((doc, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4 hover:bg-emerald-50/50 transition"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        {doc.type}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {doc.fileSize}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-slate-600">
                      {doc.desc}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      alert(`Memulai unduhan dokumen: ${doc.title}`);
                    }}
                    className="p-2.5 rounded-xl bg-white border border-slate-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 text-slate-700 transition shrink-0 cursor-pointer shadow-xs"
                    title="Unduh Dokumen"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Detail Pengumuman */}
        {selectedAnnouncement && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl animate-scaleUp">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                  {selectedAnnouncement.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedAnnouncement.date}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {selectedAnnouncement.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {selectedAnnouncement.content}
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  Penulis: {selectedAnnouncement.author}
                </span>
                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Tutup Pengumuman
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
