var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('noticiasYEventos', { title: 'Noticias y eventos', user: false, rol: false });
});

module.exports = router;