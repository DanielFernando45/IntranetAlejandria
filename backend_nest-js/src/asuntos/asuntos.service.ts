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
      order:{fecha_entregado:'DESC'},
      select:['titulo','fecha_entregado','fecha_revision','fecha_terminado','estado']})

    if (!listFinished || listFinished.length === 0) throw new NotFoundException('No hay asuntos terminados.');

    for (const asunto of listFinished) {
    if (!asunto.titulo || !asunto.fecha_entregado || !asunto.fecha_revision || !asunto.fecha_terminado) {
    throw new BadRequestException(`Faltan datos en el asunto: ${JSON.stringify(asunto)}`);
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
    const listAll=await this.asuntoRepo
      .createQueryBuilder('asun')
      .innerJoinAndSelect('asun.documentos','doc')
      .innerJoin('asun.asesoramiento','ase')
      .where('ase.id=:id',{id})
      .andWhere("asun.estado IN (:...estados)",{estados:[Estado_asunto.ENTREGADO,Estado_asunto.PROCESO]})
      .select(['asun.id AS id_asunto',
        'asun.titulo AS Titulo',
        'asun.estado AS Estado',
        'asun.fecha_entregado AS Fecha_entregado',
        'ase.profesion_asesoria AS profesion_asesoria',
        'asun.fecha_revision AS Fecha_revision',
        'asun.fecha_terminado AS Fecha_terminado',
        'doc.nombre AS Documento_nombre',
      ])
      .orderBy('asun.fecha_entregado','ASC')
      .getRawMany()
  
    if(!listAll || listAll .length===0) throw new NotFoundException("No se encontro")

    let idUsados:number[]=[]
      let arregloAsuntos: object[] = []; 
      let contador_alumnos = 0;
      let contador_columnas=-1

      for(let i=0;i<listAll.length;i++){
        const documento= listAll[i]

        if(contador_alumnos>=2){
          break
        }
        console.log(contador_alumnos)
        if(idUsados.includes(documento.id_asunto)){
          arregloAsuntos[contador_columnas]={
            ...arregloAsuntos[contador_columnas],
            [`documento_${contador_alumnos}`]:documento.Documento_nombre
          }
          
        }else{
        contador_columnas+=1
        contador_alumnos=1
       arregloAsuntos[contador_columnas]={
          "id_asunto":documento.id_asunto,
          "titulo":documento.Titulo,
          "fecha_entrega":documento.Fecha_entregado,
          "profesion_asesoria":documento.profesion_asesoria,
          "fecha_revision":documento.Fecha_revision,
          "fecha_terminado":documento.Fecha_terminado,
          "documento_0":documento.Documento_nombre,
        }          
        idUsados.push(documento.id_asunto)
      }  
      }
    
    
      return arregloAsuntos
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
