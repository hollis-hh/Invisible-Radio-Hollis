/* Personal Notes - PLEASE READ:
Switched from a 'Heart Rate Pulse Sensor' to a 'Grove - Ear Clip Heart Rate Sensor'. I realise that they can be used with the same library.
I used the Ear Clip Heart Rate Sensor because it gives a more accurate result and also applies to the condition of becoming a wearable device.
It is more convinient for attatchment to the ear without the sensor being affected when there is movement. It also links with my concept of controlling the volume of sound using the heartbeat.
The location of the heartbeat sensor is near to the ear, which is the main mechanism to listen to sound. It almost feels as if the users can 'hear' their heartbeat whilst using it to control the volume of sound.
- The Code prints the BPM to the Serial Monitor to detect heartbeat
--------------------------------------------------------------------
#define USE_ARDUINO_INTERRUPTS true    // Set-up low-level interrupts for most acurate BPM math. (important for precise timing in heartbeat detection.)
#include <PulseSensorPlayground.h>     // Includes the PulseSensorPlayground Library.   


//  Variables
const int PulseWire1 = 0;  // HeartRate Sensor wire connected to ANALOG PIN 0 (first sensor)
const int PulseWire2 = 1; // HeartRate Sensor wire connected to ANALOG PIN 1 (second sensor)
//const int LED = 4;        // LED PIN 4 for the first sensor (For visibility when viewing code)
//const int LED2 = 5;        // LED PIN 5 for the second sensor (For visibility when viewing code)

int Threshold0 = 550;      //// Threshold for the first sensor
int Threshold1 = 550;     // Threshold for the second sensor


PulseSensorPlayground heartSensor1; // Creates an instance of the PulseSensorPlayground object for the first sensor
PulseSensorPlayground heartSensor2; // Creates an instance of the PulseSensorPlayground object for the second sensor called "heartSensor2"


void setup() {   

  Serial.begin(9600);          // For Serial Monitor

  // Double-check the "pulseSensor" object was created and "began" seeing a signal. 
   if (heartSensor1.begin()) {
  }

// Configure the HeartSensor object, by assigning our variables to it. 
  heartSensor1.analogInput(PulseWire1);   //analog input pin for the Heart Sensor(3)
  heartSensor1.setThreshold(Threshold0);   
  //heartSensor.blinkOnPulse(LED);       //auto-magically blink Arduino's LED with heartbeat.
  
  //Double-check the "heartSensor2" object was created and "began" seeing a signal.
  if (heartSensor2.begin()) {
  }


  heartSensor2.analogInput(PulseWire2);   // Analog input pin for the second Heart Sensor (1)
  heartSensor2.setThreshold(Threshold1);
  //heartSensor2.blinkOnPulse(LED2);        // Auto-magically blink Arduino's LED with the second heartbeat.

 }


void loop() {
  
 if (heartSensor1.sawStartOfBeat()) {            // Constantly test to see if "a beat happened".
 int myBPM = heartSensor1.getBeatsPerMinute();  // Calls function on our Heart Sensor object that returns BPM as an "int".
                                               // "myBPM" hold this BPM value now. 
 Serial.print("BPM1: ");                        // Print phrase "BPM1: " 
 Serial.println(myBPM);                        // Print the value inside of myBPM. 
}

if (heartSensor2.sawStartOfBeat()) {
int myBPM2 = heartSensor2.getBeatsPerMinute();
Serial.print("BPM2: ");   
Serial.println(myBPM2); 
  
}

//if (heartSensor1.sawStartOfBeat() && heartSensor2.sawStartOfBeat()) {  
  //int myBPM1 = heartSensor1.getBeatsPerMinute();
  //int myBPM2 = heartSensor2.getBeatsPerMinute();
 // Serial.println(myBPM1);
  //Serial.print(",");
  //Serial.println(myBPM2);
//}

delay(200);

}
-------------------------------------------------------------------- */

/*
   Arduino Sketch to detect pulses from two PulseSensors.

   Here is a link to the tutorial
   https://pulsesensor.com/pages/two-or-more-pulse-sensors

   Copyright World Famous Electronics LLC - see LICENSE
   Contributors:
     Joel Murphy, https://pulsesensor.com
     Yury Gitman, https://pulsesensor.com
     Bradford Needham, @bneedhamia, https://bluepapertech.com

   Licensed under the MIT License, a copy of which
   should have been included with this software.

   This software is not intended for medical use.
*/

/*
   Every Sketch that uses the PulseSensor Playground must
   define USE_ARDUINO_INTERRUPTS before including PulseSensorPlayground.h.
   Here, #define USE_ARDUINO_INTERRUPTS false tells the library to
   not use interrupts to read data from the PulseSensor.

   If you want to use interrupts, simply change the line below
   to read:
     #define USE_ARDUINO_INTERRUPTS true

   Set US_PS_INTERRUPTS to false if either
   1) Your Arduino platform's interrupts aren't yet supported
   by PulseSensor Playground, or
   2) You don't wish to use interrupts because of the side effects.

   NOTE: if US_PS_INTERRUPTS is false, your Sketch must
   call pulse.sawNewSample() at least once every 2 milliseconds
   to accurately read the PulseSensor signal.
*/

