import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { Siswa, JadwalMonitoring, PenilaianKinerja, JurnalHarian, LogAktivitas } from '../types';

// Collection references
const SISWA_COL = 'siswa';
const JURNAL_COL = 'jurnal';
const JADWAL_COL = 'jadwal';
const PENILAIAN_COL = 'penilaian';
const LOGS_COL = 'logs';

/**
 * Real-time subscription to Siswa collection
 */
export function subscribeToSiswa(
  onData: (data: Siswa[]) => void,
  onError?: (err: any) => void
) {
  try {
    const q = collection(db, SISWA_COL);
    return onSnapshot(
      q,
      (snapshot) => {
        const list: Siswa[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as Siswa);
        });
        if (list.length > 0) {
          onData(list);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, SISWA_COL);
        if (onError) onError(error);
      }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, SISWA_COL);
    return () => {};
  }
}

/**
 * Real-time subscription to Jurnal collection
 */
export function subscribeToJurnal(
  onData: (data: JurnalHarian[]) => void,
  onError?: (err: any) => void
) {
  try {
    const q = collection(db, JURNAL_COL);
    return onSnapshot(
      q,
      (snapshot) => {
        const list: JurnalHarian[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as JurnalHarian);
        });
        if (list.length > 0) {
          onData(list);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, JURNAL_COL);
        if (onError) onError(error);
      }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, JURNAL_COL);
    return () => {};
  }
}

/**
 * Real-time subscription to Jadwal collection
 */
export function subscribeToJadwal(
  onData: (data: JadwalMonitoring[]) => void,
  onError?: (err: any) => void
) {
  try {
    const q = collection(db, JADWAL_COL);
    return onSnapshot(
      q,
      (snapshot) => {
        const list: JadwalMonitoring[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as JadwalMonitoring);
        });
        if (list.length > 0) {
          onData(list);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, JADWAL_COL);
        if (onError) onError(error);
      }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, JADWAL_COL);
    return () => {};
  }
}

/**
 * Real-time subscription to Penilaian collection
 */
export function subscribeToPenilaian(
  onData: (data: Record<string, PenilaianKinerja>) => void,
  onError?: (err: any) => void
) {
  try {
    const q = collection(db, PENILAIAN_COL);
    return onSnapshot(
      q,
      (snapshot) => {
        const map: Record<string, PenilaianKinerja> = {};
        snapshot.forEach((docSnap) => {
          const item = { id: docSnap.id, ...docSnap.data() } as PenilaianKinerja;
          if (item.siswaId) {
            map[item.siswaId] = item;
          }
        });
        if (Object.keys(map).length > 0) {
          onData(map);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, PENILAIAN_COL);
        if (onError) onError(error);
      }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, PENILAIAN_COL);
    return () => {};
  }
}

/**
 * Real-time subscription to Logs collection
 */
export function subscribeToLogs(
  onData: (data: LogAktivitas[]) => void,
  onError?: (err: any) => void
) {
  try {
    const q = collection(db, LOGS_COL);
    return onSnapshot(
      q,
      (snapshot) => {
        const list: LogAktivitas[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as LogAktivitas);
        });
        if (list.length > 0) {
          onData(list);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, LOGS_COL);
        if (onError) onError(error);
      }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, LOGS_COL);
    return () => {};
  }
}

/**
 * Save / Update Siswa document
 */
export async function saveSiswaFirestore(siswa: Siswa): Promise<void> {
  const docPath = `${SISWA_COL}/${siswa.id}`;
  try {
    const { id, ...data } = siswa;
    await setDoc(doc(db, SISWA_COL, siswa.id), data, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

/**
 * Save Jurnal Harian document
 */
export async function saveJurnalFirestore(jurnal: JurnalHarian): Promise<void> {
  const docPath = `${JURNAL_COL}/${jurnal.id}`;
  try {
    const { id, ...data } = jurnal;
    await setDoc(doc(db, JURNAL_COL, jurnal.id), data, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

/**
 * Save Jadwal Monitoring document
 */
export async function saveJadwalFirestore(jadwal: JadwalMonitoring): Promise<void> {
  const docPath = `${JADWAL_COL}/${jadwal.id}`;
  try {
    const { id, ...data } = jadwal;
    await setDoc(doc(db, JADWAL_COL, jadwal.id), data, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

/**
 * Save Penilaian Kinerja document
 */
export async function savePenilaianFirestore(penilaian: PenilaianKinerja): Promise<void> {
  const docPath = `${PENILAIAN_COL}/${penilaian.id}`;
  try {
    const { id, ...data } = penilaian;
    await setDoc(doc(db, PENILAIAN_COL, penilaian.id), data, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

/**
 * Save Log Aktivitas document
 */
export async function saveLogFirestore(log: LogAktivitas): Promise<void> {
  const docPath = `${LOGS_COL}/${log.id}`;
  try {
    const { id, ...data } = log;
    await setDoc(doc(db, LOGS_COL, log.id), data, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

/**
 * Seed initial sample dataset to Firestore if collections are empty and user is authenticated
 */
export async function seedInitialDataIfEmpty(
  initialSiswa: Siswa[],
  initialJadwal: JadwalMonitoring[],
  initialPenilaian: Record<string, PenilaianKinerja>,
  initialJurnal: JurnalHarian[],
  initialLogs: LogAktivitas[]
): Promise<boolean> {
  try {
    const siswaSnap = await getDocs(collection(db, SISWA_COL));
    if (siswaSnap.empty) {
      console.log('Seeding initial data to Firestore...');
      // Seed Siswa
      for (const s of initialSiswa) {
        const { id, ...data } = s;
        await setDoc(doc(db, SISWA_COL, s.id), data);
      }
      // Seed Jadwal
      for (const j of initialJadwal) {
        const { id, ...data } = j;
        await setDoc(doc(db, JADWAL_COL, j.id), data);
      }
      // Seed Penilaian
      for (const key of Object.keys(initialPenilaian)) {
        const p = initialPenilaian[key];
        const { id, ...data } = p;
        await setDoc(doc(db, PENILAIAN_COL, p.id), data);
      }
      // Seed Jurnal
      for (const jur of initialJurnal) {
        const { id, ...data } = jur;
        await setDoc(doc(db, JURNAL_COL, jur.id), data);
      }
      // Seed Logs
      for (const l of initialLogs) {
        const { id, ...data } = l;
        await setDoc(doc(db, LOGS_COL, l.id), data);
      }
      console.log('Initial data seeded successfully.');
      return true;
    }
    return false;
  } catch (error) {
    console.warn('Initial seeding skipped or not permitted:', error);
    return false;
  }
}
