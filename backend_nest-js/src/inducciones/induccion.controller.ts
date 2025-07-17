import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { InduccionesService } from "./inducciones.service";
import { Inducciones } from "./entity/inducciones";
import { CreateInduccionDto } from "./dto/subir-induccion.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { BackbazeService } from "src/backblaze/backblaze.service";
import { DIRECTORIOS } from "src/backblaze/directorios.enum";

@Controller('inducciones')
export class InduccionesController {
    constructor(private readonly induccionesService: InduccionesService,
    ) { }


    @Get('induccionesByAsesoria/:id')
    async getInduccionByAsesoria(@Param('id', ParseIntPipe) id: number) {
        return this.induccionesService.getInduccionesByAsesoria(id);
    }

    @Post('')
    @UseInterceptors(FileInterceptor('video'))
    async createInduccion(@UploadedFile() file: Express.Multer.File, @Body() induccionData: CreateInduccionDto) {
        if (!file) throw new BadRequestException("No se ha enviado archivos")
        const newInduccion = await this.induccionesService.createInduccion(file,induccionData);
        if (!newInduccion) {
            throw new Error('Error al crear la inducción');
        }
        return { message: 'Inducción creada exitosamente' };
    }

    @Delete(':id')
    async deleteInduccion(@Param('id', ParseIntPipe) id: number) {
        return this.induccionesService.deleteInduccion(id);
    }
}
