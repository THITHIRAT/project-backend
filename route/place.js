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
    var place = {
        name: req.body.name,
        latitude: req.body.latitude,
        longtitude: req.body.longtitude
    }

    if(
        place.name
        && place.latitude
        && place.longtitude
    ){
        connection.query('SELECT * FROM place WHERE name = ?', place.name, function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'there are some error with query select location'
                });
            }else {
                if(rows.length > 0) {
                    res.send({
                        msg: 'insert location already'
                    });
                }else {
                    connection.query('INSERT INTO place SET ?', place, function(err, rows) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'there are some error with query insert location'
                            });
                        }else {
                            console.log(place);
                            res.send({
                                msg: 'sucess insert location'
                            });
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

router.post('/search', (req,res) => {
    var txt_serach = req.body.txt;

    if(txt_serach) {
        connection.query(`SELECT * FROM place WHERE name LIKE '%` + txt_serach + `%'`, function(err, rows) {
            if(err) { 
                res.send({
                    status: 400,
                    msg: 'there are some error with query select search'
                });
            }else {
                if(rows.length > 0) {
                    res.send({
                        data: rows,
                        msg: 'txt have some row'
                    });
                }else {
                    res.send({
                        msg: 'every rows dont have txt'
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
