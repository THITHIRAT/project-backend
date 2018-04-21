const app = require('express');
const router = app.Router();
const random = require('meteor-random');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const moment = require('moment');
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

function count_reminder(msec_end, before_after, num, type){
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
        console.log("End Date Months : " + (end.getMonth() + 1));
        var loop = parseInt(num);
        for(var i=0; i<loop; i++) {
            var num_month = end.getMonth();
            if(num_month == 0 || num_month == 2 || num_month == 4 || num_month == 6 || num_month == 7 || num_month == 9 || num_month == 11) {
                temp = temp + 2678400000;
                num_month++;
            }
            else if(num_month == 3 || num_month == 5 || num_month == 8 || num_month == 10) {
                temp = temp + 2592000000;
                num_month++;
            }
            else if(num_month == 1) {
                if((end.getFullYear() + 1)%4 == 0) {
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
        if((end.getFullYear() +1)%4 == 0) {
            temp = temp + 31622400000;
        }else {
            temp = temp + 31536000000;
        }
    }

    var notification = msec_end - temp;

    if(notification) {
        var notification_date = new Date(notification);
        console.log("Notification Date : " + notification_date);
    }else {
        var notification_date = null;
        console.log("Notification Date : " + notification_date);
    }
    
    return notification_date;
}

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
        notification = msec_end - temp;
    }
    else if(before_after == "After") {
        notification = msec_end + temp;
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

router.post('/location', (req,res) => {
    var reminder_location = {
        type: req.body.type,
        notification: req.body.notification,
        placename: req.body.placename,
        taskname: req.body.taskname,
        complete: req.body.complete
    }

    var token = req.body.token;

    if(
        reminder_location.type
        && reminder_location.placename
        && reminder_location.notification
        && token
    ){
        connection.query('SELECT * FROM place WHERE name = ?', reminder_location.placename, function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'addreminder/location : there are some error with query select location'
                });
            }else {
                if(rows.length <= 0) {
                    res.send({
                        status: 400,
                        msg: 'addreminder/location : can not find place'
                    });
                }else {
                    var longtitude = rows[0].longtitude;
                    var latitude = rows[0].latitude;
                    connection.query('SELECT * FROM user WHERE token = ?', token, function(err, rows) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'addreminder/location : there are some error with query select add reminder location'
                            });
                        }else {
                            if(rows.length > 0) {
                                console.log("id : " + rows[0]._id);
                                var id = rows[0]._id;
                                connection.query('INSERT INTO reminder (user_id, type, notification, placename, latitude, longtitude, taskname, complete) VALUES ("' + id + '", "' + reminder_location.type + '", "' + reminder_location.notification + '", "' + reminder_location.placename + '", "' + latitude + '", "'  + longtitude + '", "' + reminder_location.taskname + '", "' + reminder_location.complete + '") ', function(err, rows) {
                                    if(err) {
                                        res.send({
                                            status: 400,
                                            msg: 'addreminder/location : there are some error with query insert add reminder location'
                                        });
                                    }else {
                                        res.send({
                                            status: 200,
                                            msg: 'addreminder/location : insert location reminder complete'
                                        });
                                        console.log('location');
                                    }
                                });
                            }else {
                                res.send({
                                    status: 400,
                                    msg: 'addreminder/location : dont have token'
                                });
                            }
                        }
                    });
                }
            }
        });
    }else {
        res.send({
            status: 403,
            msg: "addreminder/location : permission denied"
        });
    }
});

