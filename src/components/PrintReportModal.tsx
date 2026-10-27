import React, { useEffect } from 'react';
import { Siswa, PenilaianKinerja } from '../types';
import { X, Printer, ArrowLeft, Info, Sprout, Award } from 'lucide-react';

interface PrintReportModalProps {
  siswa: Siswa;
  penilaian?: PenilaianKinerja;
  onClose: () => void;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({
  siswa,
  penilaian,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const defaultScores = {
    kedisiplinan: penilaian?.kedisiplinan ?? 94,
    keterampilan: penilaian?.keterampilan ?? 92,
    inisiatif: penilaian?.inisiatif ?? 90,
    kerjasama: penilaian?.kerjasama ?? 93,
    kehadiran: penilaian?.kehadiran ?? 96,
    rataRata: penilaian?.rataRata ?? 92.8,
    predikat: penilaian?.predikat ?? 'A (Sangat Baik)',
    catatan: penilaian?.catatanKinerja ?? 'Peserta menunjukkan adab Islami yang terpuji, ketelitian tinggi dalam prosedur sains laboratorium, dan kepedulian nyata pada kelestarian lingkungan hidup selama riset magang.',
    dinilaiOleh: penilaian?.dinilaiOleh ?? siswa.mentorNama
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150 flex flex-col">
        
        {/* Modal Sticky Toolbar (Hidden during actual print) */}
        <div className="sticky top-0 z-10 px-4 sm:px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between print:hidden shadow-xs">
          <button
            id="back-to-dashboard-btn"
            onClick={onClose}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-800 text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl transition-all border border-slate-300 shadow-xs active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-600" />
            <span>Kembali ke Dashboard</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-xs active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Unduh PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              title="Tutup lembar rapor (Esc)"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Floating Notice Bar for Screen View */}
        <div className="bg-emerald-50 px-4 py-2 text-xs text-emerald-900 border-b border-emerald-100 flex items-center justify-between print:hidden">
          <span className="flex items-center gap-1.5 font-medium">
            <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            Pratinjau Resmi: Klik tombol <strong>"Kembali ke Dashboard"</strong> di atas atau bawah untuk menutup lembar ini.
          </span>
          <span className="text-[11px] text-emerald-700 hidden sm:inline">Dapat ditekan tombol <strong>Esc</strong></span>
        </div>

        {/* Printable Official Document Body */}
        <div className="p-8 sm:p-12 text-slate-900 bg-white" id="printable-rapor-content">
          
          {/* Authentic Kop Surat Resmi SMA Islam Alam & Sains Al-Jannah Depok */}
          <div className="border-b-4 border-double border-emerald-900 pb-4 mb-6 text-center relative">
            <div className="flex items-center justify-center gap-4 mb-2">
              {/* Emblem Al-Jannah */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 text-amber-300 flex items-center justify-center shadow-xs border-2 border-amber-400 shrink-0">
                <Sprout className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-800 tracking-wider uppercase">
                  YAYASAN AL-JANNAH
                </p>
                <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug uppercase">
                  SMA ISLAM ALAM & SAINS (IAS) AL-JANNAH DEPOK
                </h1>
                <p className="text-[11px] font-semibold text-emerald-700">
                  Terakreditasi "A" (Unggul) • NSS: 302021204015 • NPSN: 20276136
                </p>
              </div>
            </div>
            
            <p className="text-[11px] text-slate-600 leading-tight">
              Jl. Jambore No. 4, Harjamukti, Kec. Cimanggis, Kota Depok, Jawa Barat 16454
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Telp: (021) 8774-4455 / 8774-4466 • Email: sma@sekolah-aljannah.sch.id • Situs: www.sekolah-aljannah.sch.id
            </p>
          </div>

          {/* Judul Rapor Resmi */}
          <div className="text-center mb-6">
            <h2 className="text-sm sm:text-base font-black tracking-wider uppercase text-slate-900 border-b border-slate-300 pb-1 inline-block">
              LEMBAR RAPOR EVALUASI & PENILAIAN PRAKTIK KERJA LAPANGAN & RISET SAINS (PKL)
            </h2>
            <p className="text-xs font-semibold text-emerald-800 mt-1">
              Program Penguatan Pilar: Karakter Islam • Wawasan Alam • Keunggulan Sains
            </p>
            <p className="text-[11px] text-slate-500">
              Tahun Ajaran 2026/2027
            </p>
          </div>

          {/* Identitas Siswa & Mitra Riset/Industri */}
          <div className="bg-emerald-50/40 rounded-xl p-4 border border-emerald-200/80 mb-6 text-xs space-y-2">
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
              <div>
                <span className="text-slate-500">Nama Siswa:</span>{' '}
                <span className="font-bold text-slate-900">{siswa.nama}</span>
              </div>
              <div>
                <span className="text-slate-500">NISN:</span>{' '}
                <span className="font-bold font-mono text-slate-900">{siswa.nisn}</span>
              </div>
              <div>
                <span className="text-slate-500">Asal Sekolah:</span>{' '}
                <span className="font-semibold text-slate-900">{siswa.sekolah}</span>
              </div>
              <div>
                <span className="text-slate-500">Peminatan / Jurusan:</span>{' '}
                <span className="font-semibold text-slate-900">{siswa.jurusan}</span>
              </div>
              <div>
                <span className="text-slate-500">Tempat Magang / Riset:</span>{' '}
                <span className="font-bold text-slate-900">{siswa.tempatMagang}</span>
              </div>
              <div>
                <span className="text-slate-500">Divisi / Laboratorium:</span>{' '}
                <span className="font-semibold text-slate-900">{siswa.divisi}</span>
              </div>
              <div>
                <span className="text-slate-500">Periode Pelaksanaan:</span>{' '}
                <span className="text-slate-800">{siswa.tanggalMulai} s/d {siswa.tanggalSelesai}</span>
              </div>
              <div>
                <span className="text-slate-500">Pembimbing Lapangan:</span>{' '}
                <span className="font-semibold text-slate-800">{siswa.mentorNama}</span>
              </div>
            </div>
          </div>

          {/* Tabel Nilai 3 Pilar Al-Jannah */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-700" />
              <span>A. Rekapitulasi Nilai Aspek Kinerja & Karakter</span>
            </h4>
            <table className="w-full text-xs text-left border border-slate-300">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                <tr>
                  <th className="py-2.5 px-3 w-12 text-center">No</th>
                  <th className="py-2.5 px-3">Komponen Penilaian Kinerja & Karakter</th>
                  <th className="py-2.5 px-3 w-28 text-center">Bobot</th>
                  <th className="py-2.5 px-3 w-28 text-center">Skor (0-100)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-2.5 px-3 text-center font-semibold">1</td>
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-slate-900">Karakter Islami, Adab & Kedisiplinan Kerja</span>
                    <p className="text-[11px] text-slate-500">Integritas, kejujuran, sopan santun, dan ketaatan tata tertib.</p>
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-600 font-medium">20%</td>
                  <td className="py-2.5 px-3 text-center font-bold text-slate-900">{defaultScores.kedisiplinan}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-center font-semibold">2</td>
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-slate-900">Penguasaan Sains Teknis & Kualitas Riset/Tugas</span>
                    <p className="text-[11px] text-slate-500">Kecakapan metode ilmiah, ketepatan analisis, dan hasil tugas.</p>
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-600 font-medium">30%</td>
                  <td className="py-2.5 px-3 text-center font-bold text-slate-900">{defaultScores.keterampilan}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-center font-semibold">3</td>
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-slate-900">Wawasan Alam, Eco-awareness & Inisiatif Solutif</span>
                    <p className="text-[11px] text-slate-500">Kepedulian kelestarian lingkungan, inisiatif, dan kreativitas.</p>
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-600 font-medium">20%</td>
                  <td className="py-2.5 px-3 text-center font-bold text-slate-900">{defaultScores.inisiatif}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-center font-semibold">4</td>
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-slate-900">Kerjasama Tim, Komunikasi & Kepemimpinan</span>
                    <p className="text-[11px] text-slate-500">Koordinasi tim, kepemimpinan Islami, dan etika komunikasi.</p>
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-600 font-medium">15%</td>
                  <td className="py-2.5 px-3 text-center font-bold text-slate-900">{defaultScores.kerjasama}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-center font-semibold">5</td>
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-slate-900">Presensi Kehadiran & Ketepatan Waktu Kerja</span>
                    <p className="text-[11px] text-slate-500">Kehadiran fisik/daring tepat waktu dan kepatuhan jam kerja.</p>
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-600 font-medium">15%</td>
                  <td className="py-2.5 px-3 text-center font-bold text-slate-900">{defaultScores.kehadiran}</td>
                </tr>
                <tr className="bg-emerald-50 font-bold border-t-2 border-emerald-300">
                  <td colSpan={3} className="py-3 px-3 text-right text-emerald-950 uppercase tracking-wide">
                    NILAI AKHIR RATA-RATA:
                  </td>
                  <td className="py-3 px-3 text-center text-base font-black text-emerald-800">
                    {defaultScores.rataRata}
                  </td>
                </tr>
                <tr className="bg-emerald-50 font-bold">
                  <td colSpan={3} className="py-2.5 px-3 text-right text-emerald-950 uppercase tracking-wide">
                    PREDIKAT KELULUSAN RISET MAGANG:
                  </td>
                  <td className="py-2.5 px-3 text-center text-xs font-black text-emerald-700">
                    {defaultScores.predikat}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Catatan Kinerja Mentor */}
          <div className="mb-8">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              B. Catatan & Rekomendasi Pembimbing Lapangan
            </h4>
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs italic text-slate-700 leading-relaxed">
              "{defaultScores.catatan}"
            </div>
          </div>

          {/* Tanda Tangan Resmi Al-Jannah */}
          <div className="grid grid-cols-2 gap-8 text-center text-xs pt-4 border-t border-slate-200">
            <div>
              <p className="text-slate-500">Cimanggis, Depok, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="text-slate-500 mt-1">Mengetahui,</p>
              <p className="font-semibold text-slate-900">Kepala SMA IAS Al-Jannah Depok</p>
              <div className="h-20 flex items-center justify-center">
                <span className="text-[10px] text-slate-300 uppercase tracking-widest border border-dashed border-slate-300 px-3 py-1 rounded">
                  [Tanda Tangan & Cap Sekolah]
                </span>
              </div>
              <p className="font-bold underline text-slate-900">Drs. H. Ahmad Fauzi, M.Pd</p>
              <p className="text-[10px] text-slate-500">NIP. 19780512 200312 1 002</p>
            </div>

            <div>
              <p className="text-slate-500">Disahkan di Lokasi Kemitraan,</p>
              <p className="font-semibold text-slate-900 mt-1">Pembimbing Lapangan (Mitra Riset / DUDI)</p>
              <div className="h-20 flex items-center justify-center">
                <span className="text-[10px] text-slate-300 uppercase tracking-widest border border-dashed border-slate-300 px-3 py-1 rounded">
                  [Tanda Tangan & Cap Mitra]
                </span>
              </div>
              <p className="font-bold underline text-slate-900">{defaultScores.dinilaiOleh}</p>
              <p className="text-[10px] text-slate-500 font-medium">{siswa.tempatMagang}</p>
            </div>
          </div>

        </div>

        {/* Modal Bottom Action Bar (Hidden during print) */}
        <div className="px-6 py-4 bg-slate-100/90 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <button
            id="back-to-dashboard-bottom-btn"
            onClick={onClose}
            className="flex items-center gap-2 bg-white hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-sm border border-slate-300 shadow-xs transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-600" />
            <span>Kembali ke Halaman Utama</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-xs active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Unduh PDF Rapor</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-200 font-medium text-sm transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
