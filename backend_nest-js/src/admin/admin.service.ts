import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Admin} from './admin.entity'
import {Usuario,UserRole} from '../usuario/usuario.entity'
import * as bcrypt from "bcrypt"
import { ListarClienteDto } from './dto/listar-cliente.dto';
import { CrearlienteDto } from './dto/crear-cliente.dto';

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
            email:admin.email,
            dni:admin.dni
        }))
        return mapedAdmin
    }

    async listOneAdmin(id:number):Promise<ListarClienteDto>{

        const oneAdmin=await this.adminRepo.findOne({where:{id}})
        if(oneAdmin===null){
            throw new Error("No hay un administrador con ese ID")
        }
        return oneAdmin
        
    }

    async create (data:CrearlienteDto){
        const hashedPassword = await bcrypt.hash(data.dni, 10); // Encriptar el dni

        const user=this.usuarioRepo.create({
            username:data.email,
            password:hashedPassword,
            role:UserRole.ADMIN,
            estado:true,
        })
        const savedUser=await this.usuarioRepo.save(user);

        const admin=this.adminRepo.create({
            nombre:data.nombre,
            email:data.email,
            dni:data.dni,
            usuario:savedUser
        });

    return this.adminRepo.save(admin)
    }

    

}
