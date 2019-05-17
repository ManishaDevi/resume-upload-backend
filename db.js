const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const DB_URI = process.env.DB_URI
module.exports = (cb) => {

    mongoose.set('debug', true);

    let options = {
        bufferMaxEntries: 0,
        autoReconnect: true,
        reconnectTries: 1
    };

    console.log("Connecting to mongo with options", options);

    mongoose.connect(DB_URI, options, () => {
        require('./models/user')
        cb && cb()
    });

    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + DB_URI);
    });

    mongoose.connection.once('open', () => {
        console.log('Connected to mongodb!');
    });

    mongoose.connection.on('error', function (err) {
        console.error('Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
};



