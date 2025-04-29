import { Injectable } from '@nestjs/common';
import { CreateProcesosAsesoriaDto } from './dto/create-procesos_asesoria.dto';
import { UpdateProcesosAsesoriaDto } from './dto/update-procesos_asesoria.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ProcesosAsesoria } from './entities/procesos_asesoria.entity';
import { Repository, DataSource, EntityManager } from 'typeorm';
import { clientesExtraDTO } from './dto/clientes_extra.dto';

@Injectable()
export class ProcesosAsesoriaService {
  constructor(
    @InjectRepository(ProcesosAsesoria)
    private procesosAsesoriaRepo:Repository<ProcesosAsesoria>,

    @InjectDataSource()
    private readonly dataSource:DataSource
  ){}

  create(createProcesosAsesoriaDto: CreateProcesosAsesoriaDto) {
    return 'This action adds a new procesosAsesoria';
  }

  async addProceso_to_Asesoramiento(clientes:clientesExtraDTO,id_asesor:number,id_asesoramiento:number,manager:EntityManager){
      const clienteIds = Object.values(clientes).filter(id => typeof id === 'number' && id > 0);
      for (const clienteId of clienteIds) {
        const nuevoProceso = manager.create(ProcesosAsesoria, {
          cliente: { id: clienteId },
          asesor: { id: id_asesor },
          asesoramiento: { id: id_asesoramiento }
        });
        await manager.insert(ProcesosAsesoria,nuevoProceso)
      }
      return true
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
