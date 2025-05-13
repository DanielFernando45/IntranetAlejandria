import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ParseDatePipe } from '@nestjs/common';
import { AsesoramientoService } from './asesoramiento.service';
import { UpdateAsesoramientoDto } from './dto/update-asesoramiento.dto';
import { AsesoramientoWrpDTO } from './dto/asesoramientoadd.wrpdto';
import { clientesExtraDTO } from 'src/procesos_asesoria/dto/clientes_extra.dto';

@Controller('asesoramiento')
export class AsesoramientoController {
  constructor(private readonly asesoramientoService: AsesoramientoService) {}

  @Get("/listar")
  listar(){
    return this.asesoramientoService.listar()
  }

  @Get("/listar/:id")
  listar_por_ID(@Param('id',ParseIntPipe) id:number){
    return this.asesoramientoService.listar_por_id(id)
  }

  @Post("asignacion")
  create(@Body() body:AsesoramientoWrpDTO) {
    return this.asesoramientoService.create(body.createAsesoramiento,body.clientes);
  }

  @Get("listar/:fecha")
  buscar_por_fecha(@Param("fecha") fecha:string){
      if(fecha){
          
      }
  }

  // @Patch("update/:id")
  // editar_asesor(@Param("id",ParseIntPipe) id:number,@Body() campos:UpdateAsesoramientoDto){
  //   this.asesoramientoService.changeAsesoramiento(id,campos)
  // }


  @Patch('update/:id')
  updateAsesor(@Param('id',ParseIntPipe) id: number, @Body() body:AsesoramientoWrpDTO) {
    return this.asesoramientoService.update(id, body.createAsesoramiento,body.clientes);
  }

  @Patch("estado/:id")
  desactivateAsesoria(@Param('id',ParseIntPipe) id:number){
    return this.asesoramientoService.changeState(id)
  }

  @Delete('delete/:id')
  finalizado(@Param('id',ParseIntPipe) id: number) {
    return this.asesoramientoService.remove(id);
  }
}
