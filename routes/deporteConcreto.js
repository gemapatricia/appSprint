var express = require('express');
var router = express.Router();
var database = require('../database'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('deporteConcreto', { title: 'Deporte concreto', user: req.session.user, rol: req.session.rol });
});


module.exports = router;
