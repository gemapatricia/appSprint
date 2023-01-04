var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registro', { title: 'Registro de nuevos usuarios'
                         , user       : req.session.user
                         , rol        : req.session.rol
                         , name       : req.session.name
                         , ap1        : req.session.ap1
                         , ap2        : req.session.ap2 
                         , username   : req.session.username
                         , tipoUsuario: req.session.tipoUsuario
                         , correo     : req.session.correo
                         });
});

router.post("/", function (req, res, next) {
  let name     = req.session.name        = req.body.name;
  let surname1 = req.session.ap1         =  req.body.ap1;
  let surname2 = req.session.ap2         = req.body.ap2;
  let userName = req.session.username    = req.body.username;
  let email    = req.session.correo      = req.body.correo;
  let userType = req.session.tipoUsuario = req.body.tipoUsuario;
  let pass     = req.body.pass1;
  let pass2    = req.body.pass2;

  if (pass !== pass2) {
    console.log("Las contraseñas no son iguales");
    res.redirect("/registro");
  }
  else {
    async function insertarUsuario(){
      let mensajeError = "";
      mensajeError = await database.insertUser(name, surname1, surname2, userName, email, userType, pass);
      if (mensajeError!=""){
        req.session.error = mensajeError;
        //console.log("insertarUsuario -> " + mensajeError);
        res.redirect("/registro");
      }
      else{
        delete req.session.name;
        delete req.session.ap1;
        delete req.session.ap2;
        delete req.session.username;
        delete req.session.tipoUsuario;
        delete req.session.correo;
        res.redirect("/login");
      }
    }
    insertarUsuario();
  }
});

module.exports = router;