import { Module } from '@nestjs/common';
import { ReunionesService } from './reuniones.service';
import { ReunionesController } from './reuniones.controller';

@Module({
  controllers: [ReunionesController],
  providers: [ReunionesService],
})
export class ReunionesModule {}
