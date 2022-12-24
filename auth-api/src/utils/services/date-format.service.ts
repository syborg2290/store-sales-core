import { Injectable } from '@nestjs/common';
import { DateFormats } from '../date-formats.enum';
import * as moment from 'moment';

@Injectable()
export class DateFormatService {
    private moment: moment.Moment = moment(new Date());

    public getFormatDateForPersistenceEnvironment(): string {
        return this.moment.format(DateFormats.PERSISTENCE_DATETIME);
    }
}

