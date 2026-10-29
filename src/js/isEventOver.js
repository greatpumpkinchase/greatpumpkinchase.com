import moment from 'moment-timezone';
import { EVENT } from '../config/event.js';

// The event runs into the evening of EVENT.date, so it counts as over from
// midnight at the end of that day.
export default function isEventOver(now = moment.tz(EVENT.timezone)) {
    return now.isSameOrAfter(moment.tz(EVENT.date, EVENT.timezone).add(1, 'day'));
}
