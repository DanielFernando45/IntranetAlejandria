import { Module } from '@nestjs/common';
import { AsesoramientoService } from './asesoramiento.service';
import { AsesoramientoController } from './asesoramiento.controller';

@Module({
  controllers: [AsesoramientoController],
  providers: [AsesoramientoService],
})
export class AsesoramientoModule {}
