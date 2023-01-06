var express = require('express');
var router = express.Router();
var database = require('../database');
const readline = require("readline");
const { getDiffieHellman } = require('crypto');
/*const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});*/

/* GET home page. */
router.get('/', function(req, res, next) {

  database.pool2.getConnection()
  .then( async (conn) => {
      var consulta = await conn.query(`SELECT * FROM user;`);

      let result = '<table>';
      //cabecera:
      result += "<tr><th></th><th>name</th><th>surname1</th><th>surname2</th><th>user_name</th><th>user_type</th><th>email</th></tr>";
      
      //contenido:
      for (i=0;i<consulta.length;i++){
        result += "<tr>" +
        "<td>" + (i+1) + "</td>" +
        "<td>" + consulta[i].name + "</td>" + 
        "<td>" + consulta[i].surname1 + "</td>" +
        "<td>" + consulta[i].surname2 + "</td>" +
        "<td>" + consulta[i].user_name + "</td>" +
        "<td>" + consulta[i].user_type + "</td>" +
        "<td>" + consulta[i].email + "</td>" +
        //"<td><button id="+consulta[i].id_user+">&#x274C;</button></td>" +
        //"<td><button id="+consulta[i].id_user+" onclick = "+alerta()+">&#x274C;</button></td>" +
        //"<td><button id='boton'>&#x274C;</button></td>" +
        //"<td><button id="+consulta[i].id_user+" onClick='click_here(this.id)' type='button'>&#x274C;</button></td>" +
        "<td><button id="+consulta[i].user_name+" onClick='alerta(this.id)' type='button'>&#x274C;</button></td>" +
        "</tr>";
      }
      
      result += '</table>';
      result += "<p id='ejemplo'>En este párrafo se mostrará la opción clickada por el usuario</p>";


      res.render('administrador', { title: 'Administración de usuarios', user: req.session.user, rol: req.session.rol, content: result });

  }).catch((err) => {
      console.log(err);
      console.log("No se ha podido realizar el select");
  });


});
/*
router.post('/', function(req, res, next) {
  console.log("HOLA");
  res.redirect("/");
});
-*/
/*function alerta(){
  var mensaje;
  var opcion = confirm("Clicka en Aceptar o Cancelar");
  if (opcion == true) {
    mensaje = "Has clickado OK";
	} else {
    mensaje = "Has clickado Cancelar";
	}
	document.getElementById("ejemplo").innerHTML = mensaje;
}*/

/*
function alerta(){
  interface.question("Are you xyz? (y/n) ", function(ans) {
    if (ans == "y" || ans == "yes") {
        console.log("Hello there xyz.");
    } else {
        console.log("So what is your name?");
    }
    // pause the interface so the program can exit
    interface.pause();
});
}*/

module.exports = router;