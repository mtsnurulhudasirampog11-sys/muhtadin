export type RegistrationStatus = 
  | 'pending'        // Menunggu Verifikasi
  | 'verified'       // Berkas Terverifikasi
  | 'interview'      // Tahap Wawancara / Tes
  | 'accepted'       // Diterima
  | 'rejected'       // Tidak Memenuhi Syarat
  | 'reserved';      // Cadangan

export type ProgramTrack = 
  | 'reguler'        // Kelas Reguler
  | 'tahfidz'        // Kelas Khusus Tahfidz Al-Qur'an
  | 'prestasi'       // Jalur Prestasi Akademik & Non-Akademik
  | 'afirmasi';      // Jalur Afirmasi / KIP / Yatim Piatu

export interface PPDBRegistration {
  id: string;
  registrationNumber: string; // e.g. PPDB-NHM-2026-0012
  createdAt: string;
  status: RegistrationStatus;
  adminNotes?: string;
  verifiedAt?: string;
  
  // Data Siswa
  student: {
    fullName: string;
    nisn: string;
    nik: string;
    gender: 'L' | 'P';
    birthPlace: string;
    birthDate: string;
    religion: string;
    previousSchool: string; // SD / MI Asal
    schoolType: 'MI' | 'SD';
    previousSchoolNpsn?: string;
    childNumber: number;
    totalSiblings: number;
    hobby?: string;
    aspiration?: string; // Cita-cita
  };

  // Data Alamat
  address: {
    street: string;
    village: string; // Desa (e.g. Mendala, Batursari, Mlayang, Dawuhan, Sirampog)
    district: string; // Kecamatan (e.g. Sirampog, Bumiayu, Tonjong)
    city: string; // Kabupaten (e.g. Brebes, Tegal)
    province: string; // Jawa Tengah
    postalCode: string;
    residenceType: 'Bersama Orang Tua' | 'Asrama / Pondok Pesantren' | 'Wali / Kerabat';
  };

  // Data Orang Tua / Wali
  parents: {
    fatherName: string;
    fatherNik?: string;
    fatherOccupation: string;
    fatherPhone: string;
    fatherIncome: string;

    motherName: string;
    motherNik?: string;
    motherOccupation: string;
    motherPhone: string;
    motherIncome: string;

    guardianName?: string;
    guardianOccupation?: string;
    guardianPhone?: string;
  };

  // Pilihan Pendaftaran
  program: {
    track: ProgramTrack;
    entryGrade: 'Kelas VII (Tujuh)' | 'Pindahan Kelas VIII' | 'Pindahan Kelas IX';
    specialNeed?: string;
    hafalanJuz?: number; // Jumlah juz yang dihafal jika tahfidz
  };

  // Berkas Dokumen (Base64 atau Data URL untuk Cloud Storage / Firestore)
  documents: {
    photoUrl?: string; // Pas foto 3x4
    familyCardUrl?: string; // Kartu Keluarga
    birthCertUrl?: string; // Akta Kelahiran
    reportOrSklUrl?: string; // Ijazah / SKL / Rapor
    achievementCertUrl?: string; // Piagam jika jalur prestasi
  };
}

export interface AnnouncementItem {
  id: string;
  title: string;
  category: 'Akademik' | 'PPDB' | 'Kegiatan' | 'Prestasi' | 'Umum';
  date: string;
  content: string;
  author: string;
  isImportant?: boolean;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead?: boolean;
}

export interface TeacherStaff {
  id: string;
  name: string;
  role: string;
  subjects?: string[];
  education: string;
  photoUrl?: string;
}

export interface FacilityItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  imageUrl?: string;
}
