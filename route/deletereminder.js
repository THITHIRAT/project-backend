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

    connection.query('SELECT * FROM reminder WHERE _id = ?', [reminder_id], function(err,rows){
        if(err) {
            res.send({
                status: 400,
                msg: 'deletereminder/task : there are some error with query select task'
            });
        }else {
            if(rows.length > 0) {
                var taskname = rows[0].taskname;
                var subtaskname = rows[0].subtaskname;
                connection.query('DELETE FROM reminder WHERE _id = ?', [reminder_id], function(err,rows){
                    if(err) {
                        res.send({
                            status: 400,
                            msg: 'deletereminder/task : there are some error with query delete task'
                        });
                    }else {
                        var output = {
                            id: reminder_id,
                            taskname: taskname,
                            subtaskname: subtaskname
                        }
                        console.log(rows);
                        res.send({
                            status: 200,
                            data: output,
                            msg: 'deletereminder/task : complete'
                        });
                    }
                });
            }else {
                res.send({
                    status: 400,
                    data: reminder_id,
                    msg: 'deletereminder/task : dont have reminder_id'
                });
            }
        }
    });
});