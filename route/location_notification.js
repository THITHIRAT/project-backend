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

router.post('/showarrive', (req,res) => {
    connection.query(`SELECT * FROM location_notification WHERE type = "arrive"`, function(err,rows){
        if(err) {
            res.send({
                status: 400,
                msg: 'location_notification/showarrive : there are some error with query select location_notification'
            });
        }else {
            res.send({
                status: 200,
                data: rows,
                msg: 'location_notification/showarrive : complete'
            });
        }
    });
});

router.post('/showpass', (req,res) => {
    connection.query(`SELECT * FROM location_notification WHERE type = "pass"`, function(err,rows){
        if(err) {
            res.send({
                status: 400,
                msg: 'location_notification/showpass : there are some error with query select location_notification'
            });
        }else {
            res.send({
                status: 200,
                data: rows,
                msg: 'location_notification/showpass : complete'
            });
        }
    });
});

router.post('/showdepart', (req,res) => {
    connection.query(`SELECT * FROM location_notification WHERE type = "depart"`, function(err,rows){
        if(err) {
            res.send({
                status: 400,
                msg: 'location_notification/showdepart : there are some error with query select location_notification'
            });
        }else {
            res.send({
                status: 200,
                data: rows,
                msg: 'location_notification/showdepart : complete'
            });
        }
    });
});

router.post('/editarrive', (req,res) => {
    var max_distance = req.body.max_distance;
    var min_distance = req.body.min_distance;

    var max_time_sec = req.body.max_time_sec;
    var middle_time_sec = req.body.middle_time_sec;
    var min_time_sec = req.body.min_time_sec;

    if(
        max_distance
        && min_distance
        && max_time_sec
        && middle_time_sec
        && min_time_sec
    ){
        connection.query(`UPDATE location_notification SET max_distance ='` + max_distance + `' , min_distance ='` + min_distance + `' , max_time_sec = '` + max_time_sec + `' , middle_time_sec = '` + middle_time_sec + `' , min_time_sec = '` + min_time_sec + `' WHERE type = "arrive"`, function(err,rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'location_notification/editarrive : there are some error with query select location_notification'
                });
            }else {
                res.send({
                    status: 200,
                    msg: 'location_notification/editarrive : complete'
                });
            }
        });
    }else {
        res.send({
            status: 400,
            msg: 'location_notification/editarrive : data incomplete'
        });
    }
});

router.post('/editpass', (req,res) => {
    var max_distance = req.body.max_distance;
    var min_distance = req.body.min_distance;

    var max_time_sec = req.body.max_time_sec;
    var middle_time_sec = req.body.middle_time_sec;
    var min_time_sec = req.body.min_time_sec;

    if(
        max_distance
        && min_distance
        && max_time_sec
        && middle_time_sec
        && min_time_sec
    ){
        connection.query(`UPDATE location_notification SET max_distance ='` + max_distance + `' , min_distance ='` + min_distance + `' , max_time_sec = '` + max_time_sec + `' , middle_time_sec = '` + middle_time_sec + `' , min_time_sec = '` + min_time_sec + `' WHERE type = "pass"`, function(err,rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'location_notification/editpass : there are some error with query select location_notification'
                });
            }else {
                res.send({
                    status: 200,
                    msg: 'location_notification/editpass : complete'
                });
            }
        });
    }else {
        res.send({
            status: 400,
            msg: 'location_notification/editpass : data incomplete'
        });
    }
});

router.post('/editdepart', (req,res) => {
    var max_distance = req.body.max_distance;
    var max_time_sec = req.body.max_time_sec;

    if(
        max_distance
        && max_time_sec
    ){
        console.log("max_distance : " + max_distance);
        console.log("max_time_sec : " + max_time_sec);
        connection.query(`UPDATE location_notification SET max_distance ='` + max_distance + `' , min_distance ='` + "0" + `' , max_time_sec = '` + max_time_sec + `' , middle_time_sec = '` + "0" + `' , min_time_sec = '` + "0" + `' WHERE type = "depart"`, function(err,rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'location_notification/editpass : there are some error with query select location_notification'
                });
            }else {
                res.send({
                    status: 200,
                    msg: 'location_notification/editpass : complete'
                });
            }
        });
    }else {
        res.send({
            status: 400,
            msg: 'location_notification/editpass : data incomplete'
        });
    }
});