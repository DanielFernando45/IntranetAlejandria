import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReunionDto } from './dto/create-reunion.dto';
import { UpdateReunioneDto } from './dto/update-reunione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado_reunion, Reunion } from './entities/reunion.entity';
import { Repository } from 'typeorm';
import { ZoomMeetingService } from './zoom.meeting.service';
import { DateTime } from 'luxon'

@Injectable()
export class ReunionesService {
  constructor(
    private readonly zoomMeetingService:ZoomMeetingService,

    @InjectRepository(Reunion)
    private reunionRepo:Repository<Reunion>
  ){}

  async addReunion(createReunionDto: CreateReunionDto) {
    if (!createReunionDto.fecha_reunion || isNaN(new Date(createReunionDto.fecha_reunion).getTime())) {
        throw new BadRequestException('Fecha de reunión no válida');
    }

    // 1. Parsear la fecha (asumiendo que viene en hora local Perú)
    const fechaReunion = new Date(createReunionDto.fecha_reunion);
    //Para comparar en objetos DateTime
    const fechaReunionLuxon = DateTime.fromISO(createReunionDto.fecha_reunion, { zone: 'America/Lima' });

    const horaLima=DateTime.now().setZone('America/Lima')
    
    if(fechaReunionLuxon<=horaLima)throw new BadRequestException("La hora debe ser despues")

    // 2. Debug: Mostrar conversiones
    console.log('Fecha recibida:', createReunionDto.fecha_reunion);
    console.log('Hora local (Perú):', fechaReunion.toLocaleString('es-PE', { timeZone: 'America/Lima' }));
    
    // 3. Crear fecha ISO SIN conversión UTC (Zoom maneja la zona horaria)
    const fechaISO = fechaReunion.toISOString().split('.')[0];
    
    console.log('Fecha enviada a Zoom:', fechaISO);

    const zoomMeeting=await this.zoomMeetingService.createMeeting('consultoresalejandria8@gmail.com',createReunionDto.titulo,fechaISO)
  
    const newReunion=this.reunionRepo.create({
      titulo:createReunionDto.titulo,
      fecha_reunion:createReunionDto.fecha_reunion,
      enlace_zoom:zoomMeeting.join_url,
      meetingId:String(zoomMeeting.id),
      zoomUuid:zoomMeeting.uuid,
      estado:Estado_reunion.ESPERA,      
      fecha_creacion:new Date(),
      asesoramiento:{id:createReunionDto.id_asesoramiento},
    })

    await this.reunionRepo.save(newReunion)

    return "Se agrego la reunion satisfactoriamente"
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
