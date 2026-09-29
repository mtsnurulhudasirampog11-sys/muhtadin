import type { TeacherStaff, FacilityItem, AnnouncementItem, PPDBRegistration } from '../types';

export const SCHOOL_INFO = {
  name: 'MTs Nurul Huda Mendala',
  fullName: 'Madrasah Tsanawiyah Nurul Huda Mendala',
  tagline: 'Mencetak Generasi Qur\'ani, Berprestasi, Mandiri, dan Berakhlakul Karimah',
  npsn: '20364912',
  nsm: '121233290045',
  accreditation: 'Akreditasi A (Unggul)',
  status: 'Madrasah Swasta Berkualitas Kemenag RI',
  foundation: 'Yayasan Nurul Huda Mendala Sirampog',
  principal: {
    name: 'Drs. H. Ahmad Musthofa, M.Pd.I',
    title: 'Kepala MTs Nurul Huda Mendala',
    quote: 'Pendidikan madrasah bukan sekadar mentransfer ilmu pengetahuan, melainkan menanamkan nilai adab, membumikan Al-Qur\'an, dan mempersiapkan generasi yang tangguh menghadapi tantangan era teknologi modern.'
  },
  address: {
    street: 'Jl. Raya Mendala - Sirampog Km. 02',
    village: 'Desa Mendala',
    district: 'Kecamatan Sirampog',
    city: 'Kabupaten Brebes',
    province: 'Jawa Tengah',
    postalCode: '52272',
    fullAddress: 'Jl. Raya Mendala No. 12, Desa Mendala, Kec. Sirampog, Kab. Brebes, Jawa Tengah 52272'
  },
  contact: {
    phone: '(0289) 431092',
    whatsapp: '085741238890',
    whatsappFormatted: '+62 857-4123-8890',
    email: 'mtsnurulhudasirampog11@gmail.com',
    instagram: '@mtsnurulhudamendala',
    youtube: 'MTs Nurul Huda Mendala Official',
    facebook: 'MTs Nurul Huda Sirampog',
    mapsUrl: 'https://maps.google.com/?q=Sirampog+Brebes+Mendala'
  },
  ppdbPeriod: 'Tahun Ajaran 2026/2027',
  activeWave: 'Gelombang I (Jalur Istimewa & Beasiswa Tahfidz)'
};

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: 'Penerimaan Peserta Didik Baru (PPDB) Online 2026/2027 Resmi Dibuka',
    category: 'PPDB',
    date: '2026-09-20',
    content: 'Pendaftaran Peserta Didik Baru MTs Nurul Huda Mendala Gelombang 1 dibuka hingga 30 April 2026. Dapatkan fasilitas beasiswa bebas biaya pendaftaran dan potongan SPP bagi pendaftar awal serta hafidz Qur\'an.',
    author: 'Panitia PPDB',
    isImportant: true
  },
  {
    id: 'ann-2',
    title: 'Selamat! Siswa MTs Nurul Huda Meraih Juara 1 Kompetisi Sains Madrasah (KSM) Tingkat Kabupaten',
    category: 'Prestasi',
    date: '2026-09-15',
    content: 'Ananda M. Fatihul Ihsan berhasil meraih Medali Emas cabang Matematika Terintegrasi pada ajang KSM tingkat Kabupaten Brebes dan melaju ke tingkat provinsi Jawa Tengah.',
    author: 'Kesiswaan',
    isImportant: false
  },
  {
    id: 'ann-3',
    title: 'Jadwal Asesmen Sumatif Tengah Semester Ganjil TA 2026/2027',
    category: 'Akademik',
    date: '2026-09-10',
    content: 'Diberitahukan kepada seluruh siswa kelas VII, VIII, dan IX bahwa Asesmen Sumatif Tengah Semester (ASTS) akan diselenggarakan serentak secara Computer Based Test (CBT).',
    author: 'Kurikulum & Akademik',
    isImportant: false
  },
  {
    id: 'ann-4',
    title: 'Pembiasaan Shalat Dhuha & Mujahadah Bersama Menjelang Ujian',
    category: 'Kegiatan',
    date: '2026-09-05',
    content: 'Kegiatan pembiasaan ibadah praktis shalat dhuha berjamaah dan tilawah juz 30 rutin dilaksanakan setiap pagi pukul 06.45 - 07.15 WIB di Masjid As-Salam komplek madrasah.',
    author: 'Koordinator Keagamaan',
    isImportant: false
  }
];

export const TEACHERS_LIST: TeacherStaff[] = [
  {
    id: 't-1',
    name: 'Drs. H. Ahmad Musthofa, M.Pd.I',
    role: 'Kepala Madrasah',
    subjects: ['Pendidikan Agama Islam', 'Studi Islam'],
    education: 'S2 Magister Pendidikan Islam',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't-2',
    name: 'Ust. Nurudin, S.Pd.I, Al-Hafidz',
    role: 'Waka Kesiswaan & Pembina Tahfidz',
    subjects: ['Tahfidz Qur\'an', 'Tahsin & Tajwid'],
    education: 'S1 PAI & Sanad Tahfidz 30 Juz',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't-3',
    name: 'Siti Aminah, S.Pd',
    role: 'Waka Kurikulum',
    subjects: ['Matematika', 'IPA Terpadu'],
    education: 'S1 Pendidikan Matematika UNNES',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't-4',
    name: 'Ahmad Fauzi, S.Kom',
    role: 'Kepala Laboratorium Komputer & IT',
    subjects: ['Informatika', 'Robotika & Desain'],
    education: 'S1 Teknik Informatika',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't-5',
    name: 'Ustadzah Halimah, S.Pd.I',
    role: 'Koordinator Keasramaan & Bahasa',
    subjects: ['Bahasa Arab', 'Fiqih & Kitab Kuning'],
    education: 'S1 Pendidikan Bahasa Arab',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 't-6',
    name: 'Budi Santoso, S.Pd',
    role: 'Pembina Pramuka & Olahraga',
    subjects: ['PJOK', 'Kepramukaan'],
    education: 'S1 Pendidikan Jasmani & Kesehatan',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
  }
];

