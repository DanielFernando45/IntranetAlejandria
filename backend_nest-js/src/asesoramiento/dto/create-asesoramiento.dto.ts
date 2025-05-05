import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateAsesoramientoDto {
    @IsNumber()
    @IsNotEmpty()
    id_asesor:number;

    @IsString()
    @IsNotEmpty()
    carrera:string;

    @IsString()
    @IsOptional()
    especialidad:string;

    @IsInt()
    @IsNotEmpty()
    tipoTrabajo:number;

    @IsInt()
    @IsNotEmpty()
    tipoContrato:number;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    fecha_inicio:Date;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    fecha_fin:Date
}
