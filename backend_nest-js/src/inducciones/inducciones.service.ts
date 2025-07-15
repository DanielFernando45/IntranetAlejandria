import { Injectable, UseInterceptors } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Inducciones } from "./entity/inducciones";
import { Repository } from "typeorm";
import { CreateInduccionDto } from "./dto/subir-induccion.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { DIRECTORIOS } from "src/backblaze/directorios.enum";
import { BackbazeService } from "src/backblaze/backblaze.service";

@Injectable()
export class InduccionesService {
    constructor(
        @InjectRepository(Inducciones)
        private induccionesRepo: Repository<Inducciones>,
        private readonly blackService: BackbazeService
    ) { }

    async getInduccionesByAsesoria(id: number) {
        let inducciones = this.induccionesRepo.find({
            where: { asesoramiento: { id } },
            relations: ['asesoramiento'],
        });

        if (!inducciones) {
            throw new Error('No se encontraron inducciones para esta asesoría');
        }

        const induccionesWithURl = await Promise.all(
            (await inducciones).map(async (induccion) => {
                induccion.url = await this.blackService.getSignedUrl(induccion.url);
                return induccion;
            })
        );
        return induccionesWithURl;
    }



    async createInduccion(file: Express.Multer.File, induccionData: CreateInduccionDto) {
        if (!file) throw new Error("No se ha enviado un archivo");

        const customName = induccionData.titulo.replace(/\s+/g, '-').toLowerCase();
        try {
            // 1. Sube el archivo y obtén la URL
            const videoUrl = await this.blackService.uploadFile(file, DIRECTORIOS.INDUCCIONES, customName);
            console.log(videoUrl);
            // 2. Crea el registro usando la URL
           
            const newInduccion = this.induccionesRepo.create({
                ...induccionData,
                url: videoUrl,
                asesoramiento: { id: induccionData.asesoramiento },
            });
            return await this.induccionesRepo.save(newInduccion);
        } catch (error) {
            throw new Error('Error al crear la inducción: ' + error.message);
        }
    }
}