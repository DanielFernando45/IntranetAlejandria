import { IsDateString, IsEnum, IsIn, IsInt, isNotEmpty, IsNotEmpty, IsString } from "class-validator";
import { Estado_reunion } from "../entities/reunion.entity";

export class CreateReunionDto {
    @IsString()
    @IsNotEmpty()
    titulo:string;

    @IsDateString()
    @IsNotEmpty()
    fecha_reunion:Date;

    @IsInt()
    @IsNotEmpty()
    id_asesoramiento:number

    // @IsString()
    // @IsNotEmpty()
    // enlace_zoom:string
    
}
