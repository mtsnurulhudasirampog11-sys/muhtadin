import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  FileText, 
  Search, 
  Upload, 
  User, 
  Users, 
  Sparkles, 
  Printer, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Phone, 
  ShieldCheck, 
  BookOpen, 
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { PPDBCheckStatus } from './PPDBCheckStatus';
import { PPDBPrintCard } from './PPDBPrintCard';
import { 
  submitPPDBRegistration, 
  generateRegistrationCode, 
  compressImageFile 
} from '../services/firebase';
import { SCHOOL_INFO, PPDB_FLOW_STEPS } from '../data/mockData';
import type { PPDBRegistration, ProgramTrack } from '../types';

export const PPDBPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'status' | 'info'>('form');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<PPDBRegistration | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Student
    fullName: '',
    nisn: '',
    nik: '',
    gender: 'L' as 'L' | 'P',
    birthPlace: '',
    birthDate: '',
    religion: 'Islam',
    previousSchool: '',
    schoolType: 'MI' as 'MI' | 'SD',
    childNumber: 1,
    totalSiblings: 2,
    hobby: '',
    aspiration: '',

    // Address
    street: '',
    village: 'Mendala',
    district: 'Sirampog',
    city: 'Brebes',
    province: 'Jawa Tengah',
    postalCode: '52272',
    residenceType: 'Bersama Orang Tua' as const,

    // Parents
    fatherName: '',
    fatherOccupation: 'Wiraswasta / Pedagang',
    fatherPhone: '',
    fatherIncome: 'Rp 2.000.000 - Rp 4.000.000',
    motherName: '',
    motherOccupation: 'Ibu Rumah Tangga',
    motherPhone: '',
    motherIncome: '< Rp 1.000.000',

    // Program
    track: 'reguler' as ProgramTrack,
    entryGrade: 'Kelas VII (Tujuh)' as const,
    hafalanJuz: 0,

    // Uploads
    photoUrl: '',
    familyCardUrl: '',
    birthCertUrl: '',
    reportOrSklUrl: '',
  });

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Upload & Image Compression
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Compress image client side
      const compressedDataUrl = await compressImageFile(file, 900, 0.75);
      setFormData((prev) => ({ ...prev, [fieldName]: compressedDataUrl }));
    } catch (err) {
      console.error('File compression error:', err);
      // Fallback: direct FileReader
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, [fieldName]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate current step
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        alert('Mohon masukkan Nama Lengkap calon siswa');
        return;
      }
      if (!formData.nisn.trim() || formData.nisn.length < 8) {
        alert('Mohon masukkan NISN yang valid (10 digit)');
        return;
      }
      if (!formData.previousSchool.trim()) {
        alert('Mohon masukkan Nama Asal SD/MI');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.fatherName.trim() && !formData.motherName.trim()) {
        alert('Mohon isi minimal salah satu Nama Orang Tua');
        return;
      }
      if (!formData.fatherPhone.trim() && !formData.motherPhone.trim()) {
        alert('Mohon isi No. WhatsApp Orang Tua untuk komunikasi panitia');
        return;
      }
      if (!formData.street.trim()) {
        alert('Mohon lengkapi alamat jalan / dusun tempat tinggal');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Submit Form to Firebase
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const registrationCode = generateRegistrationCode();

    const newRegistration: Omit<PPDBRegistration, 'id' | 'createdAt' | 'status'> = {
      registrationNumber: registrationCode,
      student: {
        fullName: formData.fullName,
        nisn: formData.nisn,
        nik: formData.nik || '3329000000000000',
        gender: formData.gender,
        birthPlace: formData.birthPlace || 'Brebes',
        birthDate: formData.birthDate || '2013-01-01',
        religion: formData.religion,
        previousSchool: formData.previousSchool,
        schoolType: formData.schoolType,
        childNumber: Number(formData.childNumber) || 1,
        totalSiblings: Number(formData.totalSiblings) || 2,
        hobby: formData.hobby,
        aspiration: formData.aspiration,
      },
      address: {
        street: formData.street,
        village: formData.village,
        district: formData.district,
        city: formData.city,
        province: formData.province,
        postalCode: formData.postalCode,
        residenceType: formData.residenceType,
      },
      parents: {
        fatherName: formData.fatherName,
        fatherOccupation: formData.fatherOccupation,
        fatherPhone: formData.fatherPhone,
        fatherIncome: formData.fatherIncome,
        motherName: formData.motherName,
        motherOccupation: formData.motherOccupation,
        motherPhone: formData.motherPhone,
        motherIncome: formData.motherIncome,
      },
      program: {
        track: formData.track,
        entryGrade: formData.entryGrade,
        hafalanJuz: Number(formData.hafalanJuz) || 0,
      },
      documents: {
        photoUrl: formData.photoUrl,
        familyCardUrl: formData.familyCardUrl,
        birthCertUrl: formData.birthCertUrl,
        reportOrSklUrl: formData.reportOrSklUrl,
      },
    };

    try {
      const res = await submitPPDBRegistration(newRegistration);
      
      const fullRecord: PPDBRegistration = {
        ...newRegistration,
        id: res.id,
        createdAt: new Date().toISOString(),
        status: 'pending',
      };

      setSubmittedData(fullRecord);

      // Trigger Confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#059669', '#10b981', '#f59e0b', '#3b82f6']
      });

      window.scrollTo({ top: 300, behavior: 'smooth' });
    } catch (err) {
      console.error('Error submitting PPDB:', err);
      alert('Terjadi kendala saat mengirim data. Silakan coba kembali.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmittedData(null);
    setCurrentStep(1);
    setFormData({
      fullName: '',
      nisn: '',
      nik: '',
      gender: 'L',
      birthPlace: '',
      birthDate: '',
      religion: 'Islam',
      previousSchool: '',
      schoolType: 'MI',
      childNumber: 1,
      totalSiblings: 2,
      hobby: '',
      aspiration: '',
      street: '',
      village: 'Mendala',
      district: 'Sirampog',
      city: 'Brebes',
      province: 'Jawa Tengah',
      postalCode: '52272',
      residenceType: 'Bersama Orang Tua',
      fatherName: '',
      fatherOccupation: 'Wiraswasta / Pedagang',
      fatherPhone: '',
      fatherIncome: 'Rp 2.000.000 - Rp 4.000.000',
      motherName: '',
      motherOccupation: 'Ibu Rumah Tangga',
      motherPhone: '',
      motherIncome: '< Rp 1.000.000',
      track: 'reguler',
      entryGrade: 'Kelas VII (Tujuh)',
      hafalanJuz: 0,
      photoUrl: '',
      familyCardUrl: '',
      birthCertUrl: '',
      reportOrSklUrl: '',
    });
  };

  return (
    <section id="ppdb" className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
            PPDB Online Tahun Ajaran 2026/2027
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Penerimaan Peserta Didik Baru
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Pendaftaran santri & siswa baru MTs Nurul Huda Mendala berbasis online, cepat, transparan, terintegrasi cloud database & ramah perangkat smartphone.
          </p>

          {/* Navigation Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 p-1.5 bg-white rounded-2xl shadow-xs border border-slate-200 max-w-xl mx-auto">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === 'form'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Formulir Pendaftaran</span>
            </button>

            <button
              onClick={() => setActiveTab('status')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === 'status'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Cek Status & Cetak Kartu</span>
            </button>

            <button
              onClick={() => setActiveTab('info')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === 'info'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Syarat & Alur</span>
            </button>
          </div>
        </div>

        {/* TAB 1: FORMULIR PENDAFTARAN */}
        {activeTab === 'form' && (
          <div className="max-w-4xl mx-auto">
            
            {/* SUCCESS SCREEN */}
            {submittedData ? (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200 shadow-xl text-center space-y-6 animate-scaleUp">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Pendaftaran Berhasil Terkirim ke Cloud Database!
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    Alhamdulillah, Formulir Berhasil Diterima
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                    Data calon siswa <strong>{submittedData.student.fullName}</strong> telah tercatat di sistem PPDB MTs Nurul Huda Mendala.
                  </p>
                </div>

                {/* Registration Code Banner */}
                <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-6 rounded-2xl border-2 border-dashed border-emerald-400 max-w-md mx-auto">
                  <span className="text-xs font-bold text-slate-500 uppercase block">
                    Kode / Nomor Pendaftaran Resmi Anda:
                  </span>
                  <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-800 tracking-wider block mt-1">
                    {submittedData.registrationNumber}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Simpan kode ini untuk mengecek status seleksi atau mencetak kembali kartu bukti pendaftaran.
                  </p>
                </div>

                {/* Quick Next Steps */}
                <div className="bg-slate-50 p-4 rounded-2xl text-left max-w-md mx-auto text-xs space-y-2 text-slate-700 border border-slate-200">
                  <span className="font-bold text-slate-900 block">Langkah Selanjutnya:</span>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-emerald-600">1.</span>
                    <span>Cetak atau simpan <strong>Kartu Tanda Peserta PPDB</strong> (PDF) dengan menekan tombol di bawah.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-emerald-600">2.</span>
                    <span>Bergabung ke grup WhatsApp calon wali murid untuk informasi tes observasi & Matsama.</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setShowPrintModal(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-extrabold text-sm shadow-md transition transform active:scale-95 cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-amber-300" />
                    <span>Cetak / Unduh Kartu Tanda Peserta</span>
                  </button>

                  <button
                    onClick={handleResetForm}
                    className="w-full sm:w-auto px-6 py-3.5 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Daftarkan Siswa Lainnya
                  </button>
                </div>

                {/* Modal Print Preview */}
                {showPrintModal && (
                  <PPDBPrintCard
                    registration={submittedData}
                    onClose={() => setShowPrintModal(false)}
                  />
                )}
              </div>
            ) : (
              /* MULTI STEP WIZARD FORM */
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
                
                {/* Stepper Bar */}
                <div className="border-b border-slate-100 pb-6">
                  <div className="flex items-center justify-between">
                    {[
                      { num: 1, title: 'Data Calon Siswa' },
                      { num: 2, title: 'Data Orang Tua' },
                      { num: 3, title: 'Jalur & Dokumen' },
                      { num: 4, title: 'Konfirmasi' }
                    ].map((step) => (
                      <div key={step.num} className="flex flex-col items-center text-center flex-1">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
                          currentStep === step.num
                            ? 'bg-emerald-700 text-white ring-4 ring-emerald-100 shadow-sm'
                            : currentStep > step.num
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-400'
                        }`}>
                          {currentStep > step.num ? '✓' : step.num}
                        </div>
                        <span className={`text-[10px] sm:text-xs font-semibold mt-2 hidden sm:block ${
                          currentStep === step.num ? 'text-emerald-800 font-bold' : 'text-slate-400'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmitForm} className="space-y-6">
                  
                  {/* STEP 1: DATA SISWA */}
                  {currentStep === 1 && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="border-b border-slate-100 pb-2">
                        <h4 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                          <User className="w-5 h-5 text-emerald-600" />
                          <span>Langkah 1: Identitas Calon Peserta Didik</span>
                        </h4>
                        <p className="text-xs text-slate-500">
                          Harap mengisi data sesuai dengan Kartu Keluarga (KK) dan Akta Kelahiran
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Nama Lengkap Siswa <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            placeholder="Contoh: Muhammad Farhan Al-Hafidz"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            NISN (Nomor Induk Siswa Nasional) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="nisn"
                            maxLength={10}
                            placeholder="10 digit nomor NISN dari SD/MI"
                            value={formData.nisn}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            NIK Siswa (Nomor Induk Kependudukan)
                          </label>
                          <input
                            type="text"
                            name="nik"
                            maxLength={16}
                            placeholder="16 digit NIK tertera di KK"
                            value={formData.nik}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Jenis Kelamin <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                          >
                            <option value="L">Laki-Laki</option>
                            <option value="P">Perempuan</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Tempat Lahir <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="birthPlace"
                            placeholder="Contoh: Brebes / Tegal"
                            value={formData.birthPlace}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Tanggal Lahir <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Asal Sekolah (SD / MI) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="previousSchool"
                            placeholder="Contoh: MI Nurul Huda Mendala / SDN 01 Mendala"
                            value={formData.previousSchool}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Anak Ke - dari Jumlah Saudara
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              min={1}
                              name="childNumber"
                              value={formData.childNumber}
                              onChange={handleInputChange}
                              placeholder="Anak ke"
                              className="w-1/2 px-3 py-2 text-xs rounded-xl border border-slate-300"
                            />
                            <input
                              type="number"
                              min={1}
                              name="totalSiblings"
                              value={formData.totalSiblings}
                              onChange={handleInputChange}
                              placeholder="Bersaudara"
                              className="w-1/2 px-3 py-2 text-xs rounded-xl border border-slate-300"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Cita-cita / Minat Khusus
                          </label>
                          <input
                            type="text"
                            name="aspiration"
                            placeholder="Contoh: Hafidz Qur'an, Guru, Ahli Robotika"
                            value={formData.aspiration}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: DATA ORANG TUA & ALAMAT */}
                  {currentStep === 2 && (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="border-b border-slate-100 pb-2">
                        <h4 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                          <Users className="w-5 h-5 text-emerald-600" />
                          <span>Langkah 2: Data Orang Tua / Wali & Domisili</span>
                        </h4>
                        <p className="text-xs text-slate-500">
                          Informasi kontak wali untuk konfirmasi berkas dan undangan pertemuan
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Nama Lengkap Ayah Kandung <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="fatherName"
                            placeholder="Nama Ayah"
                            value={formData.fatherName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Pekerjaan Ayah
                          </label>
                          <input
                            type="text"
                            name="fatherOccupation"
                            placeholder="Contoh: Petani / Pedagang / Guru / Wiraswasta"
                            value={formData.fatherOccupation}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Nama Lengkap Ibu Kandung <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="motherName"
                            placeholder="Nama Ibu"
                            value={formData.motherName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Pekerjaan Ibu
                          </label>
                          <input
                            type="text"
                            name="motherOccupation"
                            placeholder="Contoh: Ibu Rumah Tangga / Pedagang"
                            value={formData.motherOccupation}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            No. WhatsApp Aktif Orang Tua/Wali <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="fatherPhone"
                            placeholder="Contoh: 081234567890"
                            value={formData.fatherPhone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-mono rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                          />
                          <span className="text-[10px] text-slate-400">Notifikasi verifikasi akan dikirimkan ke nomor ini</span>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Rata-Rata Penghasilan Orang Tua / Bulan
                          </label>
                          <select
                            name="fatherIncome"
                            value={formData.fatherIncome}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300"
                          >
                            <option value="< Rp 1.000.000">&lt; Rp 1.000.000 (Jalur KIP/Afirmasi)</option>
                            <option value="Rp 1.000.000 - Rp 2.500.000">Rp 1.000.000 - Rp 2.500.000</option>
                            <option value="Rp 2.500.000 - Rp 5.000.000">Rp 2.500.000 - Rp 5.000.000</option>
                            <option value="> Rp 5.000.000">&gt; Rp 5.000.000</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Alamat Tempat Tinggal (Dusun, RT/RW, Jalan) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="street"
                            placeholder="Contoh: Dusun Krajan RT 03 / RW 01, Jl. Pesantren"
                            value={formData.street}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Desa / Kelurahan
                          </label>
                          <input
                            type="text"
                            name="village"
                            placeholder="Contoh: Mendala, Batursari, Mlayang, Dawuhan"
                            value={formData.village}
                            onChange={handleInputChange}
                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Kecamatan & Kabupaten
                          </label>
                          <input
                            type="text"
                            name="district"
                            placeholder="Contoh: Sirampog, Brebes"
                            value={`${formData.district}, ${formData.city}`}
                            disabled
                            className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-100 text-slate-600"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: JALUR & UNGGAH BERKAS DOKUMEN */}
                  {currentStep === 3 && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="border-b border-slate-100 pb-2">
                        <h4 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-emerald-600" />
                          <span>Langkah 3: Pilihan Jalur & Berkas Dokumen</span>
                        </h4>
                        <p className="text-xs text-slate-500">
                          Pilih program pendidikan madrasah dan unggah foto/scan berkas persyaratan
                        </p>
                      </div>

                      {/* Jalur Pilihan */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">
                          Pilihan Jalur Pendaftaran <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { id: 'reguler', title: 'Jalur Reguler', desc: 'Kurikulum standar Kemenag & Kurikulum Merdeka Terpadu.' },
                            { id: 'tahfidz', title: 'Jalur Khusus Tahfidz Qur\'an', desc: 'Bebas SPP bagi hafidz/hafidzah minimal 2 Juz Al-Qur\'an.' },
                            { id: 'prestasi', title: 'Jalur Prestasi Akademik / Non-Akademik', desc: 'Juara KSM, OSN, MTQ, POPDA, atau Juara Kelas SD/MI.' },
                            { id: 'afirmasi', title: 'Jalur Afirmasi / KIP / Yatim Piatu', desc: 'Bantuan subsidi penuh bagi keluarga pemegang KIP/PKH.' }
                          ].map((track) => (
                            <label
                              key={track.id}
                              className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                                formData.track === track.id
                                  ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500'
                                  : 'border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <span className="font-bold text-xs sm:text-sm text-slate-900">
                                  {track.title}
                                </span>
                                <input
                                  type="radio"
                                  name="track"
                                  value={track.id}
                                  checked={formData.track === track.id}
                                  onChange={handleInputChange}
                                  className="text-emerald-600 focus:ring-emerald-500"
                                />
                              </div>
                              <p className="text-[11px] text-slate-500 mt-1">
                                {track.desc}
                              </p>
                            </label>
                          ))}
                        </div>
                      </div>

                      {formData.track === 'tahfidz' && (
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                          <label className="block text-xs font-bold text-emerald-950">
                            Berapa perkiraan jumlah Juz Al-Qur'an yang telah dihafal saat ini?
                          </label>
                          <input
                            type="number"
                            name="hafalanJuz"
                            min={0}
                            max={30}
                            placeholder="Contoh: 1, 2, atau 3 Juz (Juz 30 dsb)"
                            value={formData.hafalanJuz}
                            onChange={handleInputChange}
                            className="w-full sm:w-64 px-3 py-2 text-xs rounded-xl border border-emerald-300 bg-white"
                          />
                        </div>
                      )}

                      {/* File Uploads Grid */}
                      <div className="space-y-4 pt-2">
                        <span className="font-bold text-xs text-slate-800 block">
                          Unggah Berkas Pendukung (Format Gambar / JPG / PNG):
                        </span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          
                          {/* Pas Foto */}
                          <div className="p-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-50 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-slate-800">
                                  1. Pas Foto Siswa (3x4)
                                </span>
                                {formData.photoUrl && (
                                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                                    Terunggah ✓
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500">
                                Foto berpakaian seragam rapi atau berkerudung bagi putri
                              </p>
                            </div>

                            <div className="mt-3 flex items-center gap-3">
                              {formData.photoUrl && (
                                <img
                                  src={formData.photoUrl}
                                  alt="Preview Foto"
                                  className="w-10 h-12 object-cover rounded-lg border border-slate-300"
                                />
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, 'photoUrl')}
                                className="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer"
                              />
                            </div>
                          </div>

                          {/* Kartu Keluarga */}
                          <div className="p-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-50 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-slate-800">
                                  2. Kartu Keluarga (KK)
                                </span>
                                {formData.familyCardUrl && (
                                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                                    Terunggah ✓
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500">
                                Foto jelas lembar Kartu Keluarga orang tua
                              </p>
                            </div>

                            <div className="mt-3 flex items-center gap-3">
                              {formData.familyCardUrl && (
                                <img
                                  src={formData.familyCardUrl}
                                  alt="Preview KK"
                                  className="w-10 h-12 object-cover rounded-lg border border-slate-300"
                                />
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, 'familyCardUrl')}
                                className="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer"
                              />
                            </div>
                          </div>

                          {/* Akta Kelahiran */}
                          <div className="p-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-50 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-slate-800">
                                  3. Akta Kelahiran Siswa
                                </span>
                                {formData.birthCertUrl && (
                                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                                    Terunggah ✓
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500">
                                Foto jelas dokumen Akta Lahir
                              </p>
                            </div>

                            <div className="mt-3 flex items-center gap-3">
                              {formData.birthCertUrl && (
                                <img
                                  src={formData.birthCertUrl}
                                  alt="Preview Akta"
                                  className="w-10 h-12 object-cover rounded-lg border border-slate-300"
                                />
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, 'birthCertUrl')}
                                className="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer"
                              />
                            </div>
                          </div>

                          {/* SKL / Rapor */}
                          <div className="p-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-50 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-slate-800">
                                  4. Ijazah / SKL / Rapor SD/MI
                                </span>
                                {formData.reportOrSklUrl && (
                                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                                    Terunggah ✓
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500">
                                Surat Keterangan Lulus atau nilai rapor semester akhir (bisa menyusul)
                              </p>
                            </div>

                            <div className="mt-3 flex items-center gap-3">
                              {formData.reportOrSklUrl && (
                                <img
                                  src={formData.reportOrSklUrl}
                                  alt="Preview SKL"
                                  className="w-10 h-12 object-cover rounded-lg border border-slate-300"
                                />
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload(e, 'reportOrSklUrl')}
                                className="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer"
                              />
                            </div>
                          </div>

                        </div>
                        <p className="text-[11px] text-slate-400 italic">
                          *Berkas fisik asli dapat dibawa saat jadwal verifikasi tatap muka di kampus madrasah.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* STEP 4: KONFIRMASI & RINGKASAN */}
                  {currentStep === 4 && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="border-b border-slate-100 pb-2">
                        <h4 className="font-extrabold text-base sm:text-lg text-slate-900 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>Langkah 4: Konfirmasi & Pernyataan</span>
                        </h4>
                        <p className="text-xs text-slate-500">
                          Harap periksa kembali kebenaran data calon siswa sebelum dikirim ke database
                        </p>
                      </div>

                      {/* Summary Box */}
                      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <span className="text-slate-400 block">Nama Lengkap Siswa:</span>
                            <span className="font-bold text-slate-800 text-sm uppercase">{formData.fullName}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">NISN / NIK:</span>
                            <span className="font-mono font-bold text-slate-800">{formData.nisn} / {formData.nik || '-'}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Asal Sekolah:</span>
                            <span className="font-semibold text-slate-800">{formData.previousSchool}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Jalur PPDB:</span>
                            <span className="font-bold uppercase text-emerald-700">{formData.track}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Nama Orang Tua:</span>
                            <span className="text-slate-800">Ayah: {formData.fatherName} | Ibu: {formData.motherName}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">No. WhatsApp Wali:</span>
                            <span className="font-mono font-bold text-emerald-700">{formData.fatherPhone}</span>
                          </div>
                          <div className="sm:col-span-2">
                            <span className="text-slate-400 block">Alamat Domisili:</span>
                            <span className="text-slate-700">{formData.street}, {formData.village}, {formData.district}, Brebes</span>
                          </div>
                        </div>
                      </div>

                      {/* Declaration Checkbox */}
                      <label className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/70 border border-amber-200 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          className="mt-1 text-emerald-600 focus:ring-emerald-500 rounded"
                        />
                        <span className="text-xs text-amber-950 leading-relaxed">
                          Saya menyatakan dengan sesungguhnya bahwa data yang diisikan di atas adalah benar dan dapat dipertanggungjawabkan. Saya bersedia mematuhi tata tertib dan ketentuan PPDB di MTs Nurul Huda Mendala.
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Form Footer Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep((prev) => prev - 1)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali</span>
                      </button>
                    ) : <div />}

                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition cursor-pointer"
                      >
                        <span>Lanjut ke Langkah {currentStep + 1}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-sm font-extrabold shadow-lg transition transform active:scale-95 disabled:opacity-50 cursor-pointer"
                      >
                        {submitting ? (
                          <span>Menyimpan ke Cloud...</span>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-amber-300" />
                            <span>Kirim Pendaftaran & Dapatkan Nomor</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                </form>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: CEK STATUS PENDAFTARAN */}
        {activeTab === 'status' && (
          <div className="max-w-4xl mx-auto">
            <PPDBCheckStatus />
          </div>
        )}

        {/* TAB 3: INFORMASI ALUR & PERSYARATAN */}
        {activeTab === 'info' && (
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Flow Steps */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-xl font-bold text-slate-900">
                  Alur Pendaftaran Peserta Didik Baru
                </h3>
                <p className="text-xs text-slate-500">
                  5 langkah mudah menjadi santri/siswa MTs Nurul Huda Mendala
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PPDB_FLOW_STEPS.map((step) => (
                  <div key={step.step} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                    <div>
                      <span className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center mb-3">
                        {step.step}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900">
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Syarat Pendaftaran */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-3">
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-emerald-600" />
                  <span>Syarat Berkas Fisik / Administrasi</span>
                </h4>
                <ul className="text-xs text-slate-600 space-y-2 pt-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>Mengisi Formulir PPDB Online / Offline</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>Fotokopi Kartu Keluarga (KK) 2 Lembar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>Fotokopi Akta Kelahiran Siswa 2 Lembar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>Fotokopi Ijazah / SKL SD/MI (dapat menyusul)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>Pas Foto 3x4 berwarna (3 lembar)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <span>Fotokopi KIP / PKH (khusus jalur afirmasi)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-3">
                <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Jadwal Gelombang & Beasiswa</span>
                </h4>
                <div className="space-y-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="font-bold text-emerald-900 block">Gelombang I (Jalur Istimewa):</span>
                    <p className="text-emerald-800 text-[11px] mt-0.5">
                      Bebas biaya formulir pendaftaran, potongan biaya seragam, dan prioritas masuk kelas Tahfidz.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-800 block">Gelombang II (Jalur Reguler):</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      Dibuka hingga kuota 4 rombongan belajar terpenuhi.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
