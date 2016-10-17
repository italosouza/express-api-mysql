var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');

module.exports = function(app) {
  var controller = {};
  var connection = app.services.connection;

  controller.listar = function(req, res) {
    var sSql = 'select * from usuario';
    connection.listar(sSql,
      function(rows) {
        res.status(200).json(rows);
      });
  };

  controller.buscar = function(req, res) {
    var _id = req.params.id;
    var sSql = 'select * from usuario where id = ?';

    connection.buscar(sSql, _id,
      function(rows) {
        res.status(200).json(rows);
      });
  };

  controller.remover = function(req, res) {
    var _id = req.params.id;
    res.status(200).json(_id);
  };

  controller.salvar = function(req, res) {
    var _body = req.body;
    var _token = 'informe a senha';
    // _body.senha = bcrypt.hashSync(req.body.senha);

    if (_body.senha) {
      _token = jwt.encode({
          usuario: _body
        }, app.get('secretKey'));
    }

    res.status(200).json(_token);
  };

  return controller;
};
