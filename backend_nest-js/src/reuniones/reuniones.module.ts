import { Module } from '@nestjs/common';
import { ReunionesService } from './reuniones.service';
import { ReunionesController } from './reuniones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reunion } from './entities/reunion.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Reunion])],
  controllers: [ReunionesController],
  providers: [ReunionesService],
})
export class ReunionesModule {}
