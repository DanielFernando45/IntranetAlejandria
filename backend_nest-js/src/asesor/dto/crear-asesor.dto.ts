import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class createAsesorDto{
    @IsString()
    @IsNotEmpty()
    dni:string
    
    @IsString()
    @IsNotEmpty()
    nombre:string;

    @IsString()
    @IsNotEmpty()
    apellido:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNumber()
    telefono:number;

    @IsString()
    url_imagen:string;

    @IsString()
    area:string;

    @IsString()
    especialidad:string;

    @IsString()
    id_grado_academico:string;

    @IsString()
    universidad:string;
}