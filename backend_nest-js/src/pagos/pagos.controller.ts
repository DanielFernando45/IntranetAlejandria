import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoAlContadoDto } from './dto/create-pago-al-contado.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { CreatePagoPorCuotaDto } from './dto/create-pago-por-cuotas.dto';
import { PagoPorCuotaWrpDTO } from './dto/pago-por-cuotas-add.dto';

@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post("al_contado")
  async añadir_pago_al_contado(@Body() createPagoDto: CreatePagoAlContadoDto) {
    const response=await this.pagosService.post_pago_al_contado(createPagoDto);
    return response
  }

  @Post("por_cuotas")
  async añadir_pago_por_cuotas(@Body() createPagoDto: PagoPorCuotaWrpDTO) {
    const response=await this.pagosService.post_pago_por_cuotas(createPagoDto);
    return response
  }

  @Get()
  findAll() {
    return this.pagosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagoDto: UpdatePagoDto) {
    return this.pagosService.update(+id, updatePagoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.pagosService.remove(+id);
  }
}
