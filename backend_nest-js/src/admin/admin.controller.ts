import { Controller ,Post,Body,Get} from '@nestjs/common';
import { AdminService } from './admin.service';


@Controller('admin')
export class AdminController {
    constructor(private readonly adminService:AdminService){}

    @Get('')
    async list(){
        return this.adminService.listAdmin()
    }

    @Post('/add')
    async create(@Body() body){
        return this.adminService.create(body)
    }
    

    
}
