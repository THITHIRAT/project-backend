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

function mode(numbers) {
    var modes = [], count = [], i, number, maxIndex = 0;
 
    for (i = 0; i < numbers.length; i += 1) {
        number = numbers[i];
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
    }
 
    for (i in count)
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) {
                modes.push(Number(i));
            }
        }
 
    return modes;
}

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
            catalog.item = "";
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

router.post('/update_avg', (req,res) => {
    var catalog_id = req.body.catalog_id;

    if(catalog_id) {
        connection.query('SELECT * FROM catalog WHERE _id = ?', [catalog_id], function(err,rows){
            if(err){
                res.send({
                    status: 400,
                    msg: 'catalog/update_avg : there are some error with query select catalog'
                });
            }else {
                if(rows.length > 0) {
                    if(rows[0].avg != null && rows[0].real_period_type_date != null) {
                        console.log(rows[0].avg + " " + rows[0].real_period_type_date);
                        var new_period_num = rows[0].avg;
                        var new_period_type_date = rows[0].real_period_type_date;
                        connection.query('UPDATE catalog SET period_num = ?, period_type_date = ? WHERE _id = ?', [new_period_num, new_period_type_date, catalog_id], function(err,rows){
                            if(err){
                                res.send({
                                    status: 400,
                                    msg: 'catalog/update_avg : there are some error with query update catalog'
                                });
                            }else {
                                res.send({
                                    status: 200,
                                    msg: 'catalog/update_avg : update period complete'
                                });
                            }
                        });
                    }else {
                        res.send({
                            status: 400,
                            msg: 'catalog/update_avg : period = null'
                        });
                    }
                }else {
                    res.send({
                        status: 400,
                        msg: 'catalog/update_avg : dont have catalog_id in database'
                    });
                }
            }
        });
    }else {
        res.send({
            status: 403,
            msg: "catalog/update_avg : permission denied"
        });
    }
});

router.post('/update_mode', (req,res) => {
    var catalog_id = req.body.catalog_id;

    if(catalog_id) {
        connection.query('SELECT * FROM catalog WHERE _id = ?', [catalog_id], function(err,rows){
            if(err){
                res.send({
                    status: 400,
                    msg: 'catalog/update_mode : there are some error with query select catalog'
                });
            }else {
                if(rows.length > 0) {
                    if(rows[0].mode != null && rows[0].real_period_type_date != null) {
                        console.log(rows[0].mode + " " + rows[0].real_period_type_date);
                        var new_period_num = rows[0].mode;
                        var new_period_type_date = rows[0].real_period_type_date;
                        connection.query('UPDATE catalog SET period_num = ?, period_type_date = ? WHERE _id = ?', [new_period_num, new_period_type_date, catalog_id], function(err,rows){
                            if(err){
                                res.send({
                                    status: 400,
                                    msg: 'catalog/update_mode : there are some error with query update catalog'
                                });
                            }else {
                                res.send({
                                    status: 200,
                                    msg: 'catalog/update_mode : update period complete'
                                });
                            }
                        });
                    }else {
                        res.send({
                            status: 400,
                            msg: 'catalog/update_mode : period = null'
                        });
                    }
                }else {
                    res.send({
                        status: 400,
                        msg: 'catalog/update_mode : dont have catalog_id in database'
                    });
                }
            }
        });
    }else {
        res.send({
            status: 403,
            msg: "catalog/update_mode : permission denied"
        });
    }
});

router.post('/showallreminder', (req,res) => {
    connection.query(`SELECT * FROM reminder WHERE complete = "1" AND type = "Reminder"`, function(err,rows){
        if(err){
            res.send({
                status: 400,
                msg: 'catalog/showallreminder : there are some error with query select reminder'
            });
        }else {
            res.send({
                status: 400,
                data: rows,
                msg: 'catalog/showallreminder : there are some error with query select reminder'
            });
        }
    });
});

