import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Entity } from 'typeorm';


@Entity('asesoramiento_videos')
export class CreateInduccionDto {

  @IsString()
  @IsNotEmpty({message: 'El título es obligatorio'})
  titulo: string;

  @IsString()
  @IsNotEmpty({ message: 'La URL es obligatoria' })
  url: string;


  // @IsNumber()
  @IsString()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  asesoramiento: number;
}
