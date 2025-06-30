import { Injectable ,OnModuleInit} from "@nestjs/common";
import * as B2 from "backblaze-b2"

@Injectable()
export class BlackbazeService implements OnModuleInit{
    private b2:B2
    private isAuthorized=false

    constructor(){
        this.b2=new B2({
            applicationKeyId: process.env.B2_KEY_ID,
            applicationKey: process.env.B2_APP_KEY,
        })
    }

    async onModuleInit() {
        if(!this.isAuthorized){
            await this.b2.authorized();
            this.isAuthorized=true
        }
    }

    getClient():B2{
        return this.b2
    }
}