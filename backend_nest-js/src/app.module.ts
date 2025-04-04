import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AdminModule } from './admin/admin.module';
import { ClienteModule } from './cliente/cliente.module';
import { AsesorModule } from './asesor/asesor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin/admin.entity';
import { Usuario } from './usuario/usuario.entity';
import { Cliente } from './cliente/cliente.entity';
import { ConfigModule } from '@nestjs/config';

let puerto:number

if(process.env.DB_PORT){
  puerto=parseInt(process.env.DB_PORT)
}else{
  puerto=3000
}


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',               // Tipo de base de datos (mysql, postgres, etc.)
      host: process.env.DB_HOST,           // Host de la base de datos
      port: puerto,                  // Puerto (3306 para MySQL)
      username: process.env.DB_USERNAME,            // Usuario de la base de datos
      password: process.env.DB_PASSWORD,        // Contraseña de la base de datos
      database: process.env.DB_DATABASE,            // Nombre de la base de datos
      entities: [Admin, Usuario,Cliente],  // Entidades que TypeORM debe usar
      synchronize: true,           // Sincroniza las tablas automáticamente (solo en desarrollo)
    }),
    //AuthModule, 
    UsuarioModule, 
    AdminModule,
    ClienteModule, 
    AsesorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
