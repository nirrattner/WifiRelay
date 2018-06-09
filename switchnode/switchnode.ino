#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>

#include "config.h"

#define PIN_0 0
#define PIN_2 2

#define DEVICE_URL "http://" HOST "/devices/" DEVICE_ID "/state"
#define CONTENT_LENGTH_HEADER "Content-Length"
#define CONTENT_LENGTH_HEADER_VALUE "0"

int state = 1;
int currentState = 1;

ESP8266WiFiMulti wifi;

void setup() {
  Serial.begin(115200);

  pinMode(PIN_0, OUTPUT);
  pinMode(PIN_2, INPUT);

  digitalWrite(PIN_0, LOW);

  WiFi.mode(WIFI_STA);
  wifi.addAP(WIFI_SSID, WIFI_PASSWORD);

  while (wifi.run() != WL_CONNECTED) {
    Serial.printf(".");
    delay(500);
  }

  Serial.printf(" connected to %s\n", WiFi.SSID().c_str());
}

void loop() {
  if (wifi.run() == WL_CONNECTED) {
    currentState = digitalRead(PIN_2);
    if (!currentState && state) {
      Serial.printf("Button press");
      HTTPClient http;
      http.begin(DEVICE_URL);
      http.addHeader(CONTENT_LENGTH_HEADER, CONTENT_LENGTH_HEADER_VALUE);
      int httpCode = http.PUT(String());
      Serial.printf(" result %d\n", httpCode);
      delay(500);
    }
    state = currentState;
  }
}
