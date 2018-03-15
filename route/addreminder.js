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
        placename: req.body.placename,
        latitude: req.body.latitude,
        longtitude: req.body.longtitude,
        taskname: req.body.taskname,
        complete: req.body.complete
    }

    var token = req.body.token;

    if(
        reminder_location.type
        && reminder_location.placename
        && reminder_location.latitude
        && reminder_location.longtitude
        && token
    ){
        connection.query('SELECT * FROM user WHERE token = ?', token, function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'there are some error with query select add reminder location'
                });
            }else {
                console.log("id : " + rows[0]._id);
                var id = rows[0]._id;
                connection.query('INSERT INTO reminder (user_id, type, placename, latitude, longtitude, taskname, complete) VALUES ("' + id + '", "' + reminder_location.type + '", "' + reminder_location.placename + '", "' + reminder_location.latitude + '", "'  + reminder_location.longtitude + '", "' + reminder_location.taskname + '", "' + reminder_location.complete + '") ', function(err, rows) {
                    if(err) {
                        res.send({
                            status: 400,
                            msg: 'there are some error with query insert add reminder location'
                        });
                    }else {
                        res.send({
                            msg: 'insert location reminder'
                        });
                    }
                });
            }
        });
    }else {
        res.send({
            msg: "permission denied"
        });
    }
});