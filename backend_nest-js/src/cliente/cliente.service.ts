import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { Repository } from 'typeorm';
import { Usuario,UserRole } from 'src/usuario/usuario.entity';
import { CreateClienteDto } from './dto/crear-cliente.dto';
import * as bcrypt from 'bcrypt'
import { ListarClienteDto } from './dto/listar-cliente.dto';
import { updateClienteDto } from './dto/update-cliente.dto';
import { TipoContrato } from 'src/entidades/tipoContrato.entity';
import { GradoAcademico } from 'src/entidades/gradoAcademico.entity';
import { TipoTrabajo } from 'src/entidades/tipoTrabajo.entity';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class ClienteService {
    constructor(
        private readonly usuarioService:UsuarioService,

        @InjectRepository(Cliente)
        private clienteRepo: Repository<Cliente>,

        @InjectRepository(Usuario)
        private usuarioRepo: Repository<Usuario>,

        @InjectRepository(TipoContrato)
        private tipoContratoRepo: Repository<TipoContrato>,

        @InjectRepository(GradoAcademico)
        private gradoAcademicoRepo: Repository<GradoAcademico>,

        @InjectRepository(TipoTrabajo)
        private tipoTrabajoRepo: Repository<TipoTrabajo>
    ){}

    async listAdmin (): Promise<ListarClienteDto[]>{
        const listofCliente=await this.clienteRepo.find({relations:["tipoTrabajo","gradoAcademico","tipoTrabajo"]})
        if(!listofCliente) throw new NotFoundException("No se encontro ningun cliente")

        const mapedCliente:ListarClienteDto[]=listofCliente.map(cliente=>({
            dni:cliente.dni,
            nombre:cliente.nombre,
            apellido:cliente.apellido,
            telefono:cliente.telefono,
            email:cliente.email,
            url_imagen:cliente.url_imagen,
            tipoTrabajo:cliente.tipoTrabajo?.nombre,
            pais:cliente.pais,
            gradoAcademico:cliente.gradoAcademico?.nombre,
            universidad:cliente.universidad,
            tipoContrato:cliente.tipoContrato?.nombre,
            }))
        
        return mapedCliente
    }
    
    async listOneAdmin(id:number):Promise<ListarClienteDto>{
        const oneCliente=await this.clienteRepo.findOne({where:{id},relations: ['tipoTrabajo', 'gradoAcademico', 'tipoContrato']})
        if(!oneCliente) throw new NotFoundException(`No hay un cliente con ese ${id}`)
            const clienteDto: ListarClienteDto = {
                ...oneCliente,
                tipoTrabajo: oneCliente.tipoTrabajo?.nombre || '', 
                gradoAcademico: oneCliente.gradoAcademico?.nombre || '',
                tipoContrato: oneCliente.tipoContrato?.nombre || '',
            };
            return clienteDto
    }

    async crearCliente(data: CreateClienteDto){
        const exist=await this.clienteRepo.findOneBy({email:data.email})
        if(exist) throw new ConflictException("Ya existe ese cliente")
        
        const hashedPassword = await bcrypt.hash(data.dni, 10); // Encriptar el dni

        const usuario=this.usuarioRepo.create({
            username:data.email,
            password:hashedPassword,
            role:UserRole.ESTUDIANTE,
            estado:true 
        })
        try{
        const savedUsuario = await this.usuarioRepo.save(usuario);

        const tipoContratoSearch = await this.tipoContratoRepo.findOneBy({ id: data.tipoContrato });
        const gradoAcademicoSearch = await this.gradoAcademicoRepo.findOneBy({ id: data.gradoAcademico });
        const tipoTrabajoSearch = await this.tipoTrabajoRepo.findOneBy({ id: data.tipoTrabajo });

        if (!tipoContratoSearch || !gradoAcademicoSearch || !tipoTrabajoSearch) {
            throw new NotFoundException("Algunas entidades relacionadas no existen");
        }
        const cliente=this.clienteRepo.create({
            dni:data.dni,
            nombre:data.nombre,
            apellido:data.apellido,
            telefono:data.telefono,
            email:data.email,
            url_imagen:data.url_imagen,
            tipoTrabajo:tipoTrabajoSearch,
            pais:data.pais,
            gradoAcademico:gradoAcademicoSearch,
            universidad:data.universidad,
            tipoContrato:tipoContratoSearch,
            usuario:savedUsuario
        })

        return this.clienteRepo.save(cliente);
        }catch(err){
        throw new InternalServerErrorException("No se pudo realizar el registro")
        }
    }

    async patchCliente(id:number,data:updateClienteDto){
        if(!Object.keys(data).length){
            throw new BadRequestException("No se envio un body para actualizar")
        }
        const partialEntity: any = { ...data };
        if (data.tipoTrabajo) {
            partialEntity.tipoTrabajo = { id: data.tipoTrabajo };
        }
        if (data.gradoAcademico) {
            partialEntity.gradoAcademico = { id: data.gradoAcademico };
        }
        if (data.tipoContrato) {
            partialEntity.tipoContrato = { id: data.tipoContrato };
        }
        const updated=await this.clienteRepo.update({id},partialEntity)
        if(updated.affected===0) throw new Error("No hay registro a afectar")
        
        return updated
    }

    async deletedCliente(id:number){
        const deleted=await this.clienteRepo.delete({id})
        if(deleted.affected===0) throw new NotFoundException("No se encontro el registro a eliminar")
        return {message:"Cliente eliminado correctamente",eliminados:deleted.affected}
    }

    async desactivateCliente(id:number){
        const cliente=await this.clienteRepo.findOne({
            where:{id},
            relations:['usuario'],
            select:{ usuario: { id: true }}
        })
        if(!cliente) return new NotFoundException("No se encontro el cliente en la bd")
        const id_usuario=cliente?.usuario.id
        if(!id_usuario) throw new NotFoundException("No se encontro el id")

        const response=await this.usuarioService.desactivateUser(id_usuario)
        return {message:"Usuario desactivado correctamente",affectado:response}
    }
}
