import admin from 'firebase-admin';
import type { ServiceAccount } from 'firebase-admin';

// Verifica a variável
if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error('A variável FIREBASE_SERVICE_ACCOUNT não está definida.');
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// ✅ ADICIONE ISSO: Verifica se já não existe uma instância rodando
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export const firebaseAdmin = admin;