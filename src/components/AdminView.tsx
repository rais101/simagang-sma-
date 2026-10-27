import React, { useState } from 'react';
import { Siswa, PenilaianKinerja, LogAktivitas } from '../types';
import { 
  Users, 
  Award, 
  TrendingUp, 
  Building2, 
  Search, 
  Plus, 
  Download, 
  RefreshCw, 
  ShieldCheck, 
  Printer
} from 'lucide-react';

interface AdminViewProps {
  siswaList: Siswa[];
  penilaianMap: Record<string, PenilaianKinerja>;
  logs: LogAktivitas[];
  onOpenTambahSiswa: () => void;
  onOpenPrintReport: (siswa: Siswa) => void;
  onTriggerSync: () => void;
  isSyncing: boolean;
  lastSyncTime: string;
}

export const AdminView: React.FC<AdminViewProps> = ({
  siswaList,
  penilaianMap,
  logs,
  onOpenTambahSiswa,
  onOpenPrintReport,
  onTriggerSync,
  isSyncing,
  lastSyncTime
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'aktif' | 'selesai'>('all');

  // Filter siswa
  const filteredSiswa = siswaList.filter(s => {
    const matchSearch = s.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.sekolah.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.jurusan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tempatMagang.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Analytics calculations
  const totalSiswa = siswaList.length;
  const totalSelesai = siswaList.filter(s => s.status === 'selesai').length;
  const penilaianValues = Object.values(penilaianMap) as PenilaianKinerja[];
  const rataRataNilai = (
    penilaianValues.reduce((acc: number, p: PenilaianKinerja) => acc + p.rataRata, 0) /
    (penilaianValues.length || 1)
  ).toFixed(1);
  const rataProgres = Math.round(
    siswaList.reduce((acc, s) => acc + s.progresPercent, 0) / (totalSiswa || 1)
  );

  // CSV Export for Presentation
  const handleExportCSV = () => {
    const headers = ['NISN', 'Nama Siswa', 'Sekolah', 'Peminatan', 'Tempat Magang/Riset', 'Pembimbing', 'Status', 'Progres (%)', 'Nilai Rata-Rata'];
    const rows = siswaList.map(s => [
      `"${s.nisn}"`,
      `"${s.nama}"`,
      `"${s.sekolah}"`,
      `"${s.jurusan}"`,
      `"${s.tempatMagang}"`,
      `"${s.mentorNama}"`,
      `"${s.status}"`,
      `"${s.progresPercent}"`,
      `"${penilaianMap[s.id]?.rataRata || s.nilaiAkhir || '-'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rekap_nilai_magang_sma_ias_aljannah_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header Banner Koordinator Sekolah SMA IAS Al-Jannah Depok */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
              Pusat Data SMA IAS Al-Jannah
            </span>
            <span className="text-xs text-slate-500">• Terhubung ke Google Cloud Firestore</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">Dashboard Monitoring Magang & Riset</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Pantau progres siswa di laboratorium riset mitra BRIN & industri, evaluasi capaian 3 pilar, dan cetak rapor resmi.
          </p>
        </div>

        {/* 3 Simple Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={onTriggerSync}
            disabled={isSyncing}
            id="admin-sync-api-btn"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold px-3.5 py-2.5 rounded-xl transition-all disabled:opacity-50 border border-slate-200"
            title="Sinkronisasi data ke Cloud Firestore"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-emerald-700' : ''}`} />
            <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkron Cloud'}</span>
          </button>

          <button
            onClick={handleExportCSV}
            id="admin-export-csv-btn"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
            title="Unduh seluruh data siswa & nilai ke file spreadsheet"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Excel/CSV</span>
          </button>

          <button
            onClick={onOpenTambahSiswa}
            id="admin-tambah-siswa-btn"
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Siswa</span>
          </button>
        </div>
      </div>

      {/* 2. 4 Kartu Statistik Ringkas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Total Siswa Magang</span>
            <Users className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{totalSiswa} <span className="text-xs font-medium text-slate-500">Siswa</span></p>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">✓ SMA IAS Al-Jannah</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Rata-Rata Nilai 3 Pilar</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{rataRataNilai}</p>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">Predikat Sangat Baik (A)</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Rata-Rata Progres</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{rataProgres}%</p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">{totalSelesai} Siswa Selesai Periode</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Mitra Riset & Industri</span>
            <Building2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">5 <span className="text-xs font-medium text-slate-500">Lembaga</span></p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">BRIN, Balai Riset, BSI, Lab Al-Jannah</p>
        </div>

      </div>

      {/* 3. Tabel Manajemen Peserta Magang */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        
        {/* Controls: Search and Filter Status */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari siswa, jurusan, atau tempat riset..."
              className="w-full text-xs sm:text-sm pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Status:</span>
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold border border-slate-200">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${filterStatus === 'all' ? 'bg-white shadow-sm font-bold text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Semua ({siswaList.length})
              </button>
              <button
                onClick={() => setFilterStatus('aktif')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${filterStatus === 'aktif' ? 'bg-white shadow-sm font-bold text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Aktif
              </button>
              <button
                onClick={() => setFilterStatus('selesai')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${filterStatus === 'selesai' ? 'bg-white shadow-sm font-bold text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Selesai
              </button>
            </div>
          </div>
        </div>

        {/* Clean Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Nama Siswa & NISN</th>
                <th className="py-3 px-3">Peminatan Al-Jannah</th>
                <th className="py-3 px-3">Tempat Riset / Magang</th>
                <th className="py-3 px-3">Pembimbing</th>
                <th className="py-3 px-3 text-center">Nilai Rapor</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSiswa.map((siswa) => {
                const nilai = penilaianMap[siswa.id];
                return (
                  <tr key={siswa.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0">
                          {siswa.nama.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{siswa.nama}</p>
                          <p className="text-[11px] text-slate-400 font-mono">NISN: {siswa.nisn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-slate-700">{siswa.jurusan}</p>
                      <p className="text-[11px] text-emerald-800 font-medium">SMA IAS Al-Jannah</p>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-semibold text-slate-800">{siswa.tempatMagang}</p>
                      <p className="text-[11px] text-slate-400">{siswa.divisi}</p>
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-medium">
                      {siswa.mentorNama}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {nilai ? (
                        <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 text-xs">
                          {nilai.rataRata}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic text-xs">-</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        siswa.status === 'selesai'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {siswa.status === 'selesai' ? 'Selesai' : 'Aktif'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onOpenPrintReport(siswa)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors border border-emerald-200"
                        title="Buka & cetak dokumen lembar rapor resmi SMA IAS Al-Jannah"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Cetak Rapor</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* 4. Log Aktivitas & Keamanan Data (Audit Trail) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Audit Log Aktivitas & Sinkronisasi Akademik
            </h2>
            <p className="text-xs text-slate-500">
              Setiap catatan jurnal riset, validasi paraf, dan penilaian kinerja tersimpan dengan audit trail terenkripsi.
            </p>
          </div>
          <div className="text-[11px] font-mono text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            Terakhir Sinkron: {lastSyncTime}
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {logs.slice(0, 5).map((log) => (
            <div key={log.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs">
              <div>
                <span className="font-bold text-slate-800">{log.pelaku}</span>
                <span className="text-slate-400 mx-1.5">({log.role})</span>
                <span className="text-slate-600">• {log.detail}</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span className="font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[10px] border border-emerald-100">
                  {log.hashSecurity}
                </span>
                <span>{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
