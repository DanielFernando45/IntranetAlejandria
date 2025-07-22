import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Usuario } from '../usuario/usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/admin/admin.entity';
import { Asesor } from 'src/asesor/asesor.entity';
import { Cliente } from 'src/cliente/cliente.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { MailModule } from 'src/mail/mail.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Admin, Asesor, Cliente]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'superSecret',
      signOptions: { expiresIn: '1h' },
    }),
    UsuarioModule,
    forwardRef(() => MailModule), // 👈 Y aquí también
    PassportModule,
  ],

  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
