import { Injectable } from "@nestjs/common";
import { ZoomAuthService } from "./zoom.auth.service";
import axios from "axios";

@Injectable()
export class ZoomMeetingService{
    constructor(private zoomAuth:ZoomAuthService){}

    async createMeeting(userEmail:string,topic:string,startTime:string,token:string){

        const res=await axios.post(
            `https://api.zoom.us/v2/users/${userEmail}/meetings`,
            {
                topic,
                type:2,
                start_time:startTime,
                duration:120,
                timezone:'America/Lima',
                settings:{
                    join_before_host: false,
                    approval_type: 1,
                    recording: 'cloud',
                }
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        )

        return res.data
    }
}