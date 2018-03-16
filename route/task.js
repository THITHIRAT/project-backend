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
    var token = req.body.token;

    if(token) {
        connection.query('SELECT * FROM user WHERE token = ?', token, function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'there are some error with query select task location'
                });
            }else {
                if(rows.length > 0) {
                    var id = rows[0]._id;
                    connection.query('SELECT * FROM reminder WHERE user_id = ?', id, function(err, rows) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'there are some error with query select task location'
                            });
                        }else {
                            res.send({
                                status: 200,
                                data: rows,
                                msg: 'query success'
                            });
                        }
                    });
                }else {
                    res.send({
                        status: 404,
                        msg: 'dont have token'
                    });
                }
            }
        });
    }else {
        res.send({
            status: 403,
            msg: "permission denied"
        });
    }
});