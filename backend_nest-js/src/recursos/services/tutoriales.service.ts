import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tutorial } from "../entities/tutorial.entity";
import { Repository } from "typeorm";

@Injectable()
export class TutorialesService{
    constructor(
        @InjectRepository(Tutorial)
        private tutorialRepo:Repository<Tutorial>
    ){}
}