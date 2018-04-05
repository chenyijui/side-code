const mqtt = require('mqtt');
const fs = require('fs');
const path = require('path');
const KEY = fs.readFileSync('./ssl/ryans-key.pem')
const CERT = fs.readFileSync('./ssl/ryans-cert.pem');


// var client = mqtt.connect('mqtt://try:try@broker.shiftr.io', {
//   clientId: 'javascript123333'

var opt = {
  // key: KEY,
  // cert: CERT,
  rejectUnauthorized: false,
  clientId: "nodejs111232231",
  username: "test:123",
  password: "test:456"
  // clean: "false"
  // username: "68f23a4f04aad044f3ecae753a4888cc:86ca8784ea34d372ec5fa8e990b0f2f7",
  // password: "d62f9d6809e9508597290bd4926fbec3:834259d25b644bf959b1c90fdf46e56c"
};
var client = mqtt.connect('mqtts://127.0.0.1:8883/', opt);



client.on('connect', function(){
  console.log('client has connected!');
  client.subscribe('aa/moscadata/home');
  // client.subscribe('white_house');
  // client.unsubscribe('/example');

  setInterval(function(){
    // client.publish('/hello', 'world!!!');
    // client.publish('white_house', 'HI!!!!');
    // client.publish('/white_house/Temperature_1', 'ZZZZZZ!');
    // client.publish('/white_house/Chambre/temperature_1', '121322112313')
    client.publish('68f23a4f04aad044f3ecae753a4888cc:86ca8784ea34d372ec5fa8e990b0f2f7/moscadata/home', 'Client 1 is alive.. Test Ping! ' + Date());
  }, 1000);
});

client.on('message', function(topic, message) {
  console.log('new message:', topic, message.toString());
});
