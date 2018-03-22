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
    var date_notification_table;
    var time_notification_table;

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
                            var int_startyear = "20" + reminder_event.startyear;
                            var start = new Date(int_startyear, int_startmonth, reminder_event.startdate, reminder_event.starthour, reminder_event.startmin);
                            var startdate = start.toLocaleDateString();
                            var starttime = start.toLocaleTimeString();

                            var int_endmonth = parseInt(reminder_event.endmonth) - 1;
                            var int_endyear = "20" + reminder_event.endyear;
                            var end = new Date(int_endyear, int_endmonth, reminder_event.enddate, reminder_event.endhour, reminder_event.endmin);
                            var enddate = end.toLocaleDateString();
                            var endtime = end.toLocaleTimeString();

                            console.log("StartDate : " + startdate + "\nEndDate : " + enddate);
                            console.log("StartTime : " + starttime + "\nEndTime : " + endtime);
                            
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
                                        if(notification_datetime.before_after == "Before") {
                                            var num = parseInt(notification_datetime.num_notification);
                                            var time = (parseInt(start.getFullYear()) * 12 * 30 * 24 * 60) + parseInt((start.getMonth()+1) * 30 * 24 * 60) + (parseInt(start.getDate()) * 24 * 60) + (parseInt(start.getHours()) * 60) + (parseInt(start.getMinutes()));
                                            
                                            if(notification_datetime.type_num == "Mins") {
                                                var time_notification = time - num;
    
                                                var year_notification = Math.floor(time_notification/(12*30*24*60));
                                                var mod_year_notification = time_notification%(12*30*24*60);
    
                                                var month_notification = Math.floor(mod_year_notification/(30*24*60));
                                                var mod_month_notification = mod_year_notification%(30*24*60);
    
                                                var date_notification = Math.floor(mod_month_notification/(24*60));
                                                var mod_date_notification = mod_month_notification%(24*60);
    
                                                var hour_notification = Math.floor(mod_date_notification/60);
                                                var min_notification = mod_date_notification % 60;
    
                                                console.log("Before Mins : " + num + "\nTime : " + date_notification + "/" + month_notification + "/" + year_notification + " " + hour_notification + ":" + min_notification);
                                                var date_time_notification_table = new Date(year_notification, month_notification, date_notification, hour_notification, min_notification, 0, 0);
                                                date_notification_table = date_time_notification_table.toLocaleDateString();
                                                time_notification_table = date_time_notification_table.toLocaleTimeString();
                                            }
                                            else if(notification_datetime.type_num == "Hrs") {
                                                var time_notification = time - (num * 60);
    
                                                var year_notification = Math.floor(time_notification/(12*30*24*60));
                                                var mod_year_notification = time_notification%(12*30*24*60);
    
                                                var month_notification = Math.floor(mod_year_notification/(30*24*60));
                                                var mod_month_notification = mod_year_notification%(30*24*60);
    
                                                var date_notification = Math.floor(mod_month_notification/(24*60));
                                                var mod_date_notification = mod_month_notification%(24*60);
    
                                                var hour_notification = Math.floor(mod_date_notification/60);
                                                var min_notification = mod_date_notification % 60;
    
                                                console.log("Before Hrs : " + num + "\nTime : " + date_notification + "/" + month_notification + "/" + year_notification + " " + hour_notification + ":" + min_notification);
                                                var date_time_notification_table = new Date(year_notification, month_notification, date_notification, hour_notification, min_notification, 0, 0);
                                                date_notification_table = date_time_notification_table.toLocaleDateString();
                                                time_notification_table = date_time_notification_table.toLocaleTimeString();
                                            }
                                            else if(notification_datetime.type_num == "Days") {
                                                var time_notification = time - (num * 60 * 24);
    
                                                var year_notification = Math.floor(time_notification/(12*30*24*60));
                                                var mod_year_notification = time_notification%(12*30*24*60);
    
                                                var month_notification = Math.floor(mod_year_notification/(30*24*60));
                                                var mod_month_notification = mod_year_notification%(30*24*60);
    
                                                var date_notification = Math.floor(mod_month_notification/(24*60));
                                                var mod_date_notification = mod_month_notification%(24*60);
    
                                                var hour_notification = Math.floor(mod_date_notification/60);
                                                var min_notification = mod_date_notification % 60;
                                        
                                                console.log("Before Days : " + num + "\nTime : " + date_notification + "/" + month_notification + "/" + year_notification + " " + hour_notification + ":" + min_notification);
                                                var date_time_notification_table = new Date(year_notification, month_notification, date_notification, hour_notification, min_notification, 0, 0);
                                                date_notification_table = date_time_notification_table.toLocaleDateString();
                                                time_notification_table = date_time_notification_table.toLocaleTimeString();
                                            }
                                            else {
                                                res.send({
                                                    status: 400,
                                                    msg: 'allday = 0 : dont have days hrs mins'
                                                });
                                            }
                                            connection.query('INSERT INTO notification (reminder_id, time, date) VALUES ("' + reminder_id + '", "' + time_notification_table + '" , "' + date_notification_table + '")', function(err, rows) {
                                                console.log(time_notification_table + " " + date_notification_table);
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
                                        }
                                        if(notification_datetime.before_after == "After") {
                                            var num = parseInt(notification_datetime.num_notification);
                                            var time = (parseInt(start.getFullYear()) * 12 * 30 * 24 * 60) + parseInt((start.getMonth()+1) * 30 * 24 * 60) + (parseInt(start.getDate()) * 24 * 60) + (parseInt(start.getHours()) * 60) + (parseInt(start.getMinutes()));
                                            
                                            if(notification_datetime.type_num == "Mins") {
                                                var time_notification = time + num;
    
                                                var year_notification = Math.floor(time_notification/(12*30*24*60));
                                                var mod_year_notification = time_notification%(12*30*24*60);
    
                                                var month_notification = Math.floor(mod_year_notification/(30*24*60));
                                                var mod_month_notification = mod_year_notification%(30*24*60);
    
                                                var date_notification = Math.floor(mod_month_notification/(24*60));
                                                var mod_date_notification = mod_month_notification%(24*60);
    
                                                var hour_notification = Math.floor(mod_date_notification/60);
                                                var min_notification = mod_date_notification % 60;
    
                                                console.log("Before Mins : " + num + "\nTime : " + date_notification + "/" + month_notification + "/" + year_notification + " " + hour_notification + ":" + min_notification);
                                                var date_time_notification_table = new Date(year_notification, (month_notification-1), date_notification, hour_notification, min_notification, 0, 0);
                                                date_notification_table = date_time_notification_table.toLocaleDateString();
                                                time_notification_table = date_time_notification_table.toLocaleTimeString();
                                            }
                                            else if(notification_datetime.type_num == "Hrs") {
                                                var time_notification = time + (num * 60);
    
                                                var year_notification = Math.floor(time_notification/(12*30*24*60));
                                                var mod_year_notification = time_notification%(12*30*24*60);
    
                                                var month_notification = Math.floor(mod_year_notification/(30*24*60));
                                                var mod_month_notification = mod_year_notification%(30*24*60);
    
                                                var date_notification = Math.floor(mod_month_notification/(24*60));
                                                var mod_date_notification = mod_month_notification%(24*60);
    
                                                var hour_notification = Math.floor(mod_date_notification/60);
                                                var min_notification = mod_date_notification % 60;
    
                                                console.log("Before Hrs : " + num + "\nTime : " + date_notification + "/" + month_notification + "/" + year_notification + " " + hour_notification + ":" + min_notification);
                                                var date_time_notification_table = new Date(year_notification, (month_notification-1), date_notification, hour_notification, min_notification, 0, 0);
                                                date_notification_table = date_time_notification_table.toLocaleDateString();
                                                time_notification_table = date_time_notification_table.toLocaleTimeString();
                                            }
                                            else if(notification_datetime.type_num == "Days") {
                                                var time_notification = time + (num * 60 * 24);
    
                                                var year_notification = Math.floor(time_notification/(12*30*24*60));
                                                var mod_year_notification = time_notification%(12*30*24*60);
    
                                                var month_notification = Math.floor(mod_year_notification/(30*24*60));
                                                var mod_month_notification = mod_year_notification%(30*24*60);
    
                                                var date_notification = Math.floor(mod_month_notification/(24*60));
                                                var mod_date_notification = mod_month_notification%(24*60);
    
                                                var hour_notification = Math.floor(mod_date_notification/60);
                                                var min_notification = mod_date_notification % 60;
                                        
                                                console.log("Before Days : " + num + "\nTime : " + date_notification + "/" + month_notification + "/" + year_notification + " " + hour_notification + ":" + min_notification);
                                                var date_time_notification_table = new Date(year_notification, (month_notification-1), date_notification, hour_notification, min_notification, 0, 0);
                                                date_notification_table = date_time_notification_table.toLocaleDateString();
                                                time_notification_table = date_time_notification_table.toLocaleTimeString();
                                            }
                                            else {
                                                res.send({
                                                    status: 400,
                                                    msg: 'allday = 0 : dont have days hrs mins'
                                                });
                                            }
                                            connection.query('INSERT INTO notification (reminder_id, time, date) VALUES ("' + reminder_id + '", "' + time_notification_table + '" , "' + date_notification_table + '")', function(err, rows) {
                                                console.log(time_notification_table + " " + date_notification_table);
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
                                        }
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