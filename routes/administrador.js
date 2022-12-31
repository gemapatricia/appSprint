var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('administrador', { title: 'Administración de usuarios', user: req.session.user, rol: req.session.rol });
});

module.exports = router;