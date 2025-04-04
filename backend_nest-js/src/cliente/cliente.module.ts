import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { Usuario } from '../usuario/usuario.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Cliente,Usuario])],
  controllers: [ClienteController],
  providers: [ClienteService]
})
export class ClienteModule {}
