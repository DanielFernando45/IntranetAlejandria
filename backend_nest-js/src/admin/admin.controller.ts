import { Controller ,Post,Body} from '@nestjs/common';
import { AdminService } from './admin.service';


@Controller('admin')
export class AdminController {
    constructor(private readonly adminService:AdminService){}

    @Post()
    async create(@Body() body){
        return this.adminService.create(body)
    }

}
