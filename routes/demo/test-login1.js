var express = require('express');

var router = express.Router();
var os = require('os');
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
    return new Promise(function(rel, ref) {
        pool.getConnection(function(err, connection) {
            connection.query(userSQL.getCode, [], function(err, rex) {
                if (rex) {
                    rel(rex)
                } else {
                    ref(rex)
                }
            })
        })
    })
}
router.post('/code', function(req, res, next) {
    getCode().then(function(rex) {
        responseJSON(res, rex)
    })
});
router.post('/position', function(req, res, next) {
    var pram = req.body;
    pool.getConnection(function(err, connection) {
        connection.query(userSQL.position, [pram.Latitude, pram.Longitude], function(err, result) {
            responseJSON(res, result)
        })
    })
});
router.post('/getData', function(req, res, next) {
    var b = { "bizData": { "conditions": { "endDate": 1515513599059, "schoolId": 2, "startDate": 1512835200000 }, "page": 1, "pagesize": 10, "records": 10, "rows": [{ "childId": 45, "childName": "王小强20", "classId": 7, "className": "", "classType": 4, "firstPatrolType": 1, "fullName": "大四班", "gradeName": "大", "gradeType": 5, "officialName": "大四班", "patrolRecordId": 931, "patrolTime": 1515510420000, "pictures": "", "recorderId": 4471, "recorderName": "钱红伟", "remarks": "第三个水电费", "schoolId": 2, "secondPatrolType": 2 }, { "childId": 43, "childName": "王小强18", "classId": 7, "className": "", "classType": 4, "firstPatrolType": 1, "fullName": "大四班", "gradeName": "大", "gradeType": 5, "officialName": "大四班", "patrolRecordId": 930, "patrolTime": 1515510360000, "pictures": "", "recorderId": 4471, "recorderName": "钱红伟", "remarks": "分割", "schoolId": 2, "secondPatrolType": 2 }, { "childName": "王小强9,王小强10,王小强11", "className": "蛋蛋班级,春季咨询,小一班,小二班", "classType": 0, "firstPatrolType": 2, "fullName": "蛋蛋班级,春季咨询,小一班,小二班", "gradeName": "兴趣班", "gradeType": 0, "officialName": "蛋蛋班级,春季咨询,小一班,小二班", "patrolRecordId": 946, "patrolTime": 1515421980000, "pictures": "/userIcon/20180109223335/1515508415282C8ncXlB0VM.png", "recorderId": 4471, "recorderName": "钱红伟", "remarks": "hahah", "schoolId": 2, "secondPatrolType": 3 }, { "childName": "王小强9,王小强10,王小强11", "className": "蛋蛋班级,春季咨询,小一班,小二班", "classType": 0, "firstPatrolType": 2, "fullName": "蛋蛋班级,春季咨询,小一班,小二班", "gradeName": "兴趣班", "gradeType": 0, "officialName": "蛋蛋班级,春季咨询,小一班,小二班", "patrolRecordId": 947, "patrolTime": 1515421980000, "pictures": "/userIcon/20180109223335/1515508415282C8ncXlB0VM.png", "recorderId": 4471, "recorderName": "钱红伟", "remarks": "hahah", "schoolId": 2, "secondPatrolType": 3 }, { "childName": "王小强9", "className": "蛋蛋班级", "classType": 0, "firstPatrolType": 2, "fullName": "蛋蛋班级", "gradeName": "兴趣班", "gradeType": 0, "officialName": "蛋蛋班级", "patrolRecordId": 948, "patrolTime": 1515421980000, "pictures": "/userIcon/20180109223335/1515508415282C8ncXlB0VM.png", "recorderId": 4471, "recorderName": "钱红伟", "remarks": "hahah", "schoolId": 2, "secondPatrolType": 3 }, { "childName": "", "className": "", "classType": 0, "firstPatrolType": 2, "fullName": "", "gradeName": "兴趣班", "gradeType": 0, "officialName": "", "patrolRecordId": 949, "patrolTime": 1515421980000, "pictures": "/userIcon/20180109223335/1515508415282C8ncXlB0VM.png", "recorderId": 4471, "recorderName": "钱红伟", "remarks": "hahah", "schoolId": 2, "secondPatrolType": 3 }, { "childName": "王小强10", "className": "小一班", "classType": 0, "firstPatrolType": 2, "fullName": "小一班", "gradeName": "兴趣班", "gradeType": 0, "officialName": "小一班", "patrolRecordId": 950, "patrolTime": 1515421980000, "pictures": "/userIcon/20180109223335/1515508415282C8ncXlB0VM.png", "recorderId": 4471, "recorderName": "钱红伟", "remarks": "hahah", "schoolId": 2, "secondPatrolType": 3 }, { "childName": "", "className": "", "classType": 0, "firstPatrolType": 2, "fullName": "", "gradeName": "兴趣班", "gradeType": 0, "officialName": "", "patrolRecordId": 951, "patrolTime": 1515421980000, "pictures": "/userIcon/20180109223335/1515508415282C8ncXlB0VM.png", "recorderId": 4471, "recorderName": "钱红伟", "remarks": "所发生的", "schoolId": 2, "secondPatrolType": 3 }, { "childName": "", "className": "", "classType": 0, "firstPatrolType": 2, "fullName": "", "gradeName": "兴趣班", "gradeType": 0, "officialName": "", "patrolRecordId": 952, "patrolTime": 1515421980000, "pictures": "/userIcon/20180109223335/1515508415282C8ncXlB0VM.png", "recorderId": 4471, "recorderName": "钱红伟", "remarks": "所发生的", "schoolId": 2, "secondPatrolType": 3 }, { "childName": "", "className": "", "classType": 0, "firstPatrolType": 2, "fullName": "", "gradeName": "兴趣班", "gradeType": 0, "officialName": "", "patrolRecordId": 953, "patrolTime": 1515421980000, "pictures": "/userIcon/20180109223335/1515508415282C8ncXlB0VM.png", "recorderId": 4471, "recorderName": "钱红伟", "remarks": "hahah", "schoolId": 2, "secondPatrolType": 3 }], "total": 1 }, "rtnCode": "0000000", "ts": 1515575791750 }
    responseJSON(res, b)
})
module.exports = router;