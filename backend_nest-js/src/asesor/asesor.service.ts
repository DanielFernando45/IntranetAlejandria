import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asesor } from './asesor.entity';
import { Repository } from 'typeorm';
import { Usuario ,UserRole} from '../usuario/usuario.entity';
import { createAsesorDto } from './dto/crear-asesor.dto';
import * as bcrypt from "bcrypt"
import { listarAsesorDto } from './dto/listar-asesor.dto';
import { UpdateAsesorDto } from './dto/update-asesor.dto';
import { AreaAsesor } from 'src/common/entidades/areaAsesor.entity';
import { GradoAcademico } from 'src/common/entidades/gradoAcademico.entity';
import { ListarClienteDto } from 'src/admin/dto/listar-admin.dto';
import { CreateUserDto } from 'src/usuario/dto/create-user.dto';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AsesorService {
    constructor(
        private readonly usuarioService:UsuarioService,

        @InjectRepository(Asesor)
        private asesorRepo: Repository<Asesor>,
        
        @InjectRepository(AreaAsesor)
        private areaRepo: Repository<AreaAsesor>,
        
        @InjectRepository(GradoAcademico)
        private gradoAcademicoRepo: Repository<GradoAcademico>,
        
    ){}
    
    async listAsesor (): Promise<listarAsesorDto[]>{
        const listofAsesor=await this.asesorRepo.find({relations:["gradoAcademico","areaAsesor"]})
        if(!listofAsesor) throw new NotFoundException("No se encontro ningun cliente")
        
        console.log(listofAsesor)

        const mapedAsesor:listarAsesorDto[]=listofAsesor.map(asesor=>({
            id:asesor.id,
            dni:asesor.dni,
            nombre:asesor.nombre,
            apellido:asesor.apellido,
            email:asesor.email,
            telefono:asesor.telefono,
            url_imagen:asesor.url_imagen,
            areaAsesor:asesor.areaAsesor?.nombre,
            gradoAcademico:asesor.gradoAcademico?.nombre,
            especialidad:asesor.especialidad,
            universidad:asesor.universidad
            }))
        return mapedAsesor
    }
    
    async listOneAdmin(id:number):Promise<listarAsesorDto>{
        const oneAsesor=await this.asesorRepo.findOne({where:{id},relations:['areaAsesor', 'gradoAcademico']})
        if(oneAsesor===null) throw new Error("No hay un asesor con ese ID")
        const asesorDto:listarAsesorDto={
            ...oneAsesor,
            areaAsesor:oneAsesor.areaAsesor.nombre,
            gradoAcademico:oneAsesor.gradoAcademico.nombre,

        }
        return asesorDto          
    }

    async crearAsesor(data: createAsesorDto){
        let savedUser:CreateUserDto
        
        const exist=await this.asesorRepo.findOneBy({email:data.email})
        if(exist) throw new ConflictException("Ya existe ese asesor")      
        const dataUser={
            username:data.email,
            password:data.dni,
            role:UserRole.ASESOR,
            estado:true
        }
        savedUser=await this.usuarioService.createUserDefault(dataUser)
        
        try{
        
        const areaAsesorSearch = await this.areaRepo.findOneBy({ id: data.areaAsesor });
        const gradoAcademicoSearch = await this.gradoAcademicoRepo.findOneBy({ id: data.gradoAcademico})
        
        if (!areaAsesorSearch || !gradoAcademicoSearch) throw new NotFoundException("Algunas entidades relacionadas no existen");
        
        const asesor=this.asesorRepo.create({
            ...data,
            areaAsesor:areaAsesorSearch,
            gradoAcademico:gradoAcademicoSearch,
            usuario:savedUser
        })
        return await this.asesorRepo.save(asesor)
        }catch(err){
            throw new Error(err.message)
        }
    }

    async patchAsesor(id:number,data:UpdateAsesorDto){
        if(!Object.keys(data).length){
            throw new BadRequestException("No hay contenido a actualizar")
        }
        const partialEntity: any = { ...data };
        if (data.areaAsesor) {
            partialEntity.areaAsesor = { id: data.areaAsesor };
        }
        if (data.gradoAcademico) {
            partialEntity.gradoAcademico = { id: data.gradoAcademico };
        }
        const updatedAsesor=await this.asesorRepo.update(
        {id},
        partialEntity)
    
        if(updatedAsesor.affected===0) throw new NotFoundException("No se encuentra ese ID")
        return updatedAsesor
    }

    async deleteAsesor(id:number){
        const deleted=await this.asesorRepo.delete({id})
        if(deleted.affected===0) throw new NotFoundException("No se encuentra ese ID")
        return {message:"Asesor eliminado correctamente",cantidad:deleted.affected
    }
    }

    async desactivateAsesor(id:number){
        const cliente=await this.asesorRepo.findOne({
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
