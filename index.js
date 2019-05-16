const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const users = require('./models/user');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let options = {
    autoReconnect: true,
    reconnectTries: 1
}
//db connection
mongoose.connect('mongodb://manisha:manisha1@ds157256.mlab.com:57256/soulskill', options);

// mapping schema with model
var UserModel = mongoose.model('User');
app.get('/', function (req, res) {
    res.json({
        success: true,
        apiVersion: 1
    })
});

// insert user details
app.post('/submit', function (req, res) {
    let user = new UserModel();
    user.name = req.body.name;
    user.phone_number = req.body.phone_number;
    user.email = req.body.email;
    user.job_title = req.body.job_title;
    user.resume = req.body.resume;
    // save instance
    user.save(function (err) {
        if (!err) {
            console.log('Success');
            res.json({
                success: true,
            })
        } else {
            console.log('Error while saving user, err : ' + err);
            res.json({
                success: false
            })

        }
    });
});

app.listen(3000);
console.log('Express listening on port 3000...');
