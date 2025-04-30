import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAsesoramientoDto } from './dto/create-asesoramiento.dto';
import { UpdateAsesoramientoDto } from './dto/update-asesoramiento.dto';
import { ProcesosAsesoriaService } from 'src/procesos_asesoria/procesos_asesoria.service';
import { Asesoramiento, Estado_Asesoria } from './entities/asesoramiento.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, QueryRunner } from 'typeorm';
import { clientesExtraDTO } from 'src/procesos_asesoria/dto/clientes_extra.dto';
import { FechasDto } from 'src/cliente/dto/listar-clientes.dto';


@Injectable()
export class AsesoramientoService {
  constructor(
    private readonly procesosAsesoriaService:ProcesosAsesoriaService,

    @InjectRepository(Asesoramiento)
    private asesoramientoRepo:Repository<Asesoramiento>,

    @InjectDataSource()
    private readonly dataSource:DataSource
  ){}

  async findAll(){
    return "Todos"
  }

  async create(createAsesoramientoDto: CreateAsesoramientoDto,clientes:clientesExtraDTO) {
    const {id_asesor,fecha_inicio,fecha_fin}=createAsesoramientoDto
    if (!fecha_inicio || !fecha_fin || isNaN(fecha_inicio.getTime()) || isNaN(fecha_fin.getTime())) {
      throw new BadRequestException('Fechas inválidas');
    }
    
    if (fecha_fin < fecha_inicio) {
      throw new BadRequestException('La fecha de fin no puede ser anterior a la fecha de inicio');
    }

    if (!id_asesor || typeof id_asesor !== 'number') {
      throw new BadRequestException('ID de asesor inválido');
    }
    const clienteIds = Object.values(clientes).filter(id => typeof id === 'number' && id > 0);

    if (clienteIds.length === 0) {
      throw new BadRequestException('Debe proporcionar al menos un cliente válido');
    }

    const queryRunner=this.dataSource.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try{
    const newAsesoramiento=queryRunner.manager.create(Asesoramiento,{fecha_inicio,fecha_fin,estado:Estado_Asesoria.ACTIVO})
    const addedAsesoramiento=await queryRunner.manager.save(newAsesoramiento)
    const id_asesoramiento=addedAsesoramiento.id

    const creacion=await this.procesosAsesoriaService.addProceso_to_Asesoramiento(clientes,id_asesor,id_asesoramiento,queryRunner.manager)
    // console.log(id_asesoramiento)
    // console.log(creacion)
    
    await queryRunner.commitTransaction()
    return "Agregado satisfactoriamente"
    }catch(err){
      await queryRunner.rollbackTransaction()
      console.error("Error al agregar se revertira la transaccion",err.message)
      throw new InternalServerErrorException("Transacción fallida: " + err.message);
    }finally{
      await queryRunner.release()
    }
  }

  async findDatesByCliente(id:number):Promise<FechasDto>{

  const fechas = await this.asesoramientoRepo
      .createQueryBuilder('a')  // Alias para la tabla asesoramiento
      .innerJoin('a.procesosasesoria', 'p')  // Relación con la tabla procesos_asesoria
      .innerJoin('p.cliente', 'c')  // Relación con la tabla cliente
      .select(['a.fecha_inicio', 'a.fecha_fin'])  // Selecciona las columnas que deseas
      .where('c.id = :id', { id })  // Filtra por el id del cliente
      .getOne();
  
  console.log(fechas)
  if(fechas===null) return { "fecha_inicio":"Por asignar", "fecha_fin":"Por asignar" }
  if (!fechas.fecha_inicio || !fechas.fecha_fin) throw new Error('Las fechas no están asignadas correctamente');
  
    const solo_fechas={
     fecha_inicio:fechas.fecha_inicio,
     fecha_fin:fechas.fecha_fin
   }
   console.log(solo_fechas)
  return solo_fechas
  }

  async changeAsesor(id:number){

    return `Se cambio el asesor correctamente por el de ID ${id}`
  }

  async desactivate(id:number){
    const desactAsesoria=await this.asesoramientoRepo.update(
      id,
      {estado:Estado_Asesoria.DESACTIVADO}
    )
    if(desactAsesoria.affected===0) throw new BadRequestException("No se desactivo ningun usuario con el ID dado")


    return `Se desactico el asesoramiento con id: ${id}`
  }

  update(id: number, updateAsesoramientoDto: UpdateAsesoramientoDto) {
    //return `This action updates a #${id} asesoramiento`;
  }

  remove(id: number) {
    //return `This action removes a #${id} asesoramiento`;
  }
}
