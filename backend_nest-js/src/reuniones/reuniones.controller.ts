import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, ParseIntPipe} from '@nestjs/common';
import { ReunionesService } from './reuniones.service';
import { CreateReunionDto } from './dto/create-reunion.dto';
import { UpdateReunioneDto } from './dto/update-reunione.dto';
import {Response} from 'express'
import { ZoomMeetingService } from './zoom.meeting.service';

@Controller('reuniones')
export class ReunionesController {
  constructor(private readonly reunionesService: ReunionesService,
              private readonly zoomService:ZoomMeetingService,
              
            ){}

  @Post('crear-reunion')
  async crearReunion(@Body() body:CreateReunionDto){
    const reunion=await this.reunionesService.addReunion(body)
   
    return {
      "message":"Reunion creada correctamente",
      reunion
    }
    
  }

  @Delete("eliminar-reunion/:id")
  async createReunion(@Param('id') meetingId:string,@Body() body:{id_asesor:number}) {
    const eliminated=await this.reunionesService.deleteReunion(meetingId,body.id_asesor)
    return {
      "message":`${eliminated}`
    }
  }

  @Post("webhook")
  async handleZoomWebHook(@Body() body:any,@Headers() headers:any){
    console.log("📥 Webhook recibido", body.event);
    await this.reunionesService.handleRecordingCompleted(body)
  }


  @Get('/espera/:id')
  listReunionesEspera(@Param('id',ParseIntPipe) id: number) {
    return this.reunionesService.listEspera(id);
  }

  @Get('/terminados/:id')
  listReunionesTerminados(@Param('id',ParseIntPipe) id: number) {
    return this.reunionesService.listTerminados(id)
  }

  @Get('allReuniones/:id')
  allReunionesAsesor(@Param('id',ParseIntPipe) id:number){
    return this.reunionesService.listReunionesByAsesor(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reunionesService.remove(+id);
  }
}
