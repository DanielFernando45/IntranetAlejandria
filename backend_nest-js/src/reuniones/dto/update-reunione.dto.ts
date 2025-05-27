import { PartialType } from '@nestjs/mapped-types';
import { CreateReunioneDto } from './create-reunion.dto';

export class UpdateReunioneDto extends PartialType(CreateReunioneDto) {}
