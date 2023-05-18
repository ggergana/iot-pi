# IoT-Pi

## Description
An Internet of Things prototype with Raspberry Pi 3 consisting of controlable LEDs, temperature sensor and motion sensor
This Node.js application consists of two servers, `heroku_server.js` and `my_server.js`. `heroku_server.js` is deployed on Heroku and serves an `index.html` file and a `main.js` file. It determines the environment in which the application is running to use the appropriate URL for `my_server.js`, which is called through its endpoints. `my_server.js` runs on a Raspberry Pi machine and has several methods for LED toggling, motion sensor information, and temperature sensor information. It connects to the Raspberry Pi through its GPIO pins and a breadboard.

## Prerequisites

- Raspberry Pi (with GPIO pins and a breadboard)
- Node.js v18.x.x or newer
- LED, motion sensor, and temperature sensor modules

## Installation


- node my-server.js -> this starts the main application, it has to be on 
runnign on the Rapsberry Pi device
- node heroku_server.js starts the server that acts as a client to my-server.js, needed if one needs to access the features remotely

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Clone the repository.
3. Navigate to the project directory and run `npm install` to install the required dependencies.
4. Run the server using `node my_server.js`. This is the main application and in order for the programm to function, it has to run on the Raspberry Pi
5. The server will start running on port 3000 or the port specified in the `PORT` environment variable.

**Package.json is configured to launch `node heroku_server.js` therefor the command `npm run` won't work locally. This is configured so, because the same repo is deployed to Heroku
. However, there the main file is `heroku_server.js` as it is the script sending requests to  `my_server.js`
and enabling remote connection. If the app is intended to be used locally one could alter the package.json file so that `node my_server.js` and omit `heroku_server.js`.
   
## API

### 1. GET Motion Status
- **URL**: `/motion-status`
- **Method**: `GET`
- **Description**: Returns the motion sensor status and last update timestamp.

**Response**

- **Status**: `200`
- **Content**: `{ status, lastUpdate}`
- **Example**:
```json
{
  "status": "Motion detected",
  "lastUpdate": "2023-04-10T10:00:00.000Z"
}
```

### 2. Get Environment

- **URL**: `/environment`
- **Method**: `GET`
- **Description**: Fetches the current environment and the Raspberry Pi server URL.

**Response**

- **Status**: `200`
- **Content**: `{ environment, raspberryPiServerUrl}`
- **Example**:
```json
{
  "environment": "development",
  "raspberryPiServerUrl": "https://htwg-raspberrypi.duckdns.org/"
}
```


### 3. GET Heartbeat

- **URL**: `/heartbeat`
- **Method**: `GET`
- **Description**: Registers a heartbeat from the Raspberry Pi.

**Response**

- **Status**: `200`
- **Content**: `{message}`
- **Example**:

```json
{
  "message": "Heartbeat received"
}
```

### 4. GET /pi-status

Returns the online status of the Raspberry Pi based on the last received heartbeat.

**Response:**

```json
{
  "online": true
}
```

### 5. GET /led/:color/:state

Sets the state of the specified LED color.

Path parameters:

- color: The LED color (red, green, blue, yellow, or white)
- state: The desired state (on or off)

**Response:**

```json
{
  "success": true
}
```

### 6. GET /temperature-humidity

Returns the temperature and humidity data.

**Response:**
```json
{
  "temperature": 25.2,
  "humidity": 50.0
}
```


### 7. GET /motion-sensor/toggle

Toggles the motion sensor on or off.

**Response:**
```json
{
  "motionSensorEnabled": true
}
```


## Contact

gerganagermanova01@gmail.com

