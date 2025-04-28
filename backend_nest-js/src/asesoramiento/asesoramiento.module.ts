import { Module } from '@nestjs/common';
import { AsesoramientoService } from './asesoramiento.service';
import { AsesoramientoController } from './asesoramiento.controller';
import { ProcesosAsesoriaModule } from '../procesos_asesoria/procesos_asesoria.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asesoramiento } from './entities/asesoramiento.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Asesoramiento]),ProcesosAsesoriaModule],
  controllers: [AsesoramientoController],
  providers: [AsesoramientoService]
})
export class AsesoramientoModule {}
