var express = require('express');
var router = express.Router();
var database = require('../database');
const { getDiffieHellman } = require('crypto');

/* GET home page. Obtiene los usuarios de la BD y crea dinámicamente el html formando una tabla que renderiza */
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
        "<td>" + consulta[i].email + "</td>";
        
        if(consulta[i].user_name != "admin"){
          result += "<td><form class='formBoton' action='/administrador/delete"+consulta[i].id_user+"' method='post'><button type='submit'>&#x274C;</button></form></td>";
        }
        
        result += "</tr>";
      }
      
      result += '</table>';

      conn.end();
      res.render('administrador', { title: 'Administración de usuarios', user: req.session.user, rol: req.session.rol, content: result });

  }).catch((err) => {
      console.log(err);
      console.log("No se ha podido realizar el select");
  });


});

router.post('/delete:id', function(req, res, next) {
  let id_usuario = req.params.id;
  
  async function borrarUsuario(id){
    await database.deleteUserById(id);
  }
  
  borrarUsuario(id_usuario);

  res.redirect("/administrador");
});


module.exports = router;