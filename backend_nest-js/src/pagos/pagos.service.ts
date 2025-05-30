import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { estadoPago, Pago } from './entities/pago.entity';
import { DataSource, Repository } from 'typeorm';
import { Informacion_Pagos, tipoPago } from './entities/informacion_pagos.entity';
import { CreatePagoAlContadoDto } from './dto/create-pago-al-contado.dto';
import { PagoPorCuotaWrpDTO } from './dto/pago-por-cuotas-add.dto';

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
  
  async post_pago_al_contado(createPagoDto: CreatePagoAlContadoDto) {
    const queryRunner=this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()  

    try{
      const newInfopago=queryRunner.manager.create(Informacion_Pagos,{titulo:createPagoDto.titulo,pago_total:createPagoDto.pago_total
        ,numero_cuotas:1,fecha_creado:new Date(),tipo_pago:tipoPago.CONTADO,asesoramiento:{id:createPagoDto.id_asesoramiento}
      })

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
     
    try{
      const newInfopago=queryRunner.manager.create(Informacion_Pagos,{titulo:createPagoDto.createPagoPorCuotas.titulo,pago_total:createPagoDto.createPagoPorCuotas.pago_total
        ,numero_cuotas:createPagoDto.createPagoPorCuotas.numero_cuotas,fecha_creado:new Date(),tipo_pago:tipoPago.CUOTAS,asesoramiento:{id:createPagoDto.createPagoPorCuotas.id_asesoramiento}
      })
      const {id}=await queryRunner.manager.save(newInfopago)
    
      const pago1=queryRunner.manager.create(Pago,{nombre:createPagoDto.cuotas.nombre1,monto:createPagoDto.cuotas.monto1,estado_pago:estadoPago.PAGADO,fecha_pago:createPagoDto.cuotas.fecha_pago1,informacion_pago:{id}})
      await queryRunner.manager.save(pago1)
      const pago2=queryRunner.manager.create(Pago,{nombre:createPagoDto.cuotas.nombre2,monto:createPagoDto.cuotas.monto2,estado_pago:estadoPago.POR_PAGAR,fecha_pago:createPagoDto.cuotas.fecha_pago2,informacion_pago:{id}})
      await queryRunner.manager.save(pago2)
      
      if(createPagoDto.cuotas.nombre3 && createPagoDto.cuotas.monto3 && createPagoDto.cuotas.fecha_pago3){
        const pago3=queryRunner.manager.create(Pago,{nombre:createPagoDto.cuotas.nombre3,monto:createPagoDto.cuotas.monto3,estado_pago:estadoPago.POR_PAGAR,fecha_pago:createPagoDto.cuotas.fecha_pago3,informacion_pago:{id}})
        await queryRunner.manager.save(pago3)
      }
      await queryRunner.commitTransaction()
      return "Agregados los pagos por cuotas satisfactoriamente"
    }catch(err){
      await queryRunner.rollbackTransaction()
      return new InternalServerErrorException("Error al realizar el pago por cuotas")
    }finally{
      await queryRunner.release()
    }
  }
  findAll() {
    return `This action returns all pagos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pago`;
  }

  update(id: number, updatePagoDto: UpdatePagoDto) {
    return `This action updates a #${id} pago`;
  }

  remove(id: number) {
    return `This action removes a #${id} pago`;
  }
}