#include "Arduino.h"
#include <Ethernet.h>
#include <SPI.h>
#include <WSClient.h>
#include "Siren.h"
#include "Websocket.h"

EthernetClient client;

Siren *siren;
Websocket *websocket;

char *host = "0.0.0.0";
int port = 8881;

byte mac[] = { 
  0x90, 0xA2, 0xDA, 0x00, 0xF2, 0x78 };

void setup()
{
  Serial.begin(9600);
  Serial.println("START");
  Serial.println("STARTING ETHERNET");
  
  Ethernet.begin(mac);
  
  Serial.print("IP ADDRESS: ");
  Serial.println(Ethernet.localIP());
  
  siren = new Siren(6);
  websocket = new Websocket(client, host, "/", port);
  
  Serial.println("CONNECTING...");
  websocket->connect();
}

void loop()
{
  String data;
  
  if (websocket->isConnected()) {
     Serial.println("CONNECTED");
     data = websocket->getData();
     
     if (data.length() > 0) {
       Serial.println(data);  
     }
  } else {
    Serial.println("ERROR");
  }
}
