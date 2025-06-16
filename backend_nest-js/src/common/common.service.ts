import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { TipoTrabajo } from "./entidades/tipoTrabajo.entity";
import { AsuntosService } from "src/asuntos/asuntos.service";
import { ReunionesService } from "src/reuniones/reuniones.service";
import { AsesoramientoService } from "src/asesoramiento/asesoramiento.service";


@Injectable()
export class CommonService{
    constructor(
        private readonly asuntoService:AsuntosService,
        private readonly reunionService:ReunionesService,
        private readonly asesoramientoService:AsesoramientoService,

        @InjectDataSource()
        private readonly dataSource:DataSource
    ){}

    async listarTiposTrabajo(){
        const queryRunner=this.dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try{
            const listTrabajos=await queryRunner.manager.find(TipoTrabajo,{select:['id','nombre']})
            return listTrabajos
        }catch(err){
            await queryRunner.rollbackTransaction()
            throw new InternalServerErrorException()
        }finally{
            await queryRunner.release()
        }
    }

    async listarSegunFecha(id:number,fecha:string){
        //const filtro=fecha.split('T')[0]
        const filtro_fecha=new Date(fecha)
        

        const reuniones=await this.reunionService.getReunionesByFecha(id,filtro_fecha)
        const asuntos=await this.asuntoService.asuntosCalendario(id,filtro_fecha)
        
        const eventos = reuniones === null ? [...asuntos] : [...reuniones, ...asuntos];

        return eventos;
    }

    async listarTodoEventosAsesor(fecha:string,id_asesor:number){
        const filtro_fecha=new Date(fecha)
        const listAsesoramientos=await this.asesoramientoService.getAsesoramientoByAsesor(id_asesor)
        let eventos
        const reuniones=await Promise.all(listAsesoramientos.map(async(asesoramiento)=>{
            return this.reunionService.getReunionesByFecha(asesoramiento.id,filtro_fecha)
        }))

        const asuntos=await Promise.all(listAsesoramientos.map(async(asesoramiento)=>{
            return this.asuntoService.asuntosCalendario(asesoramiento.id,filtro_fecha)
        }))
        if(asuntos.every(item=>item===null) && reuniones.every(item => item===null)) return {"message":"No hay eventos concertados"}
        
        if(asuntos.every(item=>item===null)){
            eventos=[...reuniones]
        }

        eventos = reuniones.every(item => item===null) ? [...asuntos] : [...reuniones,...asuntos]

        return eventos
    }
}