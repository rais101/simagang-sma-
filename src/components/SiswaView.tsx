import React, { useState } from 'react';
import { Siswa, JadwalMonitoring, PenilaianKinerja, JurnalHarian } from '../types';
import { 
  Building2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Send, 
  Award, 
  Printer, 
  FileText, 
  AlertCircle,
  UserCheck,
  Edit3,
  BookOpen,
  School
} from 'lucide-react';

interface SiswaViewProps {
  siswa: Siswa;
  jadwalList: JadwalMonitoring[];
  penilaian?: PenilaianKinerja;
  jurnalList: JurnalHarian[];
  onSubmitJurnal: (jurnal: { aktivitas: string; hasil: string; kendala: string }) => void;
  onOpenPrintReport: (siswa: Siswa) => void;
  onOpenEditProfil: () => void;
}

export const SiswaView: React.FC<SiswaViewProps> = ({
  siswa,
  jadwalList,
  penilaian,
  jurnalList,
  onSubmitJurnal,
  onOpenPrintReport,
  onOpenEditProfil,
}) => {
  const [activeTab, setActiveTab] = useState<'jurnal' | 'jadwal' | 'rapor'>('jurnal');
  const [aktivitas, setAktivitas] = useState('');
  const [hasil, setHasil] = useState('');
  const [kendala, setKendala] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Filter for this student
  const myJadwal = jadwalList.filter(j => j.siswaId === siswa.id);
  const myJurnal = jurnalList.filter(j => j.siswaId === siswa.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aktivitas.trim() || !hasil.trim()) return;

    onSubmitJurnal({
      aktivitas,
      hasil,
      kendala: kendala.trim() ? kendala : 'Tidak ada kendala, kegiatan riset berjalan lancar.'
    });

    setAktivitas('');
    setHasil('');
    setKendala('');
    setSuccessMsg('Laporan kegiatan harian berhasil dikirim! Menunggu paraf dari pembimbing.');
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  // Quick Fill template for live presentation
  const handleQuickDemoFill = (type: 'kultur' | 'air') => {
    if (type === 'kultur') {
      setAktivitas('Melakukan inokulasi eksplan tunas jati pada media kultur Murashige & Skoog steril dalam laminar air flow.');
      setHasil('15 tabung reaksi eksplan berhasil diinokulasi tanpa kontaminasi spora jamur pada evaluasi 24 jam.');
      setKendala('');
    } else {
      setAktivitas('Pengujian parameter kualitas air kolam konservasi: pengukuran pH, Dissolved Oxygen (DO), dan identifikasi fitoplankton.');
      setHasil('Diperoleh pH 7.2, DO 6.5 mg/L (kondisi sangat baik), serta ditemukan dominansi mikroalga Chlorella sp.');
      setKendala('');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Kartu Profil Siswa SMA IAS Al-Jannah */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white flex items-center justify-center font-black text-2xl shadow-xs border border-emerald-500/20 shrink-0">
              {siswa.nama.charAt(0).toUpperCase()}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{siswa.nama}</h1>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  Magang & Riset Aktif
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-600">
                <span className="flex items-center gap-1 font-semibold text-emerald-900">
                  <School className="w-3.5 h-3.5 text-emerald-700" />
                  {siswa.sekolah}
                </span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="text-slate-700 font-medium">{siswa.jurusan}</span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="font-mono text-slate-500">NISN: {siswa.nisn}</span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-600">
                <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
                  <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                  {siswa.tempatMagang} — {siswa.divisi}
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                  Mentor: <strong className="text-slate-700">{siswa.mentorNama}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons for Student */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              id="ganti-nama-profil-btn"
              onClick={onOpenEditProfil}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all active:scale-95 border border-slate-200 shadow-2xs"
            >
              <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Ganti Data Diri</span>
            </button>

            <button
              id="cetak-rapor-quick-btn"
              onClick={() => onOpenPrintReport(siswa)}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Lembar Rapor</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Menu 3 Tab Simpel (User-Friendly & Jelas) */}
      <div className="bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 inline-flex flex-wrap gap-1">
        <button
          id="tab-jurnal-btn"
          onClick={() => setActiveTab('jurnal')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'jurnal'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-700" />
          <span>1. Tulis Laporan Riset</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            activeTab === 'jurnal' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
          }`}>
            {myJurnal.length}
          </span>
        </button>

        <button
          id="tab-jadwal-btn"
          onClick={() => setActiveTab('jadwal')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'jadwal'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Calendar className="w-4 h-4 text-emerald-700" />
          <span>2. Jadwal Bimbingan</span>
          {myJadwal.length > 0 && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              activeTab === 'jadwal' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
            }`}>
              {myJadwal.length}
            </span>
          )}
        </button>

        <button
          id="tab-rapor-btn"
          onClick={() => setActiveTab('rapor')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'rapor'
              ? 'bg-white text-emerald-800 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-700" />
          <span>3. Rapor & Nilai 3 Pilar</span>
        </button>
      </div>

      {/* TAB 1: TULIS JURNAL HARIAN */}
      {activeTab === 'jurnal' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Form Pengisian Laporan */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2 mb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    Catat Kegiatan Magang & Riset Hari Ini
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Isi ringkasan pengamatan atau tugas harianmu agar langsung diparaf oleh pembimbing.
                  </p>
                </div>
                
                {/* Clean Date Badge */}
                <div className="text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                  📅 Tanggal: {new Date().toISOString().slice(0, 10)}
                </div>
              </div>

              {/* Quick Demo Assist Chips for Live Presentation */}
              <div className="mb-4 p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-emerald-900 text-[11px]">💡 Cepat Isi Contoh (Khusus Presentasi):</span>
                <button
                  type="button"
                  onClick={() => handleQuickDemoFill('kultur')}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-[11px] font-medium transition-colors"
                >
                  🧪 Kultur Jaringan BRIN
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoFill('air')}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-emerald-100/70 border border-emerald-200 text-emerald-800 text-[11px] font-medium transition-colors"
                >
                  🌱 Uji Sampel Ekologi
                </button>
              </div>

              {successMsg && (
                <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2.5 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      1. Apa kegiatan riset atau tugas yang kamu kerjakan hari ini? *
                    </label>
                    {aktivitas.length > 0 && (
                      <span className="text-[10px] text-slate-400">{aktivitas.length} karakter</span>
                    )}
                  </div>
                  <textarea
                    rows={3}
                    required
                    value={aktivitas}
                    onChange={(e) => setAktivitas(e.target.value)}
                    placeholder="Contoh: Menguji sampel air sungai, observasi inokulasi bibit tanaman hidroponik, input data riset laboratorium..."
                    className="w-full text-xs sm:text-sm p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 text-slate-900 placeholder:text-slate-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    2. Hasil atau pembelajaran ilmiah yang kamu peroleh? *
                  </label>
                  <input
                    type="text"
                    required
                    value={hasil}
                    onChange={(e) => setHasil(e.target.value)}
                    placeholder="Contoh: Mendapatkan data pH 6.8 pada 10 titik sampel dan memahami prosedur sterilisasi alat ukur..."
                    className="w-full text-xs sm:text-sm px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 text-slate-900 placeholder:text-slate-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                    <span>3. Kendala atau masalah yang dihadapi</span>
                    <span className="text-[11px] font-normal text-slate-400">(Opsional - boleh dikosongkan)</span>
                  </label>
                  <input
                    type="text"
                    value={kendala}
                    onChange={(e) => setKendala(e.target.value)}
                    placeholder="Kosongkan bila seluruh kegiatan berjalan lancar"
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/15 focus:border-emerald-600 text-slate-900 placeholder:text-slate-400 transition-all"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    id="submit-jurnal-btn"
                    className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-xs transition-all active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Laporan Hari Ini</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Riwayat Catatan Jurnal Siswa */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                Riwayat Jurnal Riset
              </h2>
              <span className="text-xs text-slate-500 font-semibold">{myJurnal.length} Laporan</span>
            </div>

            {myJurnal.length === 0 ? (
              <p className="text-xs text-slate-400 py-8 text-center">Belum ada laporan harian yang tersimpan.</p>
            ) : (
              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
                {myJurnal.map((jur) => (
                  <div key={jur.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-slate-800">📅 {jur.tanggal}</span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        jur.statusParaf === 'Disetujui'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {jur.statusParaf === 'Disetujui' ? '✓ Sudah Diparaf' : '⏳ Menunggu Paraf'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-800 font-medium leading-relaxed">{jur.aktivitas}</p>
                    
                    <div className="text-[11px] text-slate-700 mt-2 bg-white p-2.5 rounded-lg border border-slate-200/80 border-l-2 border-l-emerald-600">
                      <span className="font-bold text-slate-900 block mb-0.5">Hasil Pembelajaran:</span>
                      {jur.hasil}
                    </div>

                    {jur.catatanMentor && (
                      <div className="text-[11px] text-emerald-900 font-medium mt-2 bg-emerald-50/70 p-2 rounded-lg border border-emerald-200/60">
                        💬 <strong>Catatan Mentor:</strong> "{jur.catatanMentor}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 2: JADWAL BIMBINGAN */}
      {activeTab === 'jadwal' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs max-w-3xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-700" />
                Jadwal Bimbingan & Monitoring Riset
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Agenda pertemuan evaluasi bersama pembimbing lapangan dan guru pamong Al-Jannah.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
              {myJadwal.length} Jadwal
            </span>
          </div>

          {myJadwal.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              Belum ada jadwal monitoring baru dari pembimbing.
            </div>
          ) : (
            <div className="space-y-3">
              {myJadwal.map((jad) => (
                <div 
                  key={jad.id} 
                  className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-700" />
                        {jad.tanggal} • {jad.waktu}
                      </span>
                      <span className="text-[10px] font-semibold bg-white text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-200">
                        {jad.mode}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 mt-1">{jad.topik}</p>
                    {jad.catatanMentor && (
                      <p className="text-xs text-slate-600 mt-1 italic">
                        Catatan: "{jad.catatanMentor}"
                      </p>
                    )}
                  </div>
                  <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    {jad.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: RAPOR & NILAI MAGANG (3 PILAR AL-JANNAH) */}
      {activeTab === 'rapor' && (
        <div className="max-w-2xl bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-700" />
                Rapor & Evaluasi 3 Pilar (Islam • Alam • Sains)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Nilai akhir resmi pembimbing lapangan SMA Islam Alam & Sains Al-Jannah Depok.
              </p>
            </div>
            <button
              onClick={() => onOpenPrintReport(siswa)}
              id="print-rapor-tab-btn"
              className="flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Lembar Rapor</span>
            </button>
          </div>

          {penilaian ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white p-5 rounded-2xl flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-xs text-emerald-200 font-medium">Nilai Rata-rata Akhir:</span>
                  <p className="text-3xl sm:text-4xl font-black text-white">{penilaian.rataRata}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-200 font-medium">Predikat Kelulusan:</span>
                  <p className="text-base sm:text-lg font-bold text-amber-300">{penilaian.predikat}</p>
                </div>
              </div>

              {/* 5 Aspek Kinerja & Karakter Al-Jannah Berbasis 3 Pilar */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-bold text-emerald-800 block">Pilar Islam</span>
                  <span className="text-[10px] text-slate-500">Karakter & Adab</span>
                  <p className="text-base font-black text-slate-900 mt-0.5">{penilaian.kedisiplinan}</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-bold text-emerald-800 block">Pilar Sains</span>
                  <span className="text-[10px] text-slate-500">Kecakapan Riset</span>
                  <p className="text-base font-black text-slate-900 mt-0.5">{penilaian.keterampilan}</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-bold text-emerald-800 block">Pilar Alam</span>
                  <span className="text-[10px] text-slate-500">Wawasan Ekologi</span>
                  <p className="text-base font-black text-slate-900 mt-0.5">{penilaian.inisiatif}</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-bold text-slate-700 block">Kerjasama</span>
                  <span className="text-[10px] text-slate-500">Sinergi Tim</span>
                  <p className="text-base font-black text-slate-900 mt-0.5">{penilaian.kerjasama}</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-bold text-slate-700 block">Presensi</span>
                  <span className="text-[10px] text-slate-500">Kehadiran Riset</span>
                  <p className="text-base font-black text-slate-900 mt-0.5">{penilaian.kehadiran || 96}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                <p className="font-bold text-slate-900 mb-1">Catatan Pembimbing Lapangan:</p>
                <p className="italic leading-relaxed">"{penilaian.catatanKinerja}"</p>
                <p className="text-[11px] text-slate-400 mt-2">— Dinilai oleh {penilaian.dinilaiOleh}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenPrintReport(siswa)}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-3.5 rounded-xl shadow-xs transition-all active:scale-95"
                >
                  <Printer className="w-4 h-4" />
                  <span>Buka Lembar Cetak Rapor Resmi SMA IAS Al-Jannah</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
              <AlertCircle className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              Penilaian resmi sedang dalam tahap rekapitulasi pembimbing.
            </div>
          )}
        </div>
      )}

    </div>
  );
};
