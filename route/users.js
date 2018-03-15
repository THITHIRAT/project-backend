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

router.post('/register', (req,res) => {
    // console.log(req.body);
    var now = new Date();
    var users_reg = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }

    var confirmpassword = req.body.confirmpassword;
    var token = random.id();

    if(
        req.body.username && 
        req.body.password && 
        req.body.email
    ) {
        connection.query('SELECT * FROM user WHERE email = ?', [users_reg.email], function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'there are some error with query select register'
                });
            }else {
                if(rows.length > 0) {
                    res.send({
                        msg: 'there are email to signup'
                    });
                }else {
                    connection.query('INSERT INTO user SET ?', users_reg, function(err, rows) {
                        if(err) {
                            res.json({
                                status: 400,
                                msg: 'there are some error with query insert register'
                            });
                        }else {
                            if(users_reg.password == confirmpassword) {
                                connection.query('UPDATE user SET token = ? WHERE email = ?', [token, users_reg.email], function(err, rows) {
                                    res.json({
                                        status: 200,
                                        data: users_reg,
                                        msg: 'user register sucessfully',
                                        token: token
                                    });
                                    console.log(users_reg.username, users_reg.password, users_reg.email);
                                });
                            }else {
                                res.json({
                                    msg: 'password not match'
                                })
                            }
                        }
                    });
                }
            }
        });
    }else {
        res.status(403).send({
            status: 403,
            msg: 'permission denied',
            result: null
        });
    }
});

router.post('/login', (req,res) => {
    var users_login = {
        email: req.body.email,
        password: req.body.password,
    }
    console.log(users_login.email, users_login.password);
    
    if(
        users_login.email
        && typeof users_login.email !== 'undefined'
        && users_login.password
        && typeof users_login.password !== 'undefined'
    ){

        var token = random.id();

        connection.query('SELECT * FROM user WHERE email = ?', [users_login.email], function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'there are some error with query select login'
                });
            }else {
                if(rows.length > 0) { // have email account 
                    connection.query('SELECT * FROM user WHERE email = ? AND password = ?', [users_login.email, users_login.password], function(err, rows) {
                        if(err) {
                            res.send({
                                status: 400,
                                msg: 'there are some error with query select login'
                            });
                        }else {
                            if(rows.length > 0) {
                                connection.query('UPDATE user SET token = ? WHERE email = ?', [token, users_login.email], function(err, rows) {
                                    res.send({
                                        msg: 'success login',
                                        token: token
                                    });
                                });
                            }else {
                                res.send({
                                    msg: 'password incorrect'
                                });
                            }
                        }
                    });  
                }else {
                    res.send({
                        msg: 'database have not email'
                    });
                }
            }
        });
    }else {
        // invalid parameters 
        res.status(400).send({
            status: 400,
            msg: "invalid email or password",
            result: null
        });
    }
});

router.post('/logout', (req,res) => {
    var token = req.body.token;

    if(token) {
        connection.query('SELECT * FROM user WHERE token = ?', token, function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'there are some error with query'
                });
            } else {
                if(rows.length > 0) {
                    var emaillogout = rows[0].email;
                    connection.query('UPDATE user SET token = null WHERE email = ?', emaillogout, function(err, rows) {
                        if(err) {
                            res.send({
                                msg: 'there are some error with query'
                            });
                        }else {
                            res.send({
                                data: emaillogout,
                                msg: "log out complete"
                            });
                        }
                    });
                }else {
                    res.send({
                        msg: "cannot logout"
                    });
                }
            }
        });
    }else {
        res.send({
            msg: 'permission denied'
        });
    }
});

router.post('/resetpassword', (req,res) => {
    var users_resetpassword = {
        password: req.body.password,
        token: req.body.token
    }

    var newpassword = req.body.newpassword;

    if(
        users_resetpassword.password
        && users_resetpassword.token
    ){
        connection.query('SELECT * FROM user WHERE token = ?', users_resetpassword.token, function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'there are some error with query select'
                });
            }else {
                if(rows.length > 0) {
                    connection.query('UPDATE user SET password = ? WHERE token = ? AND password = ?', [newpassword, users_resetpassword.token, users_resetpassword.password], function(err, rows) {
                        if(err) {
                            res.send({
                                msg: 'there are some error with query update'
                            });
                        }else {
                            res.send({
                                msg: 'update new password'
                            });
                        }
                    });
                }else {
                    res.send({
                        msg: "don't have token"
                    });
                }
            }
        });
    }else {
        res.send({
            msg: "permission deined"
        });
    }
});

router.post('/changeusername', (req,res) => {
    var newusername = req.body.newusername;
    var token = req.body.token;

    if(token){
        connection.query('SELECT * FROM user WHERE token = ?', token, function(err, rows) {
            if(err) {
                res.send({
                    status: 400,
                    msg: 'there are some error with query select'
                });
            }else {
                if(rows.length > 0) {
                    connection.query('UPDATE user SET username = ? WHERE token = ?', [newusername, token], function(err, rows) {
                        if(err) {
                            res.send({
                                msg: 'there are some error with query update'
                            });
                        }else {
                            res.send({
                                msg: 'update new username'
                            });
                        }
                    });
                }else {
                    res.send({
                        msg: "don't have token"
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