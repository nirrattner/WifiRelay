#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>

#include "config.h"

#define HTTP_OK 200
#define PIN_2 2

#define DEVICE_URL "http://" HOST "/devices/" DEVICE_ID "/state?state="

int state = 0;
ESP8266WiFiMulti wifi;

void setup() {
  Serial.begin(115200);
  Serial.println();

  pinMode(PIN_2, OUTPUT);

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
    Serial.printf(" state %d\n", state);
    // Invert the state to account for GPIO2 being driven low
    digitalWrite(PIN_2, !state);
    
    HTTPClient http;
    String url = DEVICE_URL + String(state);
    Serial.println(url);
    bool httpBegin = http.begin(url);
    http.setTimeout(120000);
    int httpCode = http.GET();
    Serial.printf(" result %d\n", httpCode);
    if (httpCode == HTTP_OK) {
      String response = http.getString();
      state = response.toInt();
    }
    http.end();
  }
}
