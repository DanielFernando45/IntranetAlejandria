import { Admin } from "./admin/admin.entity";
import { Asesor } from "./asesor/asesor.entity";
import { Cliente } from "./cliente/cliente.entity";
import { AreaAsesor } from "./entidades/areaAsesor.entity";
import { GradoAcademico } from "./entidades/gradoAcademico.entity";
import { TipoContrato } from "./entidades/tipoContrato.entity";
import { TipoTrabajo } from "./entidades/tipoTrabajo.entity";
import { Usuario } from "./usuario/usuario.entity";

export const ENTITIES=[Admin,Asesor,Cliente,Usuario,TipoContrato,TipoTrabajo,AreaAsesor,GradoAcademico]