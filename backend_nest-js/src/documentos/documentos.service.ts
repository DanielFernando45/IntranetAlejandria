import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { EntityManager, Repository } from 'typeorm';
import { Documento, Subido } from './entities/documento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { listAllDocumento } from './dto/list-all-documento.dto';
import { join } from 'path';
import { existsSync } from 'fs';
import { archivosDataDto } from 'src/asuntos/dto/archivos-data.dto';

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
      if (!nombreDocumento || typeof nombreDocumento !== 'string' || nombreDocumento.trim().length === 0) {
        throw new BadRequestException('nombreDocumento es obligatorio y debe ser un texto no vacío');
      }

      if (!secureUrl || typeof secureUrl !== 'string' || secureUrl.trim().length === 0) {
        throw new BadRequestException('secureUrl es obligatorio y debe ser un texto no vacío');
      }
      const newDocument=manager.create(Documento,{nombre:nombreDocumento,ruta:secureUrl,subido_por:Subido.ESTUDIANTE,created_at:new Date(),asunto:{id}})
      const response=await manager.save(newDocument)
      return response
    }catch(err){
      return new InternalServerErrorException(`Error al agregar el documento ${err.message}`)
    }
  }

  async findDocuments(id:number,subido_por:Subido){
    const listDocuments=await this.documentoRepo
      .createQueryBuilder('d')
      .innerJoinAndSelect('d.asunto','a')
      .innerJoin('a.asesoramiento','as')
      .select([
        'a.id AS id_asunto',
        'd.nombre AS nombre',
        'a.titulo AS asunto',
        'a.estado AS estado',
         'd.ruta AS ruta',
        ])
        .where("as.id= :id",{id})
        .andWhere("d.subido_por=:subido_por",{subido_por})
        .orderBy('a.id', 'ASC')       
        .addOrderBy('d.created_at', 'ASC')
        .getRawMany()
        
      if(listDocuments.length===0)throw new NotFoundException("No se encontro el documento")
      
    const arreglo: object[] = [];

    listDocuments.forEach((document) => {
    const asunto = document['asunto'];
    const idAsunto = document['id_asunto'];

    let index = arreglo.findIndex((item: any) => item['id_asunto'] === idAsunto);

    if (index === -1) {
      // Nuevo asunto
      arreglo.push({
        id_asunto: idAsunto,
        asunto,
        estado: document['estado'],
        nombreDoc1: document['nombre'],
        ruta1: document['ruta'],
      });
    } else {
      
      const count = Object.keys(arreglo[index]).filter((key) => key.startsWith('nombreDoc')).length + 1;

      arreglo[index][`nombreDoc${count}`] = document['nombre'];
      arreglo[index][`ruta${count}`] = document['ruta'];
    }
  });

  return arreglo;

  } 

  async finallyDocuments(id:number,dataFiles:archivosDataDto,manager:EntityManager){
    try{
      const newDocument=manager.create(Documento,{nombre:dataFiles.nombreDocumento,ruta:dataFiles.secureUrl,subido_por:Subido.ASESOR,created_at:new Date(),asunto:{id}})
      const response=await manager.save(newDocument)
      return response
    }catch(err){
      return new InternalServerErrorException(`Error al agregar el documento ${err.message}`)
    }
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
