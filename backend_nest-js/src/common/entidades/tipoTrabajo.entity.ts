import { Cliente } from "src/cliente/cliente.entity";
import { Column, Entity,OneToMany,PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class TipoTrabajo{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    nombre:string

    @OneToMany(() => Cliente, cliente => cliente.tipoTrabajo)
    clientes: Cliente[];
}