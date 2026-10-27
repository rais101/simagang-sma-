import React, { useState } from 'react';
import { Siswa } from '../types';
import { X, User, School, Building2, UserCheck, Check, Sparkles, Sprout } from 'lucide-react';

interface EditProfilModalProps {
  siswa: Siswa;
  onClose: () => void;
  onSave: (updatedData: Partial<Siswa>) => void;
}

export const EditProfilModal: React.FC<EditProfilModalProps> = ({
  siswa,
  onClose,
  onSave
}) => {
  const [nama, setNama] = useState(siswa.nama);
  const [nisn, setNisn] = useState(siswa.nisn);
  const [sekolah, setSekolah] = useState(siswa.sekolah || 'SMA Islam Alam & Sains Al-Jannah Depok');
  const [jurusan, setJurusan] = useState(siswa.jurusan);
  const [tempatMagang, setTempatMagang] = useState(siswa.tempatMagang);
  const [divisi, setDivisi] = useState(siswa.divisi);
  const [mentorNama, setMentorNama] = useState(siswa.mentorNama);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) return;

    onSave({
      nama: nama.trim(),
      nisn: nisn.trim() || siswa.nisn,
      sekolah: sekolah.trim() || 'SMA Islam Alam & Sains Al-Jannah Depok',
      jurusan: jurusan.trim() || siswa.jurusan,
      tempatMagang: tempatMagang.trim() || siswa.tempatMagang,
      divisi: divisi.trim() || siswa.divisi,
      mentorNama: mentorNama.trim() || siswa.mentorNama
    });

    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-amber-300 flex items-center justify-center shadow-xs">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Ganti Data Diri Saya</h3>
              <p className="text-xs text-slate-500">Sesuaikan dengan identitas asli Anda di SMA IAS Al-Jannah</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200/80 text-xs text-emerald-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <strong>Personalisasi Akun:</strong> Masukkan nama asli Anda. Semua lembar rapor, jurnal harian, dan jadwal bimbingan akan langsung otomatis menampilkan nama Anda.
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Lengkap Anda *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Contoh: Muhammad Fathi, Nabila Zahra..."
                className="w-full text-sm font-semibold px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                NISN (Nomor Siswa)
              </label>
              <input
                type="text"
                value={nisn}
                onChange={(e) => setNisn(e.target.value)}
                placeholder="0078492011"
                className="w-full text-xs font-mono px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Peminatan / Jurusan
              </label>
              <input
                type="text"
                value={jurusan}
                onChange={(e) => setJurusan(e.target.value)}
                placeholder="MIPA Sains Hayati / IPS Ecopreneurship..."
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Asal Sekolah
            </label>
            <input
              type="text"
              value={sekolah}
              onChange={(e) => setSekolah(e.target.value)}
              placeholder="SMA Islam Alam & Sains Al-Jannah Depok"
              className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Tempat Magang / Riset
              </label>
              <input
                type="text"
                value={tempatMagang}
                onChange={(e) => setTempatMagang(e.target.value)}
                placeholder="Pusat Riset Bioteknologi BRIN..."
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Divisi / Lab
              </label>
              <input
                type="text"
                value={divisi}
                onChange={(e) => setDivisi(e.target.value)}
                placeholder="Lab Genetika Tanaman..."
                className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Nama Mentor / Pembimbing
            </label>
            <input
              type="text"
              value={mentorNama}
              onChange={(e) => setMentorNama(e.target.value)}
              placeholder="Dr. Ir. Ahmad Baihaqi, M.Si"
              className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
