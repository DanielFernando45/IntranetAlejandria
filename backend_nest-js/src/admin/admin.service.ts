import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Admin} from './admin.entity'
import {Usuario,UserRole} from '../usuario/usuario.entity'
import * as bcrypt from "bcrypt"
import { ListarClienteDto } from './dto/listar-admin.dto';
import { CrearlienteDto } from './dto/crear-admin.dto';
import { UpdateClienteDto } from './dto/update-admin.dto';

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
        if (listofAdmin.length === 0) {
            throw new NotFoundException("No hay administradores registrados");
        }
        return mapedAdmin
    }

    async listOneAdmin(id:number):Promise<ListarClienteDto>{

        const oneAdmin=await this.adminRepo.findOne({where:{id}})
        if(oneAdmin===null){
            throw new NotFoundException("No se encontró un administrador con el ID proporcionado");
        }
        return oneAdmin
        
    }

    async create (data:CrearlienteDto){
        const hashedPassword = await bcrypt.hash(data.dni, 10); // Encriptar el dni
        const exists = await this.usuarioRepo.findOneBy({ username: data.email });
        if (exists) {
            throw new ConflictException("Ya existe un usuario con ese correo electrónico");
        }
        const user=this.usuarioRepo.create({
            username:data.email,
            password:hashedPassword,
            role:UserRole.ADMIN,
            estado:true,
        })
        try{
        const savedUser=await this.usuarioRepo.save(user);

        const admin=this.adminRepo.create({
            ...data,
            usuario:savedUser
        });
        return this.adminRepo.save(admin)
        }catch(err){
            throw new InternalServerErrorException("Error al crear el administrador")
        }
    }

    async patchAdmin(data:UpdateClienteDto,id:number){
        if (!Object.keys(data).length) {
            throw new BadRequestException("No se proporcionaron campos para actualizar");
        }
        const updateAdmin=await this.adminRepo.update(
        {id: id},
        data)

        if(updateAdmin.affected===0) throw new NotFoundException("No se afecto ninguna columna")
        return data
    
    }

    async deleteAdmin(id:number){
        const deleted=await this.adminRepo.delete({id})
        if(deleted.affected===0) throw new NotFoundException("No se encontro un Admin con ese id")
        return { message:"Admin eliminado correctamente",affected:deleted.affected}
    }
}
