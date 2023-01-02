var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('noticiaConcreta', { title: 'Noticias', user: req.session.user, rol: req.session.rol });
});

module.exports = router;