import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAsesoramientoDto {
    @IsNumber()
    @IsNotEmpty()
    id_asesor:number;

    @IsNumber()
    @IsNotEmpty()
    id_cliente:number;
}
