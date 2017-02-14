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


// var name = req.body.name;
//   db.query('insert into list (name) values("'+name+'")',
// insert into list (name) values("'+name+'")'
var server = app.listen(3000, function () {
  console.log(11111);
  // var host = server.address().address;
  // var port = server.address().port;
  // console.log('Todolist app listening at http://%s:%s', host, port);
});
