import { Module } from '@nestjs/common';
import { AsesorService } from './asesor.service';
import { AsesorController } from './asesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asesor } from './asesor.entity';
import { Usuario } from '../usuario/usuario.entity';
import { AreaAsesor } from 'src/entidades/areaAsesor.entity';
import { GradoAcademico } from 'src/entidades/gradoAcademico.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports:[TypeOrmModule.forFeature([Asesor,Usuario,AreaAsesor,GradoAcademico]),UsuarioModule],
  providers: [AsesorService],
  controllers: [AsesorController]
})
export class AsesorModule {}
