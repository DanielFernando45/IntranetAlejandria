import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { Repository } from 'typeorm';
import { Usuario,UserRole } from 'src/usuario/usuario.entity';
import { CreateClienteDto } from './dto/crear-cliente.dto';
import * as bcrypt from 'bcrypt'
import { listarClienteDto } from './dto/listar-cliente.dto';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private clienteRepo: Repository<Cliente>,

        @InjectRepository(Usuario)
        private usuarioRepo: Repository<Usuario>
    ){}

    async listAdmin (): Promise<listarClienteDto[]>{
        const listofCliente=await this.clienteRepo.find()
        if(!listofCliente) throw new NotFoundException("No se encontro ningun cliente")
        const mapedCliente:listarClienteDto[]=listofCliente.map(cliente=>({
            dni:cliente.dni,
            nombre:cliente.nombre,
            apellido:cliente.apellido,
            telefono:cliente.telefono,
            email:cliente.email,
            url_imagen:cliente.url_imagen,
            tipo_trabajo:cliente.tipo_trabajo,
            pais:cliente.pais,
            id_grado_academico:cliente.id_grado_academico,
            universidad:cliente.universidad,
            id_contrato:cliente.id_contrato,
            }))
        
        return mapedCliente
    }
    
    async listOneAdmin(id:number):Promise<listarClienteDto>{
        const oneCliente=await this.clienteRepo.findOne({where:{id}})
        if(!oneCliente) throw new NotFoundException(`No hay un cliente con ese ${id}`)
        return oneCliente           
    }

    async crearCliente(data: CreateClienteDto){
        const hashedPassword = await bcrypt.hash(data.dni, 10); // Encriptar el dni
        
        const usuario=this.usuarioRepo.create({
            username:data.email,
            password:hashedPassword,
            role:UserRole.ESTUDIANTE,
            estado:true 
        })

        const savedUsuario = await this.usuarioRepo.save(usuario);

        const cliente=this.clienteRepo.create({
            dni:data.dni,
            nombre:data.nombre,
            apellido:data.apellido,
            telefono:data.telefono,
            email:data.email,
            url_imagen:data.url_imagen,
            tipo_trabajo:data.tipo_trabajo,
            pais:data.pais,
            id_grado_academico:data.id_grado_academico,
            universidad:data.universidad,
            id_contrato:data.id_contrato,
            usuario:savedUsuario
        })

        return this.clienteRepo.save(cliente);
    }
}
