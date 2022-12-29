var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('noticias', { title: 'Noticias y eventos' });
});

module.exports = router;