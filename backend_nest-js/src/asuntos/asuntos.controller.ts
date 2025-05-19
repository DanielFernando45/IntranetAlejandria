import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { AsuntosService } from './asuntos.service';
import { CreateAsuntoDto } from './dto/create-asunto.dto';
import { UpdateAsuntoDto } from './dto/update-asunto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/documentos/helpers/fileFilter.helper';
import { fileNamer } from 'src/documentos/helpers/fileNamer.helper';
import { diskStorage } from 'multer';

const HOST_API="http://localhost:3001"

@Controller('asuntos')
export class AsuntosController {
  constructor(private readonly asuntosService: AsuntosService) {}

  @Post("addWithDocument")
  @UseInterceptors(FileInterceptor('file',{
    fileFilter,
    storage:diskStorage({
      destination:'./static/products',
      filename:fileNamer
    })
  }))
  addAsuntoinAsesoramiento(@UploadedFile() file:Express.Multer.File,@Body() createAsuntoDto: CreateAsuntoDto) {
    if(!file) throw new BadRequestException("Make sure this file is a image")
    console.log(file)

    const secureUrl=`${HOST_API}/files/product/${file.filename}`;
    return this.asuntosService.create(createAsuntoDto,secureUrl);
  }

  @Get()
  findAll() {
    return this.asuntosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asuntosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsuntoDto: UpdateAsuntoDto) {
    return this.asuntosService.update(+id, updateAsuntoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asuntosService.remove(+id);
  }
}
