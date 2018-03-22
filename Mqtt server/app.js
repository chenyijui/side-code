const mosca = require('mosca');
// const mongoose = require('mongoose');
// const topickeywords = ['moscadata','addroom'];
// const message = require('./moduls/message.module');
const mongoUrl = "mongodb://localhost:27017/mqtt";

// mongoose.Promise = global.Promise;
// //Mongoose Configurations
// mongoose.connect('mongodb://localhost:27017/mqtt-message');
// const SECURE_KEY = __dirname + '/ssl/tls-key.pem';
// const SECURE_CERT = __dirname + '/ssl/tls-cert.pem';
const moscaSettings = {
    // interfaces: [
    //     { type: "mqtt", port: 1883 },
    //     { type: "mqtts", port: 8883, credentials: { keyPath: SECURE_KEY, certPath: SECURE_CERT } },
    //     { type: "http", port: 3000, bundle: true },
    //     { type: "https", port: 3001, bundle: true, credentials: { keyPath: SECURE_KEY, certPath: SECURE_CERT } }
    // ],
    port: 8883,
    logger: {
    name: "secureExample",
    level: 40,
    },
    // secure : { 
    //     keyPath: SECURE_KEY,
    //     certPath: SECURE_CERT,
    // },
    backend: {
        type: 'mongo',
        url: mongoUrl,
        pubsubCollection: 'moscadata',
        mongo: {}
    },
    persistence: {
        factory: mosca.persistence.Mongo,
        url: mongoUrl
    }
};
const server = new mosca.Server(moscaSettings);

var authenticate = function (client, username, password, callback) {
    if (username == "test:123" && password.toString() == "test:456")
        callback(null, true);    
    else
        callback(null, false);
}

var authorizePublish = function (client, topic, payload, callback) {
    var auth = true;
    // set auth to :
    //  true to allow 
    //  false to deny and disconnect
    //  'ignore' to puback but not publish msg.
    callback(null, auth);
}

var authorizeSubscribe = function (client, topic, callback) {
    var auth = true;
    // set auth to :
    //  true to allow
    //  false to deny 
    callback(null, auth);
}

server.on('ready', function setup() {
    server.authenticate = authenticate;
    server.authorizePublish = authorizePublish;
    server.authorizeSubscribe = authorizeSubscribe;
    
    console.log('Mosca server is up and running.');
});

server.on("error", function (err) {
    console.log(err);
});

// server.published = function(packet, client, cb) {
//     if(packet.topic.indexOf('echo') === 0) {
//         return cb();
//     }
//     var newPacket = {
//         topic: 'echo/' + packet.topic,
//         payload: packet.payload,
//         retain: packet.retain,
//         qos: packet.qos
//     };
//     server.publish(newPacket, cb);
// };

server.on('published', function(packet, cline){
    // if(topickeywords.indexOf(packet.topic) === -1 && !packet.topic.includes('$SYS')) {
    //     var messagejson = JSON.parse(packet.payload.toString('utf-8'));
    //     var message = new Message({
    //         topic: 'echo/' + packet.topic,
    //         payload: packet.payload,
    //         retain: packet.retain,
    //         qos: packet.qos,
    //         date: new Date()
    //     })
    // }
    // message.save();
    console.log('Published', packet.payload.toString());
})

server.on('clientConnected', function (client) {
    console.log('client connected', client.id);
});
// server.on('published', function(packet, client) {
//     if(client) {
//         console.log('published topic from client: ', packet.topic);
//         let message = packet.payload;
//         console.log('published message from client: ', typeof message, message);
//         let messageObject = JSON.parse(message);
//         console.log('published messageObject from client: ', typeof messageObject, messageObject);
        
//     } else {
//         console.log('Published : ', packet.payload);
//     }
// });
server.on('subscribed', function (topic, client) {
    console.log('subscribed : ', topic);
});
server.on('unsubscribed', (topic, client) => {
    console.log('unsubscribed : ', topic);
});
server.on('clientDisconnecting', (client) => {
    console.log('clientDisconnecting : ', client.id);
});
server.on('clientDisconnected', (client) => {
    console.log('clientDisconnected : ', client.id);
});
