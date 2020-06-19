var UserSQL = {

    user: 'select * from test',
    // position: 'INSERT INTO a (L, D) VALUES (?,?)',
    //登录
    login:'SELECT * FROM shop_user a RIGHT JOIN shop_userInfo b ON a.uid = b.id WHERE a.username=? && a.pass =?',
    //获取用户详情信息
    getUserMsg:'SELECT * FROM shop_user a RIGHT JOIN shop_userInfo b ON a.uid = b.id WHERE a.uid=?',

};
module.exports = UserSQL;