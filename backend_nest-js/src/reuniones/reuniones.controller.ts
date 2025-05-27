import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ReunionesService } from './reuniones.service';
import { CreateReunioneDto } from './dto/create-reunione.dto';
import { UpdateReunioneDto } from './dto/update-reunione.dto';

@Controller('reuniones')
export class ReunionesController {
  constructor(private readonly reunionesService: ReunionesService) {}

  @Post("add/:id")
  async createReunion(@Param('id',ParseIntPipe) id:number,@Body() createReunioneDto: CreateReunioneDto) {
    return this.reunionesService.addReunion(id,createReunioneDto);
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
