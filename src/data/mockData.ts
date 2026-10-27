import { Siswa, JadwalMonitoring, PenilaianKinerja, JurnalHarian, LogAktivitas, Notifikasi } from '../types';

export const INITIAL_SISWA: Siswa[] = [
  {
    id: 'sis-01',
    nisn: '0078492011',
    nama: 'Muhammad Fathi Rizqy',
    sekolah: 'SMA Islam Alam & Sains Al-Jannah Depok',
    jurusan: 'MIPA (Riset Sains Hayati & Bioteknologi)',
    tempatMagang: 'Pusat Riset Bioteknologi BRIN - Depok/Cibinong',
    divisi: 'Lab Rekayasa Genetika & Kultur Jaringan Tanaman',
    mentorId: 'men-01',
    mentorNama: 'Dr. Ir. Ahmad Baihaqi, M.Si',
    foto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    status: 'aktif',
    tanggalMulai: '2026-08-01',
    tanggalSelesai: '2026-11-30',
    progresPercent: 68,
    nilaiAkhir: 92,
    predikat: 'A (Sangat Baik)',
  },
  {
    id: 'sis-02',
    nisn: '0078492012',
    nama: 'Aisyah Nur Ramadhani',
    sekolah: 'SMA Islam Alam & Sains Al-Jannah Depok',
    jurusan: 'MIPA (Sains Lingkungan & Konservasi Alam)',
    tempatMagang: 'Balai Besar Riset dan Standardisasi Pengujian Lingkungan',
    divisi: 'Divisi Analisis Kualitas Air & Konservasi Biodiversitas',
    mentorId: 'men-02',
    mentorNama: 'Dr. Siti Nurhaliza, M.Sc',
    foto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    status: 'aktif',
    tanggalMulai: '2026-08-01',
    tanggalSelesai: '2026-11-30',
    progresPercent: 75,
    nilaiAkhir: 94,
    predikat: 'A (Sangat Baik)',
  },
  {
    id: 'sis-03',
    nisn: '0078492013',
    nama: 'Faris Al-Ghifari',
    sekolah: 'SMA Islam Alam & Sains Al-Jannah Depok',
    jurusan: 'MIPA (Sains Komputasi & Teknologi Informasi)',
    tempatMagang: 'Pusat Riset Sains Komputasi & AI Depok',
    divisi: 'Divisi Machine Learning & Observasi Citra Satelit',
    mentorId: 'men-01',
    mentorNama: 'Budi Santoso, S.Kom, M.T',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'evaluasi',
    tanggalMulai: '2026-08-15',
    tanggalSelesai: '2026-12-15',
    progresPercent: 55,
    nilaiAkhir: 88,
    predikat: 'A (Sangat Baik)',
  },
  {
    id: 'sis-04',
    nisn: '0078492014',
    nama: 'Nabila Zahra Khairunnisa',
    sekolah: 'SMA Islam Alam & Sains Al-Jannah Depok',
    jurusan: 'IPS (Ecopreneurship & Ekonomi Syariah)',
    tempatMagang: 'Bank Syariah Indonesia (BSI) KC Margonda Depok',
    divisi: 'Unit Sustainable Finance & Pembiayaan Hijau',
    mentorId: 'men-02',
    mentorNama: 'Dr. Siti Nurhaliza, M.Sc',
    foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    status: 'aktif',
    tanggalMulai: '2026-09-01',
    tanggalSelesai: '2026-12-31',
    progresPercent: 40,
    nilaiAkhir: 89,
    predikat: 'A (Sangat Baik)',
  },
  {
    id: 'sis-05',
    nisn: '0078492015',
    nama: 'Salman Al-Farisi',
    sekolah: 'SMA Islam Alam & Sains Al-Jannah Depok',
    jurusan: 'MIPA (Agro-Sains & Teknologi Pangan Hayati)',
    tempatMagang: 'Eco-Learning Park & Bio-Research Al-Jannah Depok',
    divisi: 'Riset Nutrisi Tanaman Organik & Biopori Berkelanjutan',
    mentorId: 'men-01',
    mentorNama: 'Dr. Ir. Ahmad Baihaqi, M.Si',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'selesai',
    tanggalMulai: '2026-06-01',
    tanggalSelesai: '2026-08-31',
    progresPercent: 100,
    nilaiAkhir: 96,
    predikat: 'A (Sangat Baik)',
  }
];

