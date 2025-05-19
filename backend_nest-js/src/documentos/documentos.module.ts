import { Module } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';

@Module({
  exports:[DocumentosService],
  controllers: [DocumentosController],
  providers: [DocumentosService],
})
export class DocumentosModule {}
