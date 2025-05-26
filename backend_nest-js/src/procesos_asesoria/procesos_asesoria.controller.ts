import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcesosAsesoriaService } from './procesos_asesoria.service';
import { CreateProcesosAsesoriaDto } from './dto/create-procesos_asesoria.dto';
import { UpdateProcesosAsesoriaDto } from './dto/update-procesos_asesoria.dto';

@Controller('procesos-asesoria')
export class ProcesosAsesoriaController {
  constructor(private readonly procesosAsesoriaService: ProcesosAsesoriaService) {}

  

  @Get()
  findAll() {
    return this.procesosAsesoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.procesosAsesoriaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcesosAsesoriaDto: UpdateProcesosAsesoriaDto) {
    return this.procesosAsesoriaService.update(+id, updateProcesosAsesoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.procesosAsesoriaService.remove(+id);
  }
}
