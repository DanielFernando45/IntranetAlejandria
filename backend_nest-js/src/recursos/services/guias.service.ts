import { InjectRepository } from "@nestjs/typeorm";
import { Guia } from "../entities/guia.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GuiasService{
    constructor(
        @InjectRepository(Guia)
        private guiasRepo:Repository<Guia>
    ){}


}
