# House Computer
The goal of this project is to create a program that will use the microphone to listen for a trigger word. After the trigger word has been detected, the program will issue an audible signal and then connected to Google Speech-to-text API (https://cloud.google.com/speech-to-text) and recognize the command spoken next. The recognized command text is passed into to the house controller module for execution.