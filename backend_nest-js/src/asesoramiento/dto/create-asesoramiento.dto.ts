import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";


export class CreateAsesoramientoDto {
    @IsNumber()
    @IsNotEmpty()
    id_asesor:number;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    fecha_inicio:Date;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    fecha_fin:Date
}
