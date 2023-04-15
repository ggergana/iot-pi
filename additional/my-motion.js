const Gpio = require('onoff').Gpio;

// set GPIO for the flowing LEDs signal
const LED5 = new Gpio(5, 'out');
const LED25 = new Gpio(25, 'out');
const  LED13 = new Gpio(13, 'out');
const  LED26 = new Gpio(26, 'out');
const  LED16 = new Gpio(16, 'out');


// set up GPIO pin 17 as input for PIR motion sensor
const pir = new Gpio(17, 'in', 'both');

//Put all the LED variables in an array
var leds = [LED5, LED25, LED13, LED26, LED16];
var indexCount = 0; //a counter
dir = "up"; //variable for flowing direction

function flowAfterMove(fn, n, delay) {

    leds.forEach(function(currentValue) { //for each item in array
        currentValue.writeSync(0); //turn off LED
    });

    if (n <= 0) {
        return;
    }
    fn();
    setTimeout(() => {
        setImmediate(() => {
            flowAfterMove(fn, n - 1, delay);
        });
    }, delay);
}

function flowingLeds() { //function for flowing Leds
    if (indexCount == 0) dir = "up"; //set flow direction to "up" if the count >
    if (indexCount >= leds.length) dir = "down"; //set flow direction to "down">
    if (dir == "down") indexCount--; //count downwards if direction is down
    leds[indexCount].writeSync(1); //turn on LED that where array index matches>
    if (dir == "up") indexCount++ //count upwards if direction is up
};

function turnOff() { //function to run when exiting program
    leds.forEach(function(currentValue) { //for each LED
        currentValue.writeSync(0); //turn off LED
    });
};

// listen for changes in PIR motion sensor state
pir.watch((err, value) => {
    if (err) {
        console.error('Error reading PIR motion sensor:', err);
        return;
    }

    else  if (value == 1) {
        console.log('Motion detected');
        flowAfterMove(flowingLeds,leds.length*2 + 1,100);
        indexCount = 0;

    } else {
        console.log('Motion ended');
        turnOff();
    }
});

// clean up GPIO on exit
process.on('SIGINT', () => {
    pir.unexport();
    leds.forEach(function(currentValue) { //for each LED
        currentValue.writeSync(0); //turn off LED
        currentValue.unexport(); //unexport GPIO
    });
    process.exit();
});




