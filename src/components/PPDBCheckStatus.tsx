import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  Printer, 
  Phone, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { searchPPDBRegistration } from '../services/firebase';
import type { PPDBRegistration } from '../types';
import { PPDBPrintCard } from './PPDBPrintCard';
import { SCHOOL_INFO } from '../data/mockData';

export const PPDBCheckStatus: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<PPDBRegistration | null>(null);
  const [searched, setSearched] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const result = await searchPPDBRegistration(searchInput.trim());
      setSearchResult(result);
    } catch (err) {
      console.error('Search error:', err);
      setSearchResult(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'accepted':
        return {
          title: 'SELAMAT! ANDA DINYATAKAN DITERIMA',
          badge: 'DITERIMA',
          color: 'bg-emerald-600 text-white',
          bgColor: 'bg-emerald-50 border-emerald-200 text-emerald-950',
          desc: 'Selamat bergabung sebagai keluarga besar santri dan siswi MTs Nurul Huda Mendala tahun ajaran 2026/2027. Silakan lengkapi prosedur daftar ulang.',
          step: 4
        };
      case 'verified':
        return {
          title: 'BERKAS DOKUMEN TERVERIFIKASI',
          badge: 'LOLOS ADMINISTRASI',
          color: 'bg-blue-600 text-white',
          bgColor: 'bg-blue-50 border-blue-200 text-blue-950',
          desc: 'Panitia telah memeriksa dan menyetujui seluruh kelengkapan berkas Anda. Silakan ikuti jadwal observasi / pemetaan minat dan tahfidz.',
          step: 2
        };
      case 'interview':
        return {
          title: 'JADWAL TES & WAWANCARA',
          badge: 'TES OBSERVASI',
          color: 'bg-indigo-600 text-white',
          bgColor: 'bg-indigo-50 border-indigo-200 text-indigo-950',
          desc: 'Harap hadir di kampus MTs Nurul Huda Mendala bersama orang tua/wali sesuai jadwal yang ditentukan untuk tes wawancara dan pemetaan Al-Qur\'an.',
          step: 3
        };
      case 'rejected':
        return {
          title: 'BERKAS BELUM LENGKAP / PERLU REVISI',
          badge: 'PERLU PERBAIKAN',
          color: 'bg-red-600 text-white',
          bgColor: 'bg-red-50 border-red-200 text-red-950',
          desc: 'Mohon periksa catatan verifikator panitia di bawah ini untuk melengkapi persyaratan berkas yang diminta.',
          step: 1
        };
      default:
        return {
          title: 'SEDANG MENUNGGU VERIFIKASI PANITIA',
          badge: 'MENUNGGU VERIFIKASI',
          color: 'bg-amber-500 text-white',
          bgColor: 'bg-amber-50 border-amber-200 text-amber-950',
          desc: 'Pendaftaran Anda telah tersimpan dengan aman di database cloud madrasah. Panitia akan memverifikasi berkas dalam waktu 1x24 jam kerja.',
          step: 1
        };
    }
  };

  const contactHelpdesk = () => {
    const text = encodeURIComponent(
      `Assalamu'alaikum Panitia PPDB MTs Nurul Huda Mendala, saya ingin konfirmasi status pendaftaran calon siswa dengan nomor: ${searchResult?.registrationNumber || searchInput}.`
    );
    window.open(`https://wa.me/${SCHOOL_INFO.contact.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="bg-gradient-to-br from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-10 text-white shadow-lg">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lacak Status Berkas Real-Time</span>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-black">
            Cek Status Pendaftaran Calon Siswa
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100">
            Masukkan <strong>Nomor Pendaftaran</strong> (contoh: <code>PPDB-NHM-26-1001</code>) atau <strong>10 Digit NISN</strong> calon siswa untuk melacak progres seleksi.
          </p>

          <form onSubmit={handleSearch} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Contoh: PPDB-NHM-26-1001 atau NISN"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-md placeholder:text-slate-400"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-extrabold text-sm rounded-xl shadow-md transition transform active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Mencari...</span>
              ) : (
                <>
                  <span>Periksa</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-[11px] text-emerald-200/80 pt-1">
            Tips: Coba gunakan nomor demo <code>PPDB-NHM-26-1001</code> atau NISN <code>0129482711</code>
          </div>
        </div>
      </div>

      {/* Result Section */}
      {searched && (
        <div>
          {searchResult ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 animate-fadeIn">
              
              {/* Status Header */}
              {(() => {
                const info = getStatusDisplay(searchResult.status);
                return (
                  <div className={`p-5 rounded-2xl border ${info.bgColor} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${info.color}`}>
                          {info.badge}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          Nomor: {searchResult.registrationNumber}
                        </span>
                      </div>
                      <h4 className="text-lg font-black text-slate-900">
                        {info.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                        {info.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => setShowPrintModal(true)}
                      className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-amber-300" />
                      <span>Cetak Kartu Peserta</span>
                    </button>
                  </div>
                );
              })()}

              {/* Progress Milestones */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block mb-3">
                  Tahapan Alur Pendaftaran:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                    1. Formulir Terkirim ✓
                  </div>
                  <div className={`p-2.5 rounded-xl font-bold border ${
                    searchResult.status !== 'pending'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                      : 'bg-white text-slate-400 border-slate-200'
                  }`}>
                    2. Verifikasi Berkas {searchResult.status !== 'pending' ? '✓' : '...'}
                  </div>
                  <div className={`p-2.5 rounded-xl font-bold border ${
                    searchResult.status === 'interview' || searchResult.status === 'accepted'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                      : 'bg-white text-slate-400 border-slate-200'
                  }`}>
                    3. Observasi & Tes {searchResult.status === 'interview' || searchResult.status === 'accepted' ? '✓' : '...'}
                  </div>
                  <div className={`p-2.5 rounded-xl font-bold border ${
                    searchResult.status === 'accepted'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm' 
                      : 'bg-white text-slate-400 border-slate-200'
                  }`}>
                    4. Diterima & Daftar Ulang
                  </div>
                </div>
              </div>

              {/* Student Detail Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                
                {/* Biodata Box */}
                <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200">
                  <h5 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                    Biodata Calon Siswa
                  </h5>
                  <div className="text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Nama Lengkap:</span>
                      <span className="font-bold text-slate-900 uppercase">{searchResult.student.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">NISN / NIK:</span>
                      <span className="font-mono text-slate-800">{searchResult.student.nisn} / {searchResult.student.nik}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Jenis Kelamin:</span>
                      <span className="text-slate-800">{searchResult.student.gender === 'L' ? 'Laki-Laki' : 'Perempuan'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Asal Sekolah:</span>
                      <span className="font-semibold text-slate-800">{searchResult.student.previousSchool}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Jalur Pilihan:</span>
                      <span className="font-bold uppercase text-emerald-700">{searchResult.program.track}</span>
                    </div>
                  </div>
                </div>

                {/* Parents & Status Notes Box */}
                <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200">
                  <h5 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                    Data Orang Tua & Catatan Panitia
                  </h5>
                  <div className="text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Nama Ayah / Ibu:</span>
                      <span className="text-slate-800">{searchResult.parents.fatherName} / {searchResult.parents.motherName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">No. WhatsApp Wali:</span>
                      <span className="font-mono text-emerald-700 font-bold">{searchResult.parents.fatherPhone || searchResult.parents.motherPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Alamat:</span>
                      <span className="text-slate-700 text-right">{searchResult.address.village}, {searchResult.address.district}</span>
                    </div>
                    
                    {searchResult.adminNotes ? (
                      <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
                        <span className="font-bold text-amber-800 block">Pesan Panitia:</span>
                        <p className="text-amber-900 mt-1">{searchResult.adminNotes}</p>
                      </div>
                    ) : (
                      <div className="mt-3 p-3 rounded-xl bg-slate-50 text-slate-500 text-[11px]">
                        Belum ada catatan khusus dari panitia. Berkas dalam antrean telaah.
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  onClick={contactHelpdesk}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-600 text-emerald-800 hover:bg-emerald-50 text-xs font-bold transition cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Konsultasi dengan Panitia via WhatsApp</span>
                </button>

                <button
                  onClick={() => setShowPrintModal(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-amber-300" />
                  <span>Lihat & Cetak Kartu Pendaftaran</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 text-lg">
                Data Pendaftaran Tidak Ditemukan
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Nomor pendaftaran atau NISN yang Anda masukkan belum terdaftar di sistem kami. Pastikan nomor pendaftaran benar atau silakan lakukan pendaftaran baru.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={contactHelpdesk}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tanya Panitia via WA</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal Cetak Kartu */}
      {showPrintModal && searchResult && (
        <PPDBPrintCard
          registration={searchResult}
          onClose={() => setShowPrintModal(false)}
        />
      )}
    </div>
  );
};
