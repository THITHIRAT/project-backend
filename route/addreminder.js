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

    console.log("Start Date : " + start + "\nEnd Date : " + end + "\nMSEC Start Date : \n" + msec_start + "\nMSEC End Date : " + msec_start + "\n" + before_after, num, type);

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
                temp = 2592000000;
                num_month;
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

    var notification_date = new Date(notification);
    console.log("Notification Date : " + notification_date);
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
                    msg: 'there are some error with query select location'
                });
            }else {
                if(rows.length <= 0) {
                    res.send({
                        status: 404,
                        msg: 'can not find place'
                    });
                }else {
                    var longtitude = rows[0].longtitude;
                    var latitude = rows[0].latitude;
                    connection.query('SELECT * FROM user WHERE token = ?', token, function(err, rows) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'there are some error with query select add reminder location'
                            });
                        }else {
                            if(rows.length > 0) {
                                console.log("id : " + rows[0]._id);
                                var id = rows[0]._id;
                                connection.query('INSERT INTO reminder (user_id, type, notification, placename, latitude, longtitude, taskname, complete) VALUES ("' + id + '", "' + reminder_location.type + '", "' + reminder_location.notification + '", "' + reminder_location.placename + '", "' + latitude + '", "'  + longtitude + '", "' + reminder_location.taskname + '", "' + reminder_location.complete + '") ', function(err, rows) {
                                    if(err) {
                                        res.send({
                                            status: 400,
                                            msg: 'there are some error with query insert add reminder location'
                                        });
                                    }else {
                                        res.send({
                                            msg: 'insert location reminder'
                                        });
                                        console.log('location');
                                    }
                                });
                            }else {
                                res.send({
                                    msg: 'blank'
                                });
                            }
                        }
                    });
                }
            }
        });
    }else {
        res.send({
            msg: "permission denied"
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
                    msg: 'there are some error with query select add event'
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
                    msg: 'there are some error with query select add event'
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
                            var end = new Date(int_endyear, int_endmonth, reminder_event.enddate, reminder_event.endhour, reminder_event.endmin);
                            var enddate = end.toLocaleDateString();
                            var endtime = end.toLocaleTimeString();
                            
                            connection.query('INSERT INTO reminder (user_id, type, allday, start_date, end_date, start_time, end_time, placename, latitude, longtitude, taskname, complete) VALUES ("' + id + '", "' + reminder_event.type + '", "0", "'  + startdate + '", "' + enddate + '", "' + starttime + '", "' + endtime + '", "' + reminder_event.placename + '", "' + latitude + '", "' + longtitude + '", "' + reminder_event.taskname + '", "' + reminder_event.complete +'")', function(err,rows){
                                if(err) {
                                    res.send({
                                        status: 400,
                                        msg: 'allday = 0 : there are some error with query select add event'
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

                                        connection.query('INSERT INTO notification (reminder_id, time, date) VALUES ("' + reminder_id + '", "' + time_notification_table + '" , "' + date_notification_table + '")', function(err, rows) {
                                            if(err) {
                                                res.send({
                                                    status: 400,
                                                    msg: 'allday = 0 : there are some error with insert notification'
                                                });
                                            }else {
                                                res.send({
                                                    status: 200,
                                                    msg: 'allday = 0 : insert notification success'
                                                });
                                            }
                                        });
                                    }else {
                                        res.send({
                                            status: 400,
                                            msg: 'allday = 0 : dont have data notification start date, end date, start time, end time'
                                        });
                                    }
                                }
                            });
                        }else {
                            res.send({
                                status: 400,
                                msg: 'allday = 0 : dont have starttime or endtime'
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
                            console.log("addreminder/event " + token);
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
                                        msg: 'allday = 1 : there are some error with insert reminder'
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
                                                    msg: 'allday = 1 : there are some error with insert notification'
                                                });
                                            }else {
                                                res.send({
                                                    status: 200,
                                                    msg: 'allday = 1 : insert notification success'
                                                });
                                            }
                                        });
                                    }else {
                                        res.send({
                                            status: 400,
                                            msg: 'allday = 1 : dont have allday > date, month, year, hrs, mins'
                                        });
                                    }
                                }
                            });
                        }else {
                            res.send({
                                status : 400,
                                msg: "allday = 1 : input not complete"
                            });
                        }
                    }
                }else {
                    res.send({
                        msg: 'this token dont have user'
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
        && reminder_reminder.type
        && reminder_reminder.allday
        && reminder_reminder.startdate
        && reminder_reminder.startmonth
        && reminder_reminder.startyear
        && reminder_reminder.enddate
        && reminder_reminder.endmonth
        && reminder_reminder.endyear
        && reminder_reminder.taskname
        && reminder_reminder.complete
    ){
        connection.query('SELECT * FROM place WHERE name = ?', reminder_reminder.placename, function(err, row) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'there are some error with query select add reminder'
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
        connection.query('SELECT * FROM user WHERE token = ?', token, function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'there are some error with query select add reminder'
                });
            }else {
                if(rows.length > 0){
                    console.log("user_id : " + rows[0]._id);
                    var id = rows[0]._id;
                    if(reminder_reminder.allday == "0") {
                       if(
                            reminder_reminder.starthour
                            && reminder_reminder.startmin
                            && reminder_reminder.startdate
                            && reminder_reminder.startmonth
                            && reminder_reminder.startyear
                            && reminder_reminder.endhour 
                            && reminder_reminder.endmin
                            && reminder_reminder.enddate
                            && reminder_reminder.endmonth
                            && reminder_reminder.endyear 
                       ){
                            var int_startmonth = parseInt(reminder_reminder.startmonth) - 1;
                            var int_startyear = reminder_reminder.startyear;
                            var start = new Date(int_startyear, int_startmonth, reminder_reminder.startdate, reminder_reminder.starthour, reminder_reminder.startmin);
                            var startdate = start.toLocaleDateString();
                            var starttime = start.toLocaleTimeString();

                            var int_endmonth = parseInt(reminder_reminder.endmonth) - 1;
                            var int_endyear = reminder_reminder.endyear;
                            var end = new Date(int_endyear, int_endmonth, reminder_reminder.enddate, reminder_reminder.endhour, reminder_reminder.endmin);
                            var enddate = end.toLocaleDateString();
                            var endtime = end.toLocaleTimeString();

                            connection.query('INSERT INTO reminder (user_id, type, allday, start_date, end_date, start_time, end_time, placename, latitude, longtitude, taskname, complete) VALUES ("' + id + '", "' + reminder_reminder.type + '", "0", "'  + startdate + '", "' + enddate + '", "' + starttime + '", "' + endtime + '", "' + reminder_reminder.placename + '", "' + latitude + '", "' + longtitude + '", "' + reminder_reminder.taskname + '", "' + reminder_reminder.complete +'")', function(err,rows){
                                if(err) {
                                    res.send({
                                        status: 400,
                                        msg: 'allday = 0 : there are some error with query select add reminder'
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

                                        connection.query('INSERT INTO notification (reminder_id, time, date) VALUES ("' + reminder_id + '", "' + time_notification_table + '" , "' + date_notification_table + '")', function(err, rows) {
                                            if(err) {
                                                res.send({
                                                    status: 400,
                                                    msg: 'allday = 0 : there are some error with insert notification'
                                                });
                                            }else {
                                                res.send({
                                                    status: 200,
                                                    msg: 'allday = 0 : insert notification success'
                                                });
                                            }
                                        });
                                    }else {
                                        res.send({
                                            status: 400,
                                            msg: 'allday = 0 : dont have data notification start date, end date, start time, end time'
                                        });
                                    }
                                }
                            });
                       }else {
                        res.send({
                            status: 400,
                            msg: 'allday = 0 : dont have days hrs mins'
                        });
                       }
                    }
                    if(reminder_reminder.allday == "1") {
                        if(
                            reminder_reminder.startdate
                            && reminder_reminder.startmonth
                            && reminder_reminder.startyear
                            && reminder_reminder.enddate
                            && reminder_reminder.endmonth
                            && reminder_reminder.endyear 
                        ){
                            var int_startmonth = parseInt(reminder_reminder.startmonth) - 1;
                            var int_startyear = reminder_reminder.startyear;
                            var start = new Date(int_startyear, int_startmonth, reminder_reminder.startdate);
                            var startdate = start.toLocaleDateString();

                            var int_endmonth = parseInt(reminder_reminder.endmonth) - 1;
                            var int_endyear = reminder_reminder.endyear;
                            var end = new Date(int_endyear, int_endmonth, reminder_reminder.enddate);
                            var enddate = end.toLocaleDateString();
                            
                            connection.query('INSERT INTO reminder (user_id, type, allday, start_date, end_date, placename, latitude, longtitude, taskname, complete) VALUES ("' + id + '", "' + reminder_reminder.type + '", "1", "'  + startdate + '", "' + enddate + '", "' + reminder_reminder.placename + '", "' + latitude + '", "' + longtitude + '", "' + reminder_reminder.taskname + '", "' + reminder_reminder.complete +'")', function(err,rows){
                                if(err) {
                                    res.send({
                                        status: 400,
                                        msg: 'allday = 1 : there are some error with query select add reminder'
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

                                        connection.query('INSERT INTO notification (reminder_id, time, date) VALUES ("' + reminder_id + '", "' + time_notification_table + '" , "' + date_notification_table + '")', function(err, rows) {
                                            if(err) {
                                                res.send({
                                                    status: 400,
                                                    msg: 'allday = 1 : there are some error with insert notification'
                                                });
                                            }else {
                                                res.send({
                                                    status: 200,
                                                    msg: 'allday = 1 : insert notification success'
                                                });
                                            }
                                        });
                                    }else {
                                        res.send({
                                            status: 400,
                                            msg: 'allday = 0 : dont have data notification start date, end date, start time, end time'
                                        });
                                    }
                                }
                            });
                        }else {
                            res.send({
                                status: 400,
                                msg: 'allday = 0 : dont have days hrs mins'
                            });
                        }
                     }
                }else {
                    res.send({
                        msg: 'this token dont have user'
                    });
                }
            }
        });
    }else {
        res.send({
            msg: 'addreminder reminder : data not enough'
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