import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAsuntoDto } from './dto/create-asunto.dto';
import { UpdateAsuntoDto } from './dto/update-asunto.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Asunto, Estado_asunto } from './entities/asunto.entity';
import { DocumentosService } from 'src/documentos/documentos.service';

@Injectable()
export class AsuntosService {
  constructor(
    private readonly documentosService:DocumentosService,

    @InjectRepository(Asunto)
    private asuntoRepo:Repository<Asunto>,

    @InjectDataSource()
    private readonly dataSource:DataSource
  ){}
  async create(createAsuntoDto: CreateAsuntoDto,secureUrl:string) {
    const queryRunner=this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    
    try{
    const newAsunt=queryRunner.manager.create(Asunto,{...createAsuntoDto,estado:Estado_asunto.ENTREGADO,fecha_envio:new Date()})

    await queryRunner.manager.save(newAsunt)

    const saveDocument=await this.documentosService.addedDocumentByClient(secureUrl,queryRunner.manager)
    await queryRunner.commitTransaction()
    return "Agregado satisfactoriamente"
    }catch(err){
      await queryRunner.rollbackTransaction()
      return new InternalServerErrorException(`Se revierten los cambios,se presenta el siguiente error ${err.message}`)
    }finally{
      await queryRunner.release()
    }
  }

  findAll() {
    return `This action returns all asuntos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asunto`;
  }

  update(id: number, updateAsuntoDto: UpdateAsuntoDto) {
    return `This action updates a #${id} asunto`;
  }

  remove(id: number) {
    return `This action removes a #${id} asunto`;
  }
}
