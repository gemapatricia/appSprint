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

  let errores = validarDatos(name, surname1, surname2, userName, email, userType, pass, pass2);
  if (errores[0]) {
    req.session.error = errores[1];
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

function validarDatos(name, ap1, ap2, username, email, userType, pass1, pass2){
  let error             = false;
  let textoError        = "";
  var patronCorreo      = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  var patronContrasenna = /(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  
  if (name.length == 0){
    textoError += "El nombre está vacío</br>";
  }  
  if (ap1.length == 0){
    textoError += "El primer apellido está vacío</br>";
  }  
  if (username.length == 0){
    textoError += "El alias del usuario está vacío</br>";
  }  
  if (userType != "Estándar" && userType != "Premium"){
    // Los usuarios administradores solo pueden ser creados por nosotros
    textoError += "El tipo de usuario es incorrecto</br>";
  } 
  if (email.length !=0 && !patronCorreo.test(email)){
    textoError += "El formato de correo es incorrecto</br>";
  }
  if (pass1.length == 0){
    textoError += "La contraseña está vacía</br>";
  }
  else if (!patronContrasenna.test(pass1)){
    textoError += "La contraseña no cumple el patrón</br>";
  }
  else if (pass1 !== pass2){
    textoError += "Las contraseñas no son iguales</br>";
  }

  if (textoError != ""){
    error = true;
  }

  return [error, textoError];
}

module.exports = router;