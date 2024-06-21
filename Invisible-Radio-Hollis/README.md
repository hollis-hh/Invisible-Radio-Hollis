# Invisible-Radio-Hollis
 
Invisible Radio Project - Hollis Hui (19001548)

Title: 2 Hearts 1 Conductor

Youtube Link: https://youtu.be/9CcbTBtnt7Y

Utilizing the 'heartbeat' as an interface for communication and connection. 
This project invites two participants to synchronize their heart rates, tuning into the same channel.

Concept:
Inspired by the historical approaches on radio communication in short-wave radios and ham radios, I am particularly interested in the notion of ‘uncertainty’ when attempting to find a clear connection. What interfaces can be used to represent the notion of ‘finding connection’ and ‘losing connection? What is required for a connection or conversation to be maintained? What if both channels loses connection? How does this influence the feedback? Upon my research on how radios have been used socially to engage in conversation and communication, I aim to create a human-computer interface by exploring input through physiological changes in the body. For the Invisible Radio, I am using the participants’ heart beat to explore the boundaries and possibilities of ‘finding’ and ‘losing’ connection; thereby looking into mis-communication. Can our physiological changes become a tool of communication and connection? 

Research:
Research has shown that audience members’ hearts beat together at the live concerts, especially when listening to classical music. According to the research study conducted by Dr Joe Devlin, Dr Daniel C. Richardson, John Hogan and Dr Helen Nuttall, a ‘shared experience’ can lead to the synchronisation of heartbeat (physiological response), whereas when no experience is shared, your heart rate reverts back to normal where the people's hearts beat at their own time. In this project, I attempt to demonstrate this phenomenon where when two heart rates are synchronised together, this becomes a shared experience, a connection between two strangers. The research suggests that going to the theatre and listening to classical music, can connect individuals on a deeper level, enhancing social bonds between people.


 OBJECTIVES:

•	Participants must regulate their heartbeat to stay on the same line. If the heartbeats do not reach the designated threshold, communication is lost. This reinforces the participants to remain at a certain state to achieve synchronisation and successful communication. This also introduces a novel and physiological dimension to the concept of frequency matching.

•	The synchronization of heart rates serves a similar purpose to radio communication, where the user must select a frequency to ensure clear communication.

•	When irregularities are detected in heart rates, such as mismatches, I introduce interference or simulate static/distorted sounds, mimicking miscommunication.

•	This project aims to examine how two participants can regulate their heartbeats in synchronization in an attempt to stay on one musical score. This interaction becomes a live performance or concert where the heartbeats simultaneously regulate the volume of the music.

•	The act of being aware of ones own heartbeat becomes more obvious throughout this interaction. It not only transforms into a personal experience but also evolves into a shared experience with the other participant, revealing a meaningful and intimate connection.


INSTRUCTIONS:
- Tune into individual channels (L) or (R) with one heart rate, volume is controlled based on sensor value
- Tune into the same channel by matching heartrates together (threshold >= 110) - try to maintain connection as long as possible
- If heart rates are mismatched, participants will be directed back to individual channels or experience interference and disconnection.


Breakdown:
1. Heart rate (L) detected (A0) - rotates counterclockwise - volume detected by sensor value [Channel 1]
2. Heart rate (R) detected (A1) - rotates clockwise - volume detected by heart sensor value [Channel 2]
3. Heart rate (L) and (R) - if mismatched = disconnection and miscommunication, display of distoring sounds
4. Heart rate (L) and (R) - if both heartrates >= 110, participants will stay on the same radio line [Channel 3]


INFORMATION:
- This code uses serial communication taken from two heart rate sensors.
- Download library on Arduino: 'PulseSensorPlayground'
- Upload code provided
- Connect p5.js to Arduino


Electronics required:
- 2 Grove - Ear Clip Heart Rate Sensors
- Arduino Leonardo