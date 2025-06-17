import { Controller, Get, Param, ParseDatePipe, ParseIntPipe } from "@nestjs/common";
import { CommonService } from './common.service';


@Controller('common')
export class CommonController{
    constructor (private readonly commonService:CommonService){}

    @Get("listar-trabajos")
    async listTrabajos(){
        return this.commonService.listarTiposTrabajo()
    }

    @Get('listar-calendario/:id/:fecha')
    listarEventosCalendario(@Param('id',ParseIntPipe) id:number,@Param('fecha') fecha:string){
        return this.commonService.listarSegunFecha(id,fecha)
    }

    @Get('allEventosAsesor/:fecha/:id_asesor')
    listarTodosEventos(@Param('fecha') fecha:string,@Param('id_asesor',ParseIntPipe) id_asesor:number){
        return this.commonService.listarTodoEventosAsesor(fecha,id_asesor)
    }
}