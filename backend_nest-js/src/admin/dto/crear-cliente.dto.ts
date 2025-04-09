import { IsString, IsEmail, IsNotEmpty ,IsNumber} from 'class-validator';

export class CrearlienteDto {//actualizar dtos
    @IsString()
    @IsNotEmpty()
    nombre: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    dni: string;

}