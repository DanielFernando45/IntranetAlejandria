import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly authService: AuthService,
  ) {}

  @Post('reset-password')
  async resetPasswordRequest(@Body('email') email: string) {
    await this.authService.sendMailPassword(email);
    return { message: 'Si el correo está registrado, se ha enviado un enlace' };
  }
}
