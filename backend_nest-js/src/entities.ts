import { Admin } from "./admin/admin.entity";
import { Asesor } from "./asesor/asesor.entity";
import { Asesoramiento } from "./asesoramiento/entities/asesoramiento.entity";
import { Asunto } from "./asuntos/entities/asunto.entity";
import { Cliente } from "./cliente/cliente.entity";
import { AreaAsesor } from "./common/entidades/areaAsesor.entity";
import { GradoAcademico } from "./common/entidades/gradoAcademico.entity";
import { TipoContrato } from "./common/entidades/tipoContrato.entity";
import { TipoTrabajo } from "./common/entidades/tipoTrabajo.entity";
import { Documento } from "./documentos/entities/documento.entity";
import { Inducciones } from "./inducciones/entity/inducciones";
import { Informacion_Pagos } from "./pagos/entities/informacion_pagos.entity";
import { Pago } from "./pagos/entities/pago.entity";
import { ProcesosAsesoria } from "./procesos_asesoria/entities/procesos_asesoria.entity";
import { Guia } from "./recursos/entities/guia.entity";
import { Herramienta } from "./recursos/entities/herramienta.entity";
import { Noticia } from "./recursos/entities/noticia.entity";
import { Solucion } from "./recursos/entities/solucion.entity";
import { Tutorial } from "./recursos/entities/tutorial.entity";
import { Reunion } from "./reuniones/entities/reunion.entity";
import { Soporte } from "./soportes/entities/soporte.entity";
import { Usuario } from "./usuario/usuario.entity";

export const Entities = [Admin, Asesor, Cliente, Usuario, TipoContrato, TipoTrabajo, AreaAsesor, GradoAcademico, ProcesosAsesoria, Asesoramiento, Documento, Asunto, Reunion, Pago, Informacion_Pagos, Guia, Herramienta, Noticia, Tutorial, Soporte, Solucion, Inducciones]