import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asesor } from './asesor.entity';
import { Repository } from 'typeorm';
import { Usuario ,UserRole} from '../usuario/usuario.entity';
import { createAsesorDto } from './dto/crear-asesor.dto';
import * as bcrypt from "bcrypt"
import { listarAsesorDto } from './dto/listar-asesor.dto';
import { UpdateAsesorDto } from './dto/update-asesor.dto';

@Injectable()
export class AsesorService {
    constructor(
        @InjectRepository(Asesor)
        private asesorRepo: Repository<Asesor>,

        @InjectRepository(Usuario)
        private usuarioRepo: Repository<Usuario>,
    ){}

    async listAdmin (): Promise<listarAsesorDto[]>{
        const listofAsesor=await this.asesorRepo.find()
        const mapedAsesor:listarAsesorDto[]=listofAsesor.map(asesor=>({
            dni:asesor.dni,
            nombre:asesor.nombre,
            apellido:asesor.apellido,
            email:asesor.email,
            telefono:asesor.telefono,
            url_imagen:asesor.url_imagen,
            area:asesor.area,
            especialidad:asesor.especialidad,
            id_grado_academico:asesor.id_grado_academico,
            universidad:asesor.universidad
            }))
        return mapedAsesor
    }
    
    async listOneAdmin(id:number):Promise<listarAsesorDto>{
        const oneAsesor=await this.asesorRepo.findOne({where:{id}})
        if(oneAsesor===null){
            throw new Error("No hay un asesor con ese ID")
        }
        return oneAsesor           
    }

    async crearAsesor(data: createAsesorDto){
        const exits=await this.asesorRepo.findOneBy({email:data.email})
        if(exits){
            throw new ConflictException("Ya existe un asesor registrado con ese corrreo")
        }
        const hashedPassword=await bcrypt.hash(data.dni, 10);
        const usuario=this.usuarioRepo.create({
            username:data.email,
            password:hashedPassword,
            role:UserRole.ASESOR,
            estado:true
        })
        try{
        const savedUsuario=await this.usuarioRepo.save(usuario)

        const asesor=this.asesorRepo.create({
            dni:data.dni,
            nombre:data.nombre,
            apellido:data.apellido,
            email:data.email,
            telefono:data.telefono,
            url_imagen:data.url_imagen,
            area:data.area,
            especialidad:data.especialidad,
            id_grado_academico:data.id_grado_academico,
            universidad:data.universidad,
            usuario:savedUsuario
        })
        return this.asesorRepo.save(asesor)
        }catch(err){
            throw new Error(err.message)
        }
    }

    async patchAsesor(id:number,data:UpdateAsesorDto){
        if(!Object.keys(data).length){
            throw new BadRequestException("No hay contenido a actualizar")
        }
        const updatedAsesor=await this.asesorRepo.update(
        {id},
        data)
        if(updatedAsesor.affected===0) throw new NotFoundException("No se encuentra ese ID")
        return updatedAsesor
    }

    async deleteAsesor(id:number){
        const deleted=await this.asesorRepo.delete({id})
        if(deleted.affected===0) throw new NotFoundException("No se encuentra ese ID")
        return {message:"Asesor eliminado correctamente",cantidad:deleted.affected
    }
    }
}
