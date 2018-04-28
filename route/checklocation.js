const app = require('express');
const router = app.Router();
const random = require('meteor-random');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const request = require('request');
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
    var input_longtitude = req.body.longtitude;
    var input_latitude = req.body.latitude;
    var input_date = req.body.date;

    var split_input_date = input_date.split("-");
    var int_input_year_ad = parseInt(split_input_date[0]);
    var int_input_year_bc = int_input_year_ad + 543;
    var int_input_month = split_input_date[1];
    var int_input_day = split_input_date[2];

    var input_date_bc = int_input_year_bc + "-" + int_input_month + "-" + int_input_day;

    var check_day = false;
    if(
        input_latitude
        && input_longtitude
    ){
        console.log("latitude checklocation_reminder : " + input_latitude);
        console.log("longtitude checklocation_reminder : " + input_longtitude + "\n");
        connection.query(`SELECT * FROM user WHERE token = ?`, [token], function(err,rows_user) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'checklocation/notification : there are some error with query select user'
                });
            }else {
                if(rows_user.length > 0) {
                    connection.query(`SELECT * FROM notification, reminder WHERE reminder._id = notification.reminder_id AND reminder_id IN (SELECT _id FROM reminder WHERE type = 'Reminder' AND complete = '0' AND user_id IN (SELECT _id FROM user WHERE token = ?))`, [token], function(err,rows_notification) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'checklocation/notification : there are some error with query select notificaition'
                            });
                        }else {
                            var index = [];
                            var str_taskname_subtaskname = null;
                            if(rows_notification.length > 0) {
                                if(input_date) {
                                    for(var i=0; i<rows_notification.length; i++) {
                                        if(input_date_bc == rows_notification[i].date) {
                                            index.push(i);
                                            check_day = true;
                                            console.log(index);
                                        }
                                    }
                                    if(check_day == true) {
                                        var taskname, subtaskname = null;
                                        var array_taskname_subtaskname = [];
                                        var requestLocation = []
                                        for(var i=0; i<index.length; i++) {
                                            requestLocation.push(new Promise(function(resolve,reject) {
                                                var num = index[i];
                                                // console.log(input_date_bc + " " + rows_notification[num].date);
                                                // console.log(input_latitude + " " + rows_notification[num].latitude);
                                                // console.log(input_longtitude + " " + rows_notification[num].longtitude);
                                                var api = "AIzaSyBqen24A8jnMVNYz5FTA-Fl4Hry0ocktLQ"
                                                var callapi = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&";
                                                var origins = "origins=" + input_latitude + "," + input_longtitude + "&";
                                                var destinations = "destinations=" + rows_notification[num].latitude + "," + rows_notification[num].longtitude + "&";
                                                var API_KEY = "key=" + api;
                                                var url = callapi + origins + destinations + API_KEY;
                                                
                                                request(url, function(error, response, body) {
                                                    var data = JSON.parse(body);
                                                    if(data.rows[0].elements[0].status == 'OK'){
                                                        console.log(data.rows[0].elements[0].distance.text);
                                                        var str_distance = data.rows[0].elements[0].distance.text;
                                                        var split_distance = str_distance.split(" ");
                                                        var float_distance = parseFloat(split_distance[0]);
                                                        //unit kilometer for notification
                                                        if(float_distance < 5) {
                                                            taskname = rows_notification[num].taskname;
                                                            subtaskname = " : " + rows_notification[num].subtaskname;
                                                            str_taskname_subtaskname = taskname + subtaskname;
                                                            array_taskname_subtaskname.push(str_taskname_subtaskname);
                                                            console.log(array_taskname_subtaskname);
                                                            resolve(true);
                                                        }else {
                                                            resolve(false);
                                                        }
                                                    }else {
                                                        console.log(data.rows[0].elements[0].status);
                                                        resolve(false);
                                                    }
                                                });
                                            }))
                                        }
                                        Promise.all(requestLocation)
                                            .then(function(check) {
                                                console.log("then : " + check);
                                                if(check.includes(true)) {
                                                    console.log("output : " + array_taskname_subtaskname);
                                                    res.send({
                                                        status: 200,
                                                        taskname: array_taskname_subtaskname,
                                                        msg: 'checklocation/notification : notification'
                                                    });
                                                }else {
                                                    res.send({
                                                        status: 200,
                                                        msg: 'checklocation/notification : complete '
                                                    });
                                                }
                                            })
                                            .catch(function(error) {
                                                console.log("catach : " + check);
                                                res.send({
                                                    status: 200,
                                                    msg: 'checklocation/notification : complete'
                                                });
                                            })
                                    }else {
                                        res.send({
                                            status: 200,
                                            msg: 'checklocation/notification : check_day = false (this date dont have notification)'
                                        });
                                    }
                                }
                            }else {
                                res.send({
                                    status: 400,
                                    msg: 'checklocation/notification : rows_notification <= 0'
                                });
                            }
                        }
                    });
                }else {
                    res.send({
                        status: 400,
                        msg: 'checklocation/notification : dont have token'
                    });
                }
            }
        });
    }else {
        res.send({
            status: 403,
            msg: 'checklocation/notification : permission denied'
        });
    }
});