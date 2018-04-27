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

    // console.log(datetime);

    if(datetime) {
        var split_datetime = datetime.split(" ");
        var date = split_datetime[0];
        var time = split_datetime[1];

        var split_date = date.split("-");
        var int_year_ad = parseInt(split_date[0]);
        var int_year_bc = int_year_ad + 543;
        var year = int_year_bc;
        var month = split_date[1];
        var day = split_date[2];

        var date_bc = year + "-" + month + "-" + day;
    
        connection.query(`SELECT _id FROM user WHERE token = ?`, [token], function(err,rows_user) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'checktime/notification : there are some error with query select user'
                });
            }else {
                if(rows_user.length > 0) {
                    var user_id = rows_user[0]._id;
                    console.log("user_id : " + user_id);
                    var check_loop = false;
                    connection.query(`SELECT * FROM notification WHERE reminder_id IN (SELECT _id FROM reminder WHERE complete = '0' AND user_id IN (SELECT _id FROM user WHERE token = ?))`, [token], function(err,rows_notification) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'checktime/notification : there are some error with query select reminder'
                            });
                        }else {
                            var reminder_id = null;
                            if(rows_notification.length > 0) {
                                for (var i=0; i<rows_notification.length; i++) {
                                    // console.log(rows_notification[i]._id);
                                    // console.log(rows_notification[i].date);
                                    // console.log(date_bc);
                                    // console.log(rows_notification[i].time);
                                    // console.log(time);
                                    if((date_bc == rows_notification[i].date) && (time == rows_notification[i].time)) {
                                        check_loop = true;
                                        reminder_id = rows_notification[i].reminder_id;
                                        console.log(check_loop);
                                    }
                                }
                                if(check_loop == true) {
                                    if(reminder_id) {
                                        connection.query(`SELECT * FROM reminder WHERE _id = ?`, [reminder_id], function(err, rows_reminder) {
                                            if(err) {
                                                res.send({
                                                    status: 400,
                                                    msg: 'checktime/notification : there are some error with query select reminder'
                                                });
                                            }else {
                                                if(rows_reminder[0].end_date) {
                                                    var end_date = rows_reminder[0].end_date;
                                                    var split_end_date = end_date.split("-");
                                                    var split_year = split_end_date[0];
                                                    var split_month = split_end_date[1];
                                                    var split_date = split_end_date[2];
                                                    var enddate = split_date + "/" + split_month + "/" + split_year;
                                                    if(rows_reminder[0].type == "Reminder") {
                                                        res.send({
                                                            status: 200,
                                                            taskname: rows_reminder[0].taskname + " : " + rows_reminder[0].subtaskname,
                                                            date: "End Date : " + enddate,
                                                            msg: 'checktime/notification : notification'
                                                        });
                                                    }
                                                    if(rows_reminder[0].type == "Event") {
                                                        if(rows_reminder[0].start_date) {
                                                            var start_date = rows_reminder[0].start_date;
                                                            var split_start_date = start_date.split("-");
                                                            var split_year_start = split_start_date[0];
                                                            var split_month_start = split_start_date[1];
                                                            var split_date_start = split_start_date[2];
                                                            var startdate = split_date_start + "/" + split_month_start + "/" + split_year_start;
                                                            res.send({
                                                                status: 200,
                                                                taskname: rows_reminder[0].taskname,
                                                                date: "Start Date : " + startdate,
                                                                msg: 'checktime/notification : notification'
                                                            });
                                                        }else {
                                                            res.send({
                                                                status: 400,
                                                                msg: 'checktime/notification : error'
                                                            });
                                                        }
                                                    }
                                                }else {
                                                    res.send({
                                                        status: 400,
                                                        msg: 'checktime/notification : error'
                                                    });
                                                }
                                            }
                                        });
                                    }
                                }else {
                                    res.send({
                                        status: 200,
                                        msg: 'checktime/notification : complete'
                                    });
                                }
                            }
                        }
                    });
                }else {
                    res.send({
                        status: 400,
                        msg: 'checktime/notification : dont have token'
                    });
                }
            }
        });
    }else {
        res.send({
            status: 403,
            msg: 'checktime/notification : permission denied'
        });
    }
});