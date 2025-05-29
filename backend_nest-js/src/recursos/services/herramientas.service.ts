import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Herramienta } from "../entities/herramienta.entity";
import { Repository } from "typeorm";

@Injectable()
export class HerramientasService{
    constructor(
        @InjectRepository(Herramienta)
        private herramientasRepo:Repository<Herramienta>
    ){}
}