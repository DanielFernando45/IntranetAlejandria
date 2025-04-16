import { Asesor } from "src/asesor/asesor.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class AreaAsesor{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    nombre:string

    @OneToMany(() => Asesor, asesor=> asesor.areaAsesor)
    asesores: Asesor[];
}