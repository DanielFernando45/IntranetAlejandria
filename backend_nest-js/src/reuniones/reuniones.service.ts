import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReunionDto } from './dto/create-reunion.dto';
import { UpdateReunioneDto } from './dto/update-reunione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado_reunion, Reunion } from './entities/reunion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReunionesService {
  constructor(
    @InjectRepository(Reunion)
    private reunionRepo:Repository<Reunion>
  ){}

  async addReunion(id:number,createReunionDto: CreateReunionDto) {
    // const asesoramiento = await this.asesoramientoRepo.findOne({ where: { id } });
    // if (!asesoramiento) throw new NotFoundException(`Asesoramiento con id ${id} no encontrado`);

    const newReunion=this.reunionRepo.create({...createReunionDto,estado:Estado_reunion.ESPERA,fecha_creacion:new Date(),asesoramiento:{id}})
    await this.reunionRepo.save(newReunion)
    return 'Se añadio la reunion';
  }

  findAll() {
    return `This action returns all reuniones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reunione`;
  }

  update(id: number, updateReunioneDto: UpdateReunioneDto) {
    return `This action updates a #${id} reunione`;
  }

  remove(id: number) {
    return `This action removes a #${id} reunione`;
  }
}
