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

router.post('/login', (req,res) => {
    var admin = {
        email: req.body.email,
        password: req.body.password
    }

    if(
        req.body.email
        && req.body.password
    ){
        connection.query('SELECT * FROM admin WHERE email = ? AND password = ?', [admin.email, admin.password], function(err, rows) {
            if(rows.length > 0) {
                res.send({
                    status: 200,
                    msg: "admin/login : login success"
                });
            }else {
                res.send({
                    status: 400,
                    msg: "admin/login :  email or password is incorrect"
                });
            }
        });
    }else {
        res.send({
            status: 403,
            msg: "admin/login : permission denied"
        });
    }
});