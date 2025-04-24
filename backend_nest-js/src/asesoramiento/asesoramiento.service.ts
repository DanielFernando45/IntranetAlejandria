import { Injectable } from '@nestjs/common';
import { CreateAsesoramientoDto } from './dto/create-asesoramiento.dto';
import { UpdateAsesoramientoDto } from './dto/update-asesoramiento.dto';

@Injectable()
export class AsesoramientoService {
  create(createAsesoramientoDto: CreateAsesoramientoDto) {
    //return 'This action adds a new asesoramiento';
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
