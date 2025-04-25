import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { join } from 'path';

@Module({
  imports:[
    MailerModule.forRoot({
      transport: {
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f492f209e4c345",
          pass: "85320c0ea0b09a",
        },
      },
      defaults: {
        from: '"Mi App Dev" <noreply@miapp.com>',
      },
      template: {
        dir: join(__dirname, 'templates'), 
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    })
  ],
  controllers: [MailController],
  providers: [MailService],
  exports:[MailService]
})
export class MailModule {}
