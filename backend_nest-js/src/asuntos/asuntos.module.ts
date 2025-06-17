import { forwardRef, Module } from '@nestjs/common';
import { AsuntosService } from './asuntos.service';
import { AsuntosController } from './asuntos.controller';
import { DocumentosModule } from 'src/documentos/documentos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asunto } from './entities/asunto.entity';
import { CommonModule } from 'src/common/common.module';
import { ProcesosAsesoriaModule } from 'src/procesos_asesoria/procesos_asesoria.module';

@Module({
  imports:[TypeOrmModule.forFeature([Asunto]),DocumentosModule,ProcesosAsesoriaModule,forwardRef(() =>AsuntosModule)],
  controllers: [AsuntosController],
  providers: [AsuntosService],
  exports:[AsuntosService]
})
export class AsuntosModule {}
