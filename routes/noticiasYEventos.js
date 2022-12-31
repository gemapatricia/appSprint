var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('noticiasYEventos', { title: 'Noticias y eventos', user: req.session.user, rol: req.session.rol });
});

module.exports = router;