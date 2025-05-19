import { IsDate, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Estado_asunto } from "../entities/asunto.entity";

export class CreateAsuntoDto {

    @IsString()
    titulo:string;

    // @IsEnum(Estado_asunto)
    // estado:Estado_asunto;

    // @IsDateString()
    // fecha_envio:Date;

    @IsOptional()
    @IsDate()
    fecha_revision:Date;

    @IsOptional()
    @IsDate()
    fecha_entrega:Date;

    @IsInt()
    @IsNotEmpty()
    id_asesoramiento:number;
    
}
