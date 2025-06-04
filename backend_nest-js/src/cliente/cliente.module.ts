import { forwardRef, Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { Usuario } from '../usuario/usuario.entity';
import { GradoAcademico } from 'src/common/entidades/gradoAcademico.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AsesoramientoModule } from 'src/asesoramiento/asesoramiento.module';

@Module({
  exports:[ClienteService],
  imports:[TypeOrmModule.forFeature([Cliente,Usuario,GradoAcademico]),UsuarioModule,forwardRef(()=>AsesoramientoModule)],
  controllers: [ClienteController],
  providers: [ClienteService]
})
export class ClienteModule {}
