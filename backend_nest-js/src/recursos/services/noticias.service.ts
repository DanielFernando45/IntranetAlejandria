import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Noticia } from "../entities/noticia.entity";
import { Repository } from "typeorm";


@Injectable()
export class NoticiasService{
    constructor(
        @InjectRepository(Noticia)
        private noticiaRepo:Repository<Noticia>
    ){}
}