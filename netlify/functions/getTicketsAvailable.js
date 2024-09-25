const totalTickets = 100;

exports.handler = async function (event, context) {
    // Call the NocoDB api
    let registrationCount = 0; // Set this to the number of rows in the "Student Registrations" table in NocoDB.

    let count = totalTickets - registrationCount; // Calculate the number of tickets left

    // Return the count as JSON
    return {
        statusCode: 200,
        body: JSON.stringify(count),
    };
};
