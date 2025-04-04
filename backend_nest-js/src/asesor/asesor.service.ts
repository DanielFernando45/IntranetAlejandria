import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asesor} from './asesor.entity';
import { Repository } from 'typeorm';
import { Usuario ,UserRole} from '../usuario/usuario.entity';
import { createAsesorDto } from './dto/crear-asesor.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class AsesorService {
    constructor(
        @InjectRepository(Asesor)
        private asesorRepo: Repository<Asesor>,

        @InjectRepository(Usuario)
        private usuarioRepo: Repository<Usuario>,
    ){}

    async crearAsesor(data: createAsesorDto){
        const hashedPassword=await bcrypt.hash(data.dni, 10);
        
        const usuario=this.usuarioRepo.create({
            username:data.dni,
            password:hashedPassword,
            role:UserRole.ASESOR,
            estado:true
        })

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
            universidad:data.universidad
        })
        return this.asesorRepo.save(asesor)
    }
}
