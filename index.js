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
app.use('/users',user);

var addreminder = require('./route/addreminder.js');
app.use('/addreminder',addreminder);

app.get('/', function(req,res) {
    res.send('Welcome to my API');
});

app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});