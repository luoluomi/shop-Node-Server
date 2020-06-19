var express = require('express');

var router = express.Router();
var os = require('os');
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/sql');
var pool = mysql.createPool(dbConfig.mysql);
var method=require('../lib/main');
var multiparty = require('multiparty');

router.get('/test', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.user, [], function(err, rex) {
            method.responseJSON(res,{code:200,data:rex})
        })
    })
    
});


router.post('/add',function(req,res,next){
    
})
router.get('/get',function(req,res,next){
    let param=req.query;
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.getCommLst, [`%${param.commName}%`], function(err, rex) {
            if(!err){
                if(rex.length<=0){
                    method.responseJSON(res,{status:202,msg:`没有数据`})
                }else{
                    method.responseJSON(res,{status:200,msg:rex})
                }
            }
           
        })
    })
})

module.exports = router;