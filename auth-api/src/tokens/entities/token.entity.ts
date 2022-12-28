import { Prop, Schema } from '@nestjs/mongoose';
import { DateFormatService } from 'src/utils/services/date-format.service';

@Schema()
export class Token {
    @Prop({
        default: DateFormatService.getFormattedDateForPersistenceEnvironment(),
    })
    createdAt: string;
}
