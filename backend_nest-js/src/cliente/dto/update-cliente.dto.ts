import { IsString, IsEmail, IsNotEmpty ,IsNumber, IsOptional} from 'class-validator';

export class updateClienteDto {//actualizar dtos
    @IsString()
    @IsOptional()
    readonly dni: string;

    @IsString()
    @IsOptional()
    readonly nombre: string;

    @IsString()
    @IsOptional()
    readonly apellido: string;

    @IsNumber()
    @IsOptional()
    readonly telefono: number;

    @IsEmail()
    @IsOptional()
    readonly email: string;

    @IsString()
    @IsOptional()
    readonly url_imagen:string;

    @IsString()
    @IsOptional()
    readonly tipo_trabajo:string;

    @IsString()
    @IsOptional()
    readonly pais:string;

    @IsString()
    @IsOptional()
    readonly id_grado_academico:string;

    @IsString()
    @IsOptional()
    readonly universidad:string;

    @IsString()
    @IsOptional()
    readonly id_contrato:string;

}