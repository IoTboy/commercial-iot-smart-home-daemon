var zigbeeDevice = require('commercial-zigbee-device-daemon');
var config = require('./config.json');

var m = require('mraa'); //require mraa
var groveSensor = require('jsupm_grove');
var upmBuzzer = require("jsupm_buzzer");// Initialize on GPIO 5
var myBuzzer = new upmBuzzer.Buzzer(5);

// Import the Utilities functions
var utils = require("./utils.js");

// Print sensor name
console.log(myBuzzer.name());

console.log('MRAA Version: ' + m.getVersion()); //write the mraa version to the

var interval = 0;
var zigbee = new zigbeeDevice(config);
zigbee.init();

var myDigitalPin = new m.Gpio(2); //setup digital read on pin 6
myDigitalPin.dir(m.DIR_IN); //set the gpio direction to input

var light = new groveSensor.GroveLight(1);

// Create the temperature sensor object using AIO pin 0
var temp = new groveSensor.GroveTemp(0);
console.log(temp.name());

// Read the temperature ten times, printing both the Celsius and
// equivalent Fahrenheit temperature, waiting one second between readings
var i = 0;
var waiting = setInterval(function() {
        var celsius = temp.value();
        var fahrenheit = celsius * 9.0/5.0 + 32.0;
        console.log(celsius + " degrees Celsius, or " +
            Math.round(fahrenheit) + " degrees Fahrenheit");
        i++;
	if(fahrenheit > 80) {
	  console.log('Buzzer ON');
	  myBuzzer.playSound(upmBuzzer.DO, 1000000);
	}
//        if (i == 10) clearInterval(waiting);
        }, 1000);

periodicActivity(); //call the periodicActivity function

function periodicActivity() //
{
  var motionDetected =  myDigitalPin.read(); //read the digital value of the pin
  console.log('Gpio is ' + motionDetected); //write the read value out to the co
  var luxValue = light.value() * 10;
//  console.log('Light Raw Value: ' + light.raw_value());
  console.log('Lux Value: ' + luxValue);
  var intensity =  0.254 * ( 1000 - luxValue);
  var reqdBrightness = utils.float2int(intensity);
  console.log('Required Brightness: ' + reqdBrightness);
//  if(luxValue < 25)
    zigbee.changeBrightness(reqdBrightness);    
  if(motionDetected)
    interval = 2000;
  else
    interval = 500;
  //zigbee.setPower(motionDetected);
  
  setTimeout(periodicActivity, interval); //call the indicated function after 1 secon
}

// Print message when exiting
process.on('SIGINT', function()
{
	console.log("Exiting...");
	process.exit(0);
});

return;
var zigbee = new zigbeeDevice(config);
zigbee.init();
setInterval(function() {

        zigbee.setColor(zigbee.colorCluster_HueLivingRoom, '#0000FF');

}, 10000);

setInterval(function() {

	zigbee.setColor(zigbee.colorCluster_HueLivingRoom, '#FF0000');
}, 15000);

