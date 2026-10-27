import React, { useState } from 'react';
import { Siswa, PenilaianKinerja } from '../types';
import { X, Award, Check, Sprout } from 'lucide-react';

interface PenilaianModalProps {
  siswa: Siswa;
  existingPenilaian?: PenilaianKinerja;
  onClose: () => void;
  onSave: (penilaian: Omit<PenilaianKinerja, 'id' | 'tanggal' | 'dinilaiOleh'>) => void;
}

export const PenilaianModal: React.FC<PenilaianModalProps> = ({
  siswa,
  existingPenilaian,
  onClose,
  onSave
}) => {
  const [kedisiplinan, setKedisiplinan] = useState(existingPenilaian?.kedisiplinan ?? 94);
  const [keterampilan, setKeterampilan] = useState(existingPenilaian?.keterampilan ?? 92);
  const [inisiatif, setInisiatif] = useState(existingPenilaian?.inisiatif ?? 90);
  const [kerjasama, setKerjasama] = useState(existingPenilaian?.kerjasama ?? 93);
  const [kehadiran, setKehadiran] = useState(existingPenilaian?.kehadiran ?? 96);
  const [catatan, setCatatan] = useState(
    existingPenilaian?.catatanKinerja ?? 'Peserta menunjukkan adab Islami terpuji, ketelitian tinggi dalam metode sains riset, serta inisiatif kepedulian lingkungan yang luar biasa.'
  );

  // Auto calculate weighted average (20%, 30%, 20%, 15%, 15%)
  const rataRata = Number(
    (
      kedisiplinan * 0.2 +
      keterampilan * 0.3 +
      inisiatif * 0.2 +
      kerjasama * 0.15 +
      kehadiran * 0.15
    ).toFixed(1)
  );

  const getPredikat = (score: number) => {
    if (score >= 88) return 'A (Sangat Baik)';
    if (score >= 80) return 'B+ (Baik Sekali)';
    if (score >= 70) return 'B (Baik)';
    return 'C (Cukup)';
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      siswaId: siswa.id,
      kedisiplinan,
      keterampilan,
      inisiatif,
      kerjasama,
      kehadiran,
      rataRata,
      predikat: getPredikat(rataRata),
      catatanKinerja: catatan
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Form Evaluasi Nilai 3 Pilar</h3>
              <p className="text-[11px] text-slate-500">Siswa: {siswa.nama} ({siswa.sekolah})</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content & Sliders */}
        <form onSubmit={handleSave} className="p-5 space-y-4">
          
          {/* Real-time Score Badge */}
          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-emerald-900 font-semibold">Nilai Akhir Terbobot (3 Pilar)</span>
              <p className="text-2xl font-black text-emerald-800">{rataRata} / 100</p>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-emerald-900 font-semibold">Predikat Kelulusan</span>
              <p className="text-xs font-bold text-emerald-900 bg-emerald-200/70 px-2.5 py-1 rounded-lg mt-0.5 border border-emerald-300">
                {getPredikat(rataRata)}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {/* 1. Karakter Islami */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>1. Karakter Islami & Kedisiplinan Kerja (20%)</span>
                <span className="text-emerald-700 font-bold">{kedisiplinan}</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={kedisiplinan}
                onChange={(e) => setKedisiplinan(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
              />
            </div>

            {/* 2. Penguasaan Sains Teknis */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>2. Penguasaan Sains Teknis & Mutu Riset (30%)</span>
                <span className="text-emerald-700 font-bold">{keterampilan}</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={keterampilan}
                onChange={(e) => setKeterampilan(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
              />
            </div>

            {/* 3. Wawasan Lingkungan */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>3. Wawasan Lingkungan/Alam & Inisiatif Solutif (20%)</span>
                <span className="text-emerald-700 font-bold">{inisiatif}</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={inisiatif}
                onChange={(e) => setInisiatif(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
              />
            </div>

            {/* 4. Kerjasama Tim */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>4. Kerjasama Tim, Komunikasi & Kepemimpinan (15%)</span>
                <span className="text-emerald-700 font-bold">{kerjasama}</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={kerjasama}
                onChange={(e) => setKerjasama(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
              />
            </div>

            {/* 5. Kehadiran */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>5. Presensi & Ketepatan Waktu Kerja (15%)</span>
                <span className="text-emerald-700 font-bold">{kehadiran}</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={kehadiran}
                onChange={(e) => setKehadiran(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Catatan & Rekomendasi Pembimbing Lapangan:
            </label>
            <textarea
              rows={2}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              required
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
              <Check className="w-4 h-4" />
              <span>Simpan Penilaian</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
