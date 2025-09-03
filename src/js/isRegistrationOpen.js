import moment from 'moment-timezone';

export default function () {
    // Define the start and end dates in EST
    const startDate = moment.tz('2025-09-02', 'America/New_York').tz('UTC', true);
    const endDate = moment.tz('2025-10-23', 'America/New_York').tz('UTC', true);

    // Get the current time in UTC
    const now = moment.utc();

    const show = now.isBetween(startDate, endDate);

    return show;
}
