import admin from 'firebase-admin';
import serviceAccount from '../../turilha-firebase-adminsdk.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any)
  });
}

export const firebaseAdmin = admin;