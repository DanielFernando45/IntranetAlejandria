import { IsEmail, IsOptional, IsString } from "class-validator";

export class updatedByClient{
    @IsString()
    @IsOptional()
    readonly pais:string;
    
    @IsString()
    @IsOptional()
    readonly url_imagen:string;

    @IsEmail()
    @IsOptional()
    readonly email: string;
}