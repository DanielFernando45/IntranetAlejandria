import { Injectable } from '@nestjs/common';
import { CreateProcesosAsesoriaDto } from './dto/create-procesos_asesoria.dto';
import { UpdateProcesosAsesoriaDto } from './dto/update-procesos_asesoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProcesosAsesoria } from './entities/procesos_asesoria.entity';
import { Repository } from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { Asesor } from 'src/asesor/asesor.entity';
import { Asesoramiento } from 'src/asesoramiento/entities/asesoramiento.entity';

@Injectable()
export class ProcesosAsesoriaService {
  constructor(
    @InjectRepository(ProcesosAsesoria)
    private procesosAsesoriaRepo:Repository<ProcesosAsesoria>
  ){}

  create(createProcesosAsesoriaDto: CreateProcesosAsesoriaDto) {
    return 'This action adds a new procesosAsesoria';
  }

  async addProceso_to_Asesoramiento(id_cliente:number,clientes:{},id_asesor:number,id_asesoramiento:number){
    if(clientes){
      
    }
    const nuevoProceso=new ProcesosAsesoria

    nuevoProceso.cliente={id:id_cliente} as Cliente;
    nuevoProceso.asesor={id:id_asesor} as Asesor;
    nuevoProceso.asesoramiento={id:id_asesoramiento} as Asesoramiento

    await this.procesosAsesoriaRepo.save(nuevoProceso)

    return nuevoProceso
  }

  findAll() {
    return `This action returns all procesosAsesoria`;
  }

  findOne(id: number) {
    return `This action returns a #${id} procesosAsesoria`;
  }

  update(id: number, updateProcesosAsesoriaDto: UpdateProcesosAsesoriaDto) {
    return `This action updates a #${id} procesosAsesoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} procesosAsesoria`;
  }
}
