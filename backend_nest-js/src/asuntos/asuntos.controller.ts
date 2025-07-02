import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, InternalServerErrorException, UploadedFiles, ParseIntPipe, Inject, UseGuards } from '@nestjs/common';
import { AsuntosService } from './asuntos.service';
import { CreateAsuntoDto } from './dto/create-asunto.dto';
import { UpdateAsuntoDto } from './dto/update-asunto.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/documentos/helpers/fileFilter.helper';
import { fileNamer } from 'src/documentos/helpers/fileNamer.helper';
import { diskStorage } from 'multer';
import { ChangeToProcess } from './dto/change-to-process.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IsDelegadoGuard } from 'src/common/guards/delegado.guard';
import { updateClienteDto } from 'src/cliente/dto/update-cliente.dto';

const HOST_API="http://localhost:3001"

@Controller('asuntos')
export class AsuntosController {
  constructor(private readonly asuntosService: AsuntosService
  ){}

  
  @Post("addWithDocument/:id_asesoramiento")
  @UseGuards(JwtAuthGuard,IsDelegadoGuard)
  @UseInterceptors(FilesInterceptor('files',10,{
    fileFilter,
    storage:diskStorage({
      destination:'./static/documents',
      filename:fileNamer,
    }),
    limits:{
      fileSize:1024*1025*30,
    }
  }))
  async addAsuntoinAsesoramiento(@UploadedFiles() files:Express.Multer.File[],@Body() createAsuntoDto: CreateAsuntoDto ,@Param('id_asesoramiento',ParseIntPipe) id_asesoramiento:number) {
    if(!files || files.length===0)throw new BadRequestException("No se ha enviado archivos")
    try{
      const listaNombresyUrl=files.map((item)=>{
      return {nombreDocumento:item.originalname,secureUrl:`${HOST_API}/files/product/${item.filename}`}
    })
    console.log(listaNombresyUrl)
      
    const response=await this.asuntosService.create(createAsuntoDto,listaNombresyUrl,id_asesoramiento)
    return response
    }catch(err){
      throw new InternalServerErrorException("Error al agregar los archivos")
    }
  }

  @Patch("en_proceso/:id")
  async toProcess(@Param('id',ParseIntPipe) id:number,@Body() body:ChangeToProcess){
    return await this.asuntosService.EstateToProcess(id,body)
  }

  @Patch("finished/:id")
  @UseInterceptors(FilesInterceptor('files',10,{
    fileFilter,
    storage:diskStorage({
      destination:'./static/documents',
      filename:fileNamer
    })
  }))
  async finishAsunto(@Param('id',ParseIntPipe) id:number,@Body() cambioAsunto:UpdateAsuntoDto,@UploadedFiles() files:Express.Multer.File[]){

    if(!files || files.length===0)throw new BadRequestException("No se ha enviado archivos")
    try{
    const listaNombresyUrl=files.map((item)=>{
      return {nombreDocumento:item.originalname,secureUrl:`${HOST_API}/files/product/${item.filename}`}
    })
    const newTitulo=cambioAsunto.titulo
    if(!newTitulo)throw new BadRequestException("Falta agregar el titulo")
    // console.log(listaNombresyUrl)
    return await this.asuntosService.finishAsunt(id,newTitulo,listaNombresyUrl)
    }catch(err){
      return new InternalServerErrorException(`Error en el controlador, ${err.message}`)
    }
  }

  @Get('terminados/:id')
  async getTerminados(@Param('id',ParseIntPipe) id:number){
    return await this.asuntosService.getFinished(id)
  }

  @Get('all/:id')
  async getAll(@Param('id',ParseIntPipe) id:number){
    return await this.asuntosService.getAll(id)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAsuntoDto: UpdateAsuntoDto) {
  //   return this.asuntosService.update(+id, updateAsuntoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.asuntosService.remove(+id);
  // }

  @Get('fechasEstimadas/:id')
  fechasEstimadas(@Param('id',ParseIntPipe) id:number){
    return this.asuntosService.listarFechasEntregas(id)
  }
}
