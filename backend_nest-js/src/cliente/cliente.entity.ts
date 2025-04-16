import { Entity,PrimaryGeneratedColumn, Column, OneToOne,JoinColumn, OneToMany, ManyToOne} from "typeorm";
import { Usuario } from "src/usuario/usuario.entity";
import { TipoContrato } from "src/entidades/tipoContrato.entity";
import { GradoAcademico } from "src/entidades/gradoAcademico.entity";
import { TipoTrabajo } from "src/entidades/tipoTrabajo.entity";

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
    
    @ManyToOne(() => TipoTrabajo)
    @JoinColumn({ name: 'id_tipo_trabajo' }) // nombre de la columna en la tabla Cliente
    tipoTrabajo: TipoTrabajo;
    
    @Column()
    pais:string;

    @ManyToOne(() => GradoAcademico)
    @JoinColumn({ name: 'id_grado_academico' }) // nombre de la columna en la tabla Cliente
    gradoAcademico: GradoAcademico;

    @Column()
    universidad:string;

    @ManyToOne(() => TipoContrato)
    @JoinColumn({ name: 'id_contrato' }) // nombre de la columna en la tabla Cliente
    tipoContrato: TipoContrato;

    @OneToOne(()=>Usuario,{cascade:true})
    @JoinColumn()
    usuario:Usuario;
}