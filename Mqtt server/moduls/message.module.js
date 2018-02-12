const mongoose = require('mongoose');

var message = new mongoose.Schema({
    topic: String,
    payload: String,
    retain: String,
    qos: String,
    date: Date
});

var Message = mongoose.model('Message', MessageSchema);
module.exports = Message;