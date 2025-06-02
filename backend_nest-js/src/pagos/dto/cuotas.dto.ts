import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class Cuotas{
    @IsString()
    @IsNotEmpty()
    nombre1:string;

    @IsNumber()
    @IsOptional()
    monto1:number;

    @IsDateString()
    @IsOptional()
    fecha_pago1:Date;

    @IsString()
    @IsNotEmpty()
    nombre2:string;

    @IsNumber()
    @IsOptional()
    monto2:number;

    @IsDateString()
    @IsOptional()
    fecha_pago2?:Date;

    @IsString()
    @IsOptional()
    nombre3?:string;

    @IsNumber()
    @IsOptional()
    monto3?:number;

    @IsDateString()
    @IsOptional()
    fecha_pago3?:Date;
}