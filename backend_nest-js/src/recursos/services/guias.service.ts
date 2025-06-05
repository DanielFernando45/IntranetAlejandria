import { InjectRepository } from "@nestjs/typeorm";
import { Guia } from "../entities/guia.entity";
import { Repository } from "typeorm";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateGuiaDto } from "../dto/guias-dto/create-guia.dto";
import { UpdateGuiaDto } from "../dto/guias-dto/update-guia.dto";

@Injectable()
export class GuiasService{
    constructor(
        @InjectRepository(Guia)
        private guiasRepo:Repository<Guia>
    ){}

    async postGuia(body:CreateGuiaDto){
        const newGuia=this.guiasRepo.create(body)
        await this.guiasRepo.save(newGuia)

        return "Agregado satisfactoriamente"
    }

    async patchGuia(id:number,body:UpdateGuiaDto){
        const updatedGuia=await this.guiasRepo.update(id,body)
        if(updatedGuia.affected===0)throw new BadRequestException("No se actualizo ningun registro")
        return {"message":`Se actualizaron satisfactoriamente ${updatedGuia.affected}`}
    }

    async deleteGuia(id:number){
        const deletedGuia=await this.guiasRepo.delete({id})
        if(deletedGuia.affected===0)throw new BadRequestException("No se elimino ninguna guia")
        return {"message":`Se elimno satisfactoriamente la guia con id: ${id}`}
    }

    async listGuias(){
        const listGuias=await this.guiasRepo.find()
        if(listGuias.length===0)throw new NotFoundException("No se encontraron registros")
        return listGuias
    }

    async listOneGuia(id:number){
        const guia=await this.guiasRepo.findOneBy({id})
        if(!guia)throw new NotFoundException(`No se encontro una guia con el id: ${id}`)
        return guia
    }
}
