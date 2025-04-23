import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    @Post('test')
    async testEmail(@Body('email') email: string) {
        const fakeResetLink = 'https://tuapp.com/reset-password/fake-token';
        await this.mailService.sendResetPasswordEmail(email, fakeResetLink);
        return { message: 'Correo enviado (simulado en Mailtrap)' };
    }
}
