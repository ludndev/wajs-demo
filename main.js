require('dotenv').config()
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const util = require('./util');

const client = new Client();

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
    util.sendPayloadToWebhook({
        on: 'qr',
        msg: 'qr_received'
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
    util.sendPayloadToWebhook({
        on: 'ready',
        msg: 'client_ready'
    });
});

client.initialize();
