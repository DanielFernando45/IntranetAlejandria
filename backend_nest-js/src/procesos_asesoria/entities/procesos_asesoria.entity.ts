import { Asesor } from "src/asesor/asesor.entity";
import { Cliente } from "src/cliente/cliente.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProcesosAsesoria {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>Cliente)
    @JoinColumn({name:"id_cliente"})
    cliente:Cliente;

    @ManyToOne(()=>Asesor)
    @JoinColumn({name:"id_asesor"})
    asesor:Asesor;
}
