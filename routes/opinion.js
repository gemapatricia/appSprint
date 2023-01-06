var express = require('express');
var router = express.Router();
var database = require('../database');


/* GET home page. */
router.get('/', function(req, res, next) {

  database.pool2.getConnection()
  .then( async (conn) => {
      var consulta = await conn.query(`SELECT * FROM opinion;`);

      let result = '<dl>';      
      //contenido:
      for (i=0;i<consulta.length;i++){
        
        var usuario =  await conn.query(`SELECT name FROM user WHERE id_user = ` + consulta[i].id_user);      

        result += "<dt>" + usuario[0].name + "</dt>" +
        "<dd>" + consulta[i].contenido + "</dd>";
      }
      
      result += '</dl>';


      res.render('opinion', { title: 'Opiniones', user: req.session.user, rol: req.session.rol, opiniones: result });

  }).catch((err) => {
      console.log(err);
      console.log("No se ha podido realizar el select");
  });

});


module.exports = router;