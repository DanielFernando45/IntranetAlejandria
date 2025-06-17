import { forwardRef, Module } from "@nestjs/common";
import { CommonController } from "./common.controller";
import { CommonService } from "./common.service";
import { ProcesosAsesoriaModule } from "src/procesos_asesoria/procesos_asesoria.module";
import { ReunionesModule } from "src/reuniones/reuniones.module";
import { AsuntosModule } from "src/asuntos/asuntos.module";
import { AsesoramientoModule } from "src/asesoramiento/asesoramiento.module";

@Module({
    imports:[ProcesosAsesoriaModule,AsesoramientoModule,ReunionesModule,forwardRef(() =>AsuntosModule)],
    controllers:[CommonController],
    providers:[CommonService],
})
export class CommonModule{
}