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

var place = require('./route/place.js');
app.use('/place', place);

var admin = require('./route/admin.js');
app.use('/admin', admin);

var task = require('./route/task.js');
app.use('/task', task);

var complete = require('./route/complete.js');
app.use('/complete', complete);

app.get('/', function(req,res) {
    res.send('Welcome to my API');
});

app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});