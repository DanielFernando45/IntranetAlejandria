import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsesoramientoService } from './asesoramiento.service';
import { CreateAsesoramientoDto } from './dto/create-asesoramiento.dto';
import { UpdateAsesoramientoDto } from './dto/update-asesoramiento.dto';

@Controller('asesoramiento')
export class AsesoramientoController {
  constructor(private readonly asesoramientoService: AsesoramientoService) {}

  @Post()
  create(@Body() createAsesoramientoDto: CreateAsesoramientoDto) {
    return this.asesoramientoService.create(createAsesoramientoDto);
  }

  @Get()
  findAll() {
    return this.asesoramientoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asesoramientoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsesoramientoDto: UpdateAsesoramientoDto) {
    return this.asesoramientoService.update(+id, updateAsesoramientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asesoramientoService.remove(+id);
  }
}
