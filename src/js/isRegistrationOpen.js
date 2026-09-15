import moment from 'moment-timezone';
import { EVENT } from '../config/event.js';

// Returns the pinned local preview status, or null when the real dates apply.
// Vite sets DEV only for `yarn dev`, so this can never affect the deployed site.
export function getPreviewStatus() {
    const localPreviewStatus = EVENT.registration.localPreviewStatus;

    if (
        import.meta.env.DEV &&
        ['open', 'upcoming', 'closed'].includes(localPreviewStatus)
    ) {
        return localPreviewStatus;
    }

    return null;
}

export function getRegistrationStatus(now = moment.tz(EVENT.timezone)) {
    const previewStatus = getPreviewStatus();

    if (previewStatus) return previewStatus;

    const opens = moment.tz(EVENT.registration.openDate, EVENT.timezone);
    const closes = moment.tz(EVENT.registration.closeDate, EVENT.timezone);

    if (now.isBefore(opens)) return 'upcoming';
    if (now.isSameOrAfter(closes)) return 'closed';
    return 'open';
}

export default function () {
    return getRegistrationStatus() === 'open';
}
