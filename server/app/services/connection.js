//https://github.com/motdotla/dotenv

require('dotenv').config();
var mysql = require('mysql');


module.exports = function() {

  var connection = {};
  var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE
  });

  connection.listar = function(psSql, pfDone){
    var _rows = [];
    var _query = db.query(psSql);
    _query
      .on('error', function(err) {
        // Handle error, an 'end' event will be emitted after this as well
        console.log(err);
      })
      .on('result', function(row) {
        _rows.push(row);
      })
      .on('end', function() {
        // all rows have been received
        pfDone(_rows);
      });
  };

    connection.buscar = function(psSql, params, pfDone){
    var _rows = [];
    var _query = db.query(psSql, params);
    _query
      .on('error', function(err) {
        // Handle error, an 'end' event will be emitted after this as well
        console.log(err);
      })
      .on('result', function(row) {
        _rows.push(row);
      })
      .on('end', function() {
        // all rows have been received
        pfDone(_rows);
      });
  };

  return connection;

};