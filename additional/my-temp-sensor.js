const i2c = require('i2c-bus');

const busNumber = 1; // Use 1 for Raspberry Pi 3 and newer
const address = 0x38; // Sensor address

const CMD_INIT_CHECK = 0x71; // Command to check initialization
const CMD_MEASURE_TEMP_HUM = 0xAC; // Command to measure temperature and humidity

const i2c1 = i2c.openSync(busNumber);

function readTemperatureAndHumidity() {
  const initBuffer = Buffer.from([0x00]); // Create a buffer to store the initialization check result
  i2c1.readI2cBlock(address, CMD_INIT_CHECK, 1, initBuffer, (err, bytesRead, buffer) => { // Check initialization
    if (err) {
      console.error(`Error checking initialization: ${err}`);
      return;
    }
    if ((initBuffer[0] | 0x08) == 0) {
      console.error('Initialization error');
      return;
    }
    const measureBuffer = Buffer.from([0x33, 0x00]); // Create a buffer to store the measurement command
    i2c1.writeI2cBlock(address, CMD_MEASURE_TEMP_HUM, 2, measureBuffer, (err) => { // Send command to measure temperature and humidity
      if (err) {
        console.error(`Error sending command to measure temperature and humidity: ${err}`);
        return;
      }
      setTimeout(() => { // Wait for measurement to complete
        const dataBuffer = Buffer.alloc(7); // Create a buffer to store the temperature and humidity data
        i2c1.readI2cBlock(address, CMD_INIT_CHECK, 7, dataBuffer, (err, bytesRead, buffer) => { // Read temperature and humidity data
          if (err) {
            console.error(`Error reading temperature and humidity data: ${err}`);
            return;
          }
          const Traw = ((dataBuffer[3] & 0xf) << 16) + (dataBuffer[4] << 8) + dataBuffer[5];
          const temperature = 200 * Traw / Math.pow(2, 20) - 50; // Calculate temperature in degrees Celsius
          const Hraw = ((dataBuffer[3] & 0xf0) >> 4) + (dataBuffer[1] << 12) + (dataBuffer[2] << 4);
          const humidity = 100 * Hraw / Math.pow(2, 20); // Calculate relative humidity
          console.log(`Temperature: ${temperature.toFixed(2)}°C, Humidity: ${humidity.toFixed(2)}%`);
        });
      }, 100); // Wait 100ms for measurement to complete
    });
  });
}

readTemperatureAndHumidity(); // Call the function to read temperature and humidity
