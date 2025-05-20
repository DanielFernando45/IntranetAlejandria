import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, InternalServerErrorException, UploadedFiles } from '@nestjs/common';
import { AsuntosService } from './asuntos.service';
import { CreateAsuntoDto } from './dto/create-asunto.dto';
import { UpdateAsuntoDto } from './dto/update-asunto.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/documentos/helpers/fileFilter.helper';
import { fileNamer } from 'src/documentos/helpers/fileNamer.helper';
import { diskStorage } from 'multer';

const HOST_API="http://localhost:3001"

@Controller('asuntos')
export class AsuntosController {
  constructor(private readonly asuntosService: AsuntosService) {}

  @Post("addWithDocument")
  @UseInterceptors(FilesInterceptor('files',10,{
    fileFilter,
    storage:diskStorage({
      destination:'./static/documents',
      filename:fileNamer
    })
  }))
  async addAsuntoinAsesoramiento(@UploadedFiles() files:Express.Multer.File[],@Body() createAsuntoDto: CreateAsuntoDto) {
    if(!files || files.length===0)throw new BadRequestException("No se ha enviado archivos")
    try{
    //const secureUrl=`${HOST_API}/files/product/${file.filename}`;
    // await Promise.all(
    //   files.map(async(item)=>{
    //     const nombreDocumento=item.originalname
    //     const secureUrl=`${HOST_API}/files/product/${item.filename}`
    //     await this.asuntosService.create(createAsuntoDto,nombreDocumento,secureUrl)
    //   })
    //   )
    const listaNombresyUrl=files.map((item)=>{
      return {nombreDocumento:item.originalname,secureUrl:`${HOST_API}/files/product/${item.filename}`}
    })
    console.log(listaNombresyUrl)
      
    const response=await this.asuntosService.create(createAsuntoDto,listaNombresyUrl)
    return response
    }catch(err){
      throw new InternalServerErrorException("Error al agregar los archivos")
    }
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
