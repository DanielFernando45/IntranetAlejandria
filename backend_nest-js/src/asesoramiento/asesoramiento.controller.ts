import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ParseDatePipe } from '@nestjs/common';
import { AsesoramientoService } from './asesoramiento.service';
import { UpdateAsesoramientoDto } from './dto/update-asesoramiento.dto';
import { AsesoramientoWrpDTO } from './dto/asesoramientoadd.wrpdto';

@Controller('asesoramiento')
export class AsesoramientoController {
  constructor(private readonly asesoramientoService: AsesoramientoService) {}

  @Get("/listar")
  listar(){
    this.asesoramientoService.findAll()
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

  @Patch("editar_asesor/id")
  editar_asesor(@Param("id",ParseIntPipe) id:number){
    this.asesoramientoService.changeAsesor(id)
  }


  @Patch(':id')
  updateAsesor(@Param('id',ParseIntPipe) id: number, @Body() updateAsesoramientoDto: UpdateAsesoramientoDto) {
    return this.asesoramientoService.update(id, updateAsesoramientoDto);
  }

  @Patch("desactivate/:id")
  desactivateAsesoria(@Param('id',ParseIntPipe) id:number){
    return this.asesoramientoService.desactivate(id)
  }

  @Patch('finalized/:id')
  finalizado(@Param('id') id: string) {
    return this.asesoramientoService.remove(+id);
  }
}
