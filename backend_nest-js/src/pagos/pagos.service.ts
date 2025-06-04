import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { estadoPago, Pago } from './entities/pago.entity';
import { DataSource, Repository } from 'typeorm';
import { Informacion_Pagos, tipoPago, tipoServicio } from './entities/informacion_pagos.entity';
import { CreatePagoAlContadoDto } from './dto/create-pago-al-contado.dto';
import { PagoPorCuotaUpdate, PagoPorCuotaWrpDTO } from './dto/pago-por-cuotas-add.dto';
import { UpdateCuotasDto } from './dto/cuotas-update.dto';
import { UpdatePagoContadoDto } from './dto/update-pago.dto';
import { listServiciosDto } from './dto/listDtos/list-servicios.dto';

@Injectable()
export class PagosService {
  constructor(
      @InjectRepository(Pago)
      private pagoRepo:Repository<Pago>,

      @InjectRepository(Informacion_Pagos)
      private informacionRepo:Repository<Informacion_Pagos>,

      @InjectDataSource()
      private readonly dataSource:DataSource
    ){}
  
  async contadoYotrosServicios(createPagoDto: CreatePagoAlContadoDto,tipo_servicio:tipoServicio) {
    const queryRunner=this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()  

    try{
      const newInfopago=queryRunner.manager.create(Informacion_Pagos,{titulo:createPagoDto.titulo,pago_total:createPagoDto.pago_total
        ,numero_cuotas:1,fecha_creado:new Date(),
        tipo_pago:tipoPago.CONTADO,tipo_servicio:tipo_servicio,
        asesoramiento:{id:createPagoDto.id_asesoramiento}
      })
      console.log(newInfopago)
      const {id}=await queryRunner.manager.save(newInfopago)
      
      const newPago=queryRunner.manager.create(Pago,{nombre:createPagoDto.titulo,fecha_pago:createPagoDto.fecha_pago,
        estado_pago:estadoPago.PAGADO,monto:createPagoDto.pago_total,informacion_pago:{id}})
      
      await queryRunner.manager.save(newPago)
      
      await queryRunner.commitTransaction()
      return "Pago agregado correctamente"
    }catch(err){
      await queryRunner.rollbackTransaction()
      return new InternalServerErrorException("Error al intentar crear el pago")
    }finally{
      await queryRunner.release()
    }
  }

  async post_pago_por_cuotas(createPagoDto:PagoPorCuotaWrpDTO){
    const queryRunner=this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    
    const infoValues=createPagoDto.createPagoPorCuotas
    const pagosValues=createPagoDto.cuotas
    try{
      const newInfopago=queryRunner.manager.create(Informacion_Pagos,{titulo:infoValues.titulo,
        pago_total:infoValues.pago_total,
        numero_cuotas:infoValues.numero_cuotas,
        fecha_creado:new Date(),
        tipo_pago:tipoPago.CUOTAS,
        tipo_servicio:tipoServicio.ASESORIA,
        asesoramiento:{id:infoValues.id_asesoramiento}
    })
      const {id}=await queryRunner.manager.save(newInfopago)
      
      const pago1=queryRunner.manager.create(Pago,{nombre:pagosValues.nombre1,monto:pagosValues.monto1,estado_pago:estadoPago.PAGADO,fecha_pago:pagosValues.fecha_pago1,informacion_pago:{id}})
      await queryRunner.manager.save(pago1)
      const pago2=queryRunner.manager.create(Pago,{nombre:pagosValues.nombre2,monto:pagosValues.monto2,estado_pago:estadoPago.POR_PAGAR,informacion_pago:{id}})
      await queryRunner.manager.save(pago2)
      
      if(pagosValues.nombre3 && pagosValues.monto3 && infoValues.numero_cuotas===3){
        const pago3=queryRunner.manager.create(Pago,{nombre:pagosValues.nombre3,monto:pagosValues.monto3,estado_pago:estadoPago.POR_PAGAR,informacion_pago:{id}})
        await queryRunner.manager.save(pago3)

        if(pago1.monto+pago2.monto+pago3.monto!==infoValues.pago_total)throw new BadRequestException("Las cuotas deben sumar el pago total")
      }else{
        if(pago1.monto+pago2.monto!==infoValues.pago_total)throw new BadRequestException("Los cuotas deben sumar el pago total")
      }
      await queryRunner.commitTransaction()
      return "Agregados los pagos por cuotas satisfactoriamente"
    }catch(err){
      await queryRunner.rollbackTransaction()
      return new InternalServerErrorException(`Error al realizar el pago por cuotas ${err.message}`)
    }finally{
      await queryRunner.release()
    }
  }

