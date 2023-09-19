require('dotenv').config()
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const util = require('./util');

const SESSION_FILE_PATH = './session.json';

let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
    authStrategy: new LocalAuth({
        session: sessionData
    })
});

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
