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
        
        var check = "complete";
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
                    connection.query(`SELECT * FROM reminder WHERE user_id = ? AND type = "Reminder" AND complete = 0`, [user_id], function(err,rows_reminder) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'checktime/notification : there are some error with query select reminder'
                            });
                        }else {
                            if(rows_reminder.length > 0) {
                                var taskname = "taskname";
                                var subtaskname = "subtaskname";
                                var enddate = null;
                                for(var i=0; i<rows_reminder.length; i++) {
                                    var reminder_id = rows_reminder[i]._id;
                                    taskname = rows_reminder[i].taskname;
                                    subtaskname = rows_reminder[i].subtaskname;
                                    enddate = rows_reminder[i].end_date;
                                    console.log("check i : " + i + " " + check + "\n");
                                    connection.query(`SELECT * FROM notification WHERE reminder_id = ?`, [reminder_id], function(err, rows_notification) {
                                        if(err) {
                                            res.send({
                                                status: 400,
                                                msg: 'checktime/notification : there are some error with query select notification'
                                            });
                                        }else {
                                            loop_check = false;
                                            if(rows_notification.length > 0) {
                                                for(var j=0; j<rows_notification.length; j++) {
                                                    if(date_bc == rows_notification[j].date && time == rows_notification[j].time) {
                                                        check = "notification";
                                                        console.log("check : " + check + "\n");
                                                    }else {
                                                        console.log("date input " + date_bc);
                                                        console.log("date " + rows_notification[j].date);
                                                        console.log("time input " + time);
                                                        console.log("time " + rows_notification[j].time + "\n");
                                                    }
                                                }
                                            }
                                        }
                                    });    
                                }
                                console.log("check for : " + check + "\n");
                                if(check == "notification") {
                                    res.send({
                                        status: 200,
                                        msg: 'checktime/notification : notification'
                                    });
                                }else {
                                    res.send({
                                        status: 200,
                                        // taskname: taskname + " : " + subtaskname,
                                        // date: enddate,
                                        msg: 'checktime/notification : complete'
                                    });
                                }   
                            }else {
                                res.send({
                                    status: 200,
                                    msg: 'checktime/notification : dont have reminder'
                                });
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