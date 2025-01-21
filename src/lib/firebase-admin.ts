import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import type { AppOptions, ServiceAccount } from 'firebase-admin/app';

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  } as ServiceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
} as AppOptions;

// Initialize Firebase Admin
const apps = getApps();
const app = apps.length === 0 ? initializeApp(firebaseAdminConfig) : apps[0];

export const adminStorage = getStorage(app);
