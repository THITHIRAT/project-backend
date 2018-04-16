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

router.post('/task', (req,res) => {
    var reminder_id = req.body.id;
    var type = req.body.type;

    connection.query(`SELECT * FROM reminder WHERE _id = ?`, [reminder_id], function(err,rows){
        if(err) {
            res.send({
                status: 400,
                msg: 'detailreminder/task : there are some error with query select task'
            });
        }else {
            if(rows.length > 0) {
                if(type == "Reminder") {
                    console.log("Reminder");
                    connection.query(`SELECT * FROM notification WHERE reminder_id = ?`, [reminder_id], function(err,rows_notification) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'detailreminder/task : there are some error with query select notification'
                            });
                        }else {
                            var loop = rows_notification.length;
                            if(loop == 0) {
                                res.send({
                                    status: 200,
                                    data: rows,
                                    notification: [],
                                    msg: 'detailreminder/task : complete'
                                });
                            }else {
                                var array_output = new Array();
                                for (var i=0; i<loop; i++) {
                                    var output = {
                                        before_after: rows_notification[i].before_after,
                                        number: rows_notification[i].number,
                                        type: rows_notification[i].type,
                                        time: rows_notification[i].time,
                                    }
                                    array_output[i] = output;
                                }
                                console.log("detailreminder" + "\ntaskname : " + rows[0].taskname);
                                res.send({
                                    status: 200,
                                    data: rows,
                                    notification: array_output,
                                    msg: 'detailreminder/task : complete'
                                });
                            }
                        }
                    });
                }else if(type == "Event") {
                    console.log("Event");
                    connection.query(`SELECT * FROM notification WHERE reminder_id = ?`, [reminder_id], function(err,rows_notification) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'detailreminder/task : there are some error with query select notification'
                            });
                        }else {
                            var allday = rows[0].allday;
                            console.log("Type allday : " + typeof(allday));

                            var loop = rows_notification.length;
                            if(loop == 0) {
                                res.send({
                                    status: 200,
                                    data: rows,
                                    notification: [],
                                    msg: 'detailreminder/task : complete'
                                });
                            }else {
                                if(allday == 0) {
                                    var array_output = new Array();
                                    var output = {
                                        before_after: rows_notification[0].before_after,
                                        number: rows_notification[0].number,
                                        type: rows_notification[0].type
                                    }
                                    array_output[0] = output;
                                    console.log("detailreminder 0" + "\ntaskname : " + rows[0].taskname);
                                        res.send({
                                            status: 200,
                                            data: rows,
                                            notification: array_output,
                                            msg: 'detailreminder/task : complete'
                                        });
                                    }
                                if(allday == 1){
                                    var array_output = new Array();
                                    var output = {
                                        date: rows_notification[0].date,
                                        time: rows_notification[0].time
                                    }
                                    array_output[0] = output;
                                    console.log("detailreminder 1" + "\ntaskname : " + rows[0].taskname);
                                    res.send({
                                        status: 200,
                                        data: rows,
                                        notification: array_output,
                                        msg: 'detailreminder/task : complete'
                                    });
                                }
                            }
                        }
                    });
                }else {
                    res.send({
                        status: 200,
                        data: rows,
                        msg: 'detailreminder/task : complete'
                    });
                }
            }else {
                res.send({
                    status: 400,
                    msg: 'detailreminder/task : dont have reminder_id'
                });
            }
        }
    });
});