/* sketch above does not work - only prints one BPM value from one heart sensor 
- It seems that the code for printing one heart sensor BPM value
 is overwriting itself over another heart rate sensor 
--------------------------------------------------------------------
*/


//CORRECT SKETCH FOR TWO PULSE SENSORS//

#define USE_ARDUINO_INTERRUPTS true
#include <PulseSensorPlayground.h>


/*
   The format of our output.

   Set this to PROCESSING_VISUALIZER if you're going to run
    the multi-sensor Processing Visualizer Sketch.
    See https://github.com/WorldFamousElectronics/PulseSensorAmped_2_Sensors

   Set this to SERIAL_PLOTTER if you're going to run
    the Arduino IDE's Serial Plotter.
*/
const int OUTPUT_TYPE = SERIAL_PLOTTER;

/*
   Number of PulseSensor devices we're reading from.
*/
const int PULSE_SENSOR_COUNT = 2;

/*
   Pinout:
     PULSE_INPUT = Analog Input. Connected to the pulse sensor
      purple (signal) wire. Ends with index number.
     PULSE_BLINK = digital Output. Connected to an LED (and 1K series resistor)
      that will flash on each detected pulse. Ends with index number.
     PULSE_FADE = digital Output. PWM pin onnected to an LED (and 1K series resistor)
      that will smoothly fade with each pulse. Ends with index number.
      NOTE: PULSE_FADE must be a pin that supports PWM. Do not use
      pin 9 or 10, because those pins' PWM interferes with the sample timer. Ends with index number.
     THRESHOLD should be set higher than the PulseSensor signal idles
      at when there is nothing touching it. The expected idle value
      should be 512, which is 1/2 of the ADC range. To check the idle value
      open a serial monitor and make note of the PulseSensor signal values
      with nothing touching the sensor. THRESHOLD should be a value higher
      than the range of idle noise by 25 to 50 or so. When the library
      is finding heartbeats, the value is adjusted based on the pulse signal
      waveform. THRESHOLD sets the default when there is no pulse present.
      Adjust as neccesary.  Ends with index number.
*/
const int PULSE_INPUT0 = A0;
const int PULSE_BLINK0 = 7;
const int PULSE_FADE0 = 5;

const int PULSE_INPUT1 = A1;
const int PULSE_BLINK1 = 12;
const int PULSE_FADE1 = 11;

const int THRESHOLD0 = 550;  
const int THRESHOLD1 = 550; 

/*
   All the PulseSensor Playground functions.
   We tell it how many PulseSensors we're using.
*/
PulseSensorPlayground pulseSensor(PULSE_SENSOR_COUNT);

void setup() {
  /*
     Use 250000 baud because that's what the Processing Sketch expects to read,
     and because that speed provides about 25 bytes per millisecond,
     or 50 characters per PulseSensor sample period of 2 milliseconds.

     If we used a slower baud rate, we'd likely write bytes faster than
     they can be transmitted, which would mess up the timing
     of readSensor() calls, which would make the pulse measurement
     not work properly.
  */
  Serial.begin(250000);

  /*
     Configure the PulseSensor manager,
     telling it which PulseSensor (0 or 1)
     we're configuring.
  */

  pulseSensor.analogInput(PULSE_INPUT0, 0);
  pulseSensor.blinkOnPulse(PULSE_BLINK0, 0);
  pulseSensor.fadeOnPulse(PULSE_FADE0, 0);
  pulseSensor.setThreshold(THRESHOLD0, 0);

  pulseSensor.analogInput(PULSE_INPUT1, 1);
  pulseSensor.blinkOnPulse(PULSE_BLINK1, 1);
  pulseSensor.fadeOnPulse(PULSE_FADE1, 1);
  pulseSensor.setThreshold(THRESHOLD1, 1);

  pulseSensor.setSerial(Serial);
  pulseSensor.setOutputType(OUTPUT_TYPE);


  // Now that everything is ready, start reading the PulseSensor signal.
  if (!pulseSensor.begin()) {
    /*
       PulseSensor initialization failed,
       likely because our Arduino platform interrupts
       aren't supported yet.

       If your Sketch hangs here, try changing USE_ARDUINO_INTERRUPTS to false.
    */
    for (;;) {
      // Flash the led to show things didn't work.
      digitalWrite(PULSE_BLINK0, LOW);
      delay(50);
      digitalWrite(PULSE_BLINK0, HIGH);
      delay(50);
    }
  }
}

void loop() {

  /*
     Wait a bit.
     We don't output every sample, because our baud rate
     won't support that much I/O.
  */
  delay(20);

  // write the latest sample to Serial.
  //pulseSensor.outputSample();

  /*
     If a beat has happened on a given PulseSensor
     since we last checked, write the per-beat information
     about that PulseSensor to Serial.
  */
  for (int i = 0; i < PULSE_SENSOR_COUNT; ++i) {
    if (pulseSensor.sawStartOfBeat(i)) {
       Serial.print(i);
      Serial.print(" ");
      Serial.println(pulseSensor.getBeatsPerMinute(i));
    }
  }
}

