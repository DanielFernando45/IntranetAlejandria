import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AsesorService } from './asesor.service';
import { createAsesorDto } from './dto/crear-asesor.dto';
import { UpdateAsesorDto } from './dto/update-asesor.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

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

        @Patch('/update/:id')
        async update(@Param('id',ParseIntPipe) id:number,@Body() body:UpdateAsesorDto){
            return this.asesorService.patchAsesor(id,body)
        }

        @Delete('delete/:id')
        async delete(@Param('id',ParseIntPipe) id:number){
            return this.asesorService.deleteAsesor(id)
        }

        @UseGuards(JwtAuthGuard,RolesGuard)
        @Roles("admin")
        @Patch('desactivate/:id')
        async desactivate(@Param('id',ParseIntPipe) id:number){
            return this.asesorService.desactivateAsesor(id)
        }
}
