# IoT-Pi

## Description
An Internet of Things prototype with Raspberry Pi 3 consisting of controlable LEDs, temperature sensor and motion sensor
This Node.js application consists of two servers, `heroku_server.js` and `my_server.js`. `heroku_server.js` is deployed on Heroku and serves an `index.html` file and a `main.js` file. It determines the environment in which the application is running to use the appropriate URL for `my_server.js`, which is called through its endpoints. `my_server.js` runs on a Raspberry Pi machine and has several methods for LED toggling, motion sensor information, and temperature sensor information. It connects to the Raspberry Pi through its GPIO pins and a breadboard.

## Prerequisites

- Raspberry Pi (with GPIO pins and a breadboard)
- Node.js v18.x.x or newer
- LED, motion sensor, and temperature sensor modules

## Installation

// Include detailed installation steps here.

## Configuration

1. Make sure you have [Node.js](https://nodejs.org/) installed.
2. Clone the repository.
3. Navigate to the project directory and run `npm install` to install the required dependencies.
4. Run the server using `npm start` or `node heroku_server.js`.
5. The server will start running on port 3000 or the port specified in the `PORT` environment variable.
Package.json is configured to launch heroku_server.js this has to be changed if the projec is being run locally by npm start. Put my_server.js there as this is the main file, 

## Usage

// Include usage instructions and examples here.

### LED Toggling

// Include instructions and examples for LED toggling.

### Motion Sensor

// Include instructions and examples for motion sensor information.

### Temperature Sensor

// Include instructions and examples for temperature sensor information.

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


## Troubleshooting

// Include troubleshooting tips here.

## Contributing

// Include contribution guidelines here, if applicable.

## License

// Include license information here.

## Contact

// Include contact information here.

