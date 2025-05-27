import { Controller, Get } from "@nestjs/common";
import { GuiasService } from "../services/guias.service";


@Controller('recursos/guias')
export class GuiasController{
    constructor(private guiaService:GuiasService){}

    @Get()
    async getAll(){
        return 1
    }
}