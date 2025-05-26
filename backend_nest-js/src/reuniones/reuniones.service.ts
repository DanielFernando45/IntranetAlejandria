import { Injectable } from '@nestjs/common';
import { CreateReunioneDto } from './dto/create-reunione.dto';
import { UpdateReunioneDto } from './dto/update-reunione.dto';

@Injectable()
export class ReunionesService {
  create(createReunioneDto: CreateReunioneDto) {
    return 'This action adds a new reunione';
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
