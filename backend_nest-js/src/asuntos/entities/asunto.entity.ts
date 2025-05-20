import { Asesoramiento } from "src/asesoramiento/entities/asesoramiento.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Estado_asunto{
    ENVIADO="enviado",
    PROCESO="proceso",
    ENTREGADO="entregado"
}

@Entity()
export class Asunto {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    titulo:string;

    @Column({type:'enum',enum:Estado_asunto})
    estado:Estado_asunto;

    @Column()
    fecha_envio:Date;

    @Column({nullable:true})
    fecha_revision:Date;

    @Column({nullable:true})
    fecha_entrega:Date

    @ManyToOne(()=>Asesoramiento)
    @JoinColumn({name:'id_asesoramiento'})
    asesoramiento:Asesoramiento
}
