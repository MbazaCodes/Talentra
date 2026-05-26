import {
  doc,
  getDoc,
  query,
  collection,
  where,
  orderBy,
  getDocs,
  setDoc,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/integrations/firebase/client";

export type Role = "job_seeker" | "employer" | "admin";

export interface SeekerProfile {
  full_name: string;
  email: string;
  role: Role;
  headline?: string;
  bio?: string;
  location?: string;
  phone?: string;
  skills?: string[];
  experience?: string[];
  education?: string[];
  resumeUrl?: string;
  portfolioUrl?: string;
  verified?: boolean;
  createdAt?: { seconds: number; nanoseconds: number };
  updatedAt?: { seconds: number; nanoseconds: number };
}

export interface ApplicationRecord {
  id: string;
  applicantId: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  status: string;
  createdAt: { seconds: number; nanoseconds: number };
}

export interface SavedJobRecord {
  id: string;
  userId: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  createdAt: { seconds: number; nanoseconds: number };
}

function requireFirestore() {
  if (!db) throw new Error("Firebase is not configured. Add Firebase values to .env.");
  return db;
}

function requireStorage() {
  if (!storage) throw new Error("Firebase storage is not configured. Add Firebase values to .env.");
  return storage;
}

export async function getUserProfile(uid: string) {
  const docRef = doc(requireFirestore(), "users", uid);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return snapshot.data() as SeekerProfile;
}

export async function saveUserProfile(uid: string, profile: Partial<SeekerProfile>) {
  const docRef = doc(requireFirestore(), "users", uid);
  await setDoc(docRef, { ...profile, updatedAt: serverTimestamp() }, { merge: true });
}

export async function uploadResumeFile(uid: string, file: File) {
  const fileRef = ref(requireStorage(), `resumes/${uid}/${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  await saveUserProfile(uid, { resumeUrl: url });
  return url;
}

export async function fetchUserApplications(uid: string) {
  const q = query(
    collection(requireFirestore(), "applications"),
    where("applicantId", "==", uid),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ApplicationRecord[];
}

export async function fetchSavedJobs(uid: string) {
  const q = query(
    collection(requireFirestore(), "saved_jobs"),
    where("userId", "==", uid),
    orderBy("createdAt", "desc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as SavedJobRecord[];
}

export async function ensureUserDocument(uid: string, email: string, role: Role, fullName: string) {
  const docRef = doc(requireFirestore(), "users", uid);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    await setDoc(docRef, {
      email,
      role,
      full_name: fullName,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
}
