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

function count_enddate(start, num){
    var msec_start = start.getTime();

    console.log("Start Date : " + start + "\nNUM : " + num);

    var temp = parseInt(num) * 24 * 60 * 60 * 1000;

    var notification = msec_start + temp;
    var end_date = new Date(notification);

    return end_date;
}

function count_notification_1(start, num){
    var msec_start = start.getTime();

    var count_num = num - Math.round(num * 0.5);
    if(count_num == 0) {
        return "Before " + count_num + " Days";
    }else if (count_num <= 29) {
        return "Before " + count_num + " Days";
    }else if(count_num > 29 && count_num <= 365) {
        var count_num_mth = Math.round(count_num/12);
        return "Before " + count_num_mth + " Mths";
    }else {
        return count_num;
    }
}

function count_notification_2(start, num){
    var msec_start = start.getTime();

    var count_num = num - Math.round(num * 0.8);
    if(count_num == 0) {
        return  "Before " + count_num + " Days";
    }else if (count_num <= 29) {
        return "Before " + count_num + " Days";
    }else if(count_num > 29 && count_num <= 365) {
        var count_num_mth = Math.round(count_num/12);
        return "Before " + count_num_mth + " Mths";
    }else {
        return count_num;
    }
}

router.post('/taskname', (req,res) => {
    connection.query(`SELECT DISTINCT type FROM catalog ORDER BY type`, function(err,rows) {
        if(err) {
            res.send({
                status: 400,
                msg: 'suggestreminder/taskname : there are some error with query select catalog'
            });
        }else {
            res.send({
                status: 200,
                data: rows,
                msg: 'suggestreminder/taskname : complete'
            });
        }
    });
});

router.post('/tasknamenotification', (req,res) => {
    var type = req.body.taskname;
    
    if(type) {
        connection.query(`SELECT * FROM catalog WHERE type = ? AND item = ?`, [type, ""], function(err,rows){
            if(err) {
                res.send({
                    status: 400,
                    msg: 'suggestreminder/tasknamenotification : there are some error with query select catalog'
                });
            }else {
                if(rows.length > 0) {
                    var num = rows[0].period_num;
                    var now = new Date();
                    var date = now.getDate();
                    var month = now.getMonth() + 1;
                    var year = now.getFullYear() + 543;
                    var startdate = date + "/" + month + "/" + year;
                    var end = count_enddate(now, num);
                    var e_date = end.getDate();
                    var e_month = end.getMonth() + 1;
                    var e_year = end.getFullYear() + 543;
                    var enddate = e_date + "/" + e_month + "/" + e_year;
    
                    var notification_1 = count_notification_1(now,num);
                    var notification_2 = count_notification_2(now,num);
    
                    var output = {
                        allday: "1",
                        startdate: startdate,
                        enddate: enddate,
                    }
                    var notification = {
                        notification_1: notification_1,
                        notification_2: notification_2
                    }

                    if(notification.notification_1 == "zero" && notification.notification_2 == "zero") {
                        res.send({
                            status: 200,
                            output: output,
                            msg: 'suggestreminder/tasknamenotification : no before_after complete'
                        });
                    }else {
                        res.send({
                            status: 200,
                            data: rows,
                            output: output,
                            notification: notification,
                            msg: 'suggestreminder/tasknamenotification : add data complete'
                        });
                    }
                }else {
                    res.send({
                        status: 200,
                        msg: 'suggestreminder/tasknamenotification : complete'
                    });
                }
            }
        });
    }else {
        res.send({  
            status: 403,
            msg: "suggestreminder/tasknamenotification : permission denied"
        });
    }
});

router.post('/subtaskname', (req,res) => {
    var type = req.body.type;

    if(type) {
        connection.query(`SELECT DISTINCT item FROM catalog WHERE NOT item = ? AND type = ? ORDER BY item`, ["",type], function(err,rows){
            if(err) {
                res.send({
                    status: 400,
                    msg: 'suggestreminder/subtaskname : there are some error with query select catalog'
                });
            }else {
                res.send({
                    status: 200,
                    data: rows,
                    msg: 'suggestreminder/subtaskname : complete'
                });
            }
        });
    }else {
        res.send({
            status: 403,
            msg: "suggestreminder/subtaskname : permission denied"
        });
    }
});

router.post('/subtasknamenotification', (req,res) => {  
    var type = req.body.taskname;
    var item = req.body.subtaskname;

    if(type && item) {
        connection.query(`SELECT * FROM catalog WHERE type = ? AND item = ?`, [type, item], function(err,rows){
            if(err) {
                res.send({
                    status: 400,
                    msg: 'suggestreminder/subtasknamenotification : there are some error with query select catalog'
                });
            }else {
                if(rows.length > 0) {
                    var num = rows[0].period_num;
                    var now = new Date();
                    var date = now.getDate();
                    var month = now.getMonth() + 1;
                    var year = now.getFullYear() + 543;
                    var startdate = date + "/" + month + "/" + year;
                    var end = count_enddate(now, num);
                    var e_date = end.getDate();
                    var e_month = end.getMonth() + 1;
                    var e_year = end.getFullYear() + 543;
                    var enddate = e_date + "/" + e_month + "/" + e_year;
    
                    var notification_1 = count_notification_1(now,num);
                    var notification_2 = count_notification_2(now,num);

                    var output = {
                        allday: "1",
                        startdate: startdate,
                        enddate: enddate,
                    }
                    var notification = {
                        notification_1: notification_1,
                        notification_2: notification_2
                    }

                    if(notification.notification_1 == "" && notification.notification_2 == "") {
                        res.send({
                            status: 200,
                            output: output,
                            msg: 'suggestreminder/subtasknamenotification : no before_after complete'
                        });
                    }else {
                        res.send({
                            status: 200,
                            data: rows,
                            output: output,
                            notification: notification,
                            msg: 'suggestreminder/subtasknamenotification : add data complete'
                        });
                    }
                }else {
                    console.log("select row = 0");
                    res.send({
                        status: 200,
                        msg: 'suggestreminder/subtasknamenotification : complete'
                    });
                }
            }
        });
    }else {
        res.send({
            status: 403,
            msg: "suggestreminder/subtasknamenotification : permission denied"
        });
    }
});