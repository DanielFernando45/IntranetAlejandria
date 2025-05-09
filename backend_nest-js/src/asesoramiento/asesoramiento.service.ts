import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAsesoramientoDto } from './dto/create-asesoramiento.dto';
import { UpdateAsesoramientoDto } from './dto/update-asesoramiento.dto';
import { ProcesosAsesoriaService } from 'src/procesos_asesoria/procesos_asesoria.service';
import { Asesoramiento, Estado_Asesoria } from './entities/asesoramiento.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, QueryRunner } from 'typeorm';
import { clientesExtraDTO } from 'src/procesos_asesoria/dto/clientes_extra.dto';
import { DatosAsesoramientoDto} from 'src/cliente/dto/listar-clientes.dto';
import { TipoContrato } from 'src/common/entidades/tipoContrato.entity';
import { TipoTrabajo } from 'src/common/entidades/tipoTrabajo.entity';


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
    const {id_asesor,profesion_asesoria,tipo_servicio,fecha_inicio,fecha_fin,id_contrato,id_tipo_trabajo}=createAsesoramientoDto
    
    if (!fecha_inicio || !fecha_fin || isNaN(fecha_inicio.getTime()) || isNaN(fecha_fin.getTime())) {
      throw new BadRequestException('Fechas inválidas');
    }
    if(!id_contrato||!id_contrato) throw new BadRequestException("No se encontro el tipo de trabajo y contrato")
    if (fecha_fin < fecha_inicio) {
      throw new BadRequestException('La fecha de fin no puede ser anterior a la fecha de inicio');
    }

    if (!id_asesor || typeof id_asesor!== 'number') {
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
    
    const newAsesoramiento=queryRunner.manager.create(Asesoramiento,{fecha_inicio,profesion_asesoria,tipo_servicio,fecha_fin,tipoTrabajo: { id: id_tipo_trabajo },
      tipoContrato: { id: id_contrato }, estado:Estado_Asesoria.ACTIVO,especialidad: createAsesoramientoDto.especialidad ?? null})
  
    const addedAsesoramiento=await queryRunner.manager.save(newAsesoramiento)
    const id_asesoramiento=addedAsesoramiento.id

    const creacion=await this.procesosAsesoriaService.addProceso_to_Asesoramiento(clientes,id_asesor,id_asesoramiento,queryRunner.manager)
    
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

  async findDatesByCliente(id:number):Promise<DatosAsesoramientoDto>{

  const datosAsesoramiento= await this.asesoramientoRepo
      .createQueryBuilder('a')  // Alias para la tabla asesoramiento
      .innerJoin('a.procesosasesoria', 'p')  // Relación con la tabla procesos_asesoria
      .innerJoin('p.cliente', 'c')  // Relación con la tabla cliente
      .leftJoinAndSelect('a.tipoContrato', 'tc') 
      .select(['a.fecha_inicio', 'a.fecha_fin','tc.id','tc.nombre'])  // Selecciona las columnas que deseas
      .where('c.id = :id', { id })  // Filtra por el id del cliente
      .getOne();
  
  //if(datosAsesoramiento===null) return { "fecha_inicio":"Por asignar", "fecha_fin":"Por asignar" }
  //if (!datosAsesoramiento?.fecha_inicio || !datosAsesoramiento?.fecha_fin) throw new Error('Las fechas no están asignadas correctamente');
  
    const solo_fechas={
     //carrera:datosAsesoramiento? datosAsesoramiento.carrera:"Por asignar",
     contrato:datosAsesoramiento? {id:datosAsesoramiento.tipoContrato.id,nombre:datosAsesoramiento.tipoContrato.nombre}:{message:"Por asignar"},
     fecha_inicio:datosAsesoramiento? datosAsesoramiento.fecha_inicio:"Por asignar",
     fecha_fin:datosAsesoramiento? datosAsesoramiento.fecha_fin:"Por asignar"
   }
   console.log(solo_fechas)
  return solo_fechas
  }

  async changeAsesoramiento(id:number,cambios:UpdateAsesoramientoDto){
    if(!Object.keys(cambios).length)throw new BadRequestException("No se envio un body para actualizar")
        
    const partialEntity: any = { ...cambios };
    
    const updateAsesoramiento=await this.asesoramientoRepo.update(id,cambios)
    if(updateAsesoramiento.affected===0) throw new NotFoundException("No hay registro a afectar")
    return `Se cambio el asesor correctamente por el de ID ${id}`
  }

  async desactivate(id:number){
    const desactAsesoria=await this.asesoramientoRepo.update(
      id,
      {estado:Estado_Asesoria.DESACTIVADO}
    )
    if(desactAsesoria.affected===0) throw new BadRequestException("No se desactivo ningun usuario con el ID dado")
    return `Se desactivo el asesoramiento con id: ${id}`
  }

  async listar(){
    const listAsesoria = await this.asesoramientoRepo
      .createQueryBuilder('a')
      .innerJoin('a.tipoTrabajo','t')
      .innerJoin('a.procesosasesoria', 'p')
      .innerJoin('p.cliente', 'c')
      .innerJoin('p.asesor', 'ase')
      .select([
        'a.id',
        'a.estado AS estado',
        'a.fecha_inicio',
        'c.id AS id_cliente',
        'c.nombre AS cliente_nombre',
        'c.apellido AS cliente_apellido',
        'c.id AS id_asesor',
        'ase.nombre AS asesor_nombre',
        'ase.apellido AS asesor_apellido',
        't.nombre AS tipo_trabajo'
      ])
      .getRawMany();

      if (!listAsesoria || listAsesoria.length === 0) {
          throw new NotFoundException('No hay asesorías disponibles');
      }

      let arrayAsesor:number[]=[]
      let idUsados:number[]=[]
      let arregloAsesorias: object[] = []; 
      let contador_alumnos = 0;
      let contador_columnas=-1

       
      for(let i=0;i<listAsesoria.length;i++){
        const asesoría = listAsesoria[i]

        if (!asesoría.a_id || !asesoría.cliente_nombre || !asesoría.cliente_apellido) {
            throw new BadRequestException('Datos incompletos para la asesoría');
        }

        contador_alumnos+=1
        if(idUsados.includes(asesoría.a_id)){
          arregloAsesorias[contador_columnas]={
            ...arregloAsesorias[contador_columnas],
            [`id_estudiante${contador_alumnos}`]:asesoría.id_cliente,
            [`estudiante${contador_alumnos}`]: `${asesoría.cliente_nombre} ${asesoría.cliente_apellido}`,
          }
          
        }else{
        contador_columnas+=1
        contador_alumnos=1
        arregloAsesorias[contador_columnas]={
          "id_asesoramiento":asesoría.a_id,
          "id_asesor":asesoría.id_asesor,
          "asesor":asesoría.asesor_nombre+" "+asesoría.asesor_apellido,
          "tipo_trabajo":asesoría.tipo_trabajo,
          "estado":asesoría.estado,
          "id_delegado":asesoría.id_cliente,
          "delegado":asesoría.cliente_nombre+" "+asesoría.cliente_apellido
        }          
        idUsados.push(asesoría.a_id)
        
      
      }  
        
      }
      console.log(arregloAsesorias)
      return arregloAsesorias

    
  }

  update(id: number, updateAsesoramientoDto: UpdateAsesoramientoDto) {
    //return `This action updates a #${id} asesoramiento`;
  }

  remove(id: number) {
    //return `This action removes a #${id} asesoramiento`;
  }
}
