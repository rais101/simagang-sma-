import React, { useState } from 'react';
import { Siswa, JadwalMonitoring, PenilaianKinerja, JurnalHarian } from '../types';
import { 
  Users, 
  Calendar, 
  Award, 
  Plus, 
  Check, 
  MessageSquare, 
  Printer, 
  CheckCircle2,
  Clock
} from 'lucide-react';

interface MentorViewProps {
  siswaList: Siswa[];
  jadwalList: JadwalMonitoring[];
  penilaianMap: Record<string, PenilaianKinerja>;
  jurnalList: JurnalHarian[];
  onOpenPenilaian: (siswa: Siswa) => void;
  onOpenTambahJadwal: () => void;
  onApproveJurnal: (jurnalId: string, catatanMentor: string) => void;
  onOpenPrintReport: (siswa: Siswa) => void;
}

export const MentorView: React.FC<MentorViewProps> = ({
  siswaList,
  jadwalList,
  penilaianMap,
  jurnalList,
  onOpenPenilaian,
  onOpenTambahJadwal,
  onApproveJurnal,
  onOpenPrintReport
}) => {
  const [activeTab, setActiveTab] = useState<'siswa' | 'jurnal' | 'jadwal'>('siswa');
  const [feedbackInput, setFeedbackInput] = useState<Record<string, string>>({});
  const [approvedSuccessId, setApprovedSuccessId] = useState<string | null>(null);

  const pendingJurnalCount = jurnalList.filter(j => j.statusParaf !== 'Disetujui').length;

  const handleApproveWithFeedback = (jurnalId: string) => {
    const feedback = feedbackInput[jurnalId]?.trim() || 'Kegiatan disetujui dengan sangat baik. Pertahankan adab Islami dan ketelitian riset sains.';
    onApproveJurnal(jurnalId, feedback);
    setApprovedSuccessId(jurnalId);
    setTimeout(() => setApprovedSuccessId(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header Mentor SMA IAS Al-Jannah */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
              Panel Pembimbing Riset
            </span>
            <span className="text-xs text-slate-500">• Pusat Riset BRIN & Kemitraan</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">Dr. Ir. Ahmad Baihaqi, M.Si</h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Membimbing {siswaList.length} Siswa Magang & Riset SMA Islam Alam & Sains Al-Jannah Depok.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onOpenTambahJadwal}
            id="mentor-add-jadwal-btn"
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Jadwal Bimbingan</span>
          </button>
        </div>
      </div>

      {/* 2. Menu 3 Tab Bersih & Sederhana */}
      <div className="bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 inline-flex flex-wrap gap-1">
        <button
          onClick={() => setActiveTab('siswa')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'siswa'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Users className="w-4 h-4 text-emerald-700" />
          <span>1. Siswa Bimbingan</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            activeTab === 'siswa' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
          }`}>
            {siswaList.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('jurnal')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'jurnal'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <MessageSquare className="w-4 h-4 text-emerald-700" />
          <span>2. Paraf Jurnal Riset</span>
          {pendingJurnalCount > 0 ? (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-200">
              {pendingJurnalCount} Perlu Paraf
            </span>
          ) : (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">
              Lengkap
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('jadwal')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'jadwal'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Calendar className="w-4 h-4 text-emerald-700" />
          <span>3. Jadwal Monitoring</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            activeTab === 'jadwal' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
          }`}>
            {jadwalList.length}
          </span>
        </button>
      </div>

      {/* TAB 1: DAFTAR SISWA BIMBINGAN */}
      {activeTab === 'siswa' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {siswaList.map((siswa) => {
            const nilai = penilaianMap[siswa.id];
            return (
              <div 
                key={siswa.id} 
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 font-black text-lg">
                      {siswa.nama.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Riset Aktif
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{siswa.nama}</h3>
                  <p className="text-xs text-emerald-900 font-medium">{siswa.sekolah}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{siswa.jurusan} • {siswa.divisi}</p>

                  {/* Progres Bar */}
                  <div className="mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500 font-medium">Progres Pelaksanaan</span>
                      <span className="font-bold text-emerald-700">{siswa.progresPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-700 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${siswa.progresPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Status Nilai Akhir */}
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-semibold">Nilai 3 Pilar:</span>
                    {nilai ? (
                      <span className="font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-md border border-emerald-200">
                        {nilai.rataRata} ({nilai.predikat.split(' ')[0]})
                      </span>
                    ) : (
                      <span className="text-slate-400 italic">Belum dievaluasi</span>
                    )}
                  </div>
                </div>

                {/* 2 Tombol Aksi Simpel: Beri Nilai & Cetak Rapor */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onOpenPenilaian(siswa)}
                    className="flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{nilai ? 'Ubah Nilai' : 'Beri Nilai'}</span>
                  </button>
                  <button
                    onClick={() => onOpenPrintReport(siswa)}
                    className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-all active:scale-95 border border-slate-200"
                  >
                    <Printer className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Cetak Rapor</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: PARAF JURNAL HARIAN */}
      {activeTab === 'jurnal' && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Validasi & Paraf Jurnal Riset Siswa</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Periksa ringkasan pengamatan atau riset siswa, berikan umpan balik ilmiah & motivasi, lalu paraf secara resmi.
            </p>
          </div>

          <div className="space-y-4">
            {jurnalList.map((jur) => {
              const currentFeedback = feedbackInput[jur.id] ?? jur.catatanMentor ?? '';
              const isApproved = jur.statusParaf === 'Disetujui';
              const justApproved = approvedSuccessId === jur.id;

              return (
                <div key={jur.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">📅 {jur.tanggal}</span>
                      <span className="text-xs text-slate-400">• Siswa ID: {jur.siswaId}</span>
                    </div>

                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full w-fit ${
                      isApproved
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {isApproved ? '✓ Telah Diparaf' : '⏳ Menunggu Paraf'}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-700">Aktivitas Riset & Praktik:</p>
                    <p className="text-xs text-slate-800 mt-1 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                      {jur.aktivitas}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-600">Hasil: </span>
                      <span className="text-slate-800">{jur.hasil}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-600">Kendala: </span>
                      <span className="text-slate-800">{jur.kendala || 'Tidak ada kendala'}</span>
                    </div>
                  </div>

                  {/* Feedback Box & Approve Button */}
                  <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={currentFeedback}
                      onChange={(e) => setFeedbackInput({ ...feedbackInput, [jur.id]: e.target.value })}
                      placeholder="Tuliskan catatan apresiasi / bimbingan mentor..."
                      className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                    />

                    <button
                      onClick={() => handleApproveWithFeedback(jur.id)}
                      className={`w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 ${
                        isApproved
                          ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                          : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>{isApproved ? 'Perbarui Paraf' : 'Setujui & Beri Paraf'}</span>
                    </button>
                  </div>

                  {justApproved && (
                    <p className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Paraf berhasil dicatat dan tersimpan ke Google Cloud Firestore!
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: JADWAL MONITORING */}
      {activeTab === 'jadwal' && (
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Agenda Monitoring & Riset</h2>
              <p className="text-xs text-slate-500">Jadwal evaluasi berkala dan sesi tatap muka / daring.</p>
            </div>
            <button
              onClick={onOpenTambahJadwal}
              className="flex items-center gap-1.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Jadwal Baru</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {jadwalList.map((jad) => (
              <div key={jad.id} className="py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">{jad.siswaNama}</span>
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {jad.mode}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 font-medium">{jad.topik}</p>
                    {jadcatatanMentor(jad) && (
                      <p className="text-[11px] text-slate-400 mt-1 italic">
                        Catatan: "{jad.catatanMentor}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-800">{jad.tanggal}</p>
                    <p className="text-[11px] text-slate-400">{jad.waktu}</p>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {jad.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

// Helper for conditional render
function jadcatatanMentor(jad: JadwalMonitoring): boolean {
  return Boolean(jad.catatanMentor);
}
