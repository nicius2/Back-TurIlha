import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  secure: true,
  port: 465,
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY 
  }
});

export async function enviarEmailReset(email: string, token: string) {
    const link = `${process.env.FRONTEND_URL}/auth/update-password?token=${token}`;

    try {
        const info = await transporter.sendMail({
            // ⚠️ ATENÇÃO: Se não tiver domínio próprio verificado, USE ESTE:
            from: '🏝️TurIlha <onboarding@resend.dev>', 
            
            // ⚠️ ATENÇÃO: Em modo de teste (sem domínio), só chega se o "to" for o seu email
            to: email, 
            
            subject: 'Recuperação de Senha',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h3>Esqueceu a senha?</h3>
                    <p>Clique no botão abaixo para redefinir:</p>
                    <a href="${link}" style="background-color: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">REDEFINIR SENHA</a>
                    <p style="font-size: 12px; margin-top: 20px;">Se não foi você, ignore este e-mail.</p>
                </div>
            `
        });

        console.log("✅ E-mail enviado via Resend! ID:", info.messageId);
        
    } catch (erro) {
        console.error("❌ Erro ao enviar e-mail:", erro);
        // Dica: O erro mais comum aqui é "Sender not allowed" se o domínio estiver errado
    }
}