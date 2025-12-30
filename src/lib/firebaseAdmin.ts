import admin from 'firebase-admin';
import type { ServiceAccount } from 'firebase-admin';
import serviceAccount from "../../turilha-firebase-adminsdk.json"; // Importa o JSON como um objeto

// Converte o JSON importado para o tipo ServiceAccount
const firebaseConfig = serviceAccount as ServiceAccount;

// ✅ Verifica se já não existe uma instância rodando
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
}

export const firebaseAdmin = admin;