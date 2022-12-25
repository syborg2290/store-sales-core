import { Injectable } from '@nestjs/common';
import { DateFormats } from '../date-formats.enum';
import * as moment from 'moment';

@Injectable()
export class DateFormatService {
    static moment: moment.Moment = moment(new Date());

    public static getFormatDateForPersistenceEnvironment(): string {
        return this.moment.format(DateFormats.PERSISTENCE_DATETIME);
    }
}
