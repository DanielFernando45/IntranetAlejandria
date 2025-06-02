import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoAlContadoDto } from './dto/create-pago-al-contado.dto';
import { CreatePagoPorCuotaDto } from './dto/create-pago-por-cuotas.dto';
import { PagoPorCuotaUpdate, PagoPorCuotaWrpDTO } from './dto/pago-por-cuotas-add.dto';
import { UpdateCuotasDto } from './dto/cuotas-update.dto';
import { UpdatePagoContadoDto } from './dto/update-pago.dto';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post("alContado")
  async añadir_pago_al_contado(@Body() createPagoDto: CreatePagoAlContadoDto) {
    const response=await this.pagosService.post_pago_al_contado(createPagoDto);
    return response
  }

  @Post("porCuotas")
  async añadir_pago_por_cuotas(@Body() createPagoDto: PagoPorCuotaWrpDTO) {
    const response=await this.pagosService.post_pago_por_cuotas(createPagoDto);
    return response
  }

  @Patch('updateContado/:id')
  async updateContado(@Param('id') id:string,@Body() updatePagoAlContadoDto:UpdatePagoContadoDto){
    return await this.pagosService.updateContado(+id,updatePagoAlContadoDto)
  }

  @Patch('updateCuotas/:id')
  async updateCuotas(@Param('id') id: string, @Body() updatePagoDto:UpdateCuotasDto) {
    return await this.pagosService.updateCuotas(+id, updatePagoDto);
  }
  
  @Get()
  findAll() {
    return this.pagosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagosService.findOne(+id);
  }
  @Delete('delete/:id')
  remove(@Param('id') id: string){
    return this.pagosService.deletePago(+id);
  }
}
