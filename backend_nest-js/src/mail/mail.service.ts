import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    constructor(private readonly mailerService:MailerService){}

    async sendResetPasswordEmail(to:string,url:string){
        await this.mailerService.sendMail({
            to,
            subject:"Recuperacion de contraseña",
            html:`<p>Hola,</p>
            <p>Haz clic en el siguiente enlace para recuperar tu contraseña:</p>
            <a href="${url}">Recuperar contraseña</a>
            <p>Este enlace expirará en 15 minutos.</p>`
        });
    }
}
