import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { GuiasService } from "../services/guias.service";
import { CreateGuiaDto } from "../dto/guias-dto/create-guia.dto";
import { UpdateGuiaDto } from '../dto/guias-dto/update-guia.dto';


@Controller('recursos/guias')
export class GuiasController{
    constructor(private guiaService:GuiasService){}

    @Post('add')
    añadirGuias(@Body() body:CreateGuiaDto){
        return this.guiaService.postGuia(body)
    }

    @Patch('update/:id')
    actualizarGuias(@Param('id',ParseIntPipe) id:number,@Body() body:UpdateGuiaDto){
        return this.guiaService.patchGuia(id,body)
    }
    
    @Delete('delete/:id')
    deleteGuia(@Param('id',ParseIntPipe) id:number){
        return this.guiaService.deleteGuia(id)
    }

    @Get('list')
    getGuias(){
        return this.guiaService.listGuias()
    }

    @Get('list/:id')
    getOneguia(@Param('id',ParseIntPipe) id:number){
        return this.guiaService.listOneGuia(id)
    }

}