import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAsuntoDto } from './dto/create-asunto.dto';
import { UpdateAsuntoDto } from './dto/update-asunto.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Asunto, Estado_asunto } from './entities/asunto.entity';
import { DocumentosService } from 'src/documentos/documentos.service';
import { Asesoramiento } from 'src/asesoramiento/entities/asesoramiento.entity';
import { ChangeToProcess } from './dto/change-to-process.dto';
import { archivosDataDto } from './dto/archivos-data.dto';
import { listFinished } from './dto/list-finished.dto';

@Injectable()
export class AsuntosService {
  constructor(
    private readonly documentosService:DocumentosService,

    @InjectRepository(Asunto)
    private asuntoRepo:Repository<Asunto>,

    @InjectDataSource()
    private readonly dataSource:DataSource
  ){}
  async create(createAsuntoDto: CreateAsuntoDto,listaNombreyUrl:archivosDataDto[],id_asesoramiento:number) {
    const queryRunner=this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    
    try{
    const existAsesoramiento=queryRunner.manager.findOne(Asesoramiento,{where:{id:id_asesoramiento}})
    if(!existAsesoramiento) throw new Error("No existe este asesoramiento")
    const newAsunt=queryRunner.manager.create(Asunto,{...createAsuntoDto,asesoramiento:{id:id_asesoramiento},estado:Estado_asunto.ENTREGADO,fecha_entregado:new Date()})
    
    const {id}=await queryRunner.manager.save(newAsunt)

    await Promise.all(listaNombreyUrl.map(async(nombreyUrl)=>{
      await this.documentosService.addedDocumentByClient(nombreyUrl.nombreDocumento,nombreyUrl.secureUrl,id,queryRunner.manager)
    }))
    
    await queryRunner.commitTransaction()
    return "Agregado satisfactoriamente"
    }catch(err){
      await queryRunner.rollbackTransaction()
      return new InternalServerErrorException(`Se revierten los cambios,se presenta el siguiente error ${err.message}`)
    }finally{
      await queryRunner.release()
    }
  }

  async EstateToProcess(id:number,body:ChangeToProcess) {
    const exists=await this.asuntoRepo.findOneBy({id})
    if(!exists) throw new NotFoundException("No se encontro un registro con ese id")
    if(exists.fecha_revision!==null) throw new BadRequestException("Ese asunto ya esta en proceso")

    const changeState=await this.asuntoRepo.update(id,{fecha_terminado:body.fecha_terminado,fecha_revision:new Date(),estado:Estado_asunto.PROCESO})
    if(changeState.affected===0) throw new NotFoundException("No se encontro un asunto con ese ID")
    return `Se actualizo las filas estado y fecha_revision del id:${id}`;
  }

  async finishAsunt(id:number,dataFiles:archivosDataDto[]){
    const queryRunner=this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try{
      const finishedAsunt=await queryRunner.manager.update(Asunto,{id},{estado:Estado_asunto.TERMINADO,fecha_terminado:new Date()})
      console.log(finishedAsunt.affected)
      await Promise.all(dataFiles.map(async(data)=>{
        await this.documentosService.finallyDocuments(id,data,queryRunner.manager)
      }))

      await queryRunner.commitTransaction()
      return "Agregado satisfactoriamente"
    }catch(err){
      await queryRunner.rollbackTransaction()
      console.log(err)
      throw new InternalServerErrorException(`Error al finalizar el asunto ${err.message}`)
    }finally{
      await queryRunner.release()
    }
  }

  async getFinished(id:number){
    const listFinished=await this.asuntoRepo.find({where:{estado:Estado_asunto.TERMINADO,asesoramiento:{id}},
      select:['titulo','fecha_entregado','fecha_revision','fecha_terminado','estado']})

    if (!listFinished || listFinished.length === 0) throw new Error('No hay asuntos terminados.');

    for (const asunto of listFinished) {
    if (!asunto.titulo || !asunto.fecha_entregado || !asunto.fecha_revision || !asunto.fecha_terminado) {
    throw new Error(`Faltan datos en el asunto: ${JSON.stringify(asunto)}`);
    }
    }
    const response:listFinished[]=listFinished.map((asunto)=>{
      return {
        titulo:asunto.titulo,
        fecha_entregado:asunto.fecha_entregado,
        fecha_revision:asunto.fecha_revision,
        fecha_terminado:asunto.fecha_terminado,
        estado:asunto.estado
      }
    })
    return response
  }

  async getAll(id:number){
    const listFinished=await this.asuntoRepo.find({where:{asesoramiento:{id}}})

    if(!listFinished || listFinished.length===0) throw new NotFoundException("No se encontro")
    return listFinished
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
