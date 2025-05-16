import { Module } from '@nestjs/common';
import { AsesorService } from './asesor.service';
import { AsesorController } from './asesor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asesor } from './asesor.entity';
import { Usuario } from '../usuario/usuario.entity';
import { AreaAsesor } from 'src/common/entidades/areaAsesor.entity';
import { GradoAcademico } from 'src/common/entidades/gradoAcademico.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AsesoramientoModule } from 'src/asesoramiento/asesoramiento.module';

@Module({
  imports:[TypeOrmModule.forFeature([Asesor,Usuario,AreaAsesor,GradoAcademico]),UsuarioModule,AsesoramientoModule],
  providers: [AsesorService],
  controllers: [AsesorController]
})
export class AsesorModule {}
