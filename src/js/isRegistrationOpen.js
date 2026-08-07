import moment from 'moment-timezone';
import { EVENT } from '../config/event.js';

export function getRegistrationStatus(now = moment.tz(EVENT.timezone)) {
    const opens = moment.tz(EVENT.registration.openDate, EVENT.timezone);
    const closes = moment.tz(EVENT.registration.closeDate, EVENT.timezone);

    if (now.isBefore(opens)) return 'upcoming';
    if (now.isSameOrAfter(closes)) return 'closed';
    return 'open';
}

export default function () {
    return getRegistrationStatus() === 'open';
}
