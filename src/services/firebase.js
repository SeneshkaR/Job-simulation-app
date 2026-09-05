import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

// Firebase config — set these in your .env file or replace directly for development.
// In production, use environment variables via react-native-dotenv.
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'YOUR_FIREBASE_API_KEY',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'YOUR_PROJECT.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'YOUR_PROJECT.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: process.env.FIREBASE_APP_ID || '1:000000000000:web:0000000000000000',
};

// Only initialize Firebase if real config is provided
const isConfigured = firebaseConfig.apiKey !== 'YOUR_FIREBASE_API_KEY';

// FIX (Bug #1): Export `app` so aiService.js can import it for getAuthHeader().
// Previously `let app = null` was NOT exported, causing aiService.js to receive
// undefined and silently fail to get auth tokens.
export let app = null;
let auth = null;
let db = null;
let googleProvider = null;

if (isConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
}

// ─── Auth helpers ────────────────────────────────────────────────────────────

export async function signInWithGoogle() {
  if (!isConfigured) throw new Error('Firebase is not configured. Set your Firebase keys in .env');
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function signInWithEmail(email, password) {
  if (!isConfigured) throw new Error('Firebase is not configured. Set your Firebase keys in .env');
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function signUpWithEmail(email, password, displayName) {
  if (!isConfigured) throw new Error('Firebase is not configured. Set your Firebase keys in .env');
  const result = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(result.user, { displayName });
  }
  return result.user;
}

export async function logOut() {
  if (!isConfigured) return;
  await signOut(auth);
}

export function onAuthChange(callback) {
  if (!isConfigured) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

// ─── Firestore helpers ───────────────────────────────────────────────────────

export async function saveUserProfile(uid, profileData) {
  if (!isConfigured || !db) return;
  const ref = doc(db, 'users', uid);
  await setDoc(ref, {
    ...profileData,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function getUserProfile(uid) {
  if (!isConfigured || !db) return null;
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function updateUserProfile(uid, updates) {
  if (!isConfigured || !db) return;
  const ref = doc(db, 'users', uid);
  await updateDoc(ref, { ...updates, updatedAt: serverTimestamp() });
}

export { isConfigured };
