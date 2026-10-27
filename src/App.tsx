import React, { useState, useEffect } from 'react';
import { UserRole, Siswa, JadwalMonitoring, PenilaianKinerja, JurnalHarian, LogAktivitas, Notifikasi, AuthUser } from './types';
import { 
  INITIAL_SISWA, 
  INITIAL_JADWAL, 
  INITIAL_PENILAIAN, 
  INITIAL_JURNAL, 
  INITIAL_LOGS, 
  INITIAL_NOTIF 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { SiswaView } from './components/SiswaView';
import { MentorView } from './components/MentorView';
import { AdminView } from './components/AdminView';
import { PenilaianModal } from './components/PenilaianModal';
import { JadwalModal } from './components/JadwalModal';
import { TambahSiswaModal } from './components/TambahSiswaModal';
import { PrintReportModal } from './components/PrintReportModal';
import { PromptModal } from './components/PromptModal';
import { EditProfilModal } from './components/EditProfilModal';
import { LoginView } from './components/LoginView';
import { auth, testFirestoreConnection, logoutFirebase } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  subscribeToSiswa,
  subscribeToJurnal,
  subscribeToJadwal,
  subscribeToPenilaian,
  subscribeToLogs,
  saveSiswaFirestore,
  saveJurnalFirestore,
  saveJadwalFirestore,
  savePenilaianFirestore,
  saveLogFirestore,
  seedInitialDataIfEmpty
} from './services/firestoreService';

