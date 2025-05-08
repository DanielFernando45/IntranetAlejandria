import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { TipoTrabajo } from "./entidades/tipoTrabajo.entity";


@Injectable()
export class CommonService{
    constructor(
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
}