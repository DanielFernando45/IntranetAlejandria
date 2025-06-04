import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePagoPorCuotaDto {
    @IsString()
    @IsNotEmpty()
    titulo:string;

    @IsNumber()
    @IsNotEmpty()
    pago_total:number;

    @IsDateString()
    @IsNotEmpty()
    fecha_pago:Date;

    @IsNumber()
    @IsNotEmpty()
    numero_cuotas:number;

    @IsNumber()
    @IsNotEmpty()
    id_asesoramiento:number;
}
