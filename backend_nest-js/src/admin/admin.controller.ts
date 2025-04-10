import { Controller ,Post,Body,Get, Param, Patch, ParseIntPipe} from '@nestjs/common';
import { AdminService } from './admin.service';

import { CrearlienteDto } from './dto/crear-cliente.dto';


@Controller('admin')
export class AdminController {
    constructor(private readonly adminService:AdminService){}

    @Get(':id')
    async listOne(@Param('id') id:string){
        const ID:number=parseInt(id)
        return this.adminService.listOneAdmin(ID)
    }

    @Get()
    async listAll(){
        return this.adminService.listAdmin();
    }

    @Post('/add')
    async create(@Body() body:CrearlienteDto){
        return this.adminService.create(body)
    }

    @Patch('/update/:id')
    async patchAdmin(@Body() body:CrearlienteDto,@Param('id',ParseIntPipe) id:number){
        return this.adminService.patchAdmin(body,id)
    }
    

    
}
