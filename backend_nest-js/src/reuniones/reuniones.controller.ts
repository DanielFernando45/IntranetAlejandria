import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res } from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.reunionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reunionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReunioneDto: UpdateReunioneDto) {
    return this.reunionesService.update(+id, updateReunioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reunionesService.remove(+id);
  }
}
