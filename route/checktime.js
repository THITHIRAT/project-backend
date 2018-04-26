const app = require('express');
const router = app.Router();
const random = require('meteor-random');
const bodyParser = require('body-parser');
const mysql = require('mysql');
module.exports = router;

var connection = mysql.createConnection({
    port     : `8889`,
    host     : `localhost`,
    user     : `project`,
    password : `ZlcYXqVEngJ1mvyZ`,
    database : `test`
});

connection.connect();

router.use(bodyParser.urlencoded({
    extended : false
}));

router.post('/notification', (req,res) => {
    var token = req.body.token;
    var datetime = req.body.datetime;

    console.log(datetime);

    res.send({
        status: 200,
        msg: 'checktime/notification : complete'
    });
});