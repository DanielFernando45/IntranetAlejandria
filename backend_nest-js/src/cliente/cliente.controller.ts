import { Body, Controller, UsePipes, ValidationPipe,Post, Get, Param } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/crear-cliente.dto';

@Controller('cliente')
export class ClienteController {
    constructor(private readonly clienteService:ClienteService){}

    @Get(':id')
    async listOne(@Param('id') id:string){
        const ID:number=parseInt(id)
        return this.clienteService.listOneAdmin(ID)
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
}
