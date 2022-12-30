var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registro', { title: 'Registro de nuevos usuarios' });
});

router.post("/", function (req, res, next) {
  let userName = req.body.username;
  let pass = req.body.pass1;
  let pass2 = req.body.pass2;

  if (pass !== pass2) {
    console.log("Las contraseñas no son iguales");
    res.redirect("/registro");
  }
  else {
    res.redirect("/login");
    database.insertUser("patricia", "herrera", "martín", "patricia", "patricia@gmail.com", "Estándar", "patricia");
  }
  /**
  if (users[user]) {
    req.session.error = "Este usuario ya existe";
    res.redirect("/registro");
  } else {
    req.session.message = "Usuario registrado";
    users.register(user, pass);
    res.redirect("/login");
  }*/
});

module.exports = router;