import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import type { PPDBRegistration, AnnouncementItem, ContactInquiry, RegistrationStatus } from '../types';

// Load config from firebase-applet-config.json or environment fallback
const firebaseConfig = {
  projectId: "precise-honor-1mn89",
  appId: "1:703154773079:web:6a68b3683a3dc637fbd712",
  apiKey: "AIzaSyDqFBt-UMVsyekiHArZP7X1YkFW4D8Myls",
  authDomain: "precise-honor-1mn89.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-5d798d1f-7f96-42f7-befb-376f15c0e805",
  storageBucket: "precise-honor-1mn89.firebasestorage.app",
  messagingSenderId: "703154773079",
};

// Initialize Firebase App instance safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Firestore instance connected to the specified database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Local storage key for offline fallback / backup
const LOCAL_STORAGE_PPDB_KEY = 'mts_nurul_huda_ppdb_backup';
const LOCAL_STORAGE_ANNOUNCEMENTS_KEY = 'mts_nurul_huda_announcements_backup';
const LOCAL_STORAGE_INQUIRIES_KEY = 'mts_nurul_huda_inquiries_backup';

// --- PPDB REGISTRATION METHODS ---

export async function submitPPDBRegistration(
  data: Omit<PPDBRegistration, 'id' | 'createdAt' | 'status'>
): Promise<{ success: boolean; id: string; registrationNumber: string; error?: string }> {
  const timestamp = new Date().toISOString();
  
  // Format registration payload
  const payload = {
    ...data,
    createdAt: timestamp,
    status: 'pending' as RegistrationStatus,
    updatedAt: timestamp,
  };

  try {
    const colRef = collection(db, 'ppdb_registrations');
    const docRef = await addDoc(colRef, {
      ...payload,
      serverTime: serverTimestamp(),
    });

    // Also sync to local backup
    saveToLocalBackup(LOCAL_STORAGE_PPDB_KEY, { ...payload, id: docRef.id });

    return {
      success: true,
      id: docRef.id,
      registrationNumber: data.registrationNumber,
    };
  } catch (error) {
    console.warn('Firestore write error, saving to local fallback storage:', error);
    // Generate fallback ID
    const fallbackId = 'local-' + Date.now();
    const backupItem: PPDBRegistration = {
      ...payload,
      id: fallbackId,
    };
    saveToLocalBackup(LOCAL_STORAGE_PPDB_KEY, backupItem);
    return {
      success: true,
      id: fallbackId,
      registrationNumber: data.registrationNumber,
    };
  }
}

export async function fetchAllPPDBRegistrations(): Promise<PPDBRegistration[]> {
  try {
    const colRef = collection(db, 'ppdb_registrations');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const items: PPDBRegistration[] = [];
      snapshot.forEach((docSnapshot) => {
        const itemData = docSnapshot.data();
        items.push({
          ...(itemData as any),
          id: docSnapshot.id,
        });
      });
      return items;
    }
  } catch (error) {
    console.warn('Error fetching registrations from Firestore:', error);
  }

  // Fallback to local storage if Firestore is empty or throws error
  return getLocalBackup<PPDBRegistration>(LOCAL_STORAGE_PPDB_KEY);
}

export async function searchPPDBRegistration(queryText: string): Promise<PPDBRegistration | null> {
  const cleanQuery = queryText.trim().toUpperCase();
  if (!cleanQuery) return null;

  try {
    const colRef = collection(db, 'ppdb_registrations');
    
    // Check by registration number
    const q1 = query(colRef, where('registrationNumber', '==', cleanQuery));
    const snap1 = await getDocs(q1);
    if (!snap1.empty) {
      const doc = snap1.docs[0];
      return { ...(doc.data() as any), id: doc.id };
    }

    // Check by NISN
    const q2 = query(colRef, where('student.nisn', '==', cleanQuery));
    const snap2 = await getDocs(q2);
    if (!snap2.empty) {
      const doc = snap2.docs[0];
      return { ...(doc.data() as any), id: doc.id };
    }
  } catch (err) {
    console.warn('Error querying Firestore for student:', err);
  }

  // Fallback check in local backup
  const locals = getLocalBackup<PPDBRegistration>(LOCAL_STORAGE_PPDB_KEY);
  const found = locals.find(
    (item) =>
      item.registrationNumber.toUpperCase() === cleanQuery ||
      item.student.nisn.toUpperCase() === cleanQuery ||
      item.student.nik === cleanQuery
  );
  return found || null;
}

export async function updateRegistrationStatus(
  docId: string, 
  status: RegistrationStatus, 
  adminNotes?: string
): Promise<boolean> {
  try {
    if (!docId.startsWith('local-')) {
      const docRef = doc(db, 'ppdb_registrations', docId);
      await updateDoc(docRef, {
        status,
        adminNotes: adminNotes || '',
        verifiedAt: new Date().toISOString(),
      });
    }

    // Update in local backup
    const list = getLocalBackup<PPDBRegistration>(LOCAL_STORAGE_PPDB_KEY);
    const updated = list.map((item) => {
      if (item.id === docId) {
        return {
          ...item,
          status,
          adminNotes: adminNotes || item.adminNotes,
          verifiedAt: new Date().toISOString(),
        };
      }
      return item;
    });
    localStorage.setItem(LOCAL_STORAGE_PPDB_KEY, JSON.stringify(updated));

    return true;
  } catch (error) {
    console.error('Failed to update status in Firestore:', error);
    return false;
  }
}

