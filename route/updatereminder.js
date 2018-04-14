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

router.post('/task', (req,res) => {
    var reminder_id = req.body.id;
    var input = {
        notification: req.body.notification,
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
        subtaskname: req.body.subtaskname,
    }
    
    var latitude, longtitude = null;

    var type = req.body.type;

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

    if(input.placename) {
        connection.query(`SELECT * FROM place WHERE name = ?`, [input.placename], function(err,rows){
            if(err) {
                res.send({
                    status: 400,
                    msg: 'updatereminder/task : there are some error with query select reminder'
                });
            }else {
                if(rows.length > 0) {
                    latitude = rows[0].latitude;
                    longtitude = rows[0].longtitude;
                }else {
                    input.placename = null;
                    latitude = null;
                    longtitude = null;
                }
                console.log("Place name : " + input.placename + " \nLatitude : " + latitude + " && Longtitude : " + longtitude);
            }
        });
    }

    if(type) {
        if(type == "Location") {
            if(
                input.placename
                && input.taskname
                && reminder_id
            ){
                //update reminder table
                connection.query(`UPDATE reminder SET notification = '` + input.notification + `', placename = '` + input.placename + `', taskname = '` + input.taskname + `' WHERE _id = '` + reminder_id + `'`, function(err,rows){
                    if(err) {
                        res.send({
                            status: 400,
                            msg: 'updatereminder/task : there are some error with query update reminder location'
                        });
                    }else {
                        connection.query(`UPDATE reminder SET latitude = '` + latitude + `', longtitude = '` + longtitude + `' WHERE _id = '` + reminder_id + `'`, function(err,rows) {
                            if(err) {
                                res.send({
                                    status: 400,
                                    msg: 'updatereminder/task : there are some error with query update reminder lat & lng for location'
                                });
                            }else {
                                res.send({
                                    status: 200,
                                    data: input,
                                    place: "lat : " + latitude + " / lng : " + longtitude,
                                    msg: 'updatereminder/task : complete'
                                });
                            }
                        })
                    }
                });
            }else {
                res.send({
                    status: 403,
                    msg: 'updatereminder/task : permission denied location'
                });
            }
        }

        if(type == "Event") {
            if(
                input.startdate
                && input.startmonth
                && input.startyear
                && input.enddate
                && input.endmonth
                && input.endyear
                && input.allday
                && input.taskname
                && reminder_id
            ) {
                var int_startmonth = parseInt(input.startmonth) - 1;
                var int_startyear = parseInt(input.startyear);
                var start = new Date(int_startyear, int_startmonth, input.startdate, input.starthour, input.startmin, 0, 0);
                var startdate = start.toLocaleDateString();
                var starttime = start.toLocaleTimeString();
                console.log("Input Start Date : " + input.startdate + "/" + input.startmonth + "/" + input.startyear + " \nInput Start Time : " + input.starthour + ":" + input.startmin + "\n" + startdate + " & " + starttime);
        
                var int_endmonth = parseInt(input.endmonth) - 1;
                var int_endyear = parseInt(input.endyear);
                var end = new Date(int_endyear, int_endmonth, input.enddate, input.endhour, input.endmin, 0, 0);
                var enddate = end.toLocaleDateString();
                var endtime = end.toLocaleTimeString();
                console.log("Input End Date : " + input.enddate + "/" + input.endmonth + "/" + input.endyear + " \nInput End Time : " + input.endhour + ":" + input.endmin +  "\n" + enddate + " & " + endtime);
                
                connection.query(`SELECT * FROM notification WHERE reminder_id = ?`, [reminder_id], function(err,rows_selectnotification){
                    if(err) {
                        res.send({
                            status: 400,
                            msg: 'updatereminder/task : there are some error with select notification'
                        });
                    }else {
                        console.log("Length : " + rows_selectnotification.length);
                        console.log("typeof all day event : " + typeof(input.allday) + " - value : " + input.allday);
                        if(rows_selectnotification.length > 0) {
                            console.log("delete all rows have notification for reminder_id : " + reminder_id);
                            connection.query(`DELETE FROM notification WHERE reminder_id = ?`, [reminder_id], function(err,rows){
                                if(err) {
                                    res.send({
                                        status: 400,
                                        msg: 'updatereminder/task : there are some error with delete notification'
                                    });
                                }else {
                                    console.log("Delete Notification complete");
                                }
                            });
                        }else {
                            console.log("dont have notification for reminder_id : " + reminder_id);
                        }

                        if(input.allday == "0") {
                            if(
                                req.body.before_after_1
                                && req.body.num_notification_1
                                && req.body.type_num_1
                            ){
                                var num = parseInt(req.body.num_notification_1);

                                var notification_date = count_milliseconds(start, end, req.body.before_after_1, num, req.body.type_num_1);

                                var time_notification_table = notification_date.toLocaleTimeString();
                                var date_notification_table = notification_date.toLocaleDateString();

                                connection.query('INSERT INTO notification (reminder_id, time, date, before_after, number, type) VALUES ("' + reminder_id + '", "' + time_notification_table + '" , "' + date_notification_table + '" , "' + req.body.before_after_1 + '" , "' + num + '" , "' + req.body.type_num_1 +'")', function(err, rows) {
                                    if(err) {
                                        res.send({
                                            status: 400,
                                            msg: 'updatereminder/task : there are some error with insert notification'
                                        });
                                    }else {
                                        console.log("insert notification allday = 0");
                                    }
                                });
                            }
                            
                        }else if(input.allday == "1"){
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
                                            msg: 'updatereminder/task : there are some error with insert notification'
                                        });
                                    }else {
                                        console.log("insert notification allday = 1");
                                    }
                                });
                            }
                        }else {
                            res.send({
                                status: 400,
                                msg: 'updatereminder/task : dont have value of allday'
                            });
                        }
                    }
                });

                //update reminder table
                connection.query(`UPDATE reminder SET allday = '` + input.allday + `', start_date = '` + startdate + `', start_time = '` + starttime + `', end_date = '` + enddate + `', end_time = '` + endtime + `', placename = '` + input.placename + `', taskname = '` + input.taskname + `', subtaskname = '` + input.subtaskname + `' WHERE _id = '` + reminder_id + `'`, function(err,rows){
                    if(err) {
                        res.send({
                            status: 400,
                            msg: 'updatereminder/task : there are some error with query update reminder event'
                        });
                    }else {
                        connection.query(`UPDATE reminder SET latitude = '` + latitude + `', longtitude = '` + longtitude + `' WHERE _id = '` + reminder_id + `'`, function(err,rows) {
                            if(err) {
                                res.send({
                                    status: 400,
                                    msg: 'updatereminder/task : there are some error with query update reminder lat & lng'
                                });
                            }else {
                                res.send({
                                    status: 200,
                                    data: input,
                                    place: "lat : " + latitude + " / lng : " + longtitude,
                                    msg: 'updatereminder/task : complete'
                                });
                            }
                        })
                    }
                });
            }else {
                res.send({
                    status: 403,
                    msg: 'updatereminder/task : permission denied event'
                });
            }
        }

        if(type == "Reminder") {
            if(
                input.enddate
                && input.endmonth
                && input.endyear
                && input.taskname
                && reminder_id
            ){
                if(
                    input.startdate
                    && input.startmonth
                    && input.startyear
                ){
                    var int_startmonth = parseInt(input.startmonth) - 1;
                    var int_startyear = parseInt(input.startyear);
                    var start = new Date(int_startyear, int_startmonth, input.startdate, input.starthour, input.startmin, 0, 0);
                    var startdate = start.toLocaleDateString();
                    var starttime = start.toLocaleTimeString();
                    console.log("Input Start Date : " + input.startdate + "/" + input.startmonth + "/" + input.startyear + " \nInput Start Time : " + input.starthour + ":" + input.startmin + "\n" + startdate + " & " + starttime);
                    connection(`UPDATE reminder SET start_date = '` + startdate + `' WHERE _id = '` + reminder_id `'`, function(err,rows) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'updatereminder/task : there are some error with select notification'
                            });
                        }else {
                            console.log("Update start date : " + startdate);
                        }
                    });
                }

                var int_endmonth = parseInt(input.endmonth) - 1;
                var int_endyear = parseInt(input.endyear);
                var end = new Date(int_endyear, int_endmonth, input.enddate, input.endhour, input.endmin, 0, 0);
                var enddate = end.toLocaleDateString();
                var endtime = end.toLocaleTimeString();
                console.log("Input End Date : " + input.enddate + "/" + input.endmonth + "/" + input.endyear + " \nInput End Time : " + input.endhour + ":" + input.endmin +  "\n" + enddate + " & " + endtime);

                connection.query(`SELECT * FROM notification WHERE reminder_id = ?`, [reminder_id], function(err,rows_selectnotification){
                    if(err) {
                        res.send({
                            status: 400,
                            msg: 'updatereminder/task : there are some error with select notification'
                        });
                    }else {
                        console.log("Length : " + rows_selectnotification.length);
                        console.log("typeof all day event : " + typeof(input.allday) + " - value : " + input.allday);
                        if(rows_selectnotification.length > 0) {
                            console.log("delete all rows have notification for reminder_id : " + reminder_id);
                            connection.query(`DELETE FROM notification WHERE reminder_id = ?`, [reminder_id], function(err,rows){
                                if(err) {
                                    res.send({
                                        status: 400,
                                        msg: 'updatereminder/task : there are some error with delete notification'
                                    });
                                }else {
                                    console.log("Delete Notification complete");
                                }
                            });
                        }else {
                            console.log("dont have notification for reminder_id : " + reminder_id);
                        }

                        var time_notification = req.body.time;
                        if(time_notification) {
                            console.log("Time Notification : " + time_notification);
                        }else {
                            time_notification = "09:00";
                        }

                        if(
                            notification_datetime_1.before_after_1
                            && notification_datetime_1.num_notification_1
                            && notification_datetime_1.type_num_1
                        ){
                            var num = parseInt(notification_datetime_1.num_notification_1);
                            if (num == 0) {
                                console.log("updatereminder/task : notification_datetime_1 for num = 0");
                            }else {
                                var notification_date_1 = count_reminder(end.getTime(), notification_datetime_1.before_after_1, num, notification_datetime_1.type_num_1);
                
                                if(notification_date_1 == null) {
                                    console.log("updatereminder/task : notification_datetime_1 not success");
                                }else {
                                    var date_notification_table = notification_date_1.toLocaleDateString();
                
                                    connection.query(`INSERT INTO notification (reminder_id, date, before_after, number, type, time) VALUES ("` + reminder_id + `" , "` + date_notification_table + `" , "` + notification_datetime_1.before_after_1 + `" , "` + num + `" , "` + notification_datetime_1.type_num_1 + `" , "` + time_notification + `")`, function(err, rows) {
                                        if(err) {
                                            res.send({
                                                status: 400,
                                                msg: 'updatereminder/task : there are some error with insert notification 1'
                                            });
                                        }else {
                                            console.log("updatereminder/task : notification_datetime_1 success");
                                            if(req.body.placename) {
                                                notification_id = rows.insertId;
                                                connection.query(`UPDATE notification SET placename = '` + req.body.placename + `' WHERE _id = '` + notification_id + `'`, function(err,rows) {
                                                    if(err) {
                                                        res.send({
                                                            status: 400,
                                                            msg: 'updatereminder/task :  there are some error with insert notification placename'
                                                        });
                                                    }else {
                                                        console.log("Complete Placename");
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        }
                
                        if(
                            notification_datetime_2.before_after_2
                            && notification_datetime_2.num_notification_2
                            && notification_datetime_2.type_num_2
                        ){
                            var num = parseInt(notification_datetime_2.num_notification_2);
                
                            if (num == 0) {
                                console.log("updatereminder/task : notification_datetime_2 for num = 0");
                            }else {
                                var notification_date_2 = count_reminder(end.getTime(), notification_datetime_2.before_after_2, num, notification_datetime_2.type_num_2);
                
                                if(notification_date_2 == null) {
                                    console.log("updatereminder/task : notification_datetime_2 not success");
                                }else {
                                    var time_notification_table = notification_date_2.toLocaleTimeString();
                                    var date_notification_table = notification_date_2.toLocaleDateString();
                
                                    connection.query(`INSERT INTO notification (reminder_id, date, before_after, number, type, time) VALUES ("` + reminder_id + `" , "` + date_notification_table + `" , "` + notification_datetime_2.before_after_2 + `" , "` + num + `" , "` + notification_datetime_2.type_num_2 + `" , "` + time_notification + `")`, function(err, rows) {
                                        if(err) {
                                            res.send({
                                                status: 400,
                                                msg: 'updatereminder/task : there are some error with insert notification 2'
                                            });
                                        }else {
                                            console.log("updatereminder/task : notification_datetime_2 success");
                                            if(req.body.placename) {
                                                notification_id = rows.insertId;
                                                connection.query(`UPDATE notification SET placename = '` + req.body.placename + `' WHERE _id = '` + notification_id + `'`, function(err,rows) {
                                                    if(err) {
                                                        res.send({
                                                            status: 400,
                                                            msg: 'updatereminder/task :  there are some error with insert notification placename'
                                                        });
                                                    }else {
                                                        console.log("Complete Placename");
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        }
                
                        if(
                            notification_datetime_3.before_after_3
                            && notification_datetime_3.num_notification_3
                            && notification_datetime_3.type_num_3
                        ){
                            var num = parseInt(notification_datetime_3.num_notification_3);
                
                            if (num == 0) {
                                console.log("updatereminder/task :notification_datetime_3 for num = 0");
                            }else {
                                var notification_date_3 = count_reminder(end.getTime(), notification_datetime_3.before_after_3, num, notification_datetime_3.type_num_3);
                
                                if(notification_date_3 == null) {
                                    console.log("updatereminder/task : otification_datetime_3 not success");
                                }else {
                                    var time_notification_table = notification_date_3.toLocaleTimeString();
                                    var date_notification_table = notification_date_3.toLocaleDateString();
                
                                    connection.query(`INSERT INTO notification (reminder_id, date, before_after, number, type, time) VALUES ("` + reminder_id + `" , "` + date_notification_table + `" , "` + notification_datetime_3.before_after_3 + `" , "` + num + `" , "` + notification_datetime_3.type_num_3 + `" , "` + time_notification + `")`, function(err, rows) {
                                        if(err) {
                                            res.send({
                                                status: 400,
                                                msg: 'updatereminder/task :  there are some error with insert notification 3'
                                            });
                                        }else {
                                            console.log("updatereminder/task : notification_datetime_3 success");
                                            if(req.body.placename) {
                                                notification_id = rows.insertId;
                                                connection.query(`UPDATE notification SET placename ='` + req.body.placename + `' WHERE _id = '` + notification_id + `'`, function(err,rows) {
                                                    if(err) {
                                                        res.send({
                                                            status: 400,
                                                            msg: 'updatereminder/task :  there are some error with insert notification placename'
                                                        });
                                                    }else {
                                                        console.log("Complete Placename");
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    }
                });

                //update reminder table
                connection.query(`UPDATE reminder SET end_date = '` + enddate + `', placename = '` + input.placename + `', taskname = '` + input.taskname + `', subtaskname = '` + input.subtaskname + `' WHERE _id = '` + reminder_id + `'`, function(err,rows){
                    if(err) {
                        res.send({
                            status: 400,
                            msg: 'updatereminder/task : there are some error with query update reminder event'
                        });
                    }else {
                        connection.query(`UPDATE reminder SET latitude = '` + latitude + `', longtitude = '` + longtitude + `' WHERE _id = '` + reminder_id + `'`, function(err,rows) {
                            if(err) {
                                res.send({
                                    status: 400,
                                    msg: 'updatereminder/task : there are some error with query update reminder lat & lng'
                                });
                            }else {
                                res.send({
                                    status: 200,
                                    data: input,
                                    place: "lat : " + latitude + " / lng : " + longtitude,
                                    msg: 'updatereminder/task : complete'
                                });
                            }
                        })
                    }
                });
            }else {
                res.send({
                    status: 403,
                    msg: 'updatereminder/task : permission denied reminder'
                });
            }
        }
    }else {
        res.send({
            status: 400,
            msg: 'updatereminder/task : no type : location event reminder'
        });
    }
});