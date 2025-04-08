import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Admin} from './admin.entity'
import {Usuario,UserRole} from '../usuario/usuario.entity'
import * as bcrypt from "bcrypt"
import { ListarClienteDto } from './dto/listar-cliente.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private adminRepo: Repository<Admin>,
        @InjectRepository(Usuario)
        private usuarioRepo: Repository<Usuario>,
    ){}

    async listAdmin (): Promise<ListarClienteDto[]>{
        const listofAdmin=await this.adminRepo.find()
        const mapedAdmin:ListarClienteDto[]=listofAdmin.map(admin=>({
            nombre:admin.nombre,
            email:admin.correo,
            dni:admin.dni
        }))
        return mapedAdmin
    }

    async create (data:{nombre:string,correo:string,dni:string}){
        const hashedPassword = await bcrypt.hash(data.dni, 10); // Encriptar el dni

        const user=this.usuarioRepo.create({
            username:data.correo,
            password:hashedPassword,
            role:UserRole.ADMIN,
            estado:true,
        })
        const savedUser=await this.usuarioRepo.save(user);

        const admin=this.adminRepo.create({
            nombre:data.nombre,
            correo:data.correo,
            dni:data.dni,
            usuario:savedUser
        });

    return this.adminRepo.save(admin)
    }

    

}
