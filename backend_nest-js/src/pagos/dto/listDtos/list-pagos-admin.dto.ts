import { InternalServerErrorException } from "@nestjs/common";
import { IsDateString, IsEnum, IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class listPagosAdminDto{
    @IsNotEmpty()
    @IsNumber()
    id_infoPago:number;

    @IsNotEmpty()
    @IsString()
    delegado:string ;

    @IsNotEmpty()
    @IsString()
    titulo:string;

    @IsNotEmpty()
    @IsDateString()
    fecha_creado:Date;

    @IsNotEmpty()
    @IsNumber()
    monto_total:number

}