let express = require('express');
const multer=require("multer");
let path = require('path');
var router = express.Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb){
      //文件上传成功后会放入public下的upload文件夹
      cb(null, './public/upload')
    },
    filename: function (req, file, cb){
      //设置文件的名字为其原本的名字，也可以添加其他字符，来区别相同文件，例如file.originalname+new Date().getTime();利用时间来区分
      cb(null, file.originalname)
    }
  });
  var upload = multer({
    storage: storage
  });
  router.post('/upload', upload.single('file'), function (req, res, next) {
    //拼接文件上传后的网络路径，
    var url = 'http://' + req.headers.host + '/upload/' + req.file.originalname;
    //将其发回客户端
    res.json({
      code : 1,
      data : url
    });
    res.end();
  });
  module.exports = router;