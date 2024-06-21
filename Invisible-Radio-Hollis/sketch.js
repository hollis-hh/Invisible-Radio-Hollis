// Declare variables
let gap = 20
let cirNum = 23; //[change later, replace with volume(?)]
let cirSize = 20; //[replace with sensorValue]
let angle1 = 0;
let angle2 = 0;

//Sound
let playSoundTrigger1 = true;
let playSoundTrigger2 = true;
let playSoundTrigger3 = true;
let soundL, soundR, soundCombo;

//Heart
let pin;
let data0, data1;
let val;
let mappedVal;

//Start of serial communication
let port; // Serial Library in p5.js (enables communication over a serial port)
let connectBtn; // A button that will be used to connect and disconnect from Arduino


function preload() {
  // Initialize sound
  soundL = loadSound("assets/book1-prelude01.mp3"); //J.S. Bach - Prelude no. 1 in C major 
  soundR = loadSound("assets/book1-prelude02.mp3"); //J.S. Bach - Prelude no. 2 in C minor
  soundCombo = loadSound("assets/soundCombo.mp3");  //
}

function setup() {
  createCanvas(windowWidth, windowHeight);
   
 // Serial communication to Arduino button
  port = createSerial(); //Serial connection
  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(20, 20); //position of button
  connectBtn.mousePressed(connectBtnClick); //if button is clicked run connectBtnClick function below

 // Rotation
  angleMode(degrees);
  data0 = 0;
  data1 = 0;

}

function draw() {
background (0);

 // Arduino serial communication - Heart Rate Sensors
let val = port.readUntil("\n"); // print data until "\n" = [adds new line]
//console.log(val);

if (val) {
  let sensorValues = val.split(' '); // Split heart sensors into 2 values
  if (sensorValues.length >= 2) {
    let pin = int(sensorValues[0]);
    let sensorValue = int(sensorValues[1]);
    console.log("pin:", pin);
    console.log("sensorvalue:", sensorValue);
   
    if (pin === 0) {
      data0 = sensorValue;
  }else if (pin == 1){
      data1 = sensorValue;
  }

// Mapping heart rate to volume of music
  mappedVal = 0;
  if(sensorValue > 80) {
    mappedVal = 1.0
  } else if(sensorValue < 150){
    mappedVal = map(sensorValue, 50, 150, 0, 1);
  
  soundL.setVolume(mappedVal);
  soundR.setVolume(mappedVal);
  }

  console.log(mappedVal);
  

// Changes button label based on connection status
if (!port.opened()) {
  connectBtn.html('Connect to Arduino');
} else {
  connectBtn.html('Disconnect');

  //A0 = LEFT HEART
  //A1 = RIGHT HEART

  // Handle sound-related code outside of pin checks
  if (playSoundTrigger1 && pin === 0) {
    soundL.loop();
    soundL.play();
    playSoundTrigger1 = false;
  }

  
  if (playSoundTrigger2 && pin === 1) {
    soundR.loop();
    soundR.play();
    playSoundTrigger2 = false;
  }

// Heart (L) related code [Score 1]
  if (pin === 0) {
  if (playSoundTrigger1) {
    soundL.loop();
    soundL.play();
    playSoundTrigger1 = false;
  }

  push();
  //soundCombo.stop();
  soundR.stop();
  translate(width / 4, height / 2);
  rotate(angle1);
  angle1 = angle1 - 3.3;
  noFill();
  stroke(255, 0, 0);
  strokeWeight(2);

  for (let i = 0; i < cirNum; i++) {
    arc(0, 0, data0 / 2 + gap * i, data0 / 2 + gap * i, 45, 360 - i - 2.1 / 0.912933);
  }
} 

else {
  // Stop sound and reset trigger for pin 0
  soundL.stop();
  playSoundTrigger1 = true;
}

// Heart (R) related code [Score 2]
if (pin === 1) {
  if (playSoundTrigger2) {
    soundR.loop();
    soundR.play();
    playSoundTrigger2 = false;
  }

  push();
  //soundCombo.stop();
  soundL.stop();
  translate(width / 1 - 400, height / 2);
  rotate(angle2);
  angle2 = angle2 + 3.3;
  noFill();
  stroke(0, 0, 255);
  strokeWeight(2);

  for (let i = 0; i < cirNum; i++) {
    arc(0, 0, data1 / 2 + gap * i, data1 / 2 + gap * i, 60, 90 - i / 0.912933);
  }
  pop();
} else {
  // Stop sound and reset trigger for pin 1
  soundR.stop();
  playSoundTrigger2 = true;
}

  if (pin !== 0 && pin !== 1) {
      soundR.stop();
      soundL.stop();
    }

// Threshold for both heart rates to match
// If 2 data values >= 110, play soundCombo [Score 3]
const threshold = 110; 

if (Math.abs(data0 && data1) >= threshold) {
  if (playSoundTrigger3) {
    soundCombo.play();
    soundCombo.loop();
    playSoundTrigger3 = false;
  }
} else {
  soundCombo.stop();
}

  }

 }

}

//Text for incoming data (HEART L)
push();

fill(255);
stroke(255);
textSize(15);
strokeWeight(1);
text("Heart Rate:", 100, windowHeight/1.12);
text(data0, 200, windowHeight/1.12);
text("Volume:", 100, windowHeight/1.08);
text(mappedVal, 200, windowHeight/1.08); 
textSize(50);
stroke(255);
text("L", 500, windowHeight/1.08);
pop();

//Text for incoming data (HEART R)
push();
fill(255);
stroke(255);
textSize(15);
strokeWeight(1);
text("Heart Rate:", 1000, windowHeight/1.12);
text(data1, 1100, windowHeight/1.12);
text("Volume:", 1000, windowHeight/1.08);
text(mappedVal, 1100, windowHeight/1.08); 
textSize(50);
stroke(255);
text("R", 800, windowHeight/1.08);
pop();

}

