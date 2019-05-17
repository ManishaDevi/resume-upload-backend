const mongoose = require('mongoose');
const UserModel = require('./../../models/user');
const response = require('./../responses');

module.exports = {
    submit: (req, res, next) => {
        let user = new UserModel();
        user.name = req.body.name;
        user.phone_number = req.body.phone_number;
        user.email = req.body.email;
        user.job_title = req.body.job_title;
        user.resume = req.body.resume;
        // save instance
        user.save(function (err) {
            if (!err) {
                response.created(res)
            } else {
                response.error(res)
            }
        });
    }
}