export default function App() {
  // Main Datasets with initial realistic data & local caching (with auto-migration to SMA IAS Al-Jannah)
  const [siswaList, setSiswaList] = useState<Siswa[]>(() => {
    const saved = localStorage.getItem('simagang_aljannah_siswa_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    const oldSaved = localStorage.getItem('simagang_siswa');
    if (oldSaved) {
      try {
        const parsed = JSON.parse(oldSaved);
        if (Array.isArray(parsed) && parsed.length > 0 && !parsed[0]?.sekolah?.includes('Al-Jannah')) {
          // migrate to SMA IAS Al-Jannah
          return INITIAL_SISWA;
        }
        return parsed;
      } catch { /* fallback */ }
    }
    return INITIAL_SISWA;
  });

  const [jadwalList, setJadwalList] = useState<JadwalMonitoring[]>(() => {
    const saved = localStorage.getItem('simagang_aljannah_jadwal_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_JADWAL;
  });

  const [penilaianMap, setPenilaianMap] = useState<Record<string, PenilaianKinerja>>(() => {
    const saved = localStorage.getItem('simagang_aljannah_penilaian_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_PENILAIAN;
  });

  const [jurnalList, setJurnalList] = useState<JurnalHarian[]>(() => {
    const saved = localStorage.getItem('simagang_aljannah_jurnal_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_JURNAL;
  });

  const [logs, setLogs] = useState<LogAktivitas[]>(() => {
    const saved = localStorage.getItem('simagang_aljannah_logs_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_LOGS;
  });

  const [notifikasiList, setNotifikasiList] = useState<Notifikasi[]>(() => {
    const saved = localStorage.getItem('simagang_aljannah_notif_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return INITIAL_NOTIF;
  });

  // Active student for student view
  const activeSiswa = siswaList[0] || INITIAL_SISWA[0];

  // Auth & Session State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('simagang_aljannah_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    // Default active user session for SMA IAS Al-Jannah Depok
    return {
      id: 'usr-default',
      username: 'siswa',
      nama: activeSiswa.nama,
      role: 'siswa',
      sekolah: activeSiswa.sekolah,
      siswaId: activeSiswa.id
    };
  });

  // Role State (synced with currentUser)
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    return currentUser?.role || 'siswa';
  });

  // API Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('24 Sep 2026, 11:55 WIB');

  // Modal Controls
  const [selectedSiswaForPenilaian, setSelectedSiswaForPenilaian] = useState<Siswa | null>(null);
  const [isTambahJadwalOpen, setIsTambahJadwalOpen] = useState(false);
  const [isTambahSiswaOpen, setIsTambahSiswaOpen] = useState(false);
  const [selectedSiswaForReport, setSelectedSiswaForReport] = useState<Siswa | null>(null);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [isEditProfilOpen, setIsEditProfilOpen] = useState(false);

  // 1. Firebase on boot: verify connection and seed initial Firestore data
  useEffect(() => {
    testFirestoreConnection().then(async () => {
      // Seed if cloud database is empty
      await seedInitialDataIfEmpty(
        INITIAL_SISWA,
        INITIAL_JADWAL,
        INITIAL_PENILAIAN,
        INITIAL_JURNAL,
        INITIAL_LOGS
      );
    });
  }, []);

  // 2. Firebase Auth listener
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        console.log('Firebase Auth: User active', fbUser.email);
        const email = fbUser.email || '';
        const isAdminUser = email === 'muh.rais2010@gmail.com';
        setCurrentUser(prev => {
          if (!prev || prev.id !== fbUser.uid) {
            return {
              id: fbUser.uid,
              username: email.split('@')[0] || 'google_user',
              nama: fbUser.displayName || (isAdminUser ? 'Muh. Rais (Admin Al-Jannah)' : activeSiswa.nama),
              role: isAdminUser ? 'admin' : (prev?.role || 'siswa'),
              sekolah: activeSiswa.sekolah
            };
          }
          return prev;
        });
      }
    });

    return () => unsubscribeAuth();
  }, [activeSiswa.nama, activeSiswa.sekolah]);

  // 3. Real-time Firestore Subscriptions
  useEffect(() => {
    const unsubSiswa = subscribeToSiswa((data) => setSiswaList(data));
    const unsubJurnal = subscribeToJurnal((data) => setJurnalList(data));
    const unsubJadwal = subscribeToJadwal((data) => setJadwalList(data));
    const unsubPenilaian = subscribeToPenilaian((data) => setPenilaianMap(data));
    const unsubLogs = subscribeToLogs((data) => setLogs(data));

    return () => {
      unsubSiswa();
      unsubJurnal();
      unsubJadwal();
      unsubPenilaian();
      unsubLogs();
    };
  }, []);

  // Sync to LocalStorage as fast offline fallback
  useEffect(() => {
    localStorage.setItem('simagang_aljannah_siswa_v2', JSON.stringify(siswaList));
  }, [siswaList]);

  useEffect(() => {
    localStorage.setItem('simagang_aljannah_jadwal_v2', JSON.stringify(jadwalList));
  }, [jadwalList]);

  useEffect(() => {
    localStorage.setItem('simagang_aljannah_penilaian_v2', JSON.stringify(penilaianMap));
  }, [penilaianMap]);

  useEffect(() => {
    localStorage.setItem('simagang_aljannah_jurnal_v2', JSON.stringify(jurnalList));
  }, [jurnalList]);

  useEffect(() => {
    localStorage.setItem('simagang_aljannah_logs_v2', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('simagang_aljannah_notif_v2', JSON.stringify(notifikasiList));
  }, [notifikasiList]);

  // Activity Logger Helper with simulated encryption hash and Firestore persistence
  const addLog = (pelaku: string, role: UserRole, aksi: string, detail: string) => {
    const newLog: LogAktivitas = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      pelaku,
      role,
      aksi,
      detail,
      hashSecurity: `sha256-${Math.random().toString(36).substring(2, 9)}...`
    };

    setLogs(prev => [newLog, ...prev]);
    saveLogFirestore(newLog).catch(console.warn);
  };

  // Handler: Role switcher
  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    if (currentUser) {
      let updatedNama = currentUser.nama;
      if (newRole === 'siswa') {
        updatedNama = activeSiswa.nama;
      } else if (newRole === 'mentor') {
        updatedNama = 'Dr. Ir. Ahmad Baihaqi, M.Si';
      } else if (newRole === 'admin') {
        updatedNama = 'Drs. H. Ahmad Fauzi, M.Pd';
      }

      const updatedUser: AuthUser = {
        ...currentUser,
        role: newRole,
        nama: updatedNama,
        sekolah: 'SMA Islam Alam & Sains Al-Jannah Depok'
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('simagang_aljannah_auth_user', JSON.stringify(updatedUser));
    }
    addLog(currentUser?.nama || 'Pengguna', newRole, 'Beralih Peran', `Beralih ke tampilan ${newRole.toUpperCase()} SMA IAS Al-Jannah`);
  };

  // Handler: Login Manual / Google
  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    localStorage.setItem('simagang_aljannah_auth_user', JSON.stringify(user));

    if (user.role === 'siswa' && user.nama) {
      setSiswaList(prev => prev.map((s, idx) => {
        if (idx === 0) {
          const updated = { ...s, nama: user.nama };
          saveSiswaFirestore(updated).catch(console.warn);
          return updated;
        }
        return s;
      }));
    }

    addLog(user.nama, user.role, 'Login Pengguna', `Berhasil masuk ke portal SIMagang IAS Al-Jannah sebagai ${user.role}`);
  };

  // Handler: Logout
  const handleLogout = async () => {
    await logoutFirebase();
    setCurrentUser(null);
    localStorage.removeItem('simagang_aljannah_auth_user');
  };

  // Handler: Update Siswa Profile (Ganti Nama dll) with Firebase sync
  const handleSaveEditProfil = (updatedData: Partial<Siswa>) => {
    setSiswaList(prev => prev.map(s => {
      if (s.id === activeSiswa.id) {
        const merged: Siswa = {
          ...s,
          ...updatedData
        };
        saveSiswaFirestore(merged).catch(console.warn);
        return merged;
      }
      return s;
    }));

    if (currentUser && updatedData.nama) {
      const updatedUser: AuthUser = {
        ...currentUser,
        nama: updatedData.nama,
        sekolah: updatedData.sekolah || currentUser.sekolah
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('simagang_aljannah_auth_user', JSON.stringify(updatedUser));
    }

    addLog(updatedData.nama || activeSiswa.nama, 'siswa', 'Perbarui Profil', `Memperbarui identitas siswa: ${updatedData.nama || activeSiswa.nama}`);

    setNotifikasiList(prev => [
      {
        id: `notif-${Date.now()}`,
        targetRole: 'siswa',
        judul: 'Profil Berhasil Diperbarui',
        pesan: `Data pribadi Anda (${updatedData.nama || activeSiswa.nama}) telah tersimpan ke Google Cloud Firestore.`,
        waktu: 'Baru saja',
        sudahDibaca: false,
        tipe: 'info'
      },
      ...prev
    ]);
  };

  // Handler: Submit Jurnal Harian oleh Siswa with Firebase sync
  const handleSubmitJurnal = (data: { aktivitas: string; hasil: string; kendala: string }) => {
    const newJurnal: JurnalHarian = {
      id: `jur-${Date.now()}`,
      siswaId: activeSiswa.id,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      aktivitas: data.aktivitas,
      hasil: data.hasil,
      kendala: data.kendala,
      statusParaf: 'Menunggu Paraf'
    };

    setJurnalList(prev => [newJurnal, ...prev]);
    saveJurnalFirestore(newJurnal).catch(console.warn);
    addLog(activeSiswa.nama, 'siswa', 'Kirim Laporan Riset Harian', `Menambahkan jurnal riset laboratorium untuk ${activeSiswa.tempatMagang}`);
    
    // Notifikasi otomatis ke mentor
    setNotifikasiList(prev => [
      {
        id: `notif-${Date.now()}`,
        targetRole: 'mentor',
        judul: 'Jurnal Riset Harian Masuk',
        pesan: `${activeSiswa.nama} telah mengunggah laporan riset harian untuk diperiksa.`,
        waktu: 'Baru saja',
        sudahDibaca: false,
        tipe: 'info'
      },
      ...prev
    ]);
  };

  // Handler: Simpan Penilaian Kinerja oleh Mentor with Firebase sync
  const handleSavePenilaian = (data: Omit<PenilaianKinerja, 'id' | 'tanggal' | 'dinilaiOleh'>) => {
    const targetSiswa = siswaList.find(s => s.id === data.siswaId);
    const mentorName = currentUser?.role === 'mentor' ? currentUser.nama : (targetSiswa?.mentorNama || 'Dr. Ir. Ahmad Baihaqi, M.Si');

    const newPenilaian: PenilaianKinerja = {
      ...data,
      id: `pen-${Date.now()}`,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      dinilaiOleh: `${mentorName} (Pembimbing Lapangan)`
    };

    setPenilaianMap(prev => ({
      ...prev,
      [data.siswaId]: newPenilaian
    }));
    savePenilaianFirestore(newPenilaian).catch(console.warn);

    // Update siswa list nilai akhir & sync to Firestore
    setSiswaList(prev => prev.map(s => {
      if (s.id === data.siswaId) {
        const updatedS = {
          ...s,
          nilaiAkhir: Math.round(data.rataRata),
          predikat: data.predikat as any
        };
        saveSiswaFirestore(updatedS).catch(console.warn);
        return updatedS;
      }
      return s;
    }));

    addLog(mentorName, 'mentor', 'Input Penilaian 3 Pilar', `Nilai akhir ${targetSiswa?.nama || 'Siswa'}: ${data.rataRata} (${data.predikat})`);

    // Notifikasi otomatis ke siswa
    setNotifikasiList(prev => [
      {
        id: `notif-${Date.now()}`,
        targetRole: 'siswa',
        siswaId: data.siswaId,
        judul: 'Evaluasi Kinerja Telah Dinilai',
        pesan: `Pembimbing telah memperbarui evaluasi kinerja magang Anda dengan skor ${data.rataRata} (${data.predikat}).`,
        waktu: 'Baru saja',
        sudahDibaca: false,
        tipe: 'nilai'
      },
      ...prev
    ]);

    setSelectedSiswaForPenilaian(null);
  };

  // Handler: Tambah Jadwal Monitoring with Firebase sync
  const handleSaveJadwal = (data: Omit<JadwalMonitoring, 'id' | 'status'>) => {
    const newJadwal: JadwalMonitoring = {
      ...data,
      id: `jad-${Date.now()}`,
      status: 'Menunggu'
    };

    setJadwalList(prev => [newJadwal, ...prev]);
    saveJadwalFirestore(newJadwal).catch(console.warn);
    addLog(currentUser?.nama || 'Pembimbing Lapangan', 'mentor', 'Jadwal Monitoring Baru', `Agenda: ${data.topik} pada ${data.tanggal} (${data.mode})`);

    // Notifikasi otomatis ke siswa
    setNotifikasiList(prev => [
      {
        id: `notif-${Date.now()}`,
        targetRole: 'siswa',
        siswaId: data.siswaId,
        judul: 'Jadwal Monitoring Baru',
        pesan: `Pembimbing menjadwalkan agenda "${data.topik}" pada ${data.tanggal} pukul ${data.waktu}.`,
        waktu: 'Baru saja',
        sudahDibaca: false,
        tipe: 'jadwal'
      },
      ...prev
    ]);

    setIsTambahJadwalOpen(false);
  };

  // Handler: Mentor Paraf Jurnal with Firebase sync
  const handleApproveJurnal = (jurnalId: string, catatanMentor: string) => {
    setJurnalList(prev => prev.map(jur => {
      if (jur.id === jurnalId) {
        const updated = {
          ...jur,
          statusParaf: 'Disetujui' as const,
          catatanMentor
        };
        saveJurnalFirestore(updated).catch(console.warn);
        return updated;
      }
      return jur;
    }));

    addLog(currentUser?.nama || 'Pembimbing Lapangan', 'mentor', 'Verifikasi Jurnal Riset', `Paraf disetujui dengan catatan: "${catatanMentor}"`);

    setNotifikasiList(prev => [
      {
        id: `notif-${Date.now()}`,
        targetRole: 'siswa',
        judul: 'Laporan Riset Disetujui',
        pesan: `Pembimbing memberikan feedback: "${catatanMentor}"`,
        waktu: 'Baru saja',
        sudahDibaca: false,
        tipe: 'info'
      },
      ...prev
    ]);
  };

  // Handler: Tambah Siswa Baru oleh Admin with Firebase sync
  const handleSaveTambahSiswa = (newSiswaData: Omit<Siswa, 'id' | 'progresPercent'>) => {
    const newSiswa: Siswa = {
      ...newSiswaData,
      id: `sis-${Date.now()}`,
      progresPercent: 10
    };

    setSiswaList(prev => [newSiswa, ...prev]);
    saveSiswaFirestore(newSiswa).catch(console.warn);
    addLog('Koordinator Riset Sekolah', 'admin', 'Registrasi Peserta Baru', `Pendaftaran siswa ${newSiswa.nama} (${newSiswa.sekolah})`);
    setIsTambahSiswaOpen(false);
  };

  // Handler: Sinkronisasi API Real-time Simulator
  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const nowStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
      setLastSyncTime(nowStr);
      setIsSyncing(false);
      addLog('Sistem API Al-Jannah', 'admin', 'Sinkronisasi Real-Time Berhasil', `Sinkronisasi aman ke Google Cloud Firestore & Sistem Akademik SMA IAS Al-Jannah (Total ${siswaList.length} data siswa)`);
      
      setNotifikasiList(prev => [
        {
          id: `notif-${Date.now()}`,
          targetRole: 'all',
          judul: 'Sinkronisasi Cloud Sukses',
          pesan: `Semua data monitoring & penilaian telah tersinkronkan ke Google Cloud Firestore pada ${nowStr}.`,
          waktu: 'Baru saja',
          sudahDibaca: false,
          tipe: 'info'
        },
        ...prev
      ]);
    }, 1200);
  };

  // If user is not logged in, show clean Login Screen
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-emerald-600 selection:text-white flex flex-col justify-center">
        <LoginView
          onLogin={handleLogin}
          defaultSiswaName={activeSiswa.nama}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 font-sans antialiased selection:bg-emerald-600 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        notifikasiList={notifikasiList}
        onOpenPromptModal={() => setIsPromptModalOpen(true)}
        currentUser={currentUser}
        onOpenEditProfil={() => setIsEditProfilOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Active Role View */}
        {currentRole === 'siswa' && (
          <SiswaView
            siswa={activeSiswa}
            jadwalList={jadwalList}
            penilaian={penilaianMap[activeSiswa.id]}
            jurnalList={jurnalList}
            onSubmitJurnal={handleSubmitJurnal}
            onOpenPrintReport={(s) => setSelectedSiswaForReport(s)}
            onOpenEditProfil={() => setIsEditProfilOpen(true)}
          />
        )}

        {currentRole === 'mentor' && (
          <MentorView
            siswaList={siswaList}
            jadwalList={jadwalList}
            penilaianMap={penilaianMap}
            jurnalList={jurnalList}
            onOpenPenilaian={(s) => setSelectedSiswaForPenilaian(s)}
            onOpenTambahJadwal={() => setIsTambahJadwalOpen(true)}
            onApproveJurnal={handleApproveJurnal}
            onOpenPrintReport={(s) => setSelectedSiswaForReport(s)}
          />
        )}

        {currentRole === 'admin' && (
          <AdminView
            siswaList={siswaList}
            penilaianMap={penilaianMap}
            logs={logs}
            onOpenTambahSiswa={() => setIsTambahSiswaOpen(true)}
            onOpenPrintReport={(s) => setSelectedSiswaForReport(s)}
            onTriggerSync={handleTriggerSync}
            isSyncing={isSyncing}
            lastSyncTime={lastSyncTime}
          />
        )}

      </main>

      {/* Modals */}
      {selectedSiswaForPenilaian && (
        <PenilaianModal
          siswa={selectedSiswaForPenilaian}
          existingPenilaian={penilaianMap[selectedSiswaForPenilaian.id]}
          onClose={() => setSelectedSiswaForPenilaian(null)}
          onSave={handleSavePenilaian}
        />
      )}

      {isTambahJadwalOpen && (
        <JadwalModal
          siswaList={siswaList}
          onClose={() => setIsTambahJadwalOpen(false)}
          onSave={handleSaveJadwal}
        />
      )}

      {isTambahSiswaOpen && (
        <TambahSiswaModal
          onClose={() => setIsTambahSiswaOpen(false)}
          onSave={handleSaveTambahSiswa}
        />
      )}

      {selectedSiswaForReport && (
        <PrintReportModal
          siswa={selectedSiswaForReport}
          penilaian={penilaianMap[selectedSiswaForReport.id]}
          onClose={() => setSelectedSiswaForReport(null)}
        />
      )}

      {isPromptModalOpen && (
        <PromptModal
          onClose={() => setIsPromptModalOpen(false)}
        />
      )}

      {isEditProfilOpen && (
        <EditProfilModal
          siswa={activeSiswa}
          onClose={() => setIsEditProfilOpen(false)}
          onSave={handleSaveEditProfil}
        />
      )}

    </div>
  );
}
