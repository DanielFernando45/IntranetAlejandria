import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { EntityManager } from 'typeorm';
import { Documento, Subido } from './entities/documento.entity';

@Injectable()
export class DocumentosService {
  constructor(){}
  
  async addedDocumentByClient(nombreDocumento:string,secureUrl: string,id:number,manager:EntityManager) {
    try{
      const newDocument=manager.create(Documento,{nombre:nombreDocumento,ruta:secureUrl,subido_por:Subido.CLIENTE,created_at:new Date(),asunto:{id}})
      const response=await manager.save(newDocument)
      return response
    }catch(err){
      return new InternalServerErrorException(`Error al agregar el documento ${err.message}`)
    }
    return 'This action adds a new documento';
  }

  findAll() {
    return `This action returns all documentos`;
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
