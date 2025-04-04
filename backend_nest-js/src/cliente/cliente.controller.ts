import { Body, Controller, UsePipes, ValidationPipe,Post } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/crear-cliente.dto';

@Controller('cliente')
export class ClienteController {
    constructor(private readonly clienteService:ClienteService){}

    @Post("/addCliente")
    @UsePipes(new ValidationPipe({transform:true}))
    async crearCliente(@Body() createClienteDto:CreateClienteDto){
        return this.clienteService.crearCliente(createClienteDto)
    }
}
