const ticketLimit = 100;

export async function GET({ params, request }) {
    const options = {
        method: 'GET',
        headers: {
            'xc-token': import.meta.env.NOCO_DB_API_TOKEN
        }
    };

    let data = await fetch('https://app.nocodb.com/api/v2/tables/m6tawb2iaiuw50v/records/count', options)
        .then(response => response.json())
        .catch(err => console.error(err));

    const ticketsAvailable = ticketLimit - data.count;

    return new Response(
        JSON.stringify({
            statusCode: 200,
            body: { tickets_available: JSON.stringify(ticketsAvailable) },
        })
    )
}
