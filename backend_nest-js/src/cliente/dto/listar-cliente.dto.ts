import { IsString, IsEmail, IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class ListarClienteDto {
  @IsString()
  @IsOptional()
  readonly dni: string;

  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly apellido: string;

  @IsNumber()
  @IsOptional()
  readonly telefono: number;

  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly url_imagen: string;

  @IsString()
  @IsOptional()
  readonly tipoTrabajo: string;  // Cambié de tipo_trabajo a tipoTrabajo

  @IsString()
  @IsOptional()
  readonly pais: string;

  @IsString()
  @IsOptional()
  readonly gradoAcademico: string;  // Cambié id_grado_academico a gradoAcademico

  @IsString()
  @IsOptional()
  readonly universidad: string;

  @IsString()
  readonly carrera:string;

  @IsString()
  readonly tipoContrato: string;  // Cambié id_contrato a tipoContrato
}