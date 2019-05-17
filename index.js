require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

require('./db')(() => {
    app.use('/', require('./app/routes'));

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('route_not_found');
        err.status = 404;
        next(err);
    });

    const http = require('http');
    const server = http.createServer(app);
    const port = process.env.PORT || 8000;
    server.listen(port);
    console.log('Express app started in ' + app.get('env') + ' mode on port ' + port);
})


