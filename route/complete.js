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

router.post('/location', (req,res) => {
    var reminder_id = req.body.reminder_id;
    var complete = '1';

    if(reminder_id){
        connection.query(`UPDATE reminder SET complete = '` + complete + `' WHERE _id = '` + reminder_id + `'`, function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'there are some error with query select complete location'
                });
            }else {
                res.send({
                    status: 200,
                    msg: 'complete task location'
                });
            }
        });
    }else {
        res.send({
            status: 403,
            msg: "permission denied"
        });
    }
});

router.post('/event', (req,res) => {

});