import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  async sendResetPasswordEmail(to: string, resetUrl: string): Promise<boolean> {
    const mailOptions = {
      from: `"IntranetAlejandria" <${process.env.GMAIL}>`,
      to,
      subject: 'Recuperación de contraseña',
      html: `
        <h3>Recuperación de contraseña</h3>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetUrl}" target="_blank">Recuperar Contraseña</a>
        <p>Este enlace expirará en 15 minutos.</p>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Correo enviado:', info.response);
      return true;
    } catch (error) {
      console.error('Error enviando el correo:', error);
      return false;
    }
  }
}
