import * as nodemailer from 'nodemailer'
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
    
    constructor(){}

    private transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.GMAIL,
            pass:process.env.GMAIL_PASSWORD
        }
    })

    async sendResetPasswordEmail(correo_destino:string,url:string){
        const mailOptions={
            from:`"IntranetAlejandria" <${process.env.GMAIL}>`,
            to:correo_destino,
            subject:'Recuperacion de contraseña',
            html:`
            <h3>Recuperación de contraseña</h3>
            <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
            <a href="${url}" target="_blank">Recuperar Contraseña</a>
            `
        }
        try{
            const info=await this.transporter.sendMail(mailOptions)
            console.log("Correo enviado:",info.response)
            return true
        }catch(err){
            console.error('Error enviando el correo:', err)
            return false
        }
        // await this.mailerService.sendMail({
        //     to,
        //     subject:"Recuperacion de contraseña",
        //     html:`<p>Hola,</p>
        //     <p>Haz clic en el siguiente enlace para recuperar tu contraseña:</p>
        //     <a href="${url}">Recuperar contraseña</a>
        //     <p>Este enlace expirará en 15 minutos.</p>`
        // });
    }
}
