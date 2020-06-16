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
var getCode = function() {
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.getCode, [], function(err, rex) {
            if (rex.length > 0) {
                var data = rex[0]
                var result = {
                    code: 200,
                    msg: '获取授权码成功',
                    result: data
                };
                responseJSON(res, result);
            } else {
                var result = {
                    code: 200,
                    msg: '获取授权码失败'
                };
                responseJSON(res, result);
            }
        })
    })
};
//注册
router.post('/register', function(req, res, next) {
    // 从连接池获取连接 
    pool.getConnection(function(err, connection) {
        // 获取前台页面传过来的参数  
        var param = req.body
        if (param.code == 'adminspold') {
            connection.query(userSQL.backselectall, [param.username], function(err, select) {
                if (select.length <= 0) {
                    connection.query(userSQL.backinsert, [param.username, param.password], function(err, result) {
                        if (result) {
                            result = {
                                code: 200,
                                msg: '注册成功'
                            };
                        }
                        // 建立连接 增加一个用户信息 


                        // 以json形式，把操作结果返回给前台页面     
                        responseJSON(res, result);

                        // 释放连接  
                        connection.release();

                    });
                } else {
                    var result = {
                        code: '-200',
                        msg: '用户名重复'
                    };
                    responseJSON(res, result);
                }
            })

        } else {
            var result = {
                code: '-200',
                msg: '授权码错误'
            };
            responseJSON(res, result);
        }

    });
});
//登陆
router.post('/login', function(req, res, next) {
    pool.getConnection(function(err, connection) {
        var param = req.body;
        if (param.code == 'adminspold') {
            connection.query(userSQL.backlogin, [param.username, param.password], function(err, rex) {
                if (rex.length > 0) {
                    var data = rex[0]
                    if (param.password != data.password) {
                        var result = {
                            code: '-200',
                            msg: '密码错误'
                        };
                        responseJSON(res, result)
                    } else if (param.username == data.username && param.password == data.password) {
                        var result = {
                            code: 200,
                            msg: '登陆成功'
                        };
                        responseJSON(res, result)
                    }
                } else {
                    var result = {
                        code: '-200',
                        msg: '账户不存在'
                    };
                    responseJSON(res, result);
                }

            })
        } else {
            var result = {
                code: '-200',
                msg: '授权码错误'
            };
            responseJSON(res, result);
        }
    })
});
//获取授权码
router.post('/code', function(req, res, next) {

});
module.exports = router;