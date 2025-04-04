import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { Repository } from 'typeorm';
import { Usuario,UserRole } from 'src/usuario/usuario.entity';
import { CreateClienteDto } from './dto/crear-cliente.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private clienteRepo: Repository<Cliente>,

        @InjectRepository(Usuario)
        private usuarioRepo: Repository<Usuario>
    ){}

    async crearCliente(data: CreateClienteDto){
        const hashedPassword = await bcrypt.hash(data.dni, 10); // Encriptar el dni
        
        const usuario=this.usuarioRepo.create({
            username:data.email,
            password:hashedPassword,
            role:UserRole.CLIENTE,
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
            id_contrato:data.id_contrato
        })

        return this.clienteRepo.save(cliente);
    }
}
