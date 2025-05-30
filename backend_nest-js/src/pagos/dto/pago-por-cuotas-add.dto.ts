import { clientesExtraDTO } from 'src/procesos_asesoria/dto/clientes_extra.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePagoPorCuotaDto } from './create-pago-por-cuotas.dto';
import { Cuotas } from './cuotas.dto';

export class PagoPorCuotaWrpDTO{
    @ValidateNested()
    @Type(()=>CreatePagoPorCuotaDto)
    createPagoPorCuotas:CreatePagoPorCuotaDto;

    @ValidateNested()
    @Type(()=>Cuotas)
    cuotas:Cuotas;
}

// export class AsesoramientoUpdateWrpDTO{
//     @ValidateNested()
//     @Type(()=>UpdateAsesoramientoDto)
//     createAsesoramiento:UpdateAsesoramientoDto;

//     @ValidateNested()
//     @Type(()=>clientesExtraDTO)
//     clientes:clientesExtraDTO;
// }