export const FACILITIES_LIST: FacilityItem[] = [
  {
    id: 'fac-1',
    name: 'Laboratorium Komputer Multimedia',
    description: '40 unit PC modern berkecepatan tinggi dengan koneksi internet fiber optik untuk CBT, Asesmen Nasional (ANBK), dan ekstrakurikuler coding/robotika.',
    iconName: 'Computer',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-2',
    name: 'Masjid & Musholla Asy-Syifa',
    description: 'Pusat pembinaan spiritual, sholat berjamaah dhuhur & dhuha, tadarus Al-Qur\'an, setoran hafalan tahfidz, dan kajian kitab kuning.',
    iconName: 'Building',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-3',
    name: 'Perpustakaan Literasi & Digital',
    description: 'Koleksi ribuan buku referensi pelajaran, keagamaan, ensiklopedia, novel motivasi, dan ruang baca santai ber-AC.',
    iconName: 'BookOpen',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-4',
    name: 'Lapangan Olahraga Multifungsi',
    description: 'Fasilitas lapangan untuk upacara bendera, futsal, bola voli, basket, bulutangkis, dan latihan baris-berbaris Paskibra.',
    iconName: 'Trophy',
    imageUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-5',
    name: 'Klinik UKS Sehat & Ramah Remaja',
    description: 'Pelayanan pertolongan pertama kesehatan siswa bekerjasama dengan Puskesmas Sirampog, dilengkapi tempat tidur dan obat-obatan standar.',
    iconName: 'HeartPulse',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'fac-6',
    name: 'Asrama Pondok Pesantren Mitra',
    description: 'Bagi santri/siswa yang ingin mondok sambil sekolah dengan bimbingan intensif 24 jam tahfidzul Qur\'an dan akhlak mulia.',
    iconName: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=800&q=80'
  }
];

export const PPDB_FLOW_STEPS = [
  {
    step: 1,
    title: 'Isi Formulir Online',
    desc: 'Lengkapi biodata calon siswa, data orang tua, dan pilihan program secara mudah lewat smartphone/laptop.'
  },
  {
    step: 2,
    title: 'Unggah Berkas Persyaratan',
    desc: 'Upload foto/scan dokumen (Kartu Keluarga, Akta Kelahiran, Pas Foto, dan SKL/Rapor) ke sistem cloud.'
  },
  {
    step: 3,
    title: 'Dapatkan Kode & Bukti Pendaftaran',
    desc: 'Sistem otomatis menerbitkan Nomor Pendaftaran unik. Cetak atau simpan Kartu Tanda Pendaftaran.'
  },
  {
    step: 4,
    title: 'Verifikasi & Pengumuman',
    desc: 'Panitia memeriksa kelengkapan berkas secara online. Cek status berkala lewat fitur Lacak Status.'
  },
  {
    step: 5,
    title: 'Daftar Ulang & Orientasi',
    desc: 'Calon siswa yang dinyatakan diterima melakukan daftar ulang dan siap mengikuti Matsama (Masa Ta\'aruf Siswa Madrasah).'
  }
];

export const INITIAL_SAMPLE_REGISTRATION: PPDBRegistration = {
  id: 'ppdb-demo-01',
  registrationNumber: 'PPDB-NHM-26-1001',
  createdAt: '2026-09-21T08:30:00.000Z',
  status: 'verified',
  adminNotes: 'Berkas lengkap dan terverifikasi. Memenuhi syarat jalur Tahfidz.',
  verifiedAt: '2026-09-22T10:15:00.000Z',
  student: {
    fullName: 'Muhammad Rizqy Al-Faridzi',
    nisn: '0129482711',
    nik: '3329112405120002',
    gender: 'L',
    birthPlace: 'Brebes',
    birthDate: '2012-05-24',
    religion: 'Islam',
    previousSchool: 'MI Nurul Huda Mendala',
    schoolType: 'MI',
    childNumber: 1,
    totalSiblings: 2,
    hobby: 'Membaca Al-Qur\'an dan Robotika',
    aspiration: 'Hafidz Qur\'an & Dosen IT'
  },
  address: {
    street: 'Dusun Krajan RT 02 / RW 01',
    village: 'Mendala',
    district: 'Sirampog',
    city: 'Brebes',
    province: 'Jawa Tengah',
    postalCode: '52272',
    residenceType: 'Bersama Orang Tua'
  },
  parents: {
    fatherName: 'H. Sudirman, S.Pd',
    fatherOccupation: 'Guru / Tenaga Pendidik',
    fatherPhone: '081234567890',
    fatherIncome: 'Rp 3.000.000 - Rp 5.000.000',
    motherName: 'Hj. Rohmatun',
    motherOccupation: 'Wiraswasta / Ibu Rumah Tangga',
    motherPhone: '081398765432',
    motherIncome: 'Rp 1.000.000 - Rp 2.500.000'
  },
  program: {
    track: 'tahfidz',
    entryGrade: 'Kelas VII (Tujuh)',
    hafalanJuz: 3
  },
  documents: {
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    familyCardUrl: '',
    birthCertUrl: '',
    reportOrSklUrl: ''
  }
};