// This function runs when 'connect' button is clicked
function connectBtnClick() {
  if (!port.opened()) {//If port is not already open/connected
    port.open('Arduino', 9600); //Open a connection at baud rate 9600

  } else { 
    //Otherwise close port connection 
    port.close();
  }

}
//CODE ENDS HERE



// ADDITIONAL CODE EXPERIMENTATION
/*
    if (data0 == data1){
      if (playSoundTrigger3) {
        soundCombo.play();
        playSoundTrigger3 = false;
      } 
    }

    //----- Circle 2: Heart (R) STOP--------//
    push();// push and pop function to lock code in;
    translate(width/ 1 - 400, height/2);
    noFill();
    stroke(255,0,0);
    strokeWeight(1);
  for (let i = 0; i < cirNum; i++) {
    arc(0, 0, cirSize + gap * i,cirSize + gap * i, 60, 90 - i);
  }
  pop();


  if (pin === 0) {
  //IF HEART L IS DETECTED - ROTATE CIRCLE L, SOUNDTRACK 1 PLAY - ELSE NO ROTATION, NO SOUNDTRACK
  //heart sensor [A0]
  //----- Circle 1: Heart (L) --------//
    push();// push and pop function to lock code in
  //using translation and roation function together (movement of circle);
    //CIRCLE L:  //if Heart (L) is detected, rotate circle angle counterclockwise
    if(playSoundTrigger1){
      soundL.loop();
      soundL.play();
      playSoundTrigger1 = false;
    } 

    translate(width/4, height/2);
    rotate(angle1);
    angle1 = angle1 - 3.3; //rotating angle to heart rate?
    //^ (L) rotation will occur when an event has happened - detect Heart rate (L)
    noFill();
    stroke(255,0,0);
    strokeWeight(2);
    
   for (let i = 0; i < cirNum; i++) {
      //circle(width/4, height/2, cirSize + gap * i);
      //circle(0, 0, cirSize + gap * i);
      arc(0, 0, data0/2 + gap * i,data0/2 + gap * i, 45, 360 - i-2.1/ .912933);
    }
    pop();

  }

    else {
      push();
      soundL.stop();
    
  }

//------THIS IS FOR RIGHT CIRCLE - IF SENCOND HEART RATE IS DETECTED!!!------
if (pin === 1) {
  //----- Circle 2: Heart (R) --------//
  push();// push and pop function to lock code in
  if(playSoundTrigger2){
    soundR.loop();
    soundR.play();
    playSoundTrigger2 = false;
  } 
  translate(width/ 1 - 400, height/2);
  rotate(angle2);
  angle2 = angle2 + 3.3; //rotate speed/angle based on heart rate
  //^ (R) rotation will occur when an event has happened - detect Heart rate (R)
  noFill();
  stroke(0,0,255);
  strokeWeight(2);
  //for(let i = 0; i < 20; i++){
  //  circle(width/ 1 - 350, height/2, 50 + gap * i)

for (let i = 0; i < cirNum; i++) {
  //circle(width/ 1 - 400, height/2, cirSize + gap * i);
  //circle(0, 0, cirSize + gap * i);
  arc(0, 0, data1/2 + gap * i,data1/2 + gap * i, 60, 90 - i/ .912933);
}
pop();
  }
  
  else {
      //----- Circle 1: Heart (L) STOP--------//
    push();
    soundR.stop();
    translate(width/4, height/2);
    noFill();
    stroke(255,0,0);
    strokeWeight(1);
    for (let i = 0; i < cirNum; i++) {
      arc(0, 0, data1 + gap * i,data1 + gap * i, 45, 360 - i);
    }
    pop();
  }

if (pin === 0 & 1) {
  push();// push and pop function to lock code in
  //using translation and roation function together (movement of circle);
    //CIRCLE L:  //if Heart (L) is detected, rotate circle angle counterclockwise
    translate(width/4, height/2);
    rotate(angle1);
    angle1 = angle1 - 3.3; //rotating angle to heart rate?
    //^ (L) rotation will occur when an event has happened - detect Heart rate (L)
    noFill();
    stroke(0,255,0);
    strokeWeight(2);
    
    for (let i = 0; i < cirNum; i++) {
      //circle(width/4, height/2, cirSize + gap * i);
      //circle(0, 0, cirSize + gap * i);
      arc(0, 0, cirSize + gap * i,cirSize + gap * i, 45, 360 - i-2.1/ .912933);
    }
    pop();

  push();// push and pop function to lock code in
  translate(width/ 1 - 400, height/2);
  rotate(angle2);
  angle2 = angle2 + 3.3; //rotate speed/angle based on heart rate
  //^ (R) rotation will occur when an event has happened - detect Heart rate (R)
  noFill();
  stroke(0,255,0);
  strokeWeight(2);
  //for(let i = 0; i < 20; i++){
  //  circle(width/ 1 - 350, height/2, 50 + gap * i)

for (let i = 0; i < cirNum; i++) {
  //circle(width/ 1 - 400, height/2, cirSize + gap * i);
  //circle(0, 0, cirSize + gap * i);
  arc(0, 0, cirSize + gap * i,cirSize + gap * i, 60, 90 - i/ .912933);
}
pop();

}
*/