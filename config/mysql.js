var mysql = require('mysql'); //调用MySQL模块
//创建一个connection
var connection = mysql.createConnection({
    host: '114.115.142.95', //主机
    user: 'root',     //数据库用户名
    password: '123456qwer-QWER',     //数据库密码
    port: '3306',       
    database: 'web', //数据库名称
    charset: 'UTF8_GENERAL_CI' //数据库编码
});

module.exports = connection  