import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AdminModule } from './admin/admin.module';
import { ClienteModule } from './cliente/cliente.module';
 import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin/admin.entity';
import { Usuario } from './usuario/usuario.entity';
import { Cliente } from './cliente/cliente.entity';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { AsesorModule } from './asesor/asesor.module';
import { Asesor } from './asesor/asesor.entity';

let puerto:number

if(process.env.DB_PORT){
  puerto=parseInt(process.env.DB_PORT)
}else{
  puerto=3306
}


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Admin, Usuario,Cliente,Asesor],  // Aquí debes pasar todas tus entidades
        synchronize: false,  // Cambiar a `false` en producción
      }),
      inject: [ConfigService],
    }),
    AuthModule, 
    UsuarioModule, 
    AdminModule,
    ClienteModule, 
    AsesorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
