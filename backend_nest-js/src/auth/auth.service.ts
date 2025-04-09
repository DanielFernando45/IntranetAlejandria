// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AuthService {}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from '../usuario/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admin/admin.entity';
import * as bcrypt from 'bcrypt';
import { Asesor } from 'src/asesor/asesor.entity';
import { Cliente } from 'src/cliente/cliente.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
    @InjectRepository(Asesor)
    private asesorRepo: Repository<Asesor>,
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,

    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usuarioRepo.findOneBy({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(user: Usuario) {
    let datos:{id:number,nombre:string}={id:0,nombre:""};
    const payload = { sub: user.id, username: user.username, role: user.role };

    if(user.role==="admin"){
    const getInfoAdmin=await this.adminRepo.findOne({
      where:{usuario: {id:user.id}},
      relations: ['usuario'],
      select:['id','nombre']
    })
      if(getInfoAdmin===null){
        throw new Error("No hay un admin con ese ID")
      }
    datos=getInfoAdmin
    }


    if(user.role==="asesor"){
      const getInfoAsesor=await this.asesorRepo.findOne({
        where:{usuario: {id:user.id}},
        relations: ['usuario'],
        select:['id','nombre']
      })
        if(getInfoAsesor===null){
          throw new Error("No hay un Asesor con ese ID")
        }
      datos=getInfoAsesor
    }
    if(user.role==="estudiante"){
      const getInfoCliente=await this.clienteRepo.findOne({
        where:{usuario: {id:user.id}},
        relations: ['usuario'],
        select:['id','nombre']
      })
        if(getInfoCliente===null){
          throw new Error("No hay un Asesor con ese ID")
        }
      datos=getInfoCliente
    }

    
  
    return {
      access_token: this.jwtService.sign(payload),
      id_usuario:user.id,
      datos_usuario:{
        id:datos.id,
        nombre:datos.nombre,
        role:user.role
      }
    };
  }
}
