const mongoose = require('mongoose');
const UserModel = require('./../../models/user');
const response = require('./../responses');
const uploader = require('./../../helpers/multer')

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
    },
    upload: (req, res, next) => {
        uploader.single('resume')(req, res, function (err, some) {
            if (err) {
                return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
            }

            return response.ok(res, { imageUrl: req.file.location })
        });
    }
}