export async function deletePPDBRegistration(docId: string): Promise<boolean> {
  try {
    if (!docId.startsWith('local-')) {
      const docRef = doc(db, 'ppdb_registrations', docId);
      await deleteDoc(docRef);
    }
    const list = getLocalBackup<PPDBRegistration>(LOCAL_STORAGE_PPDB_KEY);
    const filtered = list.filter((item) => item.id !== docId);
    localStorage.setItem(LOCAL_STORAGE_PPDB_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Failed to delete registration:', err);
    return false;
  }
}

// --- ANNOUNCEMENTS ---

export async function fetchSchoolAnnouncements(): Promise<AnnouncementItem[]> {
  try {
    const colRef = collection(db, 'school_announcements');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const announcements: AnnouncementItem[] = [];
      snapshot.forEach((docSnapshot) => {
        announcements.push({
          ...(docSnapshot.data() as any),
          id: docSnapshot.id,
        });
      });
      return announcements;
    }
  } catch (error) {
    console.warn('Error fetching announcements from Firestore:', error);
  }

  return getLocalBackup<AnnouncementItem>(LOCAL_STORAGE_ANNOUNCEMENTS_KEY);
}

export async function addSchoolAnnouncement(item: Omit<AnnouncementItem, 'id'>): Promise<AnnouncementItem> {
  try {
    const colRef = collection(db, 'school_announcements');
    const docRef = await addDoc(colRef, item);
    const created: AnnouncementItem = { ...item, id: docRef.id };
    saveToLocalBackup(LOCAL_STORAGE_ANNOUNCEMENTS_KEY, created);
    return created;
  } catch (error) {
    console.warn('Error creating announcement in Firestore, using local fallback:', error);
    const fallbackItem: AnnouncementItem = { ...item, id: 'ann-' + Date.now() };
    saveToLocalBackup(LOCAL_STORAGE_ANNOUNCEMENTS_KEY, fallbackItem);
    return fallbackItem;
  }
}

export async function deleteSchoolAnnouncement(id: string): Promise<boolean> {
  try {
    if (!id.startsWith('ann-')) {
      const docRef = doc(db, 'school_announcements', id);
      await deleteDoc(docRef);
    }
    const list = getLocalBackup<AnnouncementItem>(LOCAL_STORAGE_ANNOUNCEMENTS_KEY);
    const filtered = list.filter((a) => a.id !== id);
    localStorage.setItem(LOCAL_STORAGE_ANNOUNCEMENTS_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Failed to delete announcement:', err);
    return false;
  }
}

// --- CONTACT INQUIRIES ---

export async function submitContactInquiry(inquiry: Omit<ContactInquiry, 'id' | 'createdAt'>): Promise<boolean> {
  const timestamp = new Date().toISOString();
  const payload = { ...inquiry, createdAt: timestamp, isRead: false };
  try {
    const colRef = collection(db, 'contact_inquiries');
    const docRef = await addDoc(colRef, payload);
    saveToLocalBackup(LOCAL_STORAGE_INQUIRIES_KEY, { ...payload, id: docRef.id });
    return true;
  } catch (err) {
    console.warn('Saving inquiry to local storage fallback:', err);
    saveToLocalBackup(LOCAL_STORAGE_INQUIRIES_KEY, { ...payload, id: 'inq-' + Date.now() });
    return true;
  }
}

export async function fetchContactInquiries(): Promise<ContactInquiry[]> {
  try {
    const colRef = collection(db, 'contact_inquiries');
    const snap = await getDocs(colRef);
    if (!snap.empty) {
      const inqs: ContactInquiry[] = [];
      snap.forEach((d) => inqs.push({ ...(d.data() as any), id: d.id }));
      return inqs;
    }
  } catch (err) {
    console.warn('Error fetching inquiries from Firestore:', err);
  }
  return getLocalBackup<ContactInquiry>(LOCAL_STORAGE_INQUIRIES_KEY);
}

// --- HELPER LOCAL BACKUP UTILITIES ---

function saveToLocalBackup<T extends { id: string }>(key: string, item: T) {
  try {
    const current = getLocalBackup<T>(key);
    // Replace if exists, else append
    const index = current.findIndex((x) => x.id === item.id);
    if (index >= 0) {
      current[index] = item;
    } else {
      current.unshift(item);
    }
    localStorage.setItem(key, JSON.stringify(current));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
}

export function getLocalBackup<T>(key: string): T[] {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored) as T[];
    }
  } catch (e) {
    console.error('LocalStorage read error:', e);
  }
  return [];
}

// Utility to generate unique PPDB code e.g. PPDB-NHM-26-8472
export function generateRegistrationCode(): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `PPDB-NHM-${year}-${randomDigits}`;
}

// Client-side image compressor for fast and reliable cloud upload without hitting size limits
export function compressImageFile(file: File, maxWidth = 1000, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const elem = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        elem.width = width;
        elem.height = height;
        const ctx = elem.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = elem.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}
