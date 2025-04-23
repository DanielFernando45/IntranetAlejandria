import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Estado_Asesoria{
    ACTIVO="activo",
    DESACTIVADO="desactivado",
    FINALIZADO="finalizado"
}

@Entity()
export class Asesoramiento {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:'enum',enum:Estado_Asesoria})
    estado:Estado_Asesoria;

    @Column()
    fecha_inicio:Date;

    @Column()
    fecha_fin:Date;

}
