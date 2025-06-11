import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateReunionDto } from './dto/create-reunion.dto';
import { UpdateReunioneDto } from './dto/update-reunione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado_reunion, Reunion } from './entities/reunion.entity';
import { Repository } from 'typeorm';
import { ZoomMeetingService } from './zoom.meeting.service';
import { DateTime } from 'luxon'
import { AsesorService } from 'src/asesor/asesor.service';
import { ZoomAuthService } from './zoom.auth.service';
import axios from 'axios';

@Injectable()
export class ReunionesService {
  constructor(
    private readonly zoomMeetingService:ZoomMeetingService,
    private readonly asesorService:AsesorService,
    private readonly zoomAuthService:ZoomAuthService,

    @InjectRepository(Reunion)
    private reunionRepo:Repository<Reunion>
  ){}

  
  async addReunion(createReunionDto: CreateReunionDto) {
    if (!createReunionDto.fecha_reunion || isNaN(new Date(createReunionDto.fecha_reunion).getTime())) {
        throw new BadRequestException('Fecha de reunión no válida');
    }
    const credenciales=await this.asesorService.getCredentialsBySector(createReunionDto.id_asesor)

    const token=await this.zoomAuthService.getAccessToken(credenciales.client_id,credenciales.client_secret,credenciales.client_account_id)
   
    // 1. Parsear la fecha (asumiendo que viene en hora local Perú)
    const fechaReunion = new Date(createReunionDto.fecha_reunion);
    const fechaReunionLuxon = DateTime.fromISO(createReunionDto.fecha_reunion, { zone: 'America/Lima' });
    const horaLima=DateTime.now().setZone('America/Lima')
    
    if(fechaReunionLuxon<=horaLima)throw new BadRequestException("La hora debe ser despues")

    // 3. Crear fecha ISO SIN conversión UTC (Zoom maneja la zona horaria)
    const fechaISO = fechaReunion.toISOString().split('.')[0];

    const zoomMeeting=await this.zoomMeetingService.createMeeting(credenciales.correo,createReunionDto.titulo,fechaISO,token)
  
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

  async deleteReunion(meetingId:string,id_asesor:number){
    const credenciales=await this.asesorService.getCredentialsBySector(id_asesor)
    console.log(credenciales)
    const token=await this.zoomAuthService.getAccessToken(credenciales.client_id,credenciales.client_secret,credenciales.client_account_id)
      console.log(meetingId)
      const response=await axios.delete(`https://api.zoom.us/v2/meetings/${meetingId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      return response
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