router.post('/showreminder', (req,res) => {
    var type = req.body.type;

    var item;
    if(req.body.item) {
        item = req.body.item;
    }else {
        item = "";
    }

    connection.query(`SELECT * FROM reminder WHERE complete = '1' AND type = 'Reminder' AND taskname LIKE '%` + type + `%' AND subtaskname LIKE '%` + item + `%' ORDER BY timestamp_complete DESC`, function(err,rows) {
        if(err){
            res.send({
                status: 400,
                msg: 'catalog/showreminder : there are some error with query select reminder'
            });
        }else {
            var data = rows;
            if(rows.length > 0) {
                res.send({
                    status: 200,
                    data: rows,
                    msg: 'catalog/showreminder : complete length > 0'
                });
            }else {
                res.send({
                    status: 200,
                    data: rows,
                    msg: 'catalog/showreminder : complete length = 0'
                });
            }
        }
    });
});

router.post('/showlocation', (req,res) => {
    connection.query(`SELECT * FROM reminder WHERE type = 'Location'`, function(err,rows_reminder){
        if(err){
            res.send({
                status: 400,
                msg: 'catalog/showlocation : there are some error with query select reminder'
            });
        }else {
            res.send({
                status: 200,
                data: rows_reminder,
                msg: 'catalog/showlocation : complete'
            });
            
        }
    });
});

router.post('/showcatalog', (req,res) => {
    connection.query(`SELECT * FROM catalog`, function(err,rows_catalog) {
        if(err){
            res.send({
                status: 400,
                msg: 'catalog/showcatalog : there are some error with query select catalog'
            });
        }else {
            var data_catalog = rows_catalog;
            data_catalog.forEach(element => {
                var task = element.type;
                var subtask = element.item;
                
                connection.query(`SELECT * FROM reminder WHERE type = 'Reminder' AND complete = '1' AND taskname LIKE '` + task + `' AND subtaskname LIKE '%` + subtask + `%'`, function(err,rows_reminder) {
                    if(err){
                        res.send({
                            status: 400,
                            msg: 'catalog/showcatalog : there are some error with query select reminder'
                        });
                    }else {
                        console.log('task : ' + task + ' subtask : ' + subtask);
                        if(rows_reminder.length > 0) {
                            var data_reminder = rows_reminder;
                            var mode_array = new Array();
                            var loop = 0;
                            var sum_total = 0;
    
                            data_reminder.forEach(element_reminder => {
                                var total = element_reminder.total;
                                mode_array[loop] = total;
                                sum_total = sum_total + total;
                                loop++;
                            });

                            mode_array = mode(mode_array);
                            console.log(mode_array + " - mode = " + typeof(mode_array) + " " + mode_array[0]  + " " + mode_array.length);
                            avg = sum_total / loop;
                            console.log('AVG : ' + avg);

                            connection.query(`UPDATE catalog SET real_period_type_date = 'days', avg = '` + avg + `', mode = '` + mode_array + `' WHERE _id = '` + element._id + `'`, function(err,rows){
                                if(err){
                                    res.send({
                                        status: 400,
                                        msg: 'catalog/showcatalog : there are some error with query update catalog'
                                    });
                                }else {
                                    console.log('update complete');
                                }
                            });
                        }else {
                            connection.query(`UPDATE catalog SET real_period_type_date = 'days', avg = '` + null + `', mode = '` + null + `' WHERE _id = '` + element._id + `'`, function(err,rows){
                                if(err){
                                    res.send({
                                        status: 400,
                                        msg: 'catalog/showcatalog : there are some error with query update catalog'
                                    });
                                }else {
                                    console.log('update complete');
                                }
                            });
                            console.log('catalog/showcatalog : avg && mode - dont have data');
                        }
                    }
                })
            });
            res.send({
                status: 200,
                data: rows_catalog,
                msg: 'catalog/showcatalog : complete'
            });
        }
    });
});