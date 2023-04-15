// Import required modules
const axios = require('axios');
const express = require("express");

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Initialize lastHeartbeat variable to store the timestamp of the last received heartbeat
let lastHeartbeat = new Date().getTime();

// Route to get the environment information
app.get('/environment', (req, res) => {
    const environment = process.env.NODE_ENV || 'development';
    const raspberryPiServerUrl = process.env.RASPBERRY_PI_SERVER_URL || '';

    // Make a request to the Raspberry Pi server
    axios.get(raspberryPiServerUrl).then((response) => {
        console.log(response.data);
        res.status(200).json({environment, raspberryPiServerUrl, response: response.data });
    }).catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Unable to connect to Raspberry Pi server' });
    });
});

// Route to handle heartbeat from the Raspberry Pi
app.get('/pi-heartbeat', (req, res) => {
    lastHeartbeat = new Date().getTime();
    res.status(200).send({message: 'Heartbeat received'});
});

// Route to check the status of the Raspberry Pi
app.get('/pi-status', (req, res) => {
    const currentTime = new Date().getTime();
    const piOnline = currentTime - lastHeartbeat <= 10000; // 10 seconds
    res.status(200).json({online: piOnline});
});

// Start the server on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
