var method = {

    responseJSON:function(res, req){
        if (typeof req === 'undefined') {
            res.json({
                code: '-200',
                msg: '操作失败'
            });
        } else {
            res.json(req);
        }
    },
    link:function(res,name,data){
      
    }

};
module.exports = method;