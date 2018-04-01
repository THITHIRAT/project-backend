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

router.post('/add', (req,res) => {
    var catalog = {
        type: req.body.type,
        item: req.body.item,
        period_num: req.body.period_num,
        period_type_date: req.body.period_type_date
    }

    if(
        catalog.type
        && catalog.period_num
        && catalog.period_type_date
    ){
        if(!catalog.item) {
            catalog.item = null;
        }
        connection.query('SELECT * FROM catalog WHERE type = ? AND item = ?', [catalog.type, catalog.item], function(err,rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'catalog/add : there are some error with query select catalog'
                });
            }else {
                if(rows.length > 0) {
                    res.send({
                        status: 400,
                        msg: 'catalog/add : add same type and item'
                    });
                }else {
                    connection.query('INSERT INTO catalog SET ?', catalog, function(err, rows) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'catalog/add : there are some error with query insert catalog'
                            });
                        }else {
                            var catalog_id = rows.insertId;
                            var period = req.body.period_num + ' ' + req.body.period_type_date;
                            var catalog_output = {
                                catalog_id: catalog_id,
                                type: req.body.type,
                                item: req.body.item,
                                period: period,
                            }
    
                            res.send({
                                status: 200,
                                data: catalog_output,
                                msg: 'catalog/add : insert complete'
                            });
                        }
                    });
                }
            }
        });
    }else {
        res.send({
            status: 403,
            msg: "catalog/add : permission denied"
        });
    }
});

router.post('/edit', (req,res) => {
    var catalog_id = req.body.catalog_id;

    var catalog_output = {
        type_new: req.body.type_new,
        item_new: req.body.item_new,
        period_num_new: req.body.period_num_new,
        period_type_date_new: req.body.period_type_date_new
    }

    // var period_split = (catalog_input.period).split(" ", 2);
    // var period_num = period_split[0];
    // var period_type_date = period_split[1];

    if(
        catalog_id
        && catalog_output
    ){
        console.log("Catalog ID : " + catalog_id);
        console.log("Catalog type : " + catalog_output.type_new);
        connection.query('UPDATE catalog SET type = ? WHERE _id = ?', [catalog_output.type_new, catalog_id], function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'catalog/edit : there are some error with query update type'
                });
            }else {
                console.log("Catalog item : " + catalog_output.item_new);
                connection.query('UPDATE catalog SET item = ? WHERE _id = ?', [catalog_output.item_new, catalog_id], function(err, rows) {
                    if(err) {
                        res.send({
                            status: 400,
                            msg: 'catalog/edit : there are some error with query update item'
                        });
                    }else {
                        console.log("Catalog period : " + catalog_output.period_num_new + " " + catalog_output.period_type_date_new);
                        connection.query('UPDATE catalog SET period_num = ? , period_type_date = ? WHERE _id = ?', [catalog_output.period_num_new, catalog_output.period_type_date_new, catalog_id], function(err, rows) {
                            if(err) {
                                res.send({
                                    status: 400,
                                    msg: 'catalog/edit : there are some error with query update period_num and period_type_date'
                                });
                            }else {
                                res.send({
                                    status: 200,
                                    msg: 'catalog/edit : update complete'
                                });
                            }
                        });
                    }
                });
            }
        });
    }else {
        res.send({
            status: 403,
            msg: "catalog/edit : permission denied"
        });
    }
});

router.post('/remove', (req,res) => {
    var catalog_id = req.body.catalog_id;

    if(catalog_id) {
        connection.query('DELETE FROM catalog WHERE _id = ?', catalog_id, function(err,rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'catalog/remove : there are some error with query delete catalog'
                });
            }else {
                res.send({
                    status: 200,
                    msg: 'catalog/remove : remove complete'
                });
            }
        });
    }else {
        res.send({
            status: 403,
            msg: "catalog/remove : permission denied"
        });
    }
});

router.post('/update', (req,res) => {
    var catalog_id = req.body.catalog_id;

    connection.query('SELECT * FROM catalog WHERE _id = ?', [catalog_id], function(err,rows){
        if(err){
            res.send({
                status: 400,
                msg: 'catalog/update : there are some error with query select catalog'
            });
        }else {
            if(rows.length > 0) {
                if(rows[0].real_period_num != null && rows[0].real_period_type_date != null) {
                    console.log(rows[0].real_period_num + " " + rows[0].real_period_type_date);
                    var new_period_num = rows[0].real_period_num;
                    var new_period_type_date = rows[0].real_period_type_date;
                    connection.query('UPDATE catalog SET period_num = ?, period_type_date = ? WHERE _id = ?', [new_period_num, new_period_type_date, catalog_id], function(err,rows){
                        if(err){
                            res.send({
                                status: 400,
                                msg: 'catalog/update : there are some error with query update catalog'
                            });
                        }else {
                            res.send({
                                status: 200,
                                msg: 'catalog/update : update period complete'
                            });
                        }
                    });
                }else {
                    res.send({
                        status: 400,
                        msg: 'catalog/update : period = null'
                    });
                }
            }else {
                res.send({
                    status: 400,
                    msg: 'catalog/update : dont have catalog_id in database'
                });
            }
        }
    });
});

router.post('/show', (req,res) => {
    var type = req.body.type;
    connection.query(`SELECT * FROM reminder WHERE complete = '1' AND type = 'Reminder' ORDER BY timestamp_complete DESC`, function(err,rows) {
        if(err){
            res.send({
                status: 400,
                msg: 'catalog/show : there are some error with query select reminder'
            });
        }else {
            res.send({
                status: 200,
                data: rows,
                msg: 'catalog/show : complete'
            });
        }
    });
    // var data = rows;
    // data.forEach(element => {
    //     element.period = element.period_num + " " + element.period_type_date;
    // });
});