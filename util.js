const axios = require('axios');

function sendPayloadToWebhook(payload) {
    const webhookUrl = process.env.WEBHOOK;

    if (!webhookUrl) {
        console.error('WEBHOOK environment variable is not set.');
        return;
    }

    axios.post(webhookUrl, payload)
    .then(response => {
        console.log('Payload sent successfully:', response.data);
    })
    .catch(error => {
        console.error('Error sending payload:', error.message);
    });
}

module.exports = { 
    sendPayloadToWebhook 
};
