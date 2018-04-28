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

    if(
        input_longtitude
        && input_latitude
    ){
        console.log("latitude checklocation_location : " + input_latitude);
        console.log("longtitude checklocation_location : " + input_longtitude + "\n");
        connection.query(`SELECT * FROM user WHERE token = ?`, [token], function(err,rows_user) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'checklocation_forlocation/notification : there are some error with query select user'
                });
            }else {
                if(rows_user.length > 0) {
                    connection.query(`SELECT * FROM reminder WHERE type = 'Location' AND complete = '0' AND user_id IN (SELECT _id FROM user WHERE token = ?)`, [token], function(err,rows_reminder) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'checklocation_forlocation/notification : there are some error with query select reminder'
                            });
                        }else {
                            var index = [];
                            if(rows_reminder.length > 0) {
                                var taskname = null;
                                var array_taskname_subtaskname = [];
                                var requestLocation = []
                                for (var i=0; i<rows_reminder.length; i++) {
                                    // console.log(rows_reminder[i]);
                                    index.push(i);
                                }
                                for (var i=0; i<index.length; i++) {
                                    requestLocation.push(new Promise(function(resolve,reject) {
                                        var num = index[i];
                                        var api = "AIzaSyBqen24A8jnMVNYz5FTA-Fl4Hry0ocktLQ"
                                        var callapi = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&";
                                        var origins = "origins=" + input_latitude + "," + input_longtitude + "&";
                                        var destinations = "destinations=" + rows_reminder[num].latitude + "," + rows_reminder[num].longtitude + "&";
                                        var API_KEY = "key=" + api;
                                        var url = callapi + origins + destinations + API_KEY;
                                        
                                        request(url, function(error, response, body) {
                                            var data = JSON.parse(body);
                                            if(data.rows[0].elements[0].status == 'OK'){
                                                console.log(data.rows[0].elements[0].distance.text);
                                                var str_distance = data.rows[0].elements[0].distance.text;
                                                var split_distance = str_distance.split(" ");
                                                var float_distance = parseFloat(split_distance[0]);
                                                resolve(false);
                                                //unit kilometer for notification
                                                if(rows_reminder[num].notification == "Arrive") {
                                                    if(float_distance < 2) {
                                                        taskname = "Arrive : " + rows_reminder[num].taskname;
                                                        array_taskname_subtaskname.push(taskname);
                                                        console.log(array_taskname_subtaskname);
                                                        resolve(true);
                                                    }else {
                                                        console.log("Arrive cannot notification");
                                                        resolve(false);
                                                    }
                                                } else if(rows_reminder[num].notification == "Pass") {
                                                    if(float_distance < 5) {
                                                        taskname = "Pass : " + rows_reminder[num].taskname;
                                                        array_taskname_subtaskname.push(taskname);
                                                        console.log(array_taskname_subtaskname);
                                                        resolve(true);
                                                    }else {
                                                        console.log("Pass cannot notification");
                                                        resolve(false);
                                                    }
                                                } else if(rows_reminder[num].notification == "Depart") {
                                                    if(float_distance > 1) {
                                                        taskname = "Depart : " + rows_reminder[num].taskname;
                                                        array_taskname_subtaskname.push(taskname);
                                                        console.log(array_taskname_subtaskname);
                                                        resolve(true);
                                                    }else {
                                                        console.log("Depart cannot notification");
                                                        resolve(false);
                                                    }
                                                } else {
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
                                        if(check.includes(false)) {
                                            console.log("output : " + array_taskname_subtaskname);
                                            res.send({
                                                status: 200,
                                                taskname: array_taskname_subtaskname,
                                                msg: 'checklocation_forlocation/notification : notification'
                                            });
                                        }else {
                                            res.send({
                                                status: 200,
                                                msg: 'checklocation_forlocation/notification : complete '
                                            });
                                        }
                                    })
                                    .catch(function(error) {
                                        console.log("catach : " + check);
                                        res.send({
                                            status: 200,
                                            msg: 'checklocation_forlocation/notification : complete'
                                        });
                                    })
                            }else {
                                res.send({
                                    status: 200,
                                    msg: 'checklocation_forlocation/notification : rows_notification <= 0'
                                });
                            }
                        }
                    });
                }else {
                    res.send({
                        status: 400,
                        msg: 'checklocation_forlocation/notification : dont have token'
                    });
                }
            }
        });
    }else {
        res.send({
            status: 403,
            msg: 'checklocation_forlocation/notification : permission denied'
        });
    }
});