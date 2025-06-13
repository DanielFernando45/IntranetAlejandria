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
      zoom_password:zoomMeeting.password,
      meetingId:String(zoomMeeting.id),
      zoomUuid:zoomMeeting.uuid,
      estado:Estado_reunion.ESPERA,      
      fecha_creacion:horaLima.toJSDate(),
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

  async handleRecordingCompleted(data:any){
    console.log("🎥 Grabación completada:", JSON.stringify(data, null, 2));
    const meetingId=data.payload.object.id;
    const files=data.payload.object.recording_files

    const videoFile=files.find(f=>f.file_type==='MP4')
    const playUrl=videoFile?.play_url;

    const password=data.payload.object.password

    if(!playUrl) return;

    await this.reunionRepo.update({meetingId},{enlace_video:playUrl,estado:Estado_reunion.TERMINADO,video_password:password})
  }

  async listEspera(id:number){
    const enEspera=await this.reunionRepo.find({where:{asesoramiento:{id},estado:Estado_reunion.ESPERA},
                                                select:['meetingId','titulo','fecha_reunion','enlace_zoom','enlace_video']})
    if(enEspera.length===0)throw new NotFoundException("No se encontro reuniones para ese asesoramiento")

    return enEspera
  }

  async listTerminados(id:number){
    const terminados=await this.reunionRepo.find({where:{asesoramiento:{id},estado:Estado_reunion.TERMINADO},
                                                  select:['meetingId','titulo','fecha_reunion','enlace_zoom','enlace_video']})

    if(terminados.length===0)throw new NotFoundException("No se encontro reuniones terminadas")

    return terminados
  }

  async listReunionesByAsesor(id:number,estado:Estado_reunion){
    const reunionesByAsesor=await this.reunionRepo
      .createQueryBuilder('re')
      .innerJoin('re.asesoramiento','as')
      .innerJoin('as.procesosasesoria','pr')
      .innerJoin('pr.asesor','asesor')
      .select(['re.id AS ID','re.titulo AS titulo','re.fecha_reunion AS fecha_reunion','re.enlace_zoom AS enlace'])
      .where('asesor.id= :id',{id})
      .andWhere('re.estado= :estado',{estado})
      .getRawMany()

      return reunionesByAsesor
  }

  async getReunionesByFecha(id_asesoramiento:number,fecha:Date){
    const getReuniones=await this.reunionRepo.find({where:{asesoramiento:{id:id_asesoramiento},fecha_reunion:fecha}})
    if(getReuniones.length===0)return null
    return getReuniones
  }
  
}
