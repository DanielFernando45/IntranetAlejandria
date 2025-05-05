import { TipoContrato } from "src/common/entidades/tipoContrato.entity";
import { TipoTrabajo } from "src/common/entidades/tipoTrabajo.entity";
import { ProcesosAsesoria } from "src/procesos_asesoria/entities/procesos_asesoria.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Estado_Asesoria{
    ACTIVO="activo",
    DESACTIVADO="desactivado",
    FINALIZADO="finalizado"
}

@Entity()
export class Asesoramiento {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    carrera:string;

    @Column()
    especialidad:string;

    @ManyToOne(()=>TipoTrabajo)
    @JoinColumn({name:'id_tipo_trabajo'})
    tipoTrabajo:TipoTrabajo;

    @ManyToOne(()=>TipoContrato)
    @JoinColumn({name:'id_contrato'})
    tipoContrato:TipoContrato;

    @Column({type:'enum',enum:Estado_Asesoria})
    estado:Estado_Asesoria;

    @Column()
    fecha_inicio:Date;

    @Column()
    fecha_fin:Date;

    @OneToMany(() => ProcesosAsesoria, procesosasesoria => procesosasesoria.asesoramiento)
    procesosasesoria: ProcesosAsesoria[];
}
