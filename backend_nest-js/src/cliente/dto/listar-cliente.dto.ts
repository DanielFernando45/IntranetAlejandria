import { IsString, IsEmail, IsNotEmpty ,IsNumber} from 'class-validator';

export class listarClienteDto {//actualizar dtos
    @IsString()
    @IsNotEmpty()
    readonly dni: string;

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly apellido: string;

    @IsNumber()
    readonly telefono: number;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    readonly url_imagen:string;

    @IsString()
    readonly tipo_trabajo:string;

    @IsString()
    readonly pais:string;

    @IsString()
    readonly id_grado_academico:string;

    @IsString()
    readonly universidad:string;

    @IsString()
    readonly id_contrato:string;

}