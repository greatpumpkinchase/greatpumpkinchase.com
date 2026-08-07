import moment from 'moment-timezone';
import { EVENT } from '../config/event.js';

export function getRegistrationStatus(now = moment.tz(EVENT.timezone)) {
    const localPreviewStatus = EVENT.registration.localPreviewStatus;

    // Vite sets DEV only for `yarn dev`, so this switch cannot change the deployed site.
    if (
        import.meta.env.DEV &&
        ['open', 'upcoming', 'closed'].includes(localPreviewStatus)
    ) {
        return localPreviewStatus;
    }

    const opens = moment.tz(EVENT.registration.openDate, EVENT.timezone);
    const closes = moment.tz(EVENT.registration.closeDate, EVENT.timezone);

    if (now.isBefore(opens)) return 'upcoming';
    if (now.isSameOrAfter(closes)) return 'closed';
    return 'open';
}

export default function () {
    return getRegistrationStatus() === 'open';
}
