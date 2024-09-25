const totalTickets = 100;

exports.handler = async function (event, context) {
    // Figure out a way to store the api token from NocoDB in a way that it's not stored in Git
    // You can probably store it in some type of .env file

    // Call the NocoDB api
    // The endpoint to call is https://app.nocodb.com/api/v2/tables/m6tawb2iaiuw50v/records/count
    let registrationCount = 0; // Set this to the number of rows in the "Student Registrations" table in NocoDB.

    let count = totalTickets - registrationCount; // Calculate the number of tickets left

    // Return the count as JSON
    return {
        statusCode: 200,
        body: JSON.stringify(count),
    };
};
