import { Module } from '@nestjs/common';
import { ReunionesService } from './reuniones.service';
import { ReunionesController } from './reuniones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reunion } from './entities/reunion.entity';
import { ZoomAuthService } from './zoom.auth.service';
import { ZoomMeetingService } from './zoom.meeting.service';

@Module({
  imports:[TypeOrmModule.forFeature([Reunion])],
  controllers: [ReunionesController],
  providers: [ReunionesService,ZoomAuthService,ZoomMeetingService],
})
export class ReunionesModule {}
