var express = require('express');

var router = express.Router();
var os = require('os');
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/sql');
var pool = mysql.createPool(dbConfig.mysql);
var method=require('../lib/main')

router.get('/test', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.user, [], function(err, rex) {
            method.responseJSON(res,{code:200,data:rex})
        })
    })
    
});

module.exports = router;