export const INITIAL_JADWAL: JadwalMonitoring[] = [
  {
    id: 'jad-01',
    siswaId: 'sis-01',
    siswaNama: 'Muhammad Fathi Rizqy',
    mentorNama: 'Dr. Ir. Ahmad Baihaqi, M.Si',
    tanggal: '2026-09-18',
    waktu: '10:00 WIB',
    topik: 'Observasi Kultur Jaringan Tanaman Obat & Review Laporan Riset Mingguan',
    mode: 'Luring (Tatap Muka)',
    status: 'Menunggu',
    catatanMentor: 'Siapkan logbook laboratorium dan sampel preparat mikroskopis.'
  },
  {
    id: 'jad-02',
    siswaId: 'sis-02',
    siswaNama: 'Aisyah Nur Ramadhani',
    mentorNama: 'Dr. Siti Nurhaliza, M.Sc',
    tanggal: '2026-09-19',
    waktu: '13:30 WIB',
    topik: 'Monitoring Uji Spektrofotometri Sampel Air Sungai Ciliwung Depok',
    mode: 'Daring (Google Meet)',
    status: 'Menunggu',
    catatanMentor: 'Presentasikan grafik hasil uji pH, COD, dan BOD yang telah dihitung.'
  },
  {
    id: 'jad-03',
    siswaId: 'sis-03',
    siswaNama: 'Faris Al-Ghifari',
    mentorNama: 'Budi Santoso, S.Kom, M.T',
    tanggal: '2026-09-15',
    waktu: '09:00 WIB',
    topik: 'Pengujian Model AI Klasifikasi Citra Daun Herbal Al-Jannah',
    mode: 'Luring (Tatap Muka)',
    status: 'Selesai',
    catatanMentor: 'Akurasi model mencapai 93%, tingkatkan dokumentasi dataset herbarium.'
  }
];

export const INITIAL_PENILAIAN: Record<string, PenilaianKinerja> = {
  'sis-01': {
    id: 'pen-01',
    siswaId: 'sis-01',
    tanggal: '2026-09-10',
    kedisiplinan: 94,
    keterampilan: 91,
    inisiatif: 90,
    kerjasama: 92,
    kehadiran: 96,
    rataRata: 92.4,
    predikat: 'A (Sangat Baik)',
    catatanKinerja: 'Siswa menjunjung adab Islami yang luhur, memiliki ketelitian tinggi dalam prosedur sterilisasi lab, dan sangat antusias dalam eksplorasi sains hayati.',
    dinilaiOleh: 'Dr. Ir. Ahmad Baihaqi, M.Si (Peneliti Senior BRIN)'
  },
  'sis-02': {
    id: 'pen-02',
    siswaId: 'sis-02',
    tanggal: '2026-09-12',
    kedisiplinan: 95,
    keterampilan: 93,
    inisiatif: 92,
    kerjasama: 95,
    kehadiran: 98,
    rataRata: 94.2,
    predikat: 'A (Sangat Baik)',
    catatanKinerja: 'Aisyah menunjukkan pemahaman wawasan lingkungan yang mendalam, teliti dalam kalibrasi alat ukur, serta beretika santun dalam tim.',
    dinilaiOleh: 'Dr. Siti Nurhaliza, M.Sc (Kepala Lab Uji Lingkungan)'
  }
};

export const INITIAL_JURNAL: JurnalHarian[] = [
  {
    id: 'jur-01',
    siswaId: 'sis-01',
    tanggal: '2026-09-16',
    aktivitas: 'Melakukan inokulasi eksplan daun pada media Murashige & Skoog steril dan mengamati sterilitas laminar air flow.',
    hasil: '12 botol kultur berhasil diinokulasi tanpa kontaminasi jamur pada inspeksi awal.',
    kendala: 'Perlu kehati-hatian ekstra saat sterilisasi pinset dan scalpel dengan api bunsen.',
    statusParaf: 'Disetujui',
    catatanMentor: 'Bagus sekali, teknik aseptik yang diterapkan sudah sesuai standar biosafety level.'
  },
  {
    id: 'jur-02',
    siswaId: 'sis-01',
    tanggal: '2026-09-15',
    aktivitas: 'Mencatat data pertumbuhan eksplan tunas hari ke-14 dan mendokumentasikannya ke dalam logbook riset.',
    hasil: 'Muncul kalus hijau pada 90% sampel perlakuan hormon auksin dan sitokinin.',
    kendala: 'Tidak ada kendala, kegiatan observasi mikroskop berjalan lancar.',
    statusParaf: 'Disetujui',
    catatanMentor: 'Dokumentasi riset sangat teliti dan terstruktur rapi.'
  }
];

export const INITIAL_LOGS: LogAktivitas[] = [
  {
    id: 'log-101',
    timestamp: '16 Sep 2026, 14:20 WIB',
    pelaku: 'Dr. Ir. Ahmad Baihaqi, M.Si',
    role: 'mentor',
    aksi: 'Input Penilaian Kinerja',
    detail: 'Memperbarui evaluasi kompetensi siswa Muhammad Fathi Rizqy (Nilai Akhir: 92.4 / Predikat A)',
    hashSecurity: 'sha256-8a7e3d10f...'
  },
  {
    id: 'log-102',
    timestamp: '16 Sep 2026, 11:05 WIB',
    pelaku: 'Muhammad Fathi Rizqy',
    role: 'siswa',
    aksi: 'Kirim Laporan Riset Harian',
    detail: 'Menambahkan entri jurnal pengamatan kultur jaringan laboratorium',
    hashSecurity: 'sha256-4c9f1b22e...'
  },
  {
    id: 'log-103',
    timestamp: '15 Sep 2026, 16:45 WIB',
    pelaku: 'Koordinator Riset Magang SMA IAS Al-Jannah',
    role: 'admin',
    aksi: 'Sinkronisasi Data Eksternal',
    detail: 'Berhasil sinkronisasi 5 data siswa magang & riset dengan sistem akademik SMA IAS Al-Jannah Depok',
    hashSecurity: 'sha256-11f87aa90...'
  }
];

export const INITIAL_NOTIF: Notifikasi[] = [
  {
    id: 'notif-01',
    targetRole: 'all',
    judul: 'Jadwal Monitoring Riset Mendatang',
    pesan: 'Monitoring visitasi untuk Muhammad Fathi Rizqy dijadwalkan pada 18 September 2026 pukul 10:00 WIB.',
    waktu: '1 jam yang lalu',
    sudahDibaca: false,
    tipe: 'jadwal'
  },
  {
    id: 'notif-02',
    targetRole: 'siswa',
    siswaId: 'sis-01',
    judul: 'Jurnal Praktik Riset Diparaf',
    pesan: 'Mentor Dr. Ir. Ahmad Baihaqi, M.Si telah menyetujui jurnal kegiatan riset laboratorium Anda.',
    waktu: '3 jam yang lalu',
    sudahDibaca: false,
    tipe: 'info'
  },
  {
    id: 'notif-03',
    targetRole: 'all',
    judul: 'Koneksi Cloud Firestore Aktif',
    pesan: 'Database akademik SMA IAS Al-Jannah Depok tersinkronisasi aman ke Google Cloud.',
    waktu: 'Kemarin',
    sudahDibaca: true,
    tipe: 'info'
  }
];

export const MASTER_AI_STUDIO_PROMPT = `### PROMPT MASTER GOOGLE AI STUDIO: SISTEM MANAJEMEN MAGANG & RISET SISWA SMA ISLAM ALAM & SAINS (IAS) AL-JANNAH DEPOK

Buatkan aplikasi web berbasis React + TypeScript + Tailwind CSS untuk sistem manajemen magang & riset sains siswa SMA Islam Alam dan Sains (IAS) Al-Jannah Depok yang terintegrasi, dengan antarmuka yang SANGAT SIMPLE, BERSIH, dan RAMAH PENGGUNA.

Identitas Sekolah:
- Nama: SMA Islam Alam & Sains (IAS) Al-Jannah Depok
- Alamat: Jl. Jambore No. 4, Harjamukti, Kec. Cimanggis, Kota Depok, Jawa Barat 16454
- Tiga Pilar Utama: Islam (Adab & Karakter Kepemimpinan), Alam (Eco-learning & Kesadaran Lingkungan), Sains (Riset Ilmiah, STEM & Teknologi Terapan).
- Nuansa Warna: Emerald/Forest Green (#047857), Warm Amber/Gold (#d97706), dan Slate modern.

Fitur Kunci:
1. DESAIN SIMPLE & RAMAH PENGGUNA:
   - Antarmuka to-the-point dan mudah dipahami siswa SMA.
   - Fitur ganti nama/data diri siswa yang praktis tanpa ribet.
   - Navigasi antar peran (Siswa, Mentor DUDI/Riset, Koordinator Sekolah) yang mudah.

2. PENILAIAN 3 PILAR & RAPOR RESMI SIAP CETAK:
   - Komponen nilai terstandar: Karakter Islami & Kedisiplinan, Penguasaan Sains & Mutu Riset, Wawasan Lingkungan/Alam, Kerjasama Tim & Komunikasi, serta Presensi Kehadiran.
   - Cetak lembar rapor resmi berformat PDF lengkap dengan Kop Surat Yayasan Al-Jannah & SMA IAS Al-Jannah Depok, tanda tangan kepala sekolah & pembimbing lapangan, serta tombol "Kembali ke Dashboard" yang mudah.

3. SINKRONISASI CLOUD FIRESTORE & JURNAL RISET HARIAN:
   - Input laporan harian 3 kolom (aktivitas, hasil, kendala) dengan paraf mentor 1-klik.
   - Jadwal bimbingan tatap muka / daring.`;
