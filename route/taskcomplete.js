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
                    msg: 'taskcomplete/location : there are some error with query select task complete location'
                });
            }else {
                if(rows.length > 0) {
                    var id = rows[0]._id;
                    var complete = '1';
                    connection.query('SELECT _id, user_id, notification, placename, latitude, longtitude, taskname, complete FROM reminder WHERE user_id = ? AND complete = ? AND type= ?', [id, complete, "Location"], function(err, rows) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'taskcomplete/location : there are some error with query select task complete location'
                            });
                        }else {
                            res.send({
                                status: 200,
                                data: rows,
                                msg: 'taskcomplete/location : select reminder location complete'
                            });
                        }
                    });
                }else {
                    res.send({
                        status: 404,
                        msg: 'taskcomplete/location : dont have token'
                    });
                }
            }
        });
    }else {
        res.send({
            status: 403,
            msg: "taskcomplete/location : permission denied"
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
                    msg: 'taskcomplete/event : there are some error with query select task complete event'
                });
            }else {
                if(rows.length > 0) {
                    var id = rows[0]._id;
                    var complete = '1';
                    connection.query('SELECT _id, user_id, start_date, end_date, notification, placename, latitude, longtitude, taskname, complete FROM reminder WHERE user_id = ? AND complete = ? AND type= ?', [id, complete, "Event"], function(err, rows) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'taskcomplete/event : there are some error with query select task complete event'
                            });
                        }else {
                            res.send({
                                status: 200,
                                data: rows,
                                msg: 'taskcomplete/event : select reminder event complete'
                            });
                        }
                    });
                }else {
                    res.send({
                        status: 404,
                        msg: 'taskcomplete/event : dont have token'
                    });
                }
            }
        });
    }else {
        res.send({
            status: 403,
            msg: "taskcomplete/event : permission denied"
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
                    msg: 'taskcomplete/reminder : there are some error with query select task complete reminder'
                });
            }else {
                if(rows.length > 0) {
                    var id = rows[0]._id;
                    var complete = '1';
                    connection.query('SELECT _id, user_id, start_date, end_date, notification, placename, latitude, longtitude, taskname, subtaskname, complete FROM reminder WHERE user_id = ? AND complete = ? AND type= ?', [id, complete,  "Reminder"], function(err, rows) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'taskcomplete/reminder : there are some error with query select task complete reminder'
                            });
                        }else {
                            res.send({
                                status: 200,
                                data: rows,
                                msg: 'taskcomplete/reminder : select reminder reminder complete'
                            });
                        }
                    });
                }else {
                    res.send({
                        status: 404,
                        msg: 'taskcomplete/reminder : dont have token'
                    });
                }
            }
        });
    }else {
        res.send({
            status: 403,
            msg: "taskcomplete/reminder : permission denied"
        });
    }
});