var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('referentes', { title: 'Referentes', user: req.session.user, rol: req.session.rol });
});

function prueba(nombre){
  alert(nombre);
}

module.exports = router;