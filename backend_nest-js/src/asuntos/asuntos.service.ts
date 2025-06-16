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

  async finishAsunt(id:number,cambio_asunto:string,dataFiles:archivosDataDto[]){
    const queryRunner=this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try{
      const fecha_actual=new Date()
      const validateAsunt=await queryRunner.manager.findOne(Asunto,{where:{id},select:['estado','fecha_revision']})
      if(validateAsunt?.estado!==Estado_asunto.PROCESO) throw new BadRequestException("No se puede modificar porque no esta en proceso")
      if(validateAsunt.fecha_revision>fecha_actual) throw new BadRequestException("Estan mal las fechas")
      const finishedAsunt=await queryRunner.manager.update(Asunto,{id},{titulo:cambio_asunto,estado:Estado_asunto.TERMINADO,fecha_terminado:fecha_actual})
      
      await Promise.all(dataFiles.map(async(data)=>{
        await this.documentosService.finallyDocuments(id,data,queryRunner.manager)
      }))
                      
      await queryRunner.commitTransaction()
      return "Terminado el asunto satisfactoriamente"
    }catch(err){
      await queryRunner.rollbackTransaction()
      throw new InternalServerErrorException(`${err.message}`)
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
        fecha_proceso:asunto.fecha_revision,
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
          "estado":documento.Estado,
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

  async listarFechasEntregas(id:number){
    const fechasEntregaProceso=await this.asuntoRepo.find({where:{asesoramiento:{id},estado:Estado_asunto.PROCESO},select:['fecha_terminado']})
    if(fechasEntregaProceso.length===0)throw new NotFoundException("No se encontro fechas proximas para ese id asesoramiento")
    
   let fechasEntrega:object[]=[]
    for(let fecha of fechasEntregaProceso){
      const objectFecha={"fecha_entrega":`${fecha.fecha_terminado.toISOString()}`}
      fechasEntrega.push(objectFecha)
    }
      return fechasEntrega
  }

  async asuntosCalendario(id_asesoramiento: number, fecha: Date) {
  const asuntosByFecha = await this.asuntoRepo.find({
    where: { asesoramiento: { id: id_asesoramiento } },
    select: ['estado', 'fecha_entregado', 'fecha_revision', 'fecha_terminado', 'titulo', 'id']
  });

  const mismaFecha = (a: Date | null | undefined, b: Date) =>
    a instanceof Date &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const responseAsuntos = asuntosByFecha
    .map((asunto) => {
      if (asunto.estado === Estado_asunto.ENTREGADO && mismaFecha(asunto.fecha_entregado, fecha)) {
        return {
          id: `${asunto.id}`,
          titulo: asunto.titulo,
          "fecha y hora": asunto.fecha_entregado,
          estado: asunto.estado
        };
      }

      if (asunto.estado === Estado_asunto.PROCESO && mismaFecha(asunto.fecha_revision, fecha)) {
        return {
          id: `${asunto.id}`,
          titulo: asunto.titulo,
          message: "Esta en revisión por el asesor"
        };
      }

      if (asunto.estado === Estado_asunto.PROCESO && mismaFecha(asunto.fecha_terminado, fecha)) {
        return {
          id: `${asunto.id}`,
          titulo: asunto.titulo,
          message: "Fecha estimada de envio del asesor"
        };
      }

      if (asunto.estado === Estado_asunto.TERMINADO && mismaFecha(asunto.fecha_terminado, fecha)) {
        return {
          id: `${asunto.id}`,
          titulo: asunto.titulo,
          "fecha y hora": asunto.fecha_entregado,
          estado: asunto.estado
        };
      }

      return null;
    })
    .filter(Boolean); // elimina los nulls

      console.log(responseAsuntos);
      return responseAsuntos;
    }
}
