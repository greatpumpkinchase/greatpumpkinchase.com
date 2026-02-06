import moment from 'moment-timezone';
import { EVENT } from '../config/event.js';

export default function () {
    const startDate = moment
        .tz(EVENT.registration.openDate, EVENT.timezone)
        .tz('UTC', true);
    const endDate = moment
        .tz(EVENT.registration.closeDate, EVENT.timezone)
        .tz('UTC', true);

    const now = moment.utc();

    return now.isBetween(startDate, endDate);
}
