import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAsesoramientoDto } from './dto/create-asesoramiento.dto';
import { UpdateAsesoramientoDto } from './dto/update-asesoramiento.dto';
import { ProcesosAsesoriaService } from 'src/procesos_asesoria/procesos_asesoria.service';
import { Asesoramiento, Estado_Asesoria } from './entities/asesoramiento.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, QueryRunner } from 'typeorm';
import { clientesExtraDTO } from 'src/procesos_asesoria/dto/clientes_extra.dto';


@Injectable()
export class AsesoramientoService {
  constructor(
    private readonly procesosAsesoriaService:ProcesosAsesoriaService,

    @InjectRepository(Asesoramiento)
    private asesoramientoRepo:Repository<Asesoramiento>,

    @InjectDataSource()
    private readonly dataSource:DataSource
  ){}

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

  findAll() {
    //return `This action returns all asesoramiento`;
  }

  findOne(id: number) {
    //return `This action returns a #${id} asesoramiento`;
  }

  update(id: number, updateAsesoramientoDto: UpdateAsesoramientoDto) {
    //return `This action updates a #${id} asesoramiento`;
  }

  remove(id: number) {
    //return `This action removes a #${id} asesoramiento`;
  }
}
