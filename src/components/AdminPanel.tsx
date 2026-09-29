import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  X, 
  Users, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  Eye, 
  Trash2, 
  Edit3, 
  Plus, 
  Lock, 
  KeyRound, 
  FileText, 
  Bell, 
  MessageSquare,
  AlertCircle,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import type { PPDBRegistration, AnnouncementItem, ContactInquiry, RegistrationStatus } from '../types';
import { 
  fetchAllPPDBRegistrations, 
  updateRegistrationStatus, 
  deletePPDBRegistration,
  fetchSchoolAnnouncements,
  addSchoolAnnouncement,
  deleteSchoolAnnouncement,
  fetchContactInquiries
} from '../services/firebase';
import { PPDBPrintCard } from './PPDBPrintCard';
import { INITIAL_SAMPLE_REGISTRATION, INITIAL_ANNOUNCEMENTS } from '../data/mockData';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Active Sub-Tab
  const [adminTab, setAdminTab] = useState<'registrations' | 'announcements' | 'inquiries' | 'stats'>('registrations');

  // Data States
  const [registrations, setRegistrations] = useState<PPDBRegistration[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [trackFilter, setTrackFilter] = useState<string>('all');

  // Modals inside Admin
  const [selectedStudent, setSelectedStudent] = useState<PPDBRegistration | null>(null);
  const [printStudent, setPrintStudent] = useState<PPDBRegistration | null>(null);
  const [editingStatus, setEditingStatus] = useState<RegistrationStatus>('pending');
  const [adminNote, setAdminNote] = useState<string>('');

  // New Announcement Form State
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnCategory, setNewAnnCategory] = useState<'Akademik' | 'PPDB' | 'Kegiatan' | 'Prestasi' | 'Umum'>('PPDB');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [newAnnAuthor, setNewAnnAuthor] = useState('Panitia PPDB');

  // Load Data
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [regs, anns, inqs] = await Promise.all([
        fetchAllPPDBRegistrations(),
        fetchSchoolAnnouncements(),
        fetchContactInquiries(),
      ]);

      // If empty, seed initial sample demo for immediate visibility
      if (regs.length === 0) {
        setRegistrations([INITIAL_SAMPLE_REGISTRATION]);
      } else {
        setRegistrations(regs);
      }

      if (anns.length === 0) {
        setAnnouncements(INITIAL_ANNOUNCEMENTS);
      } else {
        setAnnouncements(anns);
      }

      setInquiries(inqs);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadAllData();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  // Handle Login
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === 'admin123' || pinInput === 'nurulhuda' || pinInput === 'mendala') {
      setIsAuthenticated(true);
      setPinError('');
      loadAllData();
    } else {
      setPinError('PIN Akses Salah. Coba: admin123');
    }
  };

  // Status Update
  const handleSaveStatus = async () => {
    if (!selectedStudent) return;
    setLoading(true);
    const success = await updateRegistrationStatus(selectedStudent.id, editingStatus, adminNote);
    if (success) {
      setRegistrations((prev) =>
        prev.map((item) =>
          item.id === selectedStudent.id
            ? { ...item, status: editingStatus, adminNotes: adminNote, verifiedAt: new Date().toISOString() }
            : item
        )
      );
      setSelectedStudent(null);
    }
    setLoading(false);
  };

  // Delete Registration
  const handleDeleteRegistration = async (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus data pendaftaran siswa "${name}"? Tindakan ini tidak dapat dibatalkan.`)) {
      await deletePPDBRegistration(id);
      setRegistrations((prev) => prev.filter((r) => r.id !== id));
      if (selectedStudent?.id === id) setSelectedStudent(null);
    }
  };

  // Add Announcement
  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnContent.trim()) return;

    setLoading(true);
    const created = await addSchoolAnnouncement({
      title: newAnnTitle,
      category: newAnnCategory,
      content: newAnnContent,
      author: newAnnAuthor,
      date: new Date().toISOString().split('T')[0],
      isImportant: false,
    });
    setAnnouncements((prev) => [created, ...prev]);
    setNewAnnTitle('');
    setNewAnnContent('');
    setLoading(false);
    alert('Pengumuman berhasil ditambahkan dan langsung tayang di website!');
  };

  // Delete Announcement
  const handleDeleteAnnouncement = async (id: string) => {
    if (confirm('Hapus pengumuman ini?')) {
      await deleteSchoolAnnouncement(id);
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (registrations.length === 0) {
      alert('Tidak ada data pendaftar untuk diekspor');
      return;
    }

    const headers = [
      'No Registrasi',
      'Tanggal Daftar',
      'Status',
      'Nama Siswa',
      'NISN',
      'NIK',
      'Jenis Kelamin',
      'Tempat Lahir',
      'Tanggal Lahir',
      'Asal Sekolah',
      'Jalur',
      'Nama Ayah',
      'Nama Ibu',
      'No WA Orang Tua',
      'Desa',
      'Kecamatan',
      'Catatan Panitia'
    ];

    const rows = registrations.map((r) => [
      `"${r.registrationNumber}"`,
      `"${new Date(r.createdAt).toLocaleDateString('id-ID')}"`,
      `"${r.status}"`,
      `"${r.student.fullName}"`,
      `"${r.student.nisn}"`,
      `"${r.student.nik}"`,
      `"${r.student.gender}"`,
      `"${r.student.birthPlace}"`,
      `"${r.student.birthDate}"`,
      `"${r.student.previousSchool}"`,
      `"${r.program.track}"`,
      `"${r.parents.fatherName}"`,
      `"${r.parents.motherName}"`,
      `"${r.parents.fatherPhone || r.parents.motherPhone}"`,
      `"${r.address.village}"`,
      `"${r.address.district}"`,
      `"${r.adminNotes || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PPDB_MTs_Nurul_Huda_Mendala_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered registrations
  const filteredRegistrations = registrations.filter((r) => {
    const matchesSearch =
      r.student.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.student.nisn.includes(searchQuery) ||
      r.student.previousSchool.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesTrack = trackFilter === 'all' || r.program.track === trackFilter;

    return matchesSearch && matchesStatus && matchesTrack;
  });

  // Calculate statistics
  const stats = {
    total: registrations.length,
    pending: registrations.filter((r) => r.status === 'pending').length,
    verified: registrations.filter((r) => r.status === 'verified').length,
    interview: registrations.filter((r) => r.status === 'interview').length,
    accepted: registrations.filter((r) => r.status === 'accepted').length,
    rejected: registrations.filter((r) => r.status === 'rejected').length,
    tahfidzTrack: registrations.filter((r) => r.program.track === 'tahfidz').length,
    regulerTrack: registrations.filter((r) => r.program.track === 'reguler').length,
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header Modal */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black flex items-center gap-2">
                <span>Panel Administrasi Panitia PPDB & Sistem Informasi</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-700 text-amber-300">
                  Cloud Admin
                </span>
              </h3>
              <p className="text-xs text-emerald-200">
                MTs Nurul Huda Mendala, Sirampog, Brebes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* AUTHENTICATION VIEW */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-bold text-slate-900">
                Verifikasi Akses Panitia
              </h4>
              <p className="text-xs text-slate-500">
                Masukkan PIN Panitia PPDB untuk membuka data pendaftaran dan mengelola website.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-3">
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  placeholder="Masukkan PIN (Default: admin123)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-center font-mono text-sm tracking-widest focus:outline-none focus:border-emerald-600"
                />
              </div>

              {pinError && (
                <p className="text-xs text-red-600 font-semibold">{pinError}</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
              >
                Masuk ke Backoffice
              </button>
            </form>

            <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500">
              Kunci akses pengujian panitia: <code>admin123</code>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Sub-Navigation Bar */}
            <div className="bg-slate-50 px-4 sm:px-6 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setAdminTab('registrations')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    adminTab === 'registrations'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Data Pendaftar ({registrations.length})</span>
                </button>

                <button
                  onClick={() => setAdminTab('stats')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    adminTab === 'stats'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Statistik Ringkas</span>
                </button>

                <button
                  onClick={() => setAdminTab('announcements')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    adminTab === 'announcements'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Kelola Berita ({announcements.length})</span>
                </button>

                <button
                  onClick={() => setAdminTab('inquiries')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    adminTab === 'inquiries'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Pesan Masuk ({inquiries.length})</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={loadAllData}
                  disabled={loading}
                  className="p-1.5 text-slate-500 hover:text-emerald-700 rounded-lg hover:bg-slate-200 transition cursor-pointer"
                  title="Muat Ulang Data dari Cloud"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>

                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-700 transition cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ekspor CSV</span>
                </button>
              </div>
            </div>

            {/* TAB CONTENT CONTAINER */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              
              {/* 1. DATA PENDAFTAR TABLE */}
              {adminTab === 'registrations' && (
                <div className="space-y-4">
                  {/* Filters & Search */}
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                    <div className="relative w-full sm:w-72">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Cari nama, nomor, atau NISN..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-2.5 py-1.5 text-xs rounded-xl border border-slate-300 bg-white"
                      >
                        <option value="all">Semua Status</option>
                        <option value="pending">Menunggu Verifikasi</option>
                        <option value="verified">Berkas Terverifikasi</option>
                        <option value="interview">Wawancara / Tes</option>
                        <option value="accepted">Diterima</option>
                        <option value="rejected">Ditolak / Kurang</option>
                      </select>

                      <select
                        value={trackFilter}
                        onChange={(e) => setTrackFilter(e.target.value)}
                        className="px-2.5 py-1.5 text-xs rounded-xl border border-slate-300 bg-white"
                      >
                        <option value="all">Semua Jalur</option>
                        <option value="reguler">Reguler</option>
                        <option value="tahfidz">Tahfidz Qur'an</option>
                        <option value="prestasi">Prestasi</option>
                        <option value="afirmasi">Afirmasi / KIP</option>
                      </select>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                        <tr>
                          <th className="py-3 px-4">No. Pendaftaran</th>
                          <th className="py-3 px-4">Nama Siswa</th>
                          <th className="py-3 px-4">NISN / Asal Sekolah</th>
                          <th className="py-3 px-4">Jalur</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredRegistrations.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/80 transition">
                            <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                              {item.registrationNumber}
                              <span className="block text-[10px] text-slate-400 font-normal">
                                {new Date(item.createdAt).toLocaleDateString('id-ID')}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-semibold text-slate-900 uppercase">
                              {item.student.fullName}
                              <span className="block text-[10px] text-slate-500 font-normal">
                                {item.student.gender === 'L' ? 'Laki-Laki' : 'Perempuan'} • {item.address.village}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-mono text-slate-700">{item.student.nisn}</span>
                              <span className="block text-[10px] text-slate-500">
                                {item.student.previousSchool}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="font-bold text-[11px] uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                                {item.program.track}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                                item.status === 'accepted'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : item.status === 'verified'
                                  ? 'bg-blue-100 text-blue-800'
                                  : item.status === 'interview'
                                  ? 'bg-indigo-100 text-indigo-800'
                                  : item.status === 'rejected'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {item.status.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => {
                                    setSelectedStudent(item);
                                    setEditingStatus(item.status);
                                    setAdminNote(item.adminNotes || '');
                                  }}
                                  className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                                  title="Detail & Verifikasi Berkas"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setPrintStudent(item)}
                                  className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                                  title="Cetak Kartu"
                                >
                                  <Printer className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteRegistration(item.id, item.student.fullName)}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                                  title="Hapus"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {filteredRegistrations.length === 0 && (
                      <div className="py-10 text-center text-slate-400 text-xs">
                        Tidak ada data siswa yang cocok dengan filter pencarian.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 2. STATS TAB */}
              {adminTab === 'stats' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                      <span className="text-xs text-emerald-700 font-bold block">Total Pendaftar</span>
                      <span className="text-2xl sm:text-3xl font-black text-emerald-950">{stats.total}</span>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                      <span className="text-xs text-amber-700 font-bold block">Menunggu Verifikasi</span>
                      <span className="text-2xl sm:text-3xl font-black text-amber-950">{stats.pending}</span>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                      <span className="text-xs text-blue-700 font-bold block">Berkas Terverifikasi</span>
                      <span className="text-2xl sm:text-3xl font-black text-blue-950">{stats.verified}</span>
                    </div>
                    <div className="p-4 bg-green-50 rounded-2xl border border-green-200">
                      <span className="text-xs text-green-700 font-bold block">Dinyatakan Diterima</span>
                      <span className="text-2xl sm:text-3xl font-black text-green-950">{stats.accepted}</span>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                    <h4 className="font-bold text-sm text-slate-900">Distribusi Jalur Pendaftaran</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                        <span>Jalur Khusus Tahfidz Qur'an:</span>
                        <strong className="text-emerald-700">{stats.tahfidzTrack} Siswa</strong>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                        <span>Jalur Reguler & Lainnya:</span>
                        <strong className="text-slate-800">{stats.regulerTrack} Siswa</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. MANAJEMEN PENGUMUMAN */}
              {adminTab === 'announcements' && (
                <div className="space-y-6">
                  {/* Form Tambah Pengumuman */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-emerald-600" />
                      <span>Buat Pengumuman Baru (Langsung Tayang ke Web)</span>
                    </h4>

                    <form onSubmit={handleAddAnnouncement} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Judul Pengumuman
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Jadwal Tes Baca Qur'an Gelombang 1"
                            value={newAnnTitle}
                            onChange={(e) => setNewAnnTitle(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Kategori
                          </label>
                          <select
                            value={newAnnCategory}
                            onChange={(e) => setNewAnnCategory(e.target.value as any)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
                          >
                            <option value="PPDB">PPDB</option>
                            <option value="Akademik">Akademik</option>
                            <option value="Kegiatan">Kegiatan</option>
                            <option value="Prestasi">Prestasi</option>
                            <option value="Umum">Umum</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Isi Pengumuman
                        </label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Tuliskan isi pengumuman secara rinci..."
                          value={newAnnContent}
                          onChange={(e) => setNewAnnContent(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                      >
                        Publikasikan Pengumuman
                      </button>
                    </form>
                  </div>

                  {/* List Pengumuman */}
                  <div className="space-y-3">
                    <h5 className="font-bold text-xs text-slate-700">Daftar Pengumuman Aktif:</h5>
                    <div className="grid grid-cols-1 gap-3">
                      {announcements.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white p-4 rounded-xl border border-slate-200 flex items-start justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                                {item.category}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                            </div>
                            <h5 className="font-bold text-sm text-slate-900">{item.title}</h5>
                            <p className="text-xs text-slate-600 line-clamp-2">{item.content}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteAnnouncement(item.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg shrink-0 cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. PESAN MASUK (INQUIRIES) */}
              {adminTab === 'inquiries' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-slate-900">
                    Pesan & Konsultasi dari Masyarakat
                  </h4>
                  {inquiries.length > 0 ? (
                    <div className="space-y-3">
                      {inquiries.map((inq) => (
                        <div key={inq.id} className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-slate-900">{inq.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {new Date(inq.createdAt).toLocaleDateString('id-ID')}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-3 text-xs text-slate-500 font-mono">
                            <span>WA: {inq.phone}</span>
                            {inq.email && <span>Email: {inq.email}</span>}
                            <span className="font-sans font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                              {inq.subject}
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            {inq.message}
                          </p>
                          <div className="pt-1">
                            <a
                              href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1"
                            >
                              Balas via WhatsApp &rarr;
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 bg-white rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
                      Belum ada pesan masuk dari form kontak.
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      {/* MODAL DETAIL & VERIFIKASI SISWA */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] font-mono text-emerald-800 font-bold block">
                  {selectedStudent.registrationNumber}
                </span>
                <h4 className="font-extrabold text-base sm:text-lg text-slate-900">
                  {selectedStudent.student.fullName}
                </h4>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Biodata Quick Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="text-slate-500 block">NISN / NIK:</span>
                <span className="font-mono font-bold">{selectedStudent.student.nisn} / {selectedStudent.student.nik}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Asal Sekolah:</span>
                <span className="font-semibold">{selectedStudent.student.previousSchool}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Orang Tua:</span>
                <span>{selectedStudent.parents.fatherName} / {selectedStudent.parents.motherName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">No. WA Orang Tua:</span>
                <span className="font-mono font-bold text-emerald-700">
                  {selectedStudent.parents.fatherPhone || selectedStudent.parents.motherPhone}
                </span>
              </div>
            </div>

            {/* Document Previews */}
            <div className="space-y-2">
              <span className="font-bold text-xs text-slate-800 block">
                Lampiran Berkas Persyaratan (Cloud Storage):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                {selectedStudent.documents?.photoUrl ? (
                  <div className="p-2 border rounded-xl bg-slate-50">
                    <img
                      src={selectedStudent.documents.photoUrl}
                      alt="Pas Foto"
                      className="w-full h-24 object-cover rounded-lg mb-1"
                    />
                    <span className="text-[10px] font-bold text-slate-600 block">Pas Foto</span>
                  </div>
                ) : (
                  <div className="p-3 border border-dashed rounded-xl text-[10px] text-slate-400 flex items-center justify-center">
                    Pas Foto Kosong
                  </div>
                )}

                {selectedStudent.documents?.familyCardUrl ? (
                  <div className="p-2 border rounded-xl bg-slate-50">
                    <img
                      src={selectedStudent.documents.familyCardUrl}
                      alt="Kartu Keluarga"
                      className="w-full h-24 object-cover rounded-lg mb-1"
                    />
                    <span className="text-[10px] font-bold text-slate-600 block">KK</span>
                  </div>
                ) : (
                  <div className="p-3 border border-dashed rounded-xl text-[10px] text-slate-400 flex items-center justify-center">
                    KK Kosong
                  </div>
                )}

                {selectedStudent.documents?.birthCertUrl ? (
                  <div className="p-2 border rounded-xl bg-slate-50">
                    <img
                      src={selectedStudent.documents.birthCertUrl}
                      alt="Akta Lahir"
                      className="w-full h-24 object-cover rounded-lg mb-1"
                    />
                    <span className="text-[10px] font-bold text-slate-600 block">Akta</span>
                  </div>
                ) : (
                  <div className="p-3 border border-dashed rounded-xl text-[10px] text-slate-400 flex items-center justify-center">
                    Akta Kosong
                  </div>
                )}

                {selectedStudent.documents?.reportOrSklUrl ? (
                  <div className="p-2 border rounded-xl bg-slate-50">
                    <img
                      src={selectedStudent.documents.reportOrSklUrl}
                      alt="SKL / Rapor"
                      className="w-full h-24 object-cover rounded-lg mb-1"
                    />
                    <span className="text-[10px] font-bold text-slate-600 block">SKL/Rapor</span>
                  </div>
                ) : (
                  <div className="p-3 border border-dashed rounded-xl text-[10px] text-slate-400 flex items-center justify-center">
                    SKL Kosong
                  </div>
                )}
              </div>
            </div>

            {/* Update Status Section */}
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
              <span className="font-bold text-xs text-emerald-950 block">
                Ubah Status Verifikasi & Catatan Panitia:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Status Seleksi
                  </label>
                  <select
                    value={editingStatus}
                    onChange={(e) => setEditingStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-300 bg-white"
                  >
                    <option value="pending">Menunggu Verifikasi (Pending)</option>
                    <option value="verified">Berkas Terverifikasi (Lolos Berkas)</option>
                    <option value="interview">Tahap Wawancara / Tes Observasi</option>
                    <option value="accepted">Dinyatakan DITERIMA</option>
                    <option value="rejected">Ditolak / Berkas Perlu Perbaikan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Catatan untuk Calon Siswa/Wali
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Berkas sah. Jadwal tes 12 Juli"
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-300 bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleSaveStatus}
                disabled={loading}
                className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                {loading ? 'Menyimpan...' : 'Simpan Status ke Cloud'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRINT PREVIEW MODAL */}
      {printStudent && (
        <PPDBPrintCard
          registration={printStudent}
          onClose={() => setPrintStudent(null)}
        />
      )}
    </div>
  );
};
