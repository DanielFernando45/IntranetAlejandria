import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { HerramientasService } from "../services/herramientas.service";
import { CreateHerramientaDto } from "../dto/herramientas-dto/create-herramientas.dto";
import { UpdateHerramientasDto } from "../dto/herramientas-dto/update-herramientas.dto";


@Controller('recursos/herramientas')
export class HerramientasController{
    constructor(private herramientaService:HerramientasService){}
    
        @Post('add')
        añadirHerramientas(@Body() body:CreateHerramientaDto){
            return this.herramientaService.postHerramienta(body)
        }
    
        @Patch('update/:id')
        actualizarHerramientas(@Param('id',ParseIntPipe) id:number,@Body() body:UpdateHerramientasDto){
            return this.herramientaService.patchHerramienta(id,body)
        }
        
        @Delete('delete/:id')
        deleteHerramientas(@Param('id',ParseIntPipe) id:number){
            return this.herramientaService.deleteHerramienta(id)
        }
    
        @Get('all')
        getHerramientas(){
            return this.herramientaService.listHerramientas()
        }
    
        @Get('list/:id')
        getOneHerramienta(@Param('id',ParseIntPipe) id:number){
            return this.herramientaService.listOneHerramienta(id)
        }
}