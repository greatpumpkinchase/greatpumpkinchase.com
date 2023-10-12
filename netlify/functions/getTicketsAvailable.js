import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: 'https://us1-clever-poodle-40498.upstash.io',
    token: 'AZ4yASQgYWU5YjQ2MTktZGQ1Ny00OGUyLWI2ODItODhkM2QwYTYxZWUyMDQzOTI0ZjJhNzc5NGViZmE4MzNlNmVlNDFjZjFjOTk=',
});

exports.handler = async function (event, context) {
    let response = await getEventDetails();

    if (response.ok !== true) {
        data = await getNewRefreshToken();
        await redis.set('refreshToken', data.refresh_token);
        await redis.set('accessToken', data.access_token);

        response = await getEventDetails();
    }

    data = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify(data.event.tickets_available),
    };
};

async function getEventDetails() {
    let accessToken = await redis.get('accessToken');
    let response = null;

    response = await fetch(
        "https://api.ticketbud.com/events/611668.json?access_token=" + accessToken,
    );

    return response;
}

async function getNewRefreshToken() {
    const refreshToken = await redis.get('refreshToken');
    response = await fetch("https://api.ticketbud.com/oauth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            client_id: "x3LxS71Msxe9Om7MSR6biv5HI9R_fVekg91kJLtzvxM",
            client_secret: "YdN0fyQTFi74BiGZHqvoUyS5ZJI_XpbxUvesTKX5JSY",
            refresh_token: refreshToken,
            grant_type: "refresh_token",
            redirect_uri: "https://greatpumpkinchase.com",
        }),
    });

    let data = await response.json();
    return { "access_token": data.access_token, "refresh_token": data.refresh_token };
}
