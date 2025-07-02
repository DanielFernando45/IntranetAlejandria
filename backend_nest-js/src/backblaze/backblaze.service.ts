import { Injectable ,OnModuleInit} from "@nestjs/common";
import * as B2 from 'backblaze-b2';

@Injectable()
export class BackbazeService implements OnModuleInit{
    private b2:any;
    private isAuthorized=false

    constructor(){
        this.b2=new B2({
            applicationKeyId: process.env.B2_KEY_ID,
            applicationKey: process.env.B2_APP_KEY,
        })
    }

    async onModuleInit() {
        if(!this.isAuthorized){
            await this.b2.authorize();
            this.isAuthorized=true
        }
    }

    getClient(){
        return this.b2
    }
}