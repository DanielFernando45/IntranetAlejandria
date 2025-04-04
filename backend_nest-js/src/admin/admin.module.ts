import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Usuario } from '../usuario/usuario.entity';
import { AdminController } from './admin.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Admin,Usuario])],
  providers: [AdminService],
  controllers:[AdminController]
})
export class AdminModule {}
