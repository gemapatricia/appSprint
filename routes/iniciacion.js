var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('iniciacion', { title: 'Iniciación a un deporte', user: req.session.user, rol: req.session.rol });
});


module.exports = router;