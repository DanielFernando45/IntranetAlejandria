import { Admin } from "./admin/admin.entity";
import { Asesor } from "./asesor/asesor.entity";
import { Asesoramiento } from "./asesoramiento/entities/asesoramiento.entity";
import { Cliente } from "./cliente/cliente.entity";
import { AreaAsesor } from "./common/entidades/areaAsesor.entity";
import { GradoAcademico } from "./common/entidades/gradoAcademico.entity";
import { TipoContrato } from "./common/entidades/tipoContrato.entity";
import { TipoTrabajo } from "./common/entidades/tipoTrabajo.entity";
import { ProcesosAsesoria } from "./procesos_asesoria/entities/procesos_asesoria.entity";
import { Usuario } from "./usuario/usuario.entity";

export const ENTITIES=[Admin,Asesor,Cliente,Usuario,TipoContrato,TipoTrabajo,AreaAsesor,GradoAcademico,ProcesosAsesoria,Asesoramiento,]