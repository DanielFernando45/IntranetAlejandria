import { Entity,PrimaryGeneratedColumn, Column, OneToOne,JoinColumn} from "typeorm";
import { Usuario } from "src/usuario/usuario.entity";

@Entity()
export class Cliente{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    dni:string;

    @Column()
    nombre:string;

    @Column()
    apellido:string;

    @Column()
    telefono:number;

    @Column()
    email:string;

    @Column()
    url_imagen:string;

    @Column()
    tipo_trabajo:string;

    @Column()
    pais:string;

    @Column()
    id_grado_academico:string;

    @Column()
    universidad:string;

    @Column()
    id_contrato:string

    @OneToOne(()=>Usuario,{cascade:true})
    @JoinColumn()
    usuario:Usuario;
}