import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Herramienta } from "../entities/herramienta.entity";
import { Repository } from "typeorm";
import { CreateHerramientaDto } from "../dto/herramientas-dto/create-herramientas.dto";
import { UpdateHerramientasDto } from "../dto/herramientas-dto/update-herramientas.dto";

@Injectable()
export class HerramientasService{
    constructor(
        @InjectRepository(Herramienta)
        private herramientasRepo:Repository<Herramienta>
    ){}
    
    async postHerramienta(body:CreateHerramientaDto){
        const newGuia=this.herramientasRepo.create(body)
        await this.herramientasRepo.save(newGuia)

        return "Agregado satisfactoriamente"
    }

    async patchHerramienta(id:number,body:UpdateHerramientasDto){
        const updatedGuia=await this.herramientasRepo.update(id,body)
        if(updatedGuia.affected===0)throw new BadRequestException("No se actualizo ningun registro")
        return {"message":`Se actualizaron satisfactoriamente ${updatedGuia.affected}`}
    }

    async deleteHerramienta(id:number){
        const deletedGuia=await this.herramientasRepo.delete({id})
        if(deletedGuia.affected===0)throw new BadRequestException("No se elimino ninguna guia")
        return {"message":`Se elimno satisfactoriamente la herramienta con id: ${id}`}
    }

    async listHerramientas(){
        const listGuias=await this.herramientasRepo.find()
        if(listGuias.length===0)throw new NotFoundException("No se encontraron registros")
        return listGuias
    }

    async listOneHerramienta(id:number){
        const guia=await this.herramientasRepo.findOneBy({id})
        if(!guia)throw new NotFoundException(`No se encontro una guia con el id: ${id}`)
        return guia
    }
}