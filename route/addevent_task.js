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

function count_milliseconds(start, end, before_after, num, type){
    var msec_start = start.getTime();
    var msec_end = end.getTime();

    console.log("Start Date : " + start + "\nEnd Date : " + end + "\nMSEC Start Date : " + msec_start + "\nMSEC End Date : " + msec_start + "\n" + before_after, num, type);

    var temp = 0;
    if(type == "Mins") {
        temp = parseInt(num) * 60 * 1000;
    }
    else if(type == "Hrs") {
        temp = parseInt(num) * 60 * 60 * 1000;
    }
    else if(type == "Days") {
        temp = parseInt(num) * 24 * 60 * 60 * 1000;
    }
    else if(type == "Mths") {
        console.log("Start Date : " + (start.getMonth() + 1));
        var loop = parseInt(num);
        for(var i=0; i<loop; i++) {
            var num_month = start.getMonth();
            if(num_month == 0 || num_month == 2 || num_month == 4 || num_month == 6 || num_month == 7 || num_month == 9 || num_month == 11) {
                temp = temp + 2678400000;
                num_month++;
            }
            else if(num_month == 3 || num_month == 5 || num_month == 8 || num_month == 10) {
                temp = temp + 2592000000;
                num_month++;
            }
            else if(num_month == 1) {
                if((start.getFullYear() + 1)%4 == 0) {
                    temp = temp + 2505600000;
                    num_month++;
                }else {
                    temp = temp + 2419200000;
                    num_month++;
                }
            }
        }
    }
    else if(type == "Yrs") {
        if((start.getFullYear() +1)%4 == 0) {
            temp = temp + 31622400000;
        }else {
            temp = temp + 31536000000;
        }
    }

    var notification;

    if(before_after == "Before") {
        notification = msec_start - temp;
    }
    else if(before_after == "After") {
        notification = msec_start + temp;
    }

    if(notification) {
        var notification_date = new Date(notification);
        console.log("Notification Date : " + notification_date);
    }else {
        var notification_date = null;
        console.log("Notification Date : " + notification_date);
    }
    
    return notification_date;
}

router.post('/task', (req,res) => {
    console.log("task");

    var token = req.body.token;

    var reminder_task = {
        startdate: req.body.startdate,
        startmonth: req.body.startmonth,
        startyear: req.body.startyear,
        starthour: req.body.starthour,
        startmin: req.body.startmin,
        enddate: req.body.enddate,
        endmonth: req.body.endmonth,
        endyear: req.body.endyear,
        endhour: req.body.endhour,
        endmin: req.body.endmin,
        placename: req.body.placename,
        taskname: req.body.taskname
    }

    var notification_reminder_task = {
        before_after: req.body.before_after,
        num_notification: req.body.num_notification,
        type_num: req.body.type_num
    }

    var longtitude,latitude = null;

    if(token) {
        connection.query('SELECT * FROM user WHERE token = ?', token, function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'addevent_task/task : there are some error with query select add event'
                });
            }else {
                if(rows.length > 0) {
                    if(reminder_task.placename) {
                        connection.query('SELECT * FROM place WHERE name = ?', reminder_task.placename, function(err, row) {
                            if(err) {
                                res.send({
                                    status: 400,
                                    msg: 'addevent_task/task : there are some error with query select add event'
                                });
                            }else {
                                if(row.length > 0) {
                                    latitude = row[0].latitude;
                                    longtitude = row[0].longtitude;
                                }else {
                                    reminder_task.placename = null;
                                    latitude = null;
                                    longtitude = null;
                                }
                                console.log("Place name : " + reminder_task.placename + " \nLatitude : " + latitude + " && Longtitude : " + longtitude);
                            }
                        });
                    }

                    var id = rows[0]._id;
                    var int_startmonth = parseInt(reminder_task.startmonth) - 1;
                    var int_startyear = reminder_task.startyear;
                    var start = new Date(int_startyear, int_startmonth, reminder_task.startdate, reminder_task.starthour, reminder_task.startmin);
                    var startdate = start.toLocaleDateString();
                    var starttime = start.toLocaleTimeString();
                    console.log("Input Start : " + startdate + " " + starttime + " " + start);

                    var int_endmonth = parseInt(reminder_task.endmonth) - 1;
                    var int_endyear = reminder_task.endyear;

                    var end = new Date(reminder_task.endyear, reminder_task.endmonth, reminder_task.enddate, reminder_task.endhour, reminder_task.endmin);
                    var enddate = end.toLocaleDateString();
                    var endtime = end.toLocaleTimeString();
                    console.log("Input End : " + enddate + " " + endtime + " " + end);
                    console.log("Input End : " + reminder_task.enddate + " " + int_endmonth + " " + int_endyear + " " + reminder_task.endhour + " " + reminder_task.endmin);

                    connection.query(`INSERT INTO reminder(user_id, type, allday, start_date, end_date, start_time, end_time, placename, latitude, longtitude, taskname, complete) VALUES` + `('` + id + `', 'Event', '0', '` + startdate + `' , '` + enddate + `' , '` + starttime + `' , '` + endtime + `' , '` + reminder_task.placename + `' , '` + latitude + `' , '` + longtitude + `' , '` + reminder_task.taskname + `' , '0');`, function(err, rows_insert_reminder) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'addevent_task/task : allday = 0 : there are some error with query insert reminder'
                            });
                        }else {
                            if(
                                req.body.before_after
                                && req.body.num_notification
                                && req.body.type_num
                            ){
                                var num = parseInt(req.body.num_notification);
                
                                var notification_date = count_milliseconds(start, end, req.body.before_after, num, req.body.type_num);
                
                                var time_notification_table = notification_date.toLocaleTimeString();
                                var date_notification_table = notification_date.toLocaleDateString();
                
                                var reminder_id = rows_insert_reminder.insertId;
                                connection.query('INSERT INTO notification (reminder_id, time, date, before_after, number, type) VALUES ("' + reminder_id + '", "' + time_notification_table + '" , "' + date_notification_table + '" , "' + req.body.before_after + '" , "' + num + '" , "' + req.body.type_num +'")', function(err, rows) {
                                    if(err) {
                                        res.send({
                                            status: 400,
                                            msg: 'addevent_task/task : there are some error with insert notification'
                                        });
                                    }else {
                                        console.log("insert notification allday = 0");
                                    }
                                });
                            }
                            res.send({
                                status: 200,
                                msg: 'addevent_task/task : allday = 0 : complete'
                            });
                        }
                    });
                }else {
                    res.send({
                        status: 400,
                        msg: 'addevent_task/task : dont have token'
                    });
                }
            }
        });
    }else {
        res.send({
            status: 400,
            msg: 'addevent_task/task : permission denied'
        });
    }
});