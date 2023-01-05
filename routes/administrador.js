var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
//genera_tabla();

/*
  let obj = { 1: 'one', 2: 'two', 3: 'three' }

  let result = '<table>';
  for (let el in obj) {
    result += "<tr><td>" + el + "</td><td>" + obj[el] + "</td></tr>";
  }
  result += '</table>';

  res.send(result);
*/


  //let aqui = recuperar();
  //console.log("AQUÍ :", aqui);




  database.pool2.getConnection()
  .then( async (conn) => {
    //select en el que obtiene el rol del usuario. En el where: usr y pwd
      var consulta = await conn.query(`SELECT * FROM user;`);
      console.log(consulta, "-->",consulta.length);



      let obj = { 1: 'one', 2: 'two', 3: 'three' }

      let result = '<table>';
      result += "<tr><th>id</th><th>name</th><th>surname1</th><th>surname2</th><th>user_name</th><th>user_type</th><th>email</th></tr>";
      //for (let el in consulta) {
      
      for (i=0;i<consulta.length;i++){
        result += "<tr><td>" + (i+1) + "</td><td>" + consulta[i].name +
         "</td><td>" + consulta[i].surname1 + "</td><td>" + consulta[i].surname2 +
          "</td><td>" + consulta[i].user_name + "</td><td>" + consulta[i].user_type + 
          "</td><td>" + consulta[i].email + "</td></tr>";
      }
      
        /*
        if(el == consulta.length){ // para que no ponga el meta
          console.log("break");
          break;
        }*/
       // result += "<tr><td>" + el + "</td><td>" + consulta[el].name + "</td><td>" + consulta[el].surname1 + "</td><td>" + consulta[el].surname2 + "</td><td>" + consulta[el].user_name + "</td><td>" + consulta[el].user_type + "</td><td>" + consulta[el].email + "</td></tr>";
      //}
      result += '</table>';
    
      //res.send(result);


      res.render('administrador', { title: 'Administración de usuarios', user: req.session.user, rol: req.session.rol, content: result });







      //res.render('administrador', { title: 'Administración de usuarios', user: req.session.user, rol: req.session.rol });


  }).catch((err) => {
      console.log(err);
      console.log("No se ha podido realizar el select");
  });




  //console.log(consulta);

  //res.render('administrador', { title: 'Administración de usuarios', user: req.session.user, rol: req.session.rol, content: result });
  //res.render('administrador', { title: 'Administración de usuarios', user: req.session.user, rol: req.session.rol });
  


  




  
});

function recuperar(){ //poner en un fichero js a parte
  database.pool2.getConnection()
  .then( async (conn) => {
    //select en el que obtiene el rol del usuario. En el where: usr y pwd
      var consulta = await conn.query(`SELECT * FROM user;`);
      return consulta;


  }).catch((err) => {
      console.log(err);
      console.log("No se ha podido realizar el select");
  });
}

function genera_tabla() {
  // Obtener la referencia del elemento body
//  var body = document.getElementsByTagName("body")[0];
  // Crea un elemento <table> y un elemento <tbody>
  var tabla   = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // Crea las celdas
  for (var i = 0; i < 2; i++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");

    for (var j = 0; j < 2; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode("celda en la hilera "+i+", columna "+j);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }

    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }

  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into <body>
 // body.appendChild(tabla);
 document.getElementById("tablaAdmin").innerHTML = tabla;
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "2");
  console.log("ya está");
}





module.exports = router;