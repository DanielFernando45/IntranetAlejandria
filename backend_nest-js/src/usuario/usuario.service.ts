import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "./usuario.entity";
import { Repository } from "typeorm";



@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepo:Repository<Usuario>,

    ){}

    async desactivateUser(id:number){
        const user=await this.usuarioRepo.update({id},{estado:false})
        if(!user) throw new NotFoundException("No se encuentro registrado ese usuario")
        return user.affected
    }
}