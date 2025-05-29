import { Injectable } from '@nestjs/common';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Repository } from 'typeorm';
import { Informacion_Pagos } from './entities/informacion_pagos.entity';
import { CreatePagoAlContadoDto } from './dto/create-pago-al-contado.dto';

@Injectable()
export class PagosService {
  constructor(
      @InjectRepository(Pago)
      private pagoRepo:Repository<Pago>,

      @InjectRepository(Informacion_Pagos)
      private informacionRepo:Repository<Pago>
    ){}
  
  async post_pago_al_contado(createPagoDto: CreatePagoAlContadoDto,id:number) {
    const newInfoPago=this.informacionRepo.create()
    return 'This action adds a new pago';
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
