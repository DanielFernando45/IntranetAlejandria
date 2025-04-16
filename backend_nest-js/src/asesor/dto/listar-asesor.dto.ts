import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class listarAsesorDto{
    @IsString()
    @IsNotEmpty()
    readonly dni:string
    
    @IsString()
    @IsNotEmpty()
    readonly nombre:string;

    @IsString()
    @IsNotEmpty()
    readonly apellido:string;

    @IsEmail()
    @IsNotEmpty()
    readonly email:string;

    @IsNumber()
    readonly telefono:number;

    @IsString()
    readonly url_imagen:string;

    @IsString()
    readonly areaAsesor:string;

    @IsString()
    readonly especialidad:string;

    @IsString()
    readonly gradoAcademico:string;

    @IsString()
    readonly universidad:string;
}