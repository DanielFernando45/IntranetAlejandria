import { PartialType } from '@nestjs/mapped-types';
import { CreatePagoAlContadoDto } from './create-pago-al-contado.dto';

export class UpdatePagoDto extends PartialType(CreatePagoAlContadoDto) {}