  async updateContado(id:number,body:UpdatePagoContadoDto){
    const queryRunner=this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try{
      
      const pago=await queryRunner.manager.findOneOrFail(Pago,{where:{informacion_pago:{id}}})
      if(body.pago_total) pago.monto=body.pago_total
      if(body.fecha_pago) pago.fecha_pago=body.fecha_pago

      await queryRunner.manager.save(pago)

      await queryRunner.commitTransaction()
      return `Se modifico correctamente el pago al contado`
    }catch(err){
      await queryRunner.rollbackTransaction()
      throw new InternalServerErrorException(`No se puedo actulizar el pago al contado error:${err.message}`)
    }finally{
      await queryRunner.release()
    }
  }
  
  async updateCuotas(id: number, updateCuotasDto:UpdateCuotasDto) {
    const cuotas=await this.pagoRepo.find({where:{informacion_pago:{id}}})
    if(!cuotas.length)throw new NotFoundException(`No se encontraron cuotas para ese Id:${id}`)
    const monto_total=cuotas.reduce((acumulador,valorActual)=>acumulador+valorActual.monto,0)

    for(let i=0;i<cuotas.length;i++){
      updateCuotasDto[`nombre${i+1}`] && (cuotas[i].nombre=updateCuotasDto[`nombre${i+1}`])
      updateCuotasDto[`monto${i+1}`] && (cuotas[i].monto=updateCuotasDto[`monto${i+1}`])
      if(updateCuotasDto[`fecha_pago${i+1}`]){
        cuotas[i].fecha_pago=updateCuotasDto[`fecha_pago${i+1}`]
        cuotas[i].estado_pago=estadoPago.PAGADO
      }
    }
    const nuevo_total=cuotas.reduce((acumulador,valorActual)=>acumulador+valorActual.monto,0)
    if(monto_total!==nuevo_total)throw new BadRequestException("El monto de las cuotas debe ser igual al monto total")
    await this.pagoRepo.save(cuotas)
    return `Se actualizaron las cuotas`;
  } 

  async updateOtroServicios(id:number,body:UpdatePagoContadoDto){
    const queryRunner=this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try{
      const infoPago = await queryRunner.manager.findOne(Informacion_Pagos, {
      where: { id, tipo_servicio:tipoServicio.OTROS},
      relations: ['asesoramiento'],
      });
      if(infoPago===null)throw new NotFoundException("No se encontro un servicio de tipo otros")
     
      const pago=await queryRunner.manager.findOneByOrFail(Pago,{informacion_pago:{id}})
      

      if(body.id_asesoramiento && body.pago_total){
        infoPago.asesoramiento.id=body.id_asesoramiento
        infoPago.pago_total=body.pago_total     
      }
      if(body.pago_total) pago.monto=body.pago_total
      if(body.fecha_pago) pago.fecha_pago=body.fecha_pago


      await queryRunner.manager.save(infoPago)
      await queryRunner.manager.save(pago)

      await queryRunner.commitTransaction()

      return "Actualizado satisfactoriamente"
    }catch(err){
      await queryRunner.rollbackTransaction()
      return (err.message)
    }finally{
      await queryRunner.release()
    }
  }
  
  async findAllServicios():Promise<listServiciosDto[]>{
    const infoServicios=await this.informacionRepo
    .createQueryBuilder('i')
    .innerJoinAndSelect('i.asesoramiento','a')
    .innerJoinAndSelect('i.pagos','p')
    .select(['a.id AS id','i.titulo AS titulo','i.pago_total AS pago_total','p.fecha_pago AS fecha_pago'])
    .where('i.tipo_servicio=:tipo_servicio',{tipo_servicio:tipoServicio.OTROS})
    .getRawMany()
    
    console.log(infoServicios)
    
    const response=infoServicios.map((info)=>{
      return({
        "id":info.id,
        "delegado":"a",
        "titulo":info.titulo,
        "pago_total":info.pago_total,
        "fecha_pago":info.fecha_pago
      }
      )
    })
    return response;
  }


  findOne(id: number) {
    return `This action returns a #${id} pago`;
  }
  
  async deletePago(id: number) {
    const queryRunner=this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try{
      const deletedPagos=await queryRunner.manager.delete(Pago,{informacion_pago:{id}})
      if(deletedPagos.affected===0)throw new NotFoundException(`No se encontro pagos con el id: ${id}`)
      const deletedInfo=await queryRunner.manager.delete(Informacion_Pagos,{id})
      if(deletedInfo.affected===0)throw new NotFoundException(`No hay informacion de pago con ese id: ${id}`)
      
      await queryRunner.commitTransaction()
      return `Eliminado satisfactoriamente`
    }catch(err){
      await queryRunner.rollbackTransaction()
      throw new InternalServerErrorException(`No se realizo la eliminacion pedida ${err.message}`)
    }finally{
      await queryRunner.release()
    }
  }
}