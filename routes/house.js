var express = require('express');
var router = express.Router();
const connection = require('../config/mysql');
connection.connect(function(err) {
  if(err) {
      console.log('[query] - :' + err);
      return;
  }
  console.log('[connection connect]  succeed!'); //如果连接成功 控制台输出 success 了
});
/* GET users listing. */
router.get('/', function(req, res) {
  var sql = "select * from house";
  connection.query(sql, function(err, rows, fields) {
    res.send(rows)
  });
});
router.post('/add', function(req, res) {
  var body = req.body,
  content = body.content,
  sellType = bdy.sellType;
  var time = new Date().getTime().toString();
  if(sellType && content) {
    var sql = 'insert into house(time,content,sellType) values(?,?,?)';
    var params = [time, content, sellType];
    connection.query(sql, params, function(err, result) {
      res.send(result)
    });
  } else {
    res.send({err: '参数错误'});
  }
});
router.post('/remove', function(req, res) {
  var id = req.body.id;
  if(id) {
    var sql = `DELETE FROM house WHERE id=?`;
    var params = [id];
    connection.query(sql, params, function(err, result) {
      res.send(result)  //这里在页面上输出数据
    });
  } else {
    res.send({err: '参数错误'});
  }
});
router.post('/update', function(req, res) {
  var body = req.body,
  id = body.id,
  newcontent = body.newcontent,
  sellType = body.sellType;
  var time = new Date().getTime().toString();
  var needUpdate = newcontent && sellType != undefined;
  var sql = 'update house set time=?,', params = [time];
  if(needUpdate) {
    sql += 'content=?,sellType=?';
    params.push(newcontent, sellType);
  } else if(newcontent) {
    sql += 'content=?';
    params.push(newcontent)
  } else if(sellType != undefined) {
    sql += 'sellType=?';
    params.push(sellType);
  }
  if(needUpdate) {
    sql += 'where id=?';
    params.push(id);
    connection.query(sql, params, function (err, result) {
      res.send(result);  //这里在页面上输出数据
    });
  } else {
    res.send({err: '参数错误'});
  }
});
module.exports = router;
