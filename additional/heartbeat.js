//Server for sending heartbeat to heroku from Raspberry Pi. It is running only ot the Pi.

const axios = require('axios');

const SERVER_URL = 'https://iot-pi.herokuapp.com';
const HEARTBEAT_INTERVAL = 8000; // 8 seconds

function sendHeartbeat() {
    axios.get(`${SERVER_URL}/pi-heartbeat`)
        .then(response => {
            console.log('Heartbeat sent successfully');
        })
        .catch(error => {
            console.error(`Error sending heartbeat: ${error.message}`);
        });
}

setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);
