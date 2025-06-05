import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res } from '@nestjs/common';
import { ReunionesService } from './reuniones.service';
import { CreateReunionDto } from './dto/create-reunion.dto';
import { UpdateReunioneDto } from './dto/update-reunione.dto';
import { ZoomAuthService } from './zoom.auth.service';
import {Response} from 'express'
import { ZoomMeetingService } from './zoom.meeting.service';

@Controller('reuniones')
export class ReunionesController {
  constructor(private readonly reunionesService: ReunionesService,
              private readonly zoomService:ZoomMeetingService
            ){}

  @Post('crear-reunion')
  async crearReunion(@Body() body:CreateReunionDto){
    const reunion=await this.reunionesService.addReunion(body)
   
    return {
      "message":"Reunion creada correctamente",
      reunion
    }
    
  }

  @Post("add/:id")
  async createReunion(@Param('id',ParseIntPipe) id:number,@Body() createReunionDto: CreateReunionDto) {
    return this.reunionesService.addReunion(createReunionDto);
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
