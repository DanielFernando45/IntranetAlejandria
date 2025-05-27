import { Controller, Get } from "@nestjs/common";
import { HerramientasService } from "../services/herramientas.service";


@Controller('recursos/herramientas')
export class HerramientasController{
    constructor(private herramientasService:HerramientasService){}

    @Get('')
    async listAll(){
        return 1
    }
}