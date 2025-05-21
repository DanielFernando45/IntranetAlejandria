import { 
    CanActivate ,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProcesosAsesoriaService } from '../../procesos_asesoria/procesos_asesoria.service';
import { Request } from 'express';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class IsDelegadoGuard implements CanActivate{
    constructor(
        private readonly procesosAsesoriaService:ProcesosAsesoriaService,
        private readonly reflector:Reflector,
    ){}

    async canActivate(context:ExecutionContext):Promise<boolean>{
        const req:Request=context.switchToHttp().getRequest() ;
        const user=req.user;
        if(user===undefined) throw new BadRequestException("No es valido ingrese correctamente")
        const asesoriamientoId=req.body.idAsesoramiento || req.params.idAsesoramiento

        if(!asesoriamientoId) throw new UnauthorizedException("Id de asesoramiento no proporcionado")

        const delegado=await this.procesosAsesoriaService.getDelegado(asesoriamientoId)

        //if(delegado.cliente.id !==user .id) throw new UnauthorizedException("Solo el delegado puede realizar esta accion")

        return true
    }
}