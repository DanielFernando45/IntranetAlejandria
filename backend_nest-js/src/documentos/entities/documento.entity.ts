import { Column, PrimaryGeneratedColumn } from "typeorm";

export enum Subido{
    CLIENTE="cliente",
    ASESOR="asesor"
}

export class Documento {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    ruta:string;

    @Column({type:"enum",enum:Subido})
    subido_por:Subido;

    @Column()
    created_at:Date
}
