import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReunionDto } from './dto/create-reunion.dto';
import { UpdateReunioneDto } from './dto/update-reunione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado_reunion, Reunion } from './entities/reunion.entity';
import { Repository } from 'typeorm';
import { ZoomMeetingService } from './zoom.meeting.service';

@Injectable()
export class ReunionesService {
  constructor(
    private readonly zoomMeetingService:ZoomMeetingService,

    @InjectRepository(Reunion)
    private reunionRepo:Repository<Reunion>
  ){}

  async addReunion(createReunionDto: CreateReunionDto) {
    const fechaISO=new Date(createReunionDto.fecha_reunion).toISOString()
    const zoomMeeting=await this.zoomMeetingService.createMeeting('consultores.alejandria@gmail.com',createReunionDto.titulo,fechaISO)
  
    const newReunion=this.reunionRepo.create({
      titulo:createReunionDto.titulo,
      fecha_reunion:createReunionDto.fecha_reunion,
      enlace_video:zoomMeeting.join_url,
      estado:Estado_reunion.ESPERA,      
      fecha_creacion:new Date(),
      asesoramiento:{id:createReunionDto.id_asesoramiento},
    })

    await this.reunionRepo.save(newReunion)
  }

  findAll() {
    return `This action returns all reuniones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reunione`;
  }

  update(id: number, updateReunioneDto: UpdateReunioneDto) {
    return `This action updates a #${id} reunione`;
  }

  remove(id: number) {
    return `This action removes a #${id} reunione`;
  }
}
