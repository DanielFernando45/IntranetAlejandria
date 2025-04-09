import { IsString, IsEmail, IsNotEmpty ,IsNumber} from 'class-validator';

export class listarClienteDto {//actualizar dtos
    @IsString()
    @IsNotEmpty()
    dni: string;

    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellido: string;

    @IsNumber()
    telefono: number;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    url_imagen:string;

    @IsString()
    tipo_trabajo:string;

    @IsString()
    pais:string;

    @IsString()
    id_grado_academico:string;

    @IsString()
    universidad:string;

    @IsString()
    id_contrato:string;

}