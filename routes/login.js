var express = require('express');

var router = express.Router();
var os = require('os');
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/sql');
var pool = mysql.createPool(dbConfig.mysql);
var method=require('../lib/main');

router.get('/test', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.user, [], function(err, rex) {
            method.responseJSON(res,{code:200,data:rex})
        })
    })
    
});

router.post('/login',function(req,res,next){
    let param=req.body;
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.login, [param.name,param.pass], function(err, rex) {
            //查询
            if(rex.length<=0){
                method.responseJSON(res,{status:502,msg:'没有此用户,或者密码输入错误'})
            }else{
                delete rex[0].pass
                method.responseJSON(res,{status:200,msg:rex[0]})
            }
            //释放连接
            connection.release();
        })
    })
})

//获取用户信息
router.get('/getUserMsg',function(req,res,next){
    let param =req.query.uid
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.getUserMsg, [param], function(err, rex) {
            if(rex.length<=0){
                method.responseJSON(res,{status:502,msg:'没有该用户信息'})
            }else{
                delete rex[0].pass
                method.responseJSON(res,{status:200,msg:rex})
            }
            //释放连接
            connection.release();
        })
    })
})

router.put('updatePass')

module.exports = router;