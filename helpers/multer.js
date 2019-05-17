const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

var accessKeyId = process.env.AWS_KEY;
var secretAccessKey = process.env.AWS_SECRET_KEY;

aws.config.update({
    region: "us-west-2",
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_RESUMES,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload;