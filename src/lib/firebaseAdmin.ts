import admin from 'firebase-admin';
import type { ServiceAccount } from 'firebase-admin'; // 1. Importe o tipo
import serviceAccountFile from '../../turilha-firebase-adminsdk.json';

const serviceAccount = serviceAccountFile as ServiceAccount;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export const firebaseAdmin = admin;