import { IsString, IsOptional } from "class-validator";

export class FiltrosFechasDTO{
    @IsString()
    @IsOptional()
    ultimo_dia:string;

    @IsString()
    @IsOptional()
    ultima_semana:string;
    
    @IsString()
    @IsOptional()
    ultimo_mes:string;

    @IsString()
    @IsOptional()
    ultimo_año:string;
}