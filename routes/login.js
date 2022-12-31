const { request } = require('express');
var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Inicio de sesión', user: req.session.user, rol: req.session.rol });
});


router.post('/', function(req, res, next) {
  console.log("HA PULSADO");
  
  let pwd = req.body.pass1;
  let usr = req.body.username;

  if(usr && pwd) {

    /*
    if(database.consultaContrasenna(usr) == pwd){
      
      rolSelect = database.consultaRol(usr);
      req.session.user = usr;
      req.session.rol = rolSelect;
      res.redirect("/");
    }
    else{
      req.session.error = "Usuario o contraseña incorrecta";
      res.redirect("/login");
    }






    // crear conexión
    // query (select) con las variables que me han pasado
    /*
    valor = database.consultaUser(usr, pwd);
    console.log("valor: " + valor);
    
    if (valor){ //true
      res.redirect("/");
    }
    else{ //false
      res.redirect("/login");
    }
    
    var con = database.pool2.getConnection();
    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT name, address FROM customers", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
    });


    /*
    database.pool2.getConnection()
    .then((conn) => {
      console.log("entra en el then");
        let sql = `SELECT password FROM user WHERE user_name ="${usr}";`;
        conn.query(sql, function (err, result, fields){
          if (err) throw err;
          let hdp = result;
          console.log("ey: "+hdp);
        });
        conn.end();
    }).catch((err) => { //aqui si entra hay error pqno reconoce conn
        console.log(err);
        console.log("No se ha podido realizar el select");
        conn.end();
    });


   console.log("usr: "+usr);
   let hola = database.consultaUser(usr);
   console.log("vuelve de la bd: " + hola);
   
   */





  }
  else{
    req.session.error = "Falta rellenar o usr o psw";
    res.redirect("/login");
  }

  res.redirect("/");

});


module.exports = router;