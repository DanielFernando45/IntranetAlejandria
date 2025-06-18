import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { NoticiasService } from "../services/noticias.service";
import { CreateNoticiaDto } from "../dto/noticias-dto/create-noticia.dto";
import { UpdateNoticiaDto } from "../dto/noticias-dto/update-noticia.dto";

@Controller('recursos/noticias')
export class NoticiasController{
    constructor(private noticiasService:NoticiasService){}

    @Get('all')
    listarTodo(){
        return this.noticiasService.findAll()
    }

    @Post('add')
    añadir(@Body() body:CreateNoticiaDto){
        return this.noticiasService.create(body)
    }

    @Patch('update/:id')
    update(@Param('id',ParseIntPipe) id:number,@Body() body:UpdateNoticiaDto){
        return this.noticiasService.update(id,body)
    }

    @Delete('delete/:id')
    deleteNoticia(@Param('id',ParseIntPipe) id:number){
        return this.noticiasService.delete(id)
    }

    @Get('list/:id')
    listarUno(@Param('id',ParseIntPipe) id:number){
        return this.noticiasService.listOne(id)
    }
}