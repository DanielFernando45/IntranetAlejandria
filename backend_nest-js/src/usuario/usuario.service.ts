import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRole, Usuario } from "./usuario.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from "./dto/create-user.dto";


@Injectable()
export class UsuarioService{
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepo:Repository<Usuario>,

    ){}

    async createUserDefault(data:CreateUserDto){
        const exist=await this.usuarioRepo.findOneBy({username:data.username})
        if(exist)throw new ConflictException("Ese usuario ya existe")
        const hashedPaswword=await bcrypt.hash(data.password,10);

        const newUser=this.usuarioRepo.create({
            ...data,
            password:hashedPaswword
        })
        const savedUsuario=await this.usuarioRepo.save(newUser)
        return savedUsuario
    }

    
    async desactivateUser(id:number){
        const user=await this.usuarioRepo.update({id},{estado:false})
        if(!user) throw new NotFoundException("No se encuentro registrado ese usuario")
        return user.affected
    }

}