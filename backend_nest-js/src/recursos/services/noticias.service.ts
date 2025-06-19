import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Noticia } from "../entities/noticia.entity";
import { Repository } from "typeorm";
import { CreateNoticiaDto } from "../dto/noticias-dto/create-noticia.dto";
import { UpdateNoticiaDto } from "../dto/noticias-dto/update-noticia.dto";


@Injectable()
export class NoticiasService{
    constructor(
        @InjectRepository(Noticia)
        private noticiaRepo:Repository<Noticia>
    ){}

    async findAll(){
        const listaNoticias=await this.noticiaRepo.find()
        if(listaNoticias.length===0)throw new NotFoundException("No se encontro")

        return listaNoticias
    }

    async create(body:CreateNoticiaDto){
        const newNoticia=this.noticiaRepo.create(body)
        await this.noticiaRepo.save(newNoticia)

        return "Agregado correctamente"
    }

    async update(id:number,body:UpdateNoticiaDto){
        const updated=await this.noticiaRepo.update({id},{...body})
        if(updated.affected===0)throw new NotFoundException("No se modifico nada")

        return `Se modifico correctamente el registro con id : ${id}`
    }

    async delete(id:number){
        const deleted=await this.noticiaRepo.delete(id)
        if(deleted.affected===0)throw new BadRequestException("No se elimino ningun registro")
        
        return `Se elimino correctamente el registro con id: ${id}`
    }

    async listOne(id:number){
        try{
            const oneNoticia=await this.noticiaRepo.findOneByOrFail({id})
            return oneNoticia
        }catch(err){
            throw new BadRequestException("No se encuentra el registro con id: "+id)
        }
    }
}