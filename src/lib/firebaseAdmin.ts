import admin from 'firebase-admin';
import type { ServiceAccount } from 'firebase-admin';
import "dotenv/config";

// Converte o JSON importado para o tipo ServiceAccount
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG as string) as ServiceAccount;

// ✅ Verifica se já não existe uma instância rodando
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
}

export const firebaseAdmin = admin;