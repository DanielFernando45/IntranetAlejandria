import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class ListarClienteDto {
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
  readonly url_imagen: string;

  @IsString()
  readonly tipoTrabajo: string;  // Cambié de tipo_trabajo a tipoTrabajo

  @IsString()
  readonly pais: string;

  @IsString()
  readonly gradoAcademico: string;  // Cambié id_grado_academico a gradoAcademico

  @IsString()
  readonly universidad: string;

  @IsString()
  readonly carrera:string;

  @IsString()
  readonly tipoContrato: string;  // Cambié id_contrato a tipoContrato
}