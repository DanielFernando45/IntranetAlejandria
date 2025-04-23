import { Injectable } from '@nestjs/common';
import { CreateProcesosAsesoriaDto } from './dto/create-procesos_asesoria.dto';
import { UpdateProcesosAsesoriaDto } from './dto/update-procesos_asesoria.dto';

@Injectable()
export class ProcesosAsesoriaService {
  create(createProcesosAsesoriaDto: CreateProcesosAsesoriaDto) {
    return 'This action adds a new procesosAsesoria';
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
