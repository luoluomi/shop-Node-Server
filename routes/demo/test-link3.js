var express = require('express');

var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/sql');
var pool = mysql.createPool(dbConfig.mysql);

// 响应一个JSON数据
var responseJSON = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
router.post('/register', function(req, res, next) {
    window.location.href = "../des/html/pages/register.html";
})