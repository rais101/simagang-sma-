export type UserRole = 'siswa' | 'mentor' | 'admin';

export interface Siswa {
  id: string;
  nisn: string;
  nama: string;
  sekolah: string;
  jurusan: string;
  tempatMagang: string;
  divisi: string;
  mentorId: string;
  mentorNama: string;
  foto: string;
  status: 'aktif' | 'evaluasi' | 'selesai';
  tanggalMulai: string;
  tanggalSelesai: string;
  progresPercent: number;
  nilaiAkhir?: number;
  predikat?: 'A (Sangat Baik)' | 'B+ (Baik Sekali)' | 'B (Baik)' | 'C (Cukup)';
}

export interface JadwalMonitoring {
  id: string;
  siswaId: string;
  siswaNama: string;
  mentorNama: string;
  tanggal: string;
  waktu: string;
  topik: string;
  mode: 'Luring (Tatap Muka)' | 'Daring (Google Meet)';
  status: 'Menunggu' | 'Selesai' | 'Dibatalkan';
  catatanMentor?: string;
}

export interface PenilaianKinerja {
  id: string;
  siswaId: string;
  tanggal: string;
  kedisiplinan: number;     // 0 - 100
  keterampilan: number;     // 0 - 100
  inisiatif: number;        // 0 - 100
  kerjasama: number;        // 0 - 100
  kehadiran: number;        // 0 - 100
  rataRata: number;
  predikat: string;
  catatanKinerja: string;
  dinilaiOleh: string;
}

export interface JurnalHarian {
  id: string;
  siswaId: string;
  tanggal: string;
  aktivitas: string;
  hasil: string;
  kendala?: string;
  statusParaf: 'Disetujui' | 'Perlu Revisi' | 'Menunggu Paraf';
  catatanMentor?: string;
}

export interface LogAktivitas {
  id: string;
  timestamp: string;
  pelaku: string;
  role: UserRole;
  aksi: string;
  detail: string;
  hashSecurity: string;
}

export interface Notifikasi {
  id: string;
  targetRole: 'all' | UserRole;
  siswaId?: string;
  judul: string;
  pesan: string;
  waktu: string;
  sudahDibaca: boolean;
  tipe: 'info' | 'jadwal' | 'nilai' | 'peringatan';
}

export interface AuthUser {
  id: string;
  username: string;
  nama: string;
  role: UserRole;
  sekolah?: string;
  siswaId?: string;
}
