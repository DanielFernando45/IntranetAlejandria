import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

  async actualizar_registros_por_Asesoramiento(idAsesoramiento:number,id_cliente:number,id_asesor:number|undefined,manager:EntityManager,id_proceso:number){
    await manager.update(ProcesosAsesoria,{id:id_proceso},{
      cliente:{id:id_cliente},
      asesor:{id:id_asesor},
      asesoramiento:{id:idAsesoramiento}
    })
  }

  async crear_registro_por_Asesoramiento(idAsesoramiento:number,id_cliente:number,id_asesor:number|undefined,manager:EntityManager){
    const nuevo=manager.create(ProcesosAsesoria,{
      cliente:{id:id_cliente},
      asesor:{id:id_asesor},
      asesoramiento:{id:idAsesoramiento}
    })
    //await manager.save(nuevo);
    await manager.insert(ProcesosAsesoria,nuevo)
  }

  async remove_by_asesoramiento(id:number,manager:EntityManager){
    try{
      const deletedProcesos=await manager.delete(ProcesosAsesoria,{asesoramiento:{id:id}})
      if(deletedProcesos.affected===0)throw new NotFoundException(`No se encontro para eliminar con ese id:${id}`)
      console.log(deletedProcesos.affected)
    return true
    }catch(err){
      throw new Error(`Error en la eliminacion de los procesos Asesoria ${err}`)
    }
  }

  async getDelegado(asesoramientoId:number){
    const delegadoprocess=await this.procesosAsesoriaRepo.findOne({
      where:{
        asesoramiento:{
          id:asesoramientoId
        }
      },
      relations:{asesoramiento:true}
    })
    if(delegadoprocess===null) throw new InternalServerErrorException("no hay un delegado")
    console.log(delegadoprocess)
    return delegadoprocess
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
