/**
* @NApiVersion 2.x
* @NScriptType ClientScript
* @NModuleScope Public
*/
define(['N/record', 'N/url', 'N/https', 'N/log', 'N/email'],
   function (record, url, https, log, email) {
      var canvas = null;
      var canvasRostro = null;
      var caseId = null;
      var rostroBase = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2592214&c=3559763&h=209ff4c22993fdaad9f6';
      var cabezaBase = 'https://3559763.app.netsuite.com/core/media/media.nl?id=2339447&c=3559763&h=ca9d3ce929846103685e';

      var canvasEnvioRostroEmpty_pc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdwAAAHiCAYAAABC030oAAATaElEQVR4Xu3VwQkAAAjEMN1/aaewr7jAQRC64wgQIECAAIF3gX1fMECAAAECBAiM4HoCAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQICA4PoBAgQIECAQCAhugGyCAAECBAgIrh8gQIAAAQKBgOAGyCYIECBAgIDg+gECBAgQIBAICG6AbIIAAQIECAiuHyBAgAABAoGA4AbIJggQIECAgOD6AQIECBAgEAgIboBsggABAgQICK4fIECAAAECgYDgBsgmCBAgQIDAAWPfAeOudStEAAAAAElFTkSuQmCC';
      var canvasEnvioRostroEmpty_iPad = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgYAAAH5CAYAAAD6E/bxAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAACBqADAAQAAAABAAAB+QAAAABvfEIPAAAR7ElEQVR4Ae3QMQEAAADCoPVPbQ0PiEBhwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBwPTD6MgABNit8jQAAAABJRU5ErkJggg==';      
      var canvasEnvioCabezaEmpty_pc = 'data:image/png;base64,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';
      var canvasEnvioCabezaEmpty_iPad = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAHgCAYAAADUjLREAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABQKADAAQAAAABAAAB4AAAAAASeLhiAAAKkUlEQVR4Ae3QMQEAAADCoPVPbQhfiEBhwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMGDBgwIABAwYMvAMDYmcAAQ+g+IEAAAAASUVORK5CYII=';

      function pageInit(context) {
         caseId = document.getElementById('recordCaseId').value;
         var plataforma = navigator.platform;

         if (plataforma == 'MacIntel' || plataforma == 'iPad') {
            canvasEnvioRostroEmpty = canvasEnvioRostroEmpty_iPad;
            canvasEnvioCabezaEmpty = canvasEnvioCabezaEmpty_iPad;
         } else {
            canvasEnvioRostroEmpty = canvasEnvioRostroEmpty_pc;
            canvasEnvioCabezaEmpty = canvasEnvioCabezaEmpty_pc;
         }
      }

      function enviarPintura() {
         var canvasEnvioRostro = document.getElementById('newRostro');
         var canvasEnvioCabeza = document.getElementById('newCabeza');
         var valEnvioRostro = canvasEnvioRostro.toDataURL('image/png');
         var valEnvioCabeza = canvasEnvioCabeza.toDataURL('image/png');

         var valdummyEnvioRostro = dummyRostro.toDataURL('image/png');
         var valdummyEnvioCabeza = dummyCabeza.toDataURL('image/png');

         log.debug('Debug values rostro', 'The values are: ' + valEnvioRostro == valdummyEnvioRostro);
         log.debug('Debug values cabeza', 'The values are: ' + valEnvioCabeza == valdummyEnvioCabeza);

         if (valEnvioRostro == canvasEnvioRostroEmpty && valEnvioCabeza == canvasEnvioCabezaEmpty) {
            alert('Ninguna imagen ha sido pintada!!');
         } else {
            if (valEnvioRostro != canvasEnvioRostroEmpty) {
               record.submitFields({ type: 'supportcase', id: caseId, values: { custevent801: valEnvioRostro } });
               console.log(valEnvioRostro);
               alert('Imagen de rostro enviada al caso!!');
            }
            if (valEnvioCabeza != canvasEnvioCabezaEmpty) {
               record.submitFields({ type: 'supportcase', id: caseId, values: { custevent511: valEnvioCabeza } });
               console.log(valEnvioCabeza);
               alert('Imagen de cabeza enviada al caso!!');
            }
            var urlEmp = url.resolveRecord({ recordType: 'supportcase', recordId: caseId, isEditMode: false });
            window.open("" + urlEmp + "");
            window.open('', '_parent', '');
            window.close();
         }
      }

      function limpiarPintura() {
         canvas = document.getElementById('sig-canvas');
         document.getElementById('imagenCabeza').src = cabezaBase;
         canvas.width = canvas.width;
         var ctxCanvas = canvas.getContext('2d');
         ctxCanvas.strokeStyle = '#0070ff';
         var newCabeza = document.getElementById('newCabeza');
         newCabeza.width = newCabeza.width;
         var ctxCabeza = newCabeza.getContext('2d');
         ctxCabeza.strokeStyle = '#0070ff';
      }

      function abrirModalCabeza() {
         var touchMove = function (e) {
            e.preventDefault();
         };
         document.addEventListener('touchmove', touchMove, { passive: false });

         modal = document.getElementById('myModal');
         modal.style.display = "block";

         var cerrarModalCabeza = function (e) {
            e.preventDefault();
            var canvasCabeza = document.getElementById('sig-canvas');
            var valCanvasCabeza = canvasCabeza.toDataURL('image/png');
            var newCabeza = document.getElementById('newCabeza');
            if (valCanvasCabeza === canvasEnvioCabezaEmpty) {
               canvasCabeza.width = canvasCabeza.width;
               newCabeza.width = newCabeza.width;
               document.getElementById('btn_cerrarPintarCabeza').removeEventListener('click', cerrarModalCabeza);
            } else {
               var ctxCabeza = newCabeza.getContext('2d');
               var imageCabeza1 = new Image();
               var imageCabeza2 = new Image();
               imageCabeza1.src = cabezaBase;
               imageCabeza1.onload = function () {
                  ctxCabeza.drawImage(imageCabeza1, 0, 0, 320, 480);
                  imageCabeza2.src = valCanvasCabeza;
                  imageCabeza2.onload = function () {
                     ctxCabeza.drawImage(imageCabeza2, 0, 0, 320, 480);
                     imgDatCabeza = newCabeza.toDataURL('image/png');
                     var imagenCabezaShow = document.getElementById('imagenCabeza');
                     imagenCabezaShow.src = imgDatCabeza;
                  };
               };
            }
            document.removeEventListener('touchmove', touchMove);
            document.getElementById('btn_cerrarPintarCabeza').removeEventListener('click', cerrarModalCabeza);
            modal.style.display = "none";
         }
         document.getElementById('btn_cerrarPintarCabeza').addEventListener('click', cerrarModalCabeza, { passive: false });
      }

      function limpiarPinturaRostro() {
         canvasRostro = document.getElementById('sig-canvasRostro');
         document.getElementById('imagenRostro').src = rostroBase;
         canvasRostro.width = canvasRostro.width;
         var ctxCanvasRostro = canvasRostro.getContext('2d');
         ctxCanvasRostro.strokeStyle = '#0070ff';
         var newRostro = document.getElementById('newRostro');
         newRostro.width = newRostro.width;
         var ctxRostro = newRostro.getContext('2d');
         ctxRostro.strokeStyle = '#0070ff';
      }

      function abrirModalRostro() {
         var touchMove = function (e) {
            e.preventDefault();
         };
         document.addEventListener('touchmove', touchMove, { passive: false });

         modalRostro = document.getElementById('myModalRostro');
         modalRostro.style.display = "block";

         var cerrarModalRostro = function (e) {
            e.preventDefault();
            var canvasRostro = document.getElementById('sig-canvasRostro');
            var valCanvasRostro = canvasRostro.toDataURL('image/png');
            var newRostro = document.getElementById('newRostro');
            if (valCanvasRostro === canvasEnvioRostroEmpty) {
               canvasRostro.width = canvasRostro.width;
               newRostro.width = newRostro.width;
               document.getElementById('btn_cerrarPintarRostro').removeEventListener('click', cerrarModalRostro);
            } else {
               var ctxRostro = newRostro.getContext('2d');
               var imageRostro1 = new Image();
               var imageRostro2 = new Image();
               imageRostro1.src = rostroBase;
               imageRostro1.onload = function () {
                  ctxRostro.drawImage(imageRostro1, 0, 0, 518, 505);
                  imageRostro2.src = valCanvasRostro;
                  imageRostro2.onload = function () {
                     ctxRostro.drawImage(imageRostro2, 0, 0, 518, 505);
                     imgDatRostro = newRostro.toDataURL('image/png');
                     document.getElementById('imagenRostro').src = imgDatRostro;
                  };
               };
               ctxRostro.stroke();
            }
            document.removeEventListener('touchmove', touchMove);
            document.getElementById('btn_cerrarPintarRostro').removeEventListener('click', cerrarModalRostro);
            modalRostro.style.display = "none";
         }
         document.getElementById('btn_cerrarPintarRostro').addEventListener('click', cerrarModalRostro, { passive: false });
      }

      return {
         pageInit: pageInit,
         enviarPintura: enviarPintura,
         limpiarPintura: limpiarPintura,
         abrirModalCabeza: abrirModalCabeza,
         limpiarPinturaRostro: limpiarPinturaRostro,
         abrirModalRostro: abrirModalRostro
      };
   });