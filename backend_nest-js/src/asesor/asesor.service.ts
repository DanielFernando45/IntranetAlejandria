import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asesor } from './asesor.entity';
import { Repository } from 'typeorm';
import { Usuario ,UserRole} from '../usuario/usuario.entity';
import { createAsesorDto } from './dto/crear-asesor.dto';
import * as bcrypt from "bcrypt"
import { listarAsesorDto } from './dto/listar-asesor.dto';
import { UpdateAsesorDto } from './dto/update-asesor.dto';
import { AreaAsesor } from 'src/entidades/areaAsesor.entity';
import { GradoAcademico } from 'src/entidades/gradoAcademico.entity';
import { ListarClienteDto } from 'src/admin/dto/listar-admin.dto';

@Injectable()
export class AsesorService {
    constructor(
        @InjectRepository(Asesor)
        private asesorRepo: Repository<Asesor>,

        @InjectRepository(Usuario)
        private usuarioRepo: Repository<Usuario>,
        
        @InjectRepository(AreaAsesor)
        private areaRepo: Repository<AreaAsesor>,
        
        @InjectRepository(GradoAcademico)
        private gradoAcademicoRepo: Repository<GradoAcademico>,
        
    ){}

    async listAdmin (): Promise<listarAsesorDto[]>{
        const listofAsesor=await this.asesorRepo.find({relations:["gradoAcademico","areaAsesor"]})
        if(!listofAsesor) throw new NotFoundException("No se encontro ningun cliente")

        const mapedAsesor:listarAsesorDto[]=listofAsesor.map(asesor=>({
            dni:asesor.dni,
            nombre:asesor.nombre,
            apellido:asesor.apellido,
            email:asesor.email,
            telefono:asesor.telefono,
            url_imagen:asesor.url_imagen,
            areaAsesor:asesor.areaAsesor?.nombre,
            especialidad:asesor.especialidad,
            gradoAcademico:asesor.gradoAcademico?.nombre,
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
        
        const areaAsesorSearch = await this.areaRepo.findOneBy({ id: data.areaAsesor });
        const gradoAcademicoSearch = await this.gradoAcademicoRepo.findOneBy({ id: data.gradoAcademico})
        
        if (!areaAsesorSearch || !gradoAcademicoSearch) {
            throw new NotFoundException("Algunas entidades relacionadas no existen");
        }

        const asesor=this.asesorRepo.create({
            dni:data.dni,
            nombre:data.nombre,
            apellido:data.apellido,
            email:data.email,
            telefono:data.telefono,
            url_imagen:data.url_imagen,
            areaAsesor:areaAsesorSearch,
            especialidad:data.especialidad,
            gradoAcademico:gradoAcademicoSearch,
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
}
