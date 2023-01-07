var express = require('express');
var router = express.Router();
var database = require('../database');


/* GET home page. */
router.get('/', function (req, res, next) {


  database.pool2.getConnection()
    .then(async (conn) => {
      var consulta = await conn.query(`SELECT * FROM opinion;`);

      let result = '<dl>';
      //contenido:
      for (i = 0; i < consulta.length; i++) {

        var usuario = await conn.query(`SELECT name FROM user WHERE id_user = ` + consulta[i].id_user);

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

router.post('/', function (req, res, next) {

  let opinion = req.body.inputComment;
  console.log("*************");
  console.log(req.body.inputComment);
  console.log("*************");

  if (req.body.inputComment != '') {


    database.pool2.getConnection()
      .then(async (conn) => {
        var consulta = await conn.query(`SELECT * FROM opinion;`);

        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();


        let idUsuario = await conn.query(`SELECT id_user FROM user WHERE user_name = "${req.session.user}" ` );
        console.log("id del usuario *******");
        console.log(idUsuario[0].id_user);

      let sql = `INSERT INTO opinion (contenido, timestamp, id_user) 
      VALUES ("${opinion}"
           , "${day}/${month}/${year}"
           , "${idUsuario[0].id_user}")`;
           await conn.query(sql);

           res.redirect("/opinion");

      }).catch((err) => {
        console.log(err);
        console.log("No se ha podido realizar el select");
      });
  }
});


module.exports = router;