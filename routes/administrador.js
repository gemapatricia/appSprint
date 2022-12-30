var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('administrador', { title: 'Administración de usuarios', user: false, rol: false });
});

module.exports = router;