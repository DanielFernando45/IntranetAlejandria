import { Controller } from "@nestjs/common";
import { NoticiasService } from "../services/noticias.service";

@Controller('recursos/noticias')
export class NoticiasController{
    constructor(private noticiasService:NoticiasService){}
}