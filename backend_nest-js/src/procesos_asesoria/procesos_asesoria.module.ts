import { Module } from '@nestjs/common';
import { ProcesosAsesoriaService } from './procesos_asesoria.service';
import { ProcesosAsesoriaController } from './procesos_asesoria.controller';

@Module({
  controllers: [ProcesosAsesoriaController],
  providers: [ProcesosAsesoriaService],
})
export class ProcesosAsesoriaModule {}
