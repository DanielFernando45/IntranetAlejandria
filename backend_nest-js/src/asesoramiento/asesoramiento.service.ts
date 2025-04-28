import { Injectable } from '@nestjs/common';
import { CreateAsesoramientoDto } from './dto/create-asesoramiento.dto';
import { UpdateAsesoramientoDto } from './dto/update-asesoramiento.dto';
import { ProcesosAsesoriaService } from 'src/procesos_asesoria/procesos_asesoria.service';
import { Asesoramiento, Estado_Asesoria } from './entities/asesoramiento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AsesoramientoService {
  constructor(
    private readonly procesosAsesoriaService:ProcesosAsesoriaService,

    @InjectRepository(Asesoramiento)
    private asesoramientoRepo:Repository<Asesoramiento>

  ){}

  async create(createAsesoramientoDto: CreateAsesoramientoDto) {
    const {id_cliente,id_cliente2,id_asesor,fecha_inicio,fecha_fin,...masClientes}=createAsesoramientoDto
    const newAsesoramiento=this.asesoramientoRepo.create({fecha_inicio,fecha_fin,estado:Estado_Asesoria.ACTIVO})
    const addedAsesoramiento=await this.asesoramientoRepo.save(newAsesoramiento)
    const id_asesoramiento=addedAsesoramiento.id
    const creacion=this.procesosAsesoriaService.addProceso_to_Asesoramiento(id_cliente,masClientes,id_asesor,id_asesoramiento)
  }

  findAll() {
    //return `This action returns all asesoramiento`;
  }

  findOne(id: number) {
    //return `This action returns a #${id} asesoramiento`;
  }

  update(id: number, updateAsesoramientoDto: UpdateAsesoramientoDto) {
    //return `This action updates a #${id} asesoramiento`;
  }

  remove(id: number) {
    //return `This action removes a #${id} asesoramiento`;
  }
}
