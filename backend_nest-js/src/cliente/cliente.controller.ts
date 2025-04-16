import { Body, Controller, UsePipes, ValidationPipe,Post, Get, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/crear-cliente.dto';
import { updateClienteDto } from './dto/update-cliente.dto';

@Controller('cliente')
export class ClienteController {
    constructor(private readonly clienteService:ClienteService){}

    @Get(':id')
    async listOne(@Param('id',ParseIntPipe) id:number){
        return this.clienteService.listOneAdmin(id)
    }

    @Get()
    async listAll(){
        return this.clienteService.listAdmin();
    }


    @Post("/add")
    @UsePipes(new ValidationPipe({transform:true}))
    async crearCliente(@Body() createClienteDto:CreateClienteDto){
        return this.clienteService.crearCliente(createClienteDto)
    }

    @Patch('/update/:id')
    async update(@Param('id',ParseIntPipe) id:number,@Body() body:updateClienteDto){
        return this.clienteService.patchCliente(id,body)
    }
    
    @Delete('delete/:id')
    async delete(@Param('id',ParseIntPipe) id:number){
        return this.clienteService.deletedCliente(id)
    }

}
