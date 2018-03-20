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
        enddate: req.body.enddate,
        starttime: req.body.starttime,
        endtime: req.body.endtime,
        placename: req.body.placename,
        taskname: req.body.taskname,
        complete: req.body.complete
    }

    var notification_datetime = {
        before_after:req.body.before_after,
        num_notification:req.body.num_notification,
        type_num:req.body.type_num
    }

    var token = req.body.token;

    // if(
    //     token
    //     && reminder_event.type
    //     && reminder_event.allday
    //     && reminder_event.startdate
    //     && reminder_event.enddate
    //     && reminder_event.taskname
    //     && reminder_event.complete
    // ){
    //     connection.query('SELECT * FROM user WHERE token = ?', token, function(err, rows) {
    //         if(err) {
    //             res.send({
    //                 status: 400,
    //                 msg: 'there are some error with query select add event'
    //             });
    //         }else {
    //             if(rows.length > 0) {
    //                 console.log("id : " + rows[0]._id);
    //                 var id = rows[0]._id;
    //                 connection.query('SELECT * FROM place WHERE name = ?', reminder_event.placename, function(err, rows) {
    //                     if(err) {
    //                         res.send({
    //                             status: 400,
    //                             msg: 'there are some error with query select add event'
    //                         });
    //                     }else {
    //                         if(rows[0].length > 0) {
    //                             var latitude = rows[0].latitude;
    //                             var longtitude = rows[0].longtitude;
    //                         }else {
    //                             reminder_event.placename = null;
    //                             latitude = null;
    //                             longtitude = null;
    //                         }
    //                     }
    //                 });
    //                 if(reminder_event.allday == 0) {
    //                     if(reminder_event.starttime && reminder_event.endtime) {
    //                         connection.query('INSERT INTO reminder (user_id, type, start_date, end_date, start_time, end_time, placename, latitude, longtitude, taskname, complete) VALUES ("' + id + '", "' + reminder_event.type + '", "' + reminder_event.startdate + '", "' + reminder_event.enddate + '", "' + reminder_event.starttime + '", "' + reminder_event.endtime + '", "' + reminder_event.placename + '", "' + latitude + '", "' + longtitude + '", "' + reminder_event.taskname + '", "' + reminder_event.complete +'") ', function(err,rows){
    //                             console.log(rows);
    //                             if(
    //                                 notification_datetime.before_after
    //                                 && notification_datetime.num_notification
    //                                 && notification_datetime.type_num
    //                             ){
    //                                 if(notification_datetime.before_after == "before") {

    //                                 }
    //                                 if(notification_datetime.before_after == "after") {

    //                                 }
    //                             }else {
    //                                 res.send({
    //                                     status: 400,
    //                                     msg: 'dont have data notification'
    //                                 });
    //                             }
    //                         });
    //                     }else {
    //                         res.send({
    //                             status: 400,
    //                             msg: 'dont have start time or endtime'
    //                         });
    //                     }
    //                 }
    //                 if(reminder_event.allday == 1) {
    //                     connection.query('INSERT INTO reminder (user_id, type, start_date, end_date, placename, latitude, longtitude, taskname, complete) VALUES ("' + id + '", "' + reminder_event.type + '", "' + reminder_event.startdate + '", "' + reminder_event.enddate + '", "' + reminder_event.placename + '", "' + latitude + '", "' + longtitude + '", "' + reminder_event.taskname + '", "' + reminder_event.complete +'") ', function(err,rows){
                        
    //                     });
    //                 }
    //             }else {
    //                 res.send({
    //                     msg: 'blank'
    //                 });
    //             }
    //         }
    //     });
    // }else {

    // }
    var date = new Date();
    var json = date.toJSON();
    res.send({
        data: json,
        msg: 'blank'
    });
});