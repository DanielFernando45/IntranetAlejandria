import { BadRequestException, ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './cliente.entity';
import { Repository, DataSource } from 'typeorm';
import { UserRole } from 'src/usuario/usuario.entity';
import { CreateClienteDto } from './dto/crear-cliente.dto';
import { ListarClienteDto } from './dto/listar-cliente.dto';
import { updateClienteDto } from './dto/update-cliente.dto';
import { GradoAcademico } from 'src/common/entidades/gradoAcademico.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import { ListarClientesDto } from './dto/listar-clientes.dto';
import { AsesoramientoService } from 'src/asesoramiento/asesoramiento.service';
import { validate } from 'class-validator';
import { CreateUserDto } from 'src/usuario/dto/create-user.dto';
import { ClientesSinAsignar } from './dto/clientes-sin-asignar.dto';
import { updatedByClient } from './dto/updated-by-client.dto';
import { ProcesosAsesoria } from 'src/procesos_asesoria/entities/procesos_asesoria.entity';

@Injectable()
export class ClienteService {
    constructor(
       
        private readonly usuarioService:UsuarioService,

        @Inject(forwardRef(() => AsesoramientoService))
        private readonly asesoramientoService:AsesoramientoService,

        @InjectRepository(Cliente)
        private clienteRepo: Repository<Cliente>,

        @InjectRepository(GradoAcademico)
        private gradoAcademicoRepo: Repository<GradoAcademico>,
        
        @InjectDataSource()
        private readonly dataSource:DataSource
    ){}

    async listClients (): Promise<ListarClientesDto[]>{
        const listofCliente=await this.clienteRepo.find({
            select:['id','dni','nombre','apellido','fecha_creacion','carrera']})
        
        if(!listofCliente||listofCliente.length===0) throw new NotFoundException("No se encontro ningun cliente")

        const mapedCliente = await Promise.all(
            listofCliente.map(async (cliente) => {
            const id_cliente = cliente.id;
            console.log(id_cliente)
            const datos_asesoramiento = await this.asesoramientoService.findDatesByCliente(id_cliente);
            return {
            ...cliente,
            datos_asesoramiento:datos_asesoramiento
            };
        }));
        
        const validatedClients = await Promise.all(
            mapedCliente.map(async (client) => {
              const errors = await validate(client);
              if (errors.length > 0) {
                throw new Error('El cliente no es válido');
              }
              return client;
            })
          );

        return validatedClients
    }

    
    
    async listOneClient(id:number):Promise<ListarClienteDto>{
        const oneCliente=await this.clienteRepo.findOne({where:{id},relations: ['gradoAcademico'],select:['id','nombre','apellido','telefono','dni','carrera','gradoAcademico','universidad','pais','email','url_imagen']})
        if(!oneCliente) throw new NotFoundException(`No hay un cliente con ese ${id}`)
            const clienteDto: ListarClienteDto = {
                ...oneCliente,
                gradoAcademico:{id:oneCliente.gradoAcademico?.id,nombre:oneCliente.gradoAcademico?.nombre } ,
            };
            return clienteDto
    }

    async crearCliente(data: CreateClienteDto){

        let savedUser:CreateUserDto
        try{
        const exist=await this.clienteRepo.findOneBy({email:data.email})
        if(exist) throw new ConflictException("Ya existe ese cliente")
        
        const dataUser={
            username:data.email,
            password:data.dni,
            role:UserRole.ESTUDIANTE,
            estado:true
        }
        savedUser=await this.usuarioService.createUserDefault(dataUser)
        }catch(err){
            throw new Error(err.message)
        }
        try{

        const gradoAcademicoSearch = await this.gradoAcademicoRepo.findOneBy({ id: data.gradoAcademico });

        if (!gradoAcademicoSearch) throw new NotFoundException("Algunas entidades relacionadas no existen");

        const cliente=this.clienteRepo.create({
            dni:data.dni,
            nombre:data.nombre,
            apellido:data.apellido,
            telefono:data.telefono,
            email:data.email,
            url_imagen:data.url_imagen || '',
            pais:data.pais,
            gradoAcademico:gradoAcademicoSearch,
            universidad:data.universidad,
            carrera:data.carrera,
            usuario:savedUser
        })

        return await this.clienteRepo.save(cliente);
        }catch(err){
        throw new InternalServerErrorException(err.message)
        }   
    }

    async clientesSinAsignar(): Promise<ClientesSinAsignar[]> {
        const clientesSinProcesos = await this.dataSource
          .getRepository(Cliente)
          .createQueryBuilder("c")
          .leftJoin("c.procesosAsesoria", "p")
          .leftJoinAndSelect("c.gradoAcademico", "grado")
          .where("p.id IS NULL")
          .getMany();
      
        const clientesFormateados: ClientesSinAsignar[] = clientesSinProcesos.map(cliente => ({
          id: cliente.id,
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          gradoAcademico: cliente.gradoAcademico?.nombre ?? null,
          fecha_creacion: cliente.fecha_creacion,
          carrera: cliente.carrera
        }));
      
        return clientesFormateados;
      }
    
    async listarClientesAsignar():Promise<ClientesSinAsignar[]>{
        const clientesSinProcesos = await this.dataSource
          .getRepository(Cliente)
          .createQueryBuilder("c")
          .leftJoin("c.procesosAsesoria", "p")
          .leftJoinAndSelect("c.gradoAcademico", "grado")
          .getMany();
      
        const clientesFormateados: ClientesSinAsignar[] = clientesSinProcesos.map(cliente => ({
          id: cliente.id,
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          gradoAcademico: cliente.gradoAcademico?.nombre ?? null,
          fecha_creacion: cliente.fecha_creacion,
          carrera: cliente.carrera
        }));
      
        return clientesFormateados;
    }

    async patchByClient(id:number,data:updatedByClient){
        if(!Object.keys(data).length)throw new BadRequestException("No se envio un body para actualizar")
        
        const partialEntity:any={...data}

        const updated=await this.clienteRepo.update(id,partialEntity)
        if(updated.affected===0) throw new NotFoundException("No hay registro a afectar")

        return updated
        
    }

    async patchCliente(id:number,data:updateClienteDto){
        if(!Object.keys(data).length)throw new BadRequestException("No se envio un body para actualizar")
        
        const partialEntity: any = { ...data };

        if (data.gradoAcademico) {
            partialEntity.gradoAcademico = { id: data.gradoAcademico };
        }
    
        const updated=await this.clienteRepo.update(id,partialEntity)
        if(updated.affected===0) throw new NotFoundException("No hay registro a afectar")
        
        return updated
    }

    async deletedCliente(id:number){
        const queryRunner=this.dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try {
            const usuario=await queryRunner.manager.findOne(Cliente,{where:{id},relations:["usuario"]})
            if (!usuario || !usuario.usuario) throw new NotFoundException("No se encontró el cliente o el usuario asociado");
            const id_usuario=usuario?.usuario?.id
            if(id_usuario===undefined) throw new NotFoundException("No se encontro el id de usuario")
            const deleted=await queryRunner.manager.delete(Cliente,{id})
            if(deleted.affected===0) throw new Error("No se encontró el cliente para eliminar")
            await this.usuarioService.deleteUserWithCliente(id_usuario,queryRunner.manager)
            await queryRunner.commitTransaction()
            return {message:"Cliente eliminado correctamente",eliminados:deleted.affected}
        } catch (error) {
            await queryRunner.rollbackTransaction()
            throw new InternalServerErrorException("Transacción fallida: " + error.message);
        } finally{
            await queryRunner.release()
        }
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
        }catch(err){
            throw new BadRequestException(`Esta mal la peticion se presenta el siguiente error :${err.message}`)
    }

    async getAsesorias(id:number){
        const listAsesorias=await this.asesoramientoService.asesoramientosByClient(id)

        return listAsesorias
    }
    async getContratos(id:number){
        const contrato=await this.asesoramientoService.contratoDelAsesoramiento(id)

        return contrato
    }

    async getDelegado(id_asesoramiento:number){
        const queryRunner=this.dataSource.createQueryRunner()
        await queryRunner.connect()
        await queryRunner.startTransaction()

        try{
        
            const listAsesoramientoId=await queryRunner.manager.findOne(ProcesosAsesoria,{where:{asesoramiento:{id:id_asesoramiento}},relations:['cliente']})
            if (!listAsesoramientoId) throw new NotFoundException(`No se encontraron asesoramientos con el ID ${id_asesoramiento}`);

            const nombreDelegado=`${listAsesoramientoId.cliente.nombre} ${listAsesoramientoId.cliente.apellido}`
            await queryRunner.commitTransaction()
            return nombreDelegado
            
        }catch(err){
            await queryRunner.rollbackTransaction()
            new InternalServerErrorException(`Error en conseguir los datos ${err.message}`)
        }finally{
            await queryRunner.release()
        }
    }

    

}
