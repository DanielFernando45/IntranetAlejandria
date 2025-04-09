import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AsesorService } from './asesor.service';
import { createAsesorDto } from './dto/crear-asesor.dto';

@Controller('asesor')
export class AsesorController {
    constructor(private readonly asesorService:AsesorService){}
    
        @Get(':id')
        async listOne(@Param('id') id:string){
            const ID:number=parseInt(id)
            return this.asesorService.listOneAdmin(ID)
        }
    
        @Get()
        async listAll(){
            return this.asesorService.listAdmin();
        }
    
        @Post('/add')
        async create(@Body() body:createAsesorDto){
            return this.asesorService.crearAsesor(body)
        }
}
