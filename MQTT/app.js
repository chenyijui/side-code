const mqtt = require('mqtt');
const fs = require('fs');
const path = require('path');
const KEY = fs.readFileSync('./ssl/tls-key.pem')
const CERT = fs.readFileSync('./ssl/tls-cert.pem');


// var client = mqtt.connect('mqtt://try:try@broker.shiftr.io', {
//   clientId: 'javascript123333'

var opt = {

  key: KEY,
  cert: CERT,
  rejectUnauthorized: false,
  clientId: "nodejs1111",
  username: "test",
  password: "test"
};
var client = mqtt.connect('mqtts://127.0.0.1:8883/', opt);



client.on('connect', function(){
  console.log('client has connected!');
  client.subscribe('moscadata');
  // client.subscribe('/white_house');
  // client.unsubscribe('/example');

  setInterval(function(){
    // client.publish('/hello', 'world!!!');
    // client.publish('/white_house', 'HI!!!!');
    // client.publish('/white_house/Temperature_1', 'ZZZZZZ!');
    // client.publish('/white_house/Chambre/temperature_1', '121322112313')
    client.publish('moscadata', 'Client 1 is alive.. Test Ping! ' + Date());
  }, 1000);
});

client.on('message', function(topic, message) {
  console.log('new message:', topic, message.toString());
});
