import { Controller } from "@nestjs/common";
import { TutorialesService } from "../services/tutoriales.service";


@Controller('recursos/tutoriales')
export class TutorialesController{
    constructor(private tutorialesService:TutorialesService){}
}