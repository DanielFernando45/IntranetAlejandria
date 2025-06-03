import { IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";

export class listServiciosDto{
    @IsNotEmpty()
    @IsInt()
    id:number;

    @IsNotEmpty()
    @IsString()
    delegado:string;

    @IsNotEmpty()
    @IsString()
    titulo:string;

    @IsNotEmpty()
    @IsInt()
    pago_total:number;

    @IsNotEmpty()
    @IsDateString()
    fecha_pago:Date
}