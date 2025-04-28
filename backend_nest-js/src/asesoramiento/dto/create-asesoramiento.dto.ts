import { IsDate, IsNotEmpty, IsNumber } from "class-validator";


export class CreateAsesoramientoDto {
    @IsNumber()
    @IsNotEmpty()
    id_asesor:number;

    
    @IsNumber()
    @IsNotEmpty()
    id_cliente:number;

    @IsNumber()
    id_cliente2:number;

    @IsDate()
    @IsNotEmpty()
    fecha_inicio:Date;

    @IsDate()
    @IsNotEmpty()
    fecha_fin:Date
}
