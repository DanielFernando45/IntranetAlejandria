import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { EntityManager, Repository } from 'typeorm';
import { Documento, Subido } from './entities/documento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { listAllDocumento } from './dto/list-all-documento.dto';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class DocumentosService {
  constructor(
  

    @InjectRepository(Documento)
    private documentoRepo:Repository<Documento>
  ){}
  getFile(path:string){
    const pathFile=join(__dirname,'../../../static/documents',path)
    console.log(pathFile)
  
    if(!existsSync(pathFile)) throw new BadRequestException("No hay ese archivo con ese ID")
    return pathFile
  }


  async addedDocumentByClient(nombreDocumento:string,secureUrl: string,id:number,manager:EntityManager) {
    try{
      const newDocument=manager.create(Documento,{nombre:nombreDocumento,ruta:secureUrl,subido_por:Subido.CLIENTE,created_at:new Date(),asunto:{id}})
      const response=await manager.save(newDocument)
      return response
    }catch(err){
      return new InternalServerErrorException(`Error al agregar el documento ${err.message}`)
    }
  }

  async findDocuments(id:number): Promise<listAllDocumento[]> {
    const listDocuments:listAllDocumento[]=await this.documentoRepo
      .createQueryBuilder('d')
      .innerJoinAndSelect('d.asunto','a')
      .innerJoin('a.asesoramiento','as')
      .select([
        'd.nombre AS nombre',
        'a.titulo AS asunto',
        'a.estado AS estado',
        'd.created_at AS fecha_subida',
        'd.ruta AS ruta',
      ])
      .where("as.id= :id",{id})
      .getRawMany()

    return listDocuments;
  }

  findOne(id: number) {
    return `This action returns a #${id} documento`;
  }

  update(id: number, updateDocumentoDto: UpdateDocumentoDto) {
    return `This action updates a #${id} documento`;
  }

  remove(id: number) {
    return `This action removes a #${id} documento`;
  }
}
