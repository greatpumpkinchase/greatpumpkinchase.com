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

// Registration opens at the start of openDate.
export function getOpensAt() {
    return moment.tz(EVENT.registration.openDate, EVENT.timezone);
}

// closeDate is the last day registration is open, so the closing instant is
// midnight at the end of that day -- i.e. the start of the following day.
export function getClosesAt() {
    return moment.tz(EVENT.registration.closeDate, EVENT.timezone).add(1, 'day');
}

export function getRegistrationStatus(now = moment.tz(EVENT.timezone)) {
    const previewStatus = getPreviewStatus();

    if (previewStatus) return previewStatus;

    if (now.isBefore(getOpensAt())) return 'upcoming';
    if (now.isSameOrAfter(getClosesAt())) return 'closed';
    return 'open';
}

export default function () {
    return getRegistrationStatus() === 'open';
}
