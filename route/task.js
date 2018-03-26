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
    var token = req.body.token;

    if(token) {
        connection.query('SELECT * FROM user WHERE token = ?', token, function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'there are some error with query select task location'
                });
            }else {
                if(rows.length > 0) {
                    var id = rows[0]._id;
                    var complete = 0;
                    connection.query('SELECT _id, user_id, notification, placename, latitude, longtitude, taskname, complete FROM reminder WHERE user_id = ? AND complete = ? AND type= ?', [id,complete, "Location"], function(err, rows) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'there are some error with query select task location'
                            });
                        }else {
                            res.send({
                                status: 200,
                                data: rows,
                                msg: 'query success'
                            });
                        }
                    });
                }else {
                    res.send({
                        status: 404,
                        msg: 'dont have token'
                    });
                }
            }
        });
    }else {
        res.send({
            status: 403,
            msg: "task/location - permission denied"
        });
    }
});

router.post('/event', (req,res) => {
    var token = req.body.token;

    if(token) {
        connection.query('SELECT * FROM user WHERE token = ?', token, function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'there are some error with query select task event'
                });
            }else {
                if(rows.length > 0) {
                    var id = rows[0]._id;
                    var complete = 0;
                    connection.query('SELECT _id, user_id, allday, start_date, end_date, start_time, end_time, placename, latitude, longtitude, taskname, complete FROM reminder WHERE user_id = ? AND complete = ? AND type= ?', [id,complete, "Event"], function(err, rows) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'there are some error with query select task event'
                            });
                        }else {
                            res.send({
                                status: 200,
                                data: rows,
                                msg: 'query success'
                            });
                        }
                    });
                }else {
                    res.send({
                        status: 404,
                        msg: 'dont have token'
                    });
                }
            }
        });
    }else {
        res.send({
            status: 403,
            msg: "task/event - permission denied"
        });
    }
});

router.post('/reminder', (req,res) => {
    var token = req.body.token;

    if(token) {
        connection.query('SELECT * FROM user WHERE token = ?', token, function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'there are some error with query select task reminder'
                });
            }else {
                if(rows.length > 0) {
                    var id = rows[0]._id;
                    var complete = 0;
                    connection.query('SELECT _id, user_id, allday, start_date, end_date, start_time, end_time, placename, latitude, longtitude, taskname, complete FROM reminder WHERE user_id = ? AND complete = ? AND type= ?', [id,complete, "Reminder"], function(err, rows) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'there are some error with query select task reminder'
                            });
                        }else {
                            res.send({
                                status: 200,
                                data: rows,
                                msg: 'query success'
                            });
                        }
                    });
                }else {
                    res.send({
                        status: 404,
                        msg: 'dont have token'
                    });
                }
            }
        });
    }else {
        res.send({
            status: 403,
            msg: "task/reminder - permission denied"
        });
    }
});