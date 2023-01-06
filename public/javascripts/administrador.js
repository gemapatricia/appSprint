import database from '\database.js';
/*function click_here(button_id)
{
    alert("id:"+ button_id);
}*/


/*var express = require('express');
var router = express.Router();
var database = require('../../database');*/

function alerta(id){
    console.log("VA A HACER EL CONFIRM");
    var opcion = confirm("¿Seguro que quiere eliminar el usuario "+ id +"?");
    console.log("HA HECHO EL CONFIRM");
    if (opcion == true) {
        alert("TRUE");

        database.pool2.getConnection().then( async (conn) => {
            alert("ENTRA");
            var consulta = await conn.query(`SELECT * FROM user;`);
            console.log(consulta);
            conn.end();
        }).catch((err) => {
            console.log(err);
            console.log("No se ha podido realizar la consulta");
        });

        //console.log("El confirm tiene valor: ", otro);
        //mensaje = "Se eliminará el usuario "+ id;
        
        alert("FIN");
        } else {
        alert("FALSE");
        console.log("El confirm tiene valor: ", opcion);
        mensaje = "No se elimina";
        }
        document.getElementById("ejemplo").innerHTML = mensaje;
}
