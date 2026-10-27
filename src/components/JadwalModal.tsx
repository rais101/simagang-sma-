import React, { useState } from 'react';
import { Siswa, JadwalMonitoring } from '../types';
import { X, Calendar, Plus, Sprout } from 'lucide-react';

interface JadwalModalProps {
  siswaList: Siswa[];
  onClose: () => void;
  onSave: (jadwal: Omit<JadwalMonitoring, 'id' | 'status'>) => void;
}

export const JadwalModal: React.FC<JadwalModalProps> = ({
  siswaList,
  onClose,
  onSave
}) => {
  const [siswaId, setSiswaId] = useState(siswaList[0]?.id || '');
  const [tanggal, setTanggal] = useState('2026-09-22');
  const [waktu, setWaktu] = useState('10:00 WIB');
  const [topik, setTopik] = useState('Bimbingan Observasi Lapangan & Review Jurnal Riset Sains');
  const [mode, setMode] = useState<'Luring (Tatap Muka)' | 'Daring (Google Meet)'>('Luring (Tatap Muka)');
  const [catatan, setCatatan] = useState('Siapkan logbook riset dan data sampel laboratorium.');

  const selectedSiswa = siswaList.find(s => s.id === siswaId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSiswa) return;

    onSave({
      siswaId,
      siswaNama: selectedSiswa.nama,
      mentorNama: selectedSiswa.mentorNama,
      tanggal,
      waktu,
      topik,
      mode,
      catatanMentor: catatan
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Buat Jadwal Bimbingan Riset</h3>
              <p className="text-[11px] text-slate-500">SMA Islam Alam & Sains Al-Jannah Depok</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Pilih Siswa Riset / Magang:
            </label>
            <select
              value={siswaId}
              onChange={(e) => setSiswaId(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            >
              {siswaList.map(s => (
                <option key={s.id} value={s.id}>
                  {s.nama} - {s.jurusan} ({s.tempatMagang})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tanggal:
              </label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Waktu / Jam:
              </label>
              <input
                type="text"
                value={waktu}
                onChange={(e) => setWaktu(e.target.value)}
                placeholder="10:00 WIB"
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Metode Pertemuan:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setMode('Luring (Tatap Muka)')}
                className={`py-2 px-3 rounded-xl border font-medium text-center transition-all ${
                  mode === 'Luring (Tatap Muka)'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                🏢 Tatap Muka (Lab)
              </button>
              <button
                type="button"
                onClick={() => setMode('Daring (Google Meet)')}
                className={`py-2 px-3 rounded-xl border font-medium text-center transition-all ${
                  mode === 'Daring (Google Meet)'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                💻 Online (Meet)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Topik Pembahasan:
            </label>
            <input
              type="text"
              value={topik}
              onChange={(e) => setTopik(e.target.value)}
              placeholder="Contoh: Diskusi evaluasi kultur jaringan & analisis data"
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Catatan / Persiapan Siswa:
            </label>
            <input
              type="text"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Misal: Siapkan logbook riset dan data sampel"
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Simpan Jadwal</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