router.post('/event', (req,res) => {
    var reminder_event = {
        type: req.body.type,
        allday: req.body.allday,
        startdate: req.body.startdate,
        startmonth: req.body.startmonth,
        startyear: req.body.startyear,
        enddate: req.body.enddate,
        endmonth: req.body.endmonth,
        endyear: req.body.endyear,
        starthour: req.body.starthour,
        startmin: req.body.startmin,
        endhour: req.body.endhour,
        endmin: req.body.endmin,
        placename: req.body.placename,
        taskname: req.body.taskname,
        complete: req.body.complete
    }

    var notification_datetime = {
        before_after: req.body.before_after,
        num_notification: req.body.num_notification,
        type_num: req.body.type_num
    }

    var token = req.body.token;

    var longtitude, latitude;
    var reminder_id;
    var date_notification_table, time_notification_table;

    if(
        token
        && reminder_event.type
        && reminder_event.allday
        && reminder_event.startdate
        && reminder_event.startmonth
        && reminder_event.startyear
        && reminder_event.enddate
        && reminder_event.endmonth
        && reminder_event.endyear
        && reminder_event.taskname
        && reminder_event.complete
    ){
        connection.query('SELECT * FROM place WHERE name = ?', reminder_event.placename, function(err, row) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'addreminder/event : there are some error with query select add event'
                });
            }else {
                if(row.length > 0) {
                    latitude = row[0].latitude;
                    longtitude = row[0].longtitude;
                }else {
                    reminder_event.placename = null;
                    latitude = null;
                    longtitude = null;
                }
                console.log("Place name : " + reminder_event.placename + " \nLatitude : " + latitude + " && Longtitude : " + longtitude);
            }
        });
        connection.query('SELECT * FROM user WHERE token = ?', token, function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'addreminder/event : there are some error with query select add event'
                });
            }else {
                if(rows.length > 0) {
                    console.log("user_id : " + rows[0]._id);
                    var id = rows[0]._id;

                    if(reminder_event.allday == "0") {
                        if(
                            reminder_event.starthour 
                            && reminder_event.startmin
                            && reminder_event.startdate
                            && reminder_event.startmonth
                            && reminder_event.startyear
                            && reminder_event.endhour 
                            && reminder_event.endmin
                            && reminder_event.enddate
                            && reminder_event.endmonth
                            && reminder_event.endyear 
                        ){
                            var int_startmonth = parseInt(reminder_event.startmonth) - 1;
                            var int_startyear = reminder_event.startyear;
                            var start = new Date(int_startyear, int_startmonth, reminder_event.startdate, reminder_event.starthour, reminder_event.startmin);
                            var startdate = start.toLocaleDateString();
                            var starttime = start.toLocaleTimeString();

                            var int_endmonth = parseInt(reminder_event.endmonth) - 1;
                            var int_endyear = reminder_event.endyear;
                            console.log("int_endyear" + int_endyear);
                            var end = new Date(int_endyear, int_endmonth, reminder_event.enddate, reminder_event.endhour, reminder_event.endmin);
                            var enddate = end.toLocaleDateString();
                            var endtime = end.toLocaleTimeString();
                            
                            connection.query('INSERT INTO reminder (user_id, type, allday, start_date, end_date, start_time, end_time, placename, latitude, longtitude, taskname, complete) VALUES ("' + id + '", "' + reminder_event.type + '", "0", "'  + startdate + '", "' + enddate + '", "' + starttime + '", "' + endtime + '", "' + reminder_event.placename + '", "' + latitude + '", "' + longtitude + '", "' + reminder_event.taskname + '", "' + reminder_event.complete +'")', function(err,rows){
                                if(err) {
                                    res.send({
                                        status: 400,
                                        msg: 'addreminder/event : allday = 0 : there are some error with query select add event'
                                    });
                                }else {
                                    console.log("Reminder_id : " + rows.insertId);
                                    reminder_id = rows.insertId;
                                    if(
                                        notification_datetime.before_after
                                        && notification_datetime.num_notification
                                        && notification_datetime.type_num
                                    ){
                                        var num = parseInt(notification_datetime.num_notification);

                                        var notification_date = count_milliseconds(start, end, notification_datetime.before_after, num, notification_datetime.type_num);

                                        var time_notification_table = notification_date.toLocaleTimeString();
                                        var date_notification_table = notification_date.toLocaleDateString();

                                        connection.query('INSERT INTO notification (reminder_id, time, date, before_after, number, type) VALUES ("' + reminder_id + '", "' + time_notification_table + '" , "' + date_notification_table + '" , "' + notification_datetime.before_after + '" , "' + num + '" , "' + notification_datetime.type_num +'")', function(err, rows) {
                                            if(err) {
                                                res.send({
                                                    status: 400,
                                                    msg: 'addreminder/event : allday = 0 : there are some error with insert notification'
                                                });
                                            }else {
                                                res.send({
                                                    status: 200,
                                                    msg: 'addreminder/event : allday = 0 : insert notification complete'
                                                });
                                            }
                                        });
                                    }else {
                                        res.send({
                                            status: 400,
                                            msg: 'addreminder/event : allday = 0 : dont have data notification start date, end date, start time, end time'
                                        });
                                    }
                                }
                            });
                        }else {
                            res.send({
                                status: 400,
                                msg: 'addreminder/event : allday = 0 : dont have starttime or endtime'
                            });
                        }
                    }
                    if(reminder_event.allday == "1") {
                        if(
                            reminder_event.startdate
                            && reminder_event.startmonth
                            && reminder_event.startyear
                            && reminder_event.enddate
                            && reminder_event.endmonth
                            && reminder_event.endyear 
                        ){
                            var int_startmonth = parseInt(reminder_event.startmonth) - 1;
                            var int_startyear =  reminder_event.startyear;
                            var start = new Date(int_startyear, int_startmonth, reminder_event.startdate);
                            var startdate = start.toLocaleDateString();

                            var int_endmonth = parseInt(reminder_event.endmonth) - 1;
                            var int_endyear = reminder_event.endyear;
                            var end = new Date(int_endyear, int_endmonth, reminder_event.enddate);
                            var enddate = end.toLocaleDateString();

                            connection.query('INSERT INTO reminder (user_id, type, allday, start_date, end_date, placename, latitude, longtitude, taskname, complete) VALUES ("' + id + '", "' + reminder_event.type + '", "1", "' + startdate + '", "' + enddate +  '", "'  + reminder_event.placename + '", "' + latitude + '", "' + longtitude + '", "' + reminder_event.taskname + '", "' + reminder_event.complete +'")', function(err,rows){
                                if(err) {
                                    res.send({
                                        status: 400,
                                        msg: 'addreminder/event : allday = 1 : there are some error with insert reminder'
                                    });
                                }else {
                                    console.log("Reminder_id : " + rows.insertId);
                                    reminder_id = rows.insertId;
                                    if(
                                        req.body.allday_date
                                        && req.body.allday_month
                                        && req.body.allday_year
                                        && req.body.allday_hrs
                                        && req.body.allday_mins
                                    ){
                                        var int_year = req.body.allday_year;
                                        var int_month = parseInt(req.body.allday_month) - 1;
                                        var date_time_notification_table = new Date(int_year, int_month, req.body.allday_date, req.body.allday_hrs, req.body.allday_mins, 0, 0);
                                        date_notification_table = date_time_notification_table.toLocaleDateString();
                                        time_notification_table = date_time_notification_table.toLocaleTimeString();
                                        connection.query('INSERT INTO notification (reminder_id, time, date) VALUES ("' + reminder_id + '", "' + time_notification_table + '" , "' + date_notification_table + '")', function(err, rows) {
                                            if(err) {
                                                res.send({
                                                    status: 400,
                                                    msg: 'addreminder/event : allday = 1 : there are some error with insert notification'
                                                });
                                            }else {
                                                res.send({
                                                    status: 200,
                                                    msg: 'addreminder/event : allday = 1 : insert notification complete'
                                                });
                                            }
                                        });
                                    }else {
                                        res.send({
                                            status: 400,
                                            msg: 'addreminder/event : allday = 1 : dont have allday > date, month, year, hrs, mins'
                                        });
                                    }
                                }
                            });
                        }else {
                            res.send({
                                status : 400,
                                msg: "addreminder/event : allday = 1 : input not complete"
                            });
                        }
                    }
                }else {
                    res.send({
                        msg: 'addreminder/event : this token dont have user'
                    });
                }
            }
        });
    }else {
        res.send({
            msg: 'addreminder event : date not enough'
        });
    }
});

