import moment from 'moment-timezone';

export default function () {
    // Define the start and end dates in EST
    const startDate = moment.tz('2024-10-25 12:00', 'America/New_York').tz('UTC', true);
    const endDate = moment.tz('2024-10-25 23:59', 'America/New_York').tz('UTC', true);

    // Get the current time in UTC
    const now = moment.utc();

    const show = now.isBetween(startDate, endDate);

    return show;
}
