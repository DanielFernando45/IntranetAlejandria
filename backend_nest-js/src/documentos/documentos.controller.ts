import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res } from '@nestjs/common';
import {Response} from 'express'
import { DocumentosService } from './documentos.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Post()
  create(@Body() createDocumentoDto: CreateDocumentoDto) {
    return "Nice"
  }

  @Get('download/:pathFile')
  findFile(
    @Res() res:Response,
    @Param('pathFile') pathName:string){
      const path=this.documentosService.getFile(pathName)
      return res.sendFile(path)
    }

  @Get("list/:id")
  async listDocuments(@Param("id",ParseIntPipe) id:number) {
    return this.documentosService.findDocuments(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentoDto: UpdateDocumentoDto) {
    return this.documentosService.update(+id, updateDocumentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentosService.remove(+id);
  }
}
