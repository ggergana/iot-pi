    let raspberryPiServerUrl = '';

    // Fetch environment information and update the Raspberry Pi server URL
    function fetchEnvironment() {
    fetch('/environment')
        .then(response => response.json())
        .then(data => {
            if (data.environment === 'development') {
                // Show Raspberry Pi section when running locally
                document.getElementById('pi-content').style.display = 'block';
            } else {
                // Check Pi status when not running locally
                raspberryPiServerUrl = data.raspberryPiServerUrl;

            }

        })
        .catch(error => {
            console.error('Error fetching environment:', error);
        });
}

    // Set the state of an LED
    function setLED(color, state) {
    fetch(`${raspberryPiServerUrl}/led/${color}/${state}`)
        .then(response => response.json())
        .then(data => {
            console.log('LED state changed:', data);
        });
}

    // Toggle the state of an LED based on a checkbox input
    function toggleLED(color, checkbox) {
    setLED(color, checkbox.checked ? 'on' : 'off');
}

    // Fetch temperature and humidity data and update it on the page
    function updateTemperatureAndHumidity() {
    fetch(`${raspberryPiServerUrl}/temperature-humidity`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('temperature').innerHTML = `Temperature: ${data.temperature}°C`;
            document.getElementById('humidity').innerHTML = `Humidity: ${data.humidity}%`;
            const lastUpdated = new Date().toLocaleString();
            document.getElementById('last-updated').innerHTML = `Last updated: ${lastUpdated}`;
        })
        .catch(error => {
            console.error('Error fetching LED state:', error);
        });
}

    // Toggle the motion sensor and update on the page
    function toggleMotionSensor() {
        const motionSensorToggle = document.getElementById('motion-sensor-toggle');
        const motionSensorStatus = document.getElementById('motion-status');
        const motionLastUpdate = document.getElementById('motion-last-update');

        fetch(`${raspberryPiServerUrl}/motion-sensor/toggle`)
            .then(response => response.json())
            .then(data => {
        const motionSensorStatus = document.getElementById('motion-status');

                if (data.motionSensorEnabled) {
                    motionSensorStatus.textContent = 'Status: Enabled';
                    motionSensorStatus.style.color = 'green';
                    motionSensorToggle.checked = true;

                    updateMotionStatus();
                    // Poll the server every 1 second (1000 ms)
                    intervalMotion = setInterval(updateMotionStatus, 1000);

                } else {
                    clearInterval(intervalMotion); // stop polling
                    motionSensorStatus.textContent = 'Status: Disabled';
                    motionSensorStatus.style.color = 'black'
                    motionSensorToggle.checked = false;
                    motionLastUpdate.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error toggling motion sensor:', error);
            });
    }

    // Check Raspberry Pi online status and update it on the page
    function checkPiStatus() {
    fetch(`/pi-status`)
        .then(response => response.json())
        .then(data => {
            console.log('Received Pi status:', data);
            const piStatusElement = document.getElementById('pi-status');
            const piContentElement = document.getElementById('pi-content');
            if (data.online) {
                piStatusElement.textContent = 'Raspberry Pi status: Online';
                piContentElement.style.display = 'block'; // Show the content when Pi is online
            } else {
                piStatusElement.textContent = 'Raspberry Pi status: Offline';
                piContentElement.style.display = 'none'; // Hide the content when Pi is offline
            }
        })
        .catch(error => {
            console.error('Error fetching Pi status:', error);
        });
}

    // Fetch motion sensor status and update on the display
    function updateMotionStatus() {
        fetch(`${raspberryPiServerUrl}/motion-status`)
            .then((response) => response.json())
            .then((data) => {
                const statusElement = document.getElementById('motion-status');
                const lastUpdateElement = document.getElementById('motion-last-update');

                if (data.status === 'Motion detected') {
                    statusElement.innerText = `Status: ${data.status}`;
                    lastUpdateElement.style.display = 'block';
                    const lastUpdateDate = new Date(data.lastUpdate);
                    lastUpdateElement.innerText = `Last updated: ${lastUpdateDate.toLocaleString()}`;
                } else if(data.status === 'No motion'){
                    statusElement.innerText = `Status: ${data.status}`;
                    lastUpdateElement.style.display = 'block';
                    const lastUpdateDate = new Date(data.lastUpdate);
                    lastUpdateElement.innerText = `Last updated: ${lastUpdateDate.toLocaleString()}`;
                }

                console.log(data.status); // Display the status in the console as well


            })
            .catch((error) => {
                console.error('Error fetching motion status:', error);
            });
    }


    // On window load, set up initial fetches and intervals
    window.onload = function() {

    //check whether Raspberry Pi is running and hosting the my_server.js
    checkPiStatus();

    // Fetch environment information for setting up the correct Raspberry URL
    fetchEnvironment();

    // Fetch temperature and humidity data when the page loads
    updateTemperatureAndHumidity();

    // Fetching temp and humidity information every 3 sec
    setInterval(updateTemperatureAndHumidity, 3000);


};
