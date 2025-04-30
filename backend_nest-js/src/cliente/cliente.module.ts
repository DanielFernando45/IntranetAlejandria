import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { Usuario } from '../usuario/usuario.entity';
import { TipoContrato } from 'src/common/entidades/tipoContrato.entity';
import { GradoAcademico } from 'src/common/entidades/gradoAcademico.entity';
import { TipoTrabajo } from 'src/common/entidades/tipoTrabajo.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AsesoramientoModule } from 'src/asesoramiento/asesoramiento.module';

@Module({
  imports:[TypeOrmModule.forFeature([Cliente,Usuario,TipoContrato,GradoAcademico,TipoTrabajo]),UsuarioModule,AsesoramientoModule],
  controllers: [ClienteController],
  providers: [ClienteService]
})
export class ClienteModule {}
