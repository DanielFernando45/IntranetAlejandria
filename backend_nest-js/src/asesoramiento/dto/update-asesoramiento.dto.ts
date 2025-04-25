import { PartialType } from '@nestjs/mapped-types';
import { CreateAsesoramientoDto } from './create-asesoramiento.dto';

export class UpdateAsesoramientoDto extends PartialType(CreateAsesoramientoDto) {}
