var UserSQL = {

    user: 'select * from test',
    // position: 'INSERT INTO a (L, D) VALUES (?,?)',
    login:'select * from shop_user where username = ? && pass = ?',

};
module.exports = UserSQL;