router.post('/reminder', (req,res) => {
    var reminder_reminder = {
        type: req.body.type,
        startdate: req.body.startdate,
        startmonth: req.body.startmonth,
        startyear: req.body.startyear,
        enddate: req.body.enddate,
        endmonth: req.body.endmonth,
        endyear: req.body.endyear,
        purchasedate: req.body.purchasedate,
        purchasemonth: req.body.puechasemonth,
        purchaseyear: req.body.purchaseyear,
        placename: req.body.placename,
        taskname: req.body.taskname,
        subtaskname: req.body.subtaskname,
        complete: req.body.complete
    }

    var notification_datetime_1 = {
        before_after_1: req.body.before_after_1,
        num_notification_1: req.body.num_notification_1,
        type_num_1: req.body.type_num_1
    }

    var notification_datetime_2 = {
        before_after_2: req.body.before_after_2,
        num_notification_2: req.body.num_notification_2,
        type_num_2: req.body.type_num_2
    }
    
    var notification_datetime_3 = {
        before_after_3: req.body.before_after_3,
        num_notification_3: req.body.num_notification_3,
        type_num_3: req.body.type_num_3
    }

    var token = req.body.token;

    var longtitude, latitude;
    var reminder_id;
    var date_notification_table;

    if(reminder_reminder.placename) {
        connection.query('SELECT * FROM place WHERE name = ?', reminder_reminder.placename, function(err, row) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'addreminder/reminder : there are some error with query select add reminder'
                });
            }else {
                if(row.length > 0) {
                    latitude = row[0].latitude;
                    longtitude = row[0].longtitude;
                }else {
                    reminder_reminder.placename = null;
                    latitude = null;
                    longtitude = null;
                }
                console.log("Place name : " + reminder_reminder.placename + " \nLatitude : " + latitude + " && Longtitude : " + longtitude);
            }
        });
    }

    if(
        token
        && reminder_reminder.type
        && reminder_reminder.enddate
        && reminder_reminder.endmonth
        && reminder_reminder.endyear
        && reminder_reminder.taskname
        && reminder_reminder.complete
    ){
        connection.query('SELECT * FROM user WHERE token = ?', token, function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'addreminder/reminder : there are some error with query select add reminder'
                });
            }else {
                if(rows.length > 0){
                    console.log("user_id : " + rows[0]._id);
                    var id = rows[0]._id;
                    if(
                        reminder_reminder.enddate
                        && reminder_reminder.endmonth
                        && reminder_reminder.endyear 
                    ){
                        var int_endmonth = parseInt(reminder_reminder.endmonth) - 1;
                        var int_endyear = reminder_reminder.endyear;
                        var end = new Date(int_endyear, int_endmonth, reminder_reminder.enddate);
                        var msec_end = end.getTime();
                        var enddate = end.toLocaleDateString();

                        var msec_date;
                        if(
                            reminder_reminder.startdate
                            && reminder_reminder.startmonth
                            && reminder_reminder.startyear
                        ){
                            var int_startmonth = parseInt(reminder_reminder.startmonth) - 1;
                            var int_startyear = reminder_reminder.startyear;
                            var start = new Date(int_startyear, int_startmonth, reminder_reminder.startdate);
                            var msec_start = start.getTime();
                            var startdate = start.toLocaleDateString();
                            msec_date = msec_start;
                        }else {
                            startdate = null;
                            var now = new Date();
                            var msec_now = now.getTime();
                            msec_date = msec_now;
                        }

                        var total_sec = (msec_end - msec_date) / 1000;
                        var total_min;
                        var total_hrs;
                        var total_day;
                        var total_db = 0;

                        if(total_sec > 60) {
                            total_min = total_sec / 60;
                            if(total_min > 60) {
                                total_hrs = total_min / 60;
                                if(total_hrs > 24) {
                                    total_day = Math.round(total_hrs / 24);
                                    console.log("Days : " + total_day);
                                    total_db = total_day;
                                }
                            }
                        }

                        var time_notification = req.body.time;
                        if(time_notification) {
                            console.log("Time Notification : " + time_notification);
                        }else {
                            time_notification = "12:30";
                            console.log("No Time Notification and Set default : " + time_notification);
                        }
                        
                        var purchase = new Date();
                        var purchase_table = purchase.toLocaleDateString();

                        connection.query('INSERT INTO reminder (user_id, type, start_date, purchase_date, end_date, placename, latitude, longtitude, taskname, subtaskname, complete, total) VALUES ("' + id + '", "' + reminder_reminder.type + '", "'  + startdate + '", "' + purchase_table + '" , "' + enddate + '", "' + reminder_reminder.placename + '", "' + latitude + '", "' + longtitude + '", "' + reminder_reminder.taskname + '", "' + reminder_reminder.subtaskname + '", "' + reminder_reminder.complete + '", "' + total_db +'")', function(err,rows){
                            if(err) {
                                res.send({
                                    status: 400,
                                    msg: 'addreminder/reminder : there are some error with query select add reminder'
                                });
                            }else {
                                console.log("Reminder_id : " + rows.insertId);
                                reminder_id = rows.insertId;
                                if(notification_datetime_1){
                                    var num = parseInt(notification_datetime_1.num_notification_1);
                                    
                                    if (num == 0 || isNaN(num)) {
                                        console.log("notification_datetime_1 : num = 0");
                                    }else {
                                        console.log("notification_datetime_1 : " + num);
                                        var notification_date_1 = count_reminder(msec_end, notification_datetime_1.before_after_1, num, notification_datetime_1.type_num_1);

                                        if(notification_date_1 == null) {
                                            console.log("notification_datetime_1 : not success");
                                        }else {
                                            var date_notification_table = notification_date_1.toLocaleDateString();

                                            connection.query(`INSERT INTO notification (reminder_id, date, before_after, number, type, placename) VALUES ("` + reminder_id +  `" , "` + date_notification_table + `" , "` + notification_datetime_1.before_after_1 + `" , "` + num + `" , "` + notification_datetime_1.type_num_1 + `" , "` + reminder_reminder.placename + `")`, function(err, notification1_rows) {
                                                if(err) {
                                                    res.send({
                                                        status: 400,
                                                        msg: 'addreminder/reminder : there are some error with insert notification 1'
                                                    });
                                                }else {
                                                    console.log("notification_datetime_1 : success");
                                                    if(time_notification) {
                                                        var notification1_id = notification1_rows.insertId;
                                                        connection.query(`UPDATE notification SET time = '` + req.body.time + `' WHERE _id = '` + notification1_id + `'`, function(err,rows) {
                                                            if(err) {
                                                                res.send({
                                                                    status: 400,
                                                                    msg: 'addreminder/reminder : there are some error with update time notification 1'
                                                                });
                                                            }else {
                                                                console.log("notification_datetime_1 : success insert time");
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }

                                if(notification_datetime_2){
                                    var num = parseInt(notification_datetime_2.num_notification_2);

                                    if (num == 0 || isNaN(num)) {
                                        console.log("notification_datetime_2 : num = 0");
                                    }else {
                                        console.log("notification_datetime_2 : " + num);
                                        var notification_date_2 = count_reminder(msec_end, notification_datetime_2.before_after_2, num, notification_datetime_2.type_num_2);

                                        if(notification_date_2 == null) {
                                            console.log("notification_datetime_2 : not success");
                                        }else {
                                            var date_notification_table = notification_date_2.toLocaleDateString();
                                            
                                            connection.query(`INSERT INTO notification (reminder_id, date, before_after, number, type, placename) VALUES ("` + reminder_id +  `" , "` + date_notification_table + `" , "` + notification_datetime_2.before_after_2 + `" , "` + num + `" , "` + notification_datetime_2.type_num_2 + `" , "` + reminder_reminder.placename + `")`, function(err, notification2_rows) {
                                                if(err) {
                                                    res.send({
                                                        status: 400,
                                                        msg: 'addreminder/reminder : there are some error with insert notification 2'
                                                    });
                                                }else {
                                                    console.log("notification_datetime_2 : success");

                                                    if(time_notification) {
                                                        var notification2_id = notification2_rows.insertId;
                                                        connection.query(`UPDATE notification SET time = '` + req.body.time + `' WHERE _id = '` + notification2_id + `'`, function(err,rows) {
                                                            if(err) {
                                                                res.send({
                                                                    status: 400,
                                                                    msg: 'addreminder/reminder : there are some error with update time notification 2'
                                                                });
                                                            }else {
                                                                console.log("notification_datetime_2 : success insert time");
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }

                                if(notification_datetime_3){
                                    var num = parseInt(notification_datetime_3.num_notification_3);

                                    if (num == 0 || isNaN(num)) {
                                        console.log("notification_datetime_3 : num = 0");
                                    }else {
                                        console.log("notification_datetime_3 : " + num);
                                        var notification_date_3 = count_reminder(msec_end, notification_datetime_3.before_after_3, num, notification_datetime_3.type_num_3);

                                        if(notification_date_3 == null) {
                                            console.log("notification_datetime_3 : not success");
                                        }else {
                                            var date_notification_table = notification_date_3.toLocaleDateString();
   
                                            connection.query(`INSERT INTO notification (reminder_id, date, before_after, number, type, placename) VALUES ("` + reminder_id + `" , "` + date_notification_table + `" , "` + notification_datetime_3.before_after_3 + `" , "` + num + `" , "` + notification_datetime_3.type_num_3 + `" , "` + reminder_reminder.placename +`")`, function(err, notification3_rows) {
                                                if(err) {
                                                    res.send({
                                                        status: 400,
                                                        msg: 'addreminder/reminder : there are some error with insert notification 3'
                                                    });
                                                }else {
                                                    console.log("notification_datetime_3 : success");
                                                    if(time_notification) {
                                                        var notification3_id = notification3_rows.insertId;
                                                        connection.query(`UPDATE notification SET time = '` + req.body.time + `' WHERE _id = '` + notification3_id + `'`, function(err,rows) {
                                                            if(err) {
                                                                res.send({
                                                                    status: 400,
                                                                    msg: 'addreminder/reminder : there are some error with update time notification 3'
                                                                });
                                                            }else {
                                                                console.log("notification_datetime_3 : success insert time");
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }
                                res.send({
                                    status: 200,
                                    data: rows,
                                    msg: 'addreminder/reminder : complete'
                                });
                            }
                        });
                    }else {
                        res.send({
                            status: 400,
                            msg: 'addreminder/reminder : dont have end date'
                        });
                    } 
                }else {
                    res.send({
                        status: 400,
                        msg: 'addreminder/reminder : dont have token'
                    });
                }
            }
        });
    }else {
        res.send({
            status: 400,
            msg: 'addreminder/reminder : data not enough'
        });
    }
});

router.post('/testdatetime', (req,res) => {
    var jan = new Date(2018, 0, 12).getTime();

    var feb18 = new Date(2018, 1, 12).getTime();
    var feb14 = new Date(2014, 1, 12).getTime();
    var feb17 = new Date(2017, 1, 12).getTime();
    var feb16 = new Date(2016, 1, 12).getTime();
    var feb12 = new Date(2012, 1, 12).getTime();

    var mar14 = new Date(2014, 2, 12).getTime();
    var mar17 = new Date(2017, 2, 12).getTime();
    var mar16 = new Date(2016, 2, 12).getTime();
    var mar12 = new Date(2012, 2, 12).getTime();

    var mar = new Date(2018, 2, 12).getTime();

    var apr = new Date(2018, 3, 12).getTime();
    var may = new Date(2018, 4, 12).getTime();
    var jun = new Date(2018, 5, 12).getTime();
    var jul = new Date(2018, 6, 12).getTime();
    var aug = new Date(2018, 7, 12).getTime();
    var sep = new Date(2018, 8, 12).getTime();
    var oct = new Date(2018, 9, 12).getTime();
    var nov = new Date(2018, 10, 12).getTime();
    var dec = new Date(2018, 11, 12).getTime();

    var y2015 = new Date(2015, 3, 12).getTime();
    var y2016 = new Date(2016, 3, 12).getTime();
    var y2017 = new Date(2017, 3, 12).getTime();
    var y2018 = new Date(2018, 3, 12).getTime();
    var y2019 = new Date(2019, 3, 12).getTime();
    var y2020 = new Date(2020, 3, 12).getTime();
    var y2021 = new Date(2021, 3, 12).getTime();
    var y2022 = new Date(2022, 3, 12).getTime();
    var y2023 = new Date(2023, 3, 12).getTime();
    var y2024 = new Date(2024, 3, 12).getTime();
    var y2025 = new Date(2025, 3, 12).getTime();
    var y2026 = new Date(2026, 3, 12).getTime();


    console.log("KOM : " + (feb18-jan));
    console.log("KOM : " + (apr-mar));

    console.log("YON : " + (may-apr));
    console.log("YON : " + (oct-sep));

    console.log("FEB18 : " + (mar-feb18));
    console.log("FEB14 : " + (mar14-feb14));

    console.log("FEB17 : " + (mar17-feb17));
    console.log("FEB16 : " + (mar16-feb16));

    console.log("FEB12 : " + (mar12-feb12));

    console.log("Y15 : " + (y2016-y2015));
    console.log("Y16 : " + (y2017-y2016));
    console.log("Y17 : " + (y2018-y2017));
    console.log("Y18 : " + (y2019-y2018));
    console.log("Y19 : " + (y2020-y2019));
    console.log("Y20 : " + (y2021-y2020));
    console.log("Y21 : " + (y2022-y2021));
    console.log("Y22 : " + (y2023-y2022));
    console.log("Y23 : " + (y2024-y2023));
    console.log("Y24 : " + (y2025-y2024));
    console.log("Y25 : " + (y2026-y2025));

    res.send({
        msg: "HELLO"
    });
});