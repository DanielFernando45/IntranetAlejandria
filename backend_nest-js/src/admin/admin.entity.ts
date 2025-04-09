import {Entity,PrimaryGeneratedColumn,Column,OneToOne,JoinColumn} from 'typeorm'
import {Usuario} from '../usuario/usuario.entity'

@Entity()
export class Admin{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    email:string;

    @Column()
    dni:string;

    @OneToOne(()=>Usuario,{cascade:true})
    @JoinColumn()
    usuario:Usuario;
}