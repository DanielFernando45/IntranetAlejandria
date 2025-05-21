import { Module } from "@nestjs/common";
import { CommonController } from "./common.controller";
import { CommonService } from "./common.service";
import { ProcesosAsesoriaModule } from "src/procesos_asesoria/procesos_asesoria.module";


@Module({
    imports:[ProcesosAsesoriaModule],
    controllers:[CommonController],
    providers:[CommonService],
})
export class CommonModule{
}