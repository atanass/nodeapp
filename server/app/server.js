const pool = require('./lib/db');
var express = require('express');
var app = express();
var admin = express();

app.get('/', function(req, res){
    pool.query('SELECT * from users',  function(err, sqlres) {
    var resultString = "";
      if(err) {
        return console.error('error running query', err);
      }
      if (typeof sqlres.rows == 'undefined' || sqlres.rows.length == 0) {
        res.send("No users yet!");
      } else {
	for (var i = 0 ; i < sqlres.rows.length ; i++) {
    	  var result = sqlres.rows[i];
	  resultString = resultString + result.first_name + " " + result.last_name + "<br/>";
	}
      }
      res.send(resultString);
    });
});

admin.get('/', function (req, res) {
  console.log(admin.mountpath); // /admin
  res.send('Admin Homepage');
});

admin.post('/add', function (req, res) {
  var first_name = req.param('fn');
  var last_name = req.param('ln');
  pool.query('INSERT INTO USERS values ($1, $2)', [first_name, last_name], function (err, sqlres) {
    if(err) {
      return console.error('error inserting data', err);
      res.send(500, "Error inserting data...")
    } else {
      res.send("User added!");
    }
  });
});

var secret = express();
secret.get('/', function (req, res) {
  res.send('Admin Secret');
});

admin.use('/secret', secret);
app.use('/admin', admin);

app.listen(8080);
