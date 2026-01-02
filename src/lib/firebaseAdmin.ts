import admin from 'firebase-admin';
import type { ServiceAccount } from 'firebase-admin';
import "dotenv/config";
import { env } from '@/env';

// Converte o JSON importado para o tipo ServiceAccount
const firebaseConfigRaw = env.FIREBASE_SERVICE_ACCOUNT;

if (!firebaseConfigRaw) {
  throw new Error('FIREBASE_CONFIG environment variable is not set.');
}

const firebaseConfig = JSON.parse(firebaseConfigRaw) as ServiceAccount;

// ✅ Verifica se já não existe uma instância rodando
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
}

export const firebaseAdmin = admin;