import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAsesoramientoDto } from './dto/create-asesoramiento.dto';
import { UpdateAsesoramientoDto } from './dto/update-asesoramiento.dto';
import { ProcesosAsesoriaService } from 'src/procesos_asesoria/procesos_asesoria.service';
import { Asesoramiento, Estado_Asesoria } from './entities/asesoramiento.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, QueryRunner } from 'typeorm';
import { clientesExtraDTO } from 'src/procesos_asesoria/dto/clientes_extra.dto';
import { DatosAsesoramientoDto} from 'src/cliente/dto/listar-clientes.dto';
import { ProcesosAsesoria } from 'src/procesos_asesoria/entities/procesos_asesoria.entity';


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
  
    const solo_fechas={
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

  async changeState(id:number){
    const estado_asesoria=await this.asesoramientoRepo.findOneBy({id})
    if(estado_asesoria?.estado==="activo"){
    const desactAsesoria=await this.asesoramientoRepo.update(
      id,
      {estado:Estado_Asesoria.DESACTIVADO}
    )
    if(desactAsesoria.affected===0) throw new BadRequestException("No se desactivo ningun usuario con el ID dado")
    return `Se desactivo el asesoramiento con id: ${id}`
    }

    if(estado_asesoria?.estado==="desactivado"){
      const desactAsesoria=await this.asesoramientoRepo.update(
      id,
      {estado:Estado_Asesoria.ACTIVO}
    )
    if(desactAsesoria.affected===0) throw new BadRequestException("No se activo ningun usuario con el ID dado")
    return `Se activo el asesoramiento con id: ${id}`
    }
    if(estado_asesoria?.estado==="finalizado"){
      return "Esta asesoria esta finalizada no podemos cambiarle"
    }
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
          "fecha_inicio":asesoría.a_fecha_inicio,
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
      //console.log(arregloAsesorias)
      return arregloAsesorias

    
  }

  async listar_por_id(id:number){
    if (!id || typeof id !== 'number' || id <= 0) throw new BadRequestException('ID inválido proporcionado');
    const listOneAsesoria = await this.asesoramientoRepo
      .createQueryBuilder('a')
      .innerJoin('a.tipoTrabajo','tt')
      .innerJoin('a.tipoContrato','tc')
      .innerJoin('a.procesosasesoria', 'p')
      .innerJoin('p.cliente', 'c')
      .innerJoin('p.asesor', 'ase')
      .select([
        'a.id',
        'a.fecha_inicio',
        'a.fecha_fin',
        'a.tipo_servicio',
        'a.estado AS estado',
        'tt.id AS id_tipo_trabajo',
        'tt.nombre AS tipo_trabajo',
        'tc.id AS id_contrato',
        'tc.nombre AS contrato',
        'ase.id AS id_asesor',
        'ase.nombre AS asesor_nombre',
        'ase.apellido AS asesor_apellido',
        'c.id AS id_delegado',
        'c.nombre AS delegado_nombre',
        'c.apellido AS delegado_apellido'
      ])
      .where('a.id=:id',{id})
      .getRawMany();
      
      if (!listOneAsesoria || listOneAsesoria.length === 0)throw new NotFoundException(`No se encontró asesoría con ID ${id}`);
      

      let oneAsesoria={}
      if (!listOneAsesoria[0].a_id || !listOneAsesoria[0].delegado_nombre) throw new NotFoundException('Datos incompletos para la asesoría');

      oneAsesoria={
        ...listOneAsesoria[0]
      }
      
      for(let i=1;i<listOneAsesoria.length;i++){

        oneAsesoria[`id_estudiante${i+1}`]=listOneAsesoria[i].id_delegado,
        oneAsesoria[`nombre_estudiante${i+1}`]=listOneAsesoria[i].delegado_nombre,
        oneAsesoria[`apellido_estudiante${i+1}`]=listOneAsesoria[i].delegado_apellido,
        console.log(i)
      }
      return oneAsesoria

  }

  async listar_segun_fecha(fecha_limite:Date){
    console.log(fecha_limite)
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
      .where("a.fecha_inicio>= :desde",{
        desde:fecha_limite
      })
      .getRawMany();

      if (!listAsesoria || listAsesoria.length === 0) {
        throw new NotFoundException('No hay asesorías disponibles');
    }
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
        "fecha_inicio":asesoría.a_fecha_inicio,
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
    //console.log(arregloAsesorias)
    return arregloAsesorias
  }


  async update(id: number, updateAsesoramientoDto: UpdateAsesoramientoDto,clientes:clientesExtraDTO) {
    let id_asesor
    if(updateAsesoramientoDto.id_asesor!==undefined){
      id_asesor=updateAsesoramientoDto.id_asesor
      delete updateAsesoramientoDto.id_asesor
    }
    
    const queryRunner=this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    
    try{
      if (updateAsesoramientoDto.fecha_inicio && updateAsesoramientoDto.fecha_fin) {
      if (updateAsesoramientoDto.fecha_fin < updateAsesoramientoDto.fecha_inicio) {
        throw new BadRequestException('La fecha de fin no puede ser anterior a la fecha de inicio');
      }
    }
    const updated={...updateAsesoramientoDto}
    if(updateAsesoramientoDto.id_contrato){ 
      delete updated.id_contrato
      updated['tipoContrato']={id:updateAsesoramientoDto.id_contrato}
    }

    if(updateAsesoramientoDto.id_tipo_trabajo){
      delete updated.id_tipo_trabajo
      updated['tipoTrabajo']={id:updateAsesoramientoDto.id_tipo_trabajo}
    }
    
    await queryRunner.manager.update(Asesoramiento,{id},{...updated})
    
    const clienteIds: number[] = Object.values(clientes)
      .filter(id => typeof id === 'number' && id > 0);

    if (clienteIds.length === 0) {
      throw new BadRequestException('Debe proporcionar al menos un cliente válido');
    }

    const procesosActuales = await queryRunner.manager.find(ProcesosAsesoria, {
      where: { asesoramiento: { id } },
      order: { id: "ASC" }, // Importante para que se mantenga el orden y se puedan comparar
    });

    const cantidadActual = procesosActuales.length;
    const cantidadNueva = clienteIds.length;
    
    const cantidadActualizar = Math.min(cantidadActual, cantidadNueva);

    for (let i = 0; i < cantidadActualizar; i++) {
      await this.procesosAsesoriaService.actualizar_registros_por_Asesoramiento(
        id,
        clienteIds[i],
        id_asesor,
        queryRunner.manager,
        procesosActuales[i].id
      );
    }

    // 5. Agregar nuevos si hay más clientes
    if (cantidadNueva > cantidadActualizar) {
      for (let i = cantidadActualizar; i < cantidadNueva; i++) {
        await this.procesosAsesoriaService.crear_registro_por_Asesoramiento(
          id,
          clienteIds[i],
          id_asesor,
          queryRunner.manager
        );
      }
    }
     // 6. Eliminar registros sobrantes si hay menos clientes
    if (cantidadNueva < cantidadActual) {
      for (let i = cantidadNueva; i < cantidadActual; i++) {
        await queryRunner.manager.delete(ProcesosAsesoria, procesosActuales[i].id);
      }
    }

    await queryRunner.commitTransaction();
    return 'Actualizado satisfactoriamente';
    }catch(err){
      queryRunner.rollbackTransaction()
      throw new InternalServerErrorException(`No se puede actualizar completemente,cancelando cambios se presta este error ${err}`)
    }finally{
      await queryRunner.release()
    }
    
  }

  async remove(id: number) {
    const queryRunner=this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try{
    await this.procesosAsesoriaService.remove_by_asesoramiento(id,queryRunner.manager)
    const deletedAsesoramiento=await queryRunner.manager.delete(Asesoramiento,{id})
    if(deletedAsesoramiento.affected===0)throw new NotFoundException(`No se encontro para eliminar con ese id:${id}`)
    await queryRunner.commitTransaction()
    return deletedAsesoramiento
    }catch(err){
      queryRunner.rollbackTransaction()
      throw new InternalServerErrorException(`No se puede actualizar completemente,cancelando cambios se presta este error ${err}`)

    }finally{
      await queryRunner.release()
    }
  }

  async asesoramientosByClient(id:number){
    const RawAsesoramiento=await this.asesoramientoRepo
      .createQueryBuilder('a')
      .innerJoinAndSelect('a.procesosasesoria','p')
      .innerJoinAndSelect('p.cliente','cli')
      .select(['a.id AS id,a.profesion_asesoria AS profesion_asesoria'])
      .where('cli.id = :id', { id })
      .getRawMany();

    let response={}
    RawAsesoramiento.forEach((item,index)=>{
      response[`asesoria${index+1}`]=item
    })
    return response
  }

  async getInfoAsesorbyAsesoramiento(id:number){
    const datosAsesor=await this.asesoramientoRepo
      .createQueryBuilder('a')
      .innerJoin('a.procesosasesoria','p')
      .innerJoinAndSelect('p.asesor','ase')
      .innerJoinAndSelect('ase.gradoAcademico','grad')
      .innerJoinAndSelect('ase.areaAsesor','area')
      .select(['ase.nombre AS nombre',
        'ase.apellido AS apellido',
        'ase.universidad AS universidad',
        'grad.nombre AS gradoAcademico',
        'area.nombre AS areaNombre'  
      ])
      .where('a.id= :id',{id})
      .getRawMany()
    
    let response:{}={}
    datosAsesor.forEach((datos,index)=>{
      response[`asesor${index+1}`]=datos
    })
    
    
    return response
  }

  async contratoDelAsesoramiento(id:number){
    const datosContrato=await this.asesoramientoRepo.findOne({where:{id},relations:["tipoContrato"],select:["id","fecha_inicio","fecha_fin"]})
    if(!datosContrato) throw new NotFoundException("No hay un contrato con ese id de asesoramiento")
    if (!datosContrato.tipoContrato) throw new NotFoundException("No se encontró un tipo de contrato asociado al asesoramiento");

    return datosContrato
  }
}
