var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
// var util = require('util');
var app = express();
// var expressWs = require('express-ws')(app);

var db = mysql.createConnection({
  user:'root',
  host:'localhost',
  database:'todos'
});
db.connect();

// var viewPath = '../../../view/';
app.use(express.static('./'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


// 获取列表
app.get('/todos', function (req, res) {

  var sqlText = 'select * from list';
  db.query(sqlText, function(err,data,other){
    res.json(data);
  });

});
app.post('/todos', function (req, res) {
  var name = req.body.name;
  var sqlText = 'insert into list (name) values("'+name+'")';
  db.query(sqlText, function(err,data,other){
    res.json(data);
  });
});

// 修改任务
app.put('/todos/:id', function (req, res) {
  var updateText = '';
  var id = req.params.id;
  var isTick = req.body.isTick;
  console.log(id,isTick);
  db.query('update list set isTick=' + isTick + ' where id='+id, function(err, data){
    if(!err){
      res.json(data);
    }else{
      console.log(err);
      res.json({});
    }
  });
});

// 删除任务
app.delete('/todos/:id', function (req, res) {
  var id = req.params.id;
  db.query('delete from list where id = '+id, function(err, data){
    if(!err){
      res.json({id:id});
    }else{
      console.log(err);
      res.json({});
    }
  });
});

// 删除已完成的任务
app.post('/todos/delf', function (req, res) {
  var ids = req.body.filteredTodosIds;
  db.query('delete from list where id in ('+ids+')', function(err, data){
    if(!err){
      res.json({ids:ids});
    }else{
      console.log(err);
      res.json({});
    }
  });
});

var server = app.listen(3000, function () {
  console.log(11111);
  // var host = server.address().address;
  // var port = server.address().port;
  // console.log('Todolist app listening at http://%s:%s', host, port);
});
