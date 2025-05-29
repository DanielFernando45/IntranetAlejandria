import { IsEnum, IsIn, IsInt, isNotEmpty, IsNotEmpty, IsString } from "class-validator";
import { Estado_reunion } from "../entities/reunion.entity";

export class CreateReunionDto {
    @IsInt()
    @IsNotEmpty()
    titulo:string;

    @IsInt()
    @IsNotEmpty()
    fecha_reunion:Date;

    @IsString()
    @IsNotEmpty()
    enlace_zoom:string
    
}
