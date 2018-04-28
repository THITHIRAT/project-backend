const express = require('express');
const app = express();
const random = require('meteor-random');
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : false
}));

var user = require('./route/users.js');
app.use('/users', user);

var addreminder = require('./route/addreminder.js');
app.use('/addreminder', addreminder);

var suggestreminder = require('./route/suggestreminder.js');
app.use('/sugguestreminder', suggestreminder);

var deletereminder = require('./route/deletereminder.js');
app.use('/deletereminder', deletereminder);

var detailreminder = require('./route/detailreminder.js');
app.use('/detailreminder', detailreminder);

var updatereminder = require('./route/updatereminder.js');
app.use('/updatereminder', updatereminder);

var place = require('./route/place.js');
app.use('/place', place);

var admin = require('./route/admin.js');
app.use('/admin', admin);

var catalog = require('./route/catalog.js');
app.use('/catalog', catalog);

var task = require('./route/task.js');
app.use('/task', task);

var taskcomplete = require('./route/taskcomplete.js');
app.use('/taskcomplete', taskcomplete);

var complete = require('./route/complete.js');
app.use('/complete', complete);

var incomplete = require('./route/incomplete.js');
app.use('/incomplete', incomplete);

var location_notification = require('./route/location_notification.js');
app.use('/location_notification', location_notification);

var checktime = require('./route/checktime.js');
app.use('/checktime', checktime);

var checklocation = require('./route/checklocation.js');
app.use('/checklocation', checklocation);

var checklocation_forlocation = require('./route/checklocation_forlocation.js');
app.use('/checklocation_forlocation', checklocation_forlocation);

app.get('/', function(req,res) {
    res.send('Welcome to my API');
});

app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});