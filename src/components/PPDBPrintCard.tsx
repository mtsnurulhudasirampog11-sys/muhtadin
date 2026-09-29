import React from 'react';
import { 
  Printer, 
  X, 
  CheckCircle, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  User, 
  BookOpen, 
  FileCheck,
  ShieldCheck
} from 'lucide-react';
import type { PPDBRegistration } from '../types';
import { SCHOOL_INFO } from '../data/mockData';

interface PPDBPrintCardProps {
  registration: PPDBRegistration;
  onClose: () => void;
}

export const PPDBPrintCard: React.FC<PPDBPrintCardProps> = ({ registration, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return { label: 'DITERIMA', color: 'bg-emerald-600 text-white' };
      case 'verified':
        return { label: 'BERKAS TERVERIFIKASI', color: 'bg-blue-600 text-white' };
      case 'interview':
        return { label: 'TAHAP WAWANCARA / TES', color: 'bg-indigo-600 text-white' };
      case 'rejected':
        return { label: 'BERKAS TIDAK LENGKAP', color: 'bg-red-600 text-white' };
      default:
        return { label: 'MENUNGGU VERIFIKASI', color: 'bg-amber-500 text-white' };
    }
  };

  const statusInfo = getStatusBadge(registration.status);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 border border-slate-200 print:shadow-none print:border-none print:max-w-none print:w-full print:p-0">
        
        {/* Modal Controls - Hidden during print */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
          <div className="flex items-center gap-2 text-emerald-800">
            <FileCheck className="w-5 h-5 text-emerald-600" />
            <span className="font-extrabold text-sm sm:text-base">
              Kartu Tanda Peserta PPDB Online
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Card Container */}
        <div className="border-4 border-double border-emerald-800 rounded-2xl p-5 sm:p-7 relative bg-white overflow-hidden print:border-2">
          
          {/* Subtle Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <GraduationCap className="w-96 h-96 text-emerald-950" />
          </div>

          {/* Header Kop Surat Madrasah */}
          <div className="border-b-2 border-slate-800 pb-3 mb-4 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-bold text-xl shrink-0">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Kementerian Agama Republik Indonesia
                </p>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 uppercase tracking-tight">
                  {SCHOOL_INFO.fullName}
                </h2>
                <p className="text-[10px] text-slate-600 font-medium">
                  {SCHOOL_INFO.address.fullAddress} • Telp: {SCHOOL_INFO.contact.phone}
                </p>
                <p className="text-[10px] text-emerald-800 font-semibold">
                  NSM: {SCHOOL_INFO.nsm} | NPSN: {SCHOOL_INFO.npsn} | Terakreditasi A
                </p>
              </div>
            </div>
          </div>

          {/* Document Title */}
          <div className="text-center my-3">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase underline decoration-emerald-600 underline-offset-4">
              KARTU BUKTI PENDAFTARAN PESERTA DIDIK BARU (PPDB)
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Tahun Ajaran {SCHOOL_INFO.ppdbPeriod}
            </p>
          </div>

          {/* Status & Registration Number Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 my-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">
                Nomor Pendaftaran Resmi:
              </span>
              <span className="text-base sm:text-lg font-black font-mono text-emerald-900 tracking-wider">
                {registration.registrationNumber}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase">
                Status Berkas:
              </span>
              <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
            </div>
          </div>

          {/* Main Content Info */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start mt-4">
            
            {/* Left Photo & QR (4 Cols) */}
            <div className="sm:col-span-4 flex flex-col items-center text-center space-y-3">
              <div className="w-32 h-40 border-2 border-slate-300 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center relative shadow-xs">
                {registration.documents?.photoUrl ? (
                  <img
                    src={registration.documents.photoUrl}
                    alt={registration.student.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-2 text-slate-400">
                    <User className="w-12 h-12 mx-auto text-slate-300" />
                    <span className="text-[10px] font-bold block mt-1">PAS FOTO 3X4</span>
                  </div>
                )}
              </div>
              <div className="text-center">
                <span className="text-[10px] font-mono text-slate-500">
                  Jalur: <strong className="uppercase text-emerald-800">{registration.program.track}</strong>
                </span>
                <p className="text-[9px] text-slate-400 mt-0.5">
                  Tgl Daftar: {new Date(registration.createdAt).toLocaleDateString('id-ID')}
                </p>
              </div>
            </div>

            {/* Right Biodata (8 Cols) */}
            <div className="sm:col-span-8 text-xs space-y-2">
              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Nama Lengkap</span>
                <span className="col-span-2 font-bold text-slate-900 uppercase">
                  {registration.student.fullName}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">NISN / NIK</span>
                <span className="col-span-2 font-mono font-bold text-slate-800">
                  {registration.student.nisn} / {registration.student.nik}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Tempat, Tgl Lahir</span>
                <span className="col-span-2 text-slate-800">
                  {registration.student.birthPlace}, {registration.student.birthDate}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Jenis Kelamin</span>
                <span className="col-span-2 text-slate-800">
                  {registration.student.gender === 'L' ? 'Laki-Laki' : 'Perempuan'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Asal Sekolah</span>
                <span className="col-span-2 font-semibold text-slate-800">
                  {registration.student.previousSchool}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Nama Orang Tua</span>
                <span className="col-span-2 text-slate-800">
                  Ayah: {registration.parents.fatherName} | Ibu: {registration.parents.motherName}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">No. HP / WhatsApp</span>
                <span className="col-span-2 font-mono text-emerald-800 font-bold">
                  {registration.parents.fatherPhone || registration.parents.motherPhone}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1 py-1">
                <span className="text-slate-500 font-medium">Alamat Domisili</span>
                <span className="col-span-2 text-slate-700">
                  {registration.address.street}, {registration.address.village}, {registration.address.district}, {registration.address.city}
                </span>
              </div>
            </div>

          </div>

          {/* Verification Notes / Instructions */}
          {registration.adminNotes && (
            <div className="mt-4 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
              <span className="font-bold text-amber-800 block">Catatan Panitia Verifikator:</span>
              <p className="text-amber-900 mt-0.5">{registration.adminNotes}</p>
            </div>
          )}

          {/* Footer Signature & Stempel */}
          <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-2 gap-4 text-center text-xs">
            <div>
              <p className="text-slate-500">Calon Peserta Didik,</p>
              <div className="h-14"></div>
              <p className="font-bold text-slate-800 uppercase underline">
                ({registration.student.fullName})
              </p>
            </div>

            <div className="relative">
              <p className="text-slate-500">Mendala, Sirampog</p>
              <p className="text-slate-500">Panitia PPDB MTs Nurul Huda,</p>
              
              {/* Digital Stamp Simulation */}
              <div className="absolute top-4 right-8 w-20 h-20 rounded-full border-2 border-emerald-700 text-emerald-700 flex items-center justify-center rotate-12 opacity-80 pointer-events-none">
                <div className="text-[8px] font-black uppercase text-center leading-none">
                  PANITIA PPDB<br />MTS NURUL HUDA<br />MENDALA
                </div>
              </div>

              <div className="h-8"></div>
              <p className="font-bold text-slate-800 uppercase underline">
                (Panitia Penerimaan)
              </p>
            </div>
          </div>

          {/* Important instructions */}
          <div className="mt-4 pt-2 border-t border-dashed border-slate-200 text-[10px] text-slate-500 leading-tight">
            <strong>Petunjuk:</strong> Simpan atau cetak kartu ini sebagai bukti pendaftaran yang sah. Harap dibawa saat pelaksanaan tes pemetaan / verifikasi fisik berkas di kampus MTs Nurul Huda Mendala Sirampog.
          </div>

        </div>

      </div>
    </div>
  );
};
