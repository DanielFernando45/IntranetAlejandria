import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { Usuario } from '../usuario/usuario.entity';
import { TipoContrato } from 'src/entidades/tipoContrato.entity';
import { GradoAcademico } from 'src/entidades/gradoAcademico.entity';
import { TipoTrabajo } from 'src/entidades/tipoTrabajo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cliente,Usuario,TipoContrato,GradoAcademico,TipoTrabajo])],
  controllers: [ClienteController],
  providers: [ClienteService]
})
export class ClienteModule {}
