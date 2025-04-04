import { Entity, PrimaryGeneratedColumn, Column, OneToOne,JoinColumn } from "typeorm";
import { Usuario } from "src/usuario/usuario.entity";

@Entity()
export class Asesor{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()Is
    dni:string;
    
    @Column()
    nombre:string;

    @Column()
    apellido:string;

    @Column()
    email:string;

    @Column()
    telefono:number;

    @Column()
    url_imagen:string;

    @Column()
    area:string;

    @Column()
    especialidad:string;

    @Column()
    id_grado_academico:string;

    @Column()
    universidad:string;

    @OneToOne(()=>Usuario,{cascade:true})
    @JoinColumn()
    usuario:Usuario;
}