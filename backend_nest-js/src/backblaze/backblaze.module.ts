import { Module } from '@nestjs/common';
import { BlackbazeService } from './backblaze.service';

@Module({
    exports:[BlackbazeService],
    providers:[BlackbazeService]
})
export class BackblazeModule {}
