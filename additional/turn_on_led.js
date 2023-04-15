const Gpio = require('onoff').Gpio;

function toggleLED(color, state){
    const led = gpioMapping[color];
    led.write(state);
}
