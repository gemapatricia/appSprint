var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tienda', { title: 'Bienvenido a la tienda', user: false, rol: false });
});

module.exports = router;