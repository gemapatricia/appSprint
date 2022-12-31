const { request } = require('express');
var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Inicio de sesión', user: req.session.user, rol: req.session.rol });
});


router.post('/', function(req, res, next) {
  // se obtienen los datos del formulario
  let pwd = req.body.pass1;
  let usr = req.body.username;

  if(usr && pwd) { //comprueba si el usuario ha rellenado todos los campos del formulario

    database.pool2.getConnection()
    .then( async (conn) => {
      //select en el que obtiene el rol del usuario. En el where: usr y pwd
        var consulta = await conn.query(`SELECT user_type FROM user WHERE user_name ="${usr}" AND password ="${pwd}";`);

        if (consulta.length > 0){ //si ha obtenido el rol, significa que usr y pwd coinciden
          req.session.user = usr;
          req.session.rol = consulta[0].user_type;
          conn.end();
          res.redirect("/");
        }
        else{ //psw y usr no coinciden
          conn.end();
          req.session.error = "Usuario o contraseña incorrectos";
          res.redirect("/login");
        }

    }).catch((err) => {
        console.log(err);
        console.log("No se ha podido realizar el select");
    });

  }
  else{ // El usuario no ha rellenado los campos ude usr o psw en el formulario
    req.session.error = "Falta rellenar los campos usr o psw";
    res.redirect("/login");
  }
});


module.exports = router;