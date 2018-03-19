const app = require('express');
const router = app.Router();
const random = require('meteor-random');
const bodyParser = require('body-parser');
const mysql = require('mysql');
module.exports = router;

var connection = mysql.createConnection({
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
    var task = {
        placename: req.body.placename,
        notification: req.body.notification,
        taskname: req.body.taskname
    }

    var token = req.body.token;

    if(
        task.placename
        && task.notification
        && task.taskname
        && token
    ){
        connection.query('SELECT * FROM user WHERE token = ?', token, function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'there are some error with query select complete location'
                });
            }else {
                if(rows.length > 0) {
                    var id = rows[0]._id;
                    var complete = '1';
                    console.log(rows[0]._id + " " + task.placename);
                    connection.query(`UPDATE reminder SET complete = '` + complete + `' WHERE user_id = '` + id + `' AND placename = '` + task.placename + `' AND notification = '` + task.notification + `' AND taskname = '` + task.taskname + `'` , function(err, rows) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'there are some error with query update complete location'
                            });
                        }else {
                            res.send({
                                status: 200,
                                msg: "complete task location"
                            });
                        }
                    });
                }else {
                    res.send({
                        status: 404,
                        msg: "dont have token"
                    });
                }
            }
        });
    }else {
        res.send({
            status: 403,
            msg: "permission denied"
        });
    }
});