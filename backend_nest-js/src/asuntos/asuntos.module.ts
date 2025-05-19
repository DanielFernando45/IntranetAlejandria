import { Module } from '@nestjs/common';
import { AsuntosService } from './asuntos.service';
import { AsuntosController } from './asuntos.controller';
import { DocumentosModule } from 'src/documentos/documentos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asunto } from './entities/asunto.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Asunto]),DocumentosModule],
  controllers: [AsuntosController],
  providers: [AsuntosService],
})
export class AsuntosModule {}
