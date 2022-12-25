import { Module } from '@nestjs/common';
import { DateFormatService } from './services/date-format.service';

@Module({
    providers: [DateFormatService],
    exports: [DateFormatService],
})
export class UtilsModule {}
