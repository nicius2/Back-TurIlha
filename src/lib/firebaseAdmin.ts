import admin from 'firebase-admin';
import type { ServiceAccount } from 'firebase-admin'; 

if(!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error('A variável FIREBASE_SERVICE_ACCOUNT não está definida.');
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const firebaseAdmin = admin;