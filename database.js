const mysql = require("mariadb");

const pool1 = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
});

const pool2 = mysql.createPool({
    host: "localhost",
    database: "sprint",
    user: "root",
    password: "",
  });

pool1.getConnection()
  .then((conn) => {
    console.log("Conexión establecida");
    setUp(conn);
    conn.query("DELETE FROM user");
    insertUser("pablo", "sánchez", "martín", "admin", "pablosanchez@gmail.com", "Administrador", "admin");
    console.log("Usuario admin creado");
    insertUser("julia", "romero", "lópez", "julia", "juliaromero@gmail.com", "Estándar", "julia123");
    console.log("Usuario estándar creado");
    insertUser("mario", "garcía", "garcía", "mario", "mariogarcia@gmail.com", "Premium", "mario");
    console.log("Usuario premium creado");
    conn.end();
  }).catch((err) => {
    console.log(err);
    console.log("No conexión establecida");
    conn.end();
  });

// SetUp 
function setUp(conn){
    conn.query("CREATE DATABASE IF NOT EXISTS sprint CHARACTER SET='utf8' COLLATE='utf8_bin'");
    conn.query("USE sprint");
    console.log("Base de datos sprint OK");
    conn.query("CREATE TABLE IF NOT EXISTS user (id_user INT NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL," 
                + " surname1 VARCHAR(50) NOT NULL, surname2 VARCHAR(50), user_name VARCHAR(50) NOT NULL UNIQUE,"
                + " user_type VARCHAR(50) NOT NULL check (user_type in ('Estándar', 'Premium', 'Administrador'))," 
                + " email VARCHAR(50) UNIQUE, password VARCHAR(20) NOT NULL, PRIMARY KEY (id_user))");
    console.log("Tabla user OK");
}

// Métodos para interactuar con la DB
function insertUser(name, surname1, surname2=null, user_name, email=null, user_type, password){
    pool2.getConnection()
    .then((conn) => {
        let sql = `INSERT INTO user (name, surname1, surname2, user_name, email, user_type, password) 
                  VALUES ("${name}", "${surname1}", "${surname2}", "${user_name}", "${email}", "${user_type}", "${password}")`;
        conn.query(sql);
        conn.end();
    }).catch((err) => {
        console.log(err);
        console.log("No se ha podido realizar la insercción");
        conn.end();
    });
}

//select con user_name y password que me devuelve si son lo mismo
function consultaContrasenna(user_name){
  console.log("entra en la funcion");
  pool2.getConnection()
  .then((conn) => {
    console.log("entra en el then");
      let sql = `SELECT password FROM user WHERE user_name ="${user_name}";`;
      conn.query(sql, function (err, result, fields){
        return result;
        if (err) throw err;
        console.log("ey: "+result);
      });
      conn.end();
  }).catch((err) => { //aqui si entra hay error pqno reconoce conn
      console.log(err);
      console.log("No se ha podido realizar el select");
      conn.end();
  });



  /*
  var conn = mysql.createConnection({
    host: "localhost",
    database: "sprint",
    user: "root",
    password: "root"
  });

  mysql.createConnection({host: 'localhost', database: 'sprint', user: 'root', password: 'root'})
    .then(conn => {
      let sql = "SELECT user_name, password FROM user WHERE user_name ='admin'  AND password ='admin'";
      conn.query(sql)
      //conn.query('SELECT * FROM user ')
        .then(result => {
          console.log(result.length); // [{ "1": 1 }]
          if (result.length ==  1) {
            conn.end();
            return true;}
            
            else {
              conn.end();
            return false;}
     
        })
        .catch(err => { 
          //handle query error
        });
    })
    .catch(err => {
      //handle connection error
    });



  /*
  console.log("SE METE EN CONSULTAUSER");
  pool2.getConnection()
  .then((conn) => {
      let sql = `SELECT user_name, password FROM user WHERE user_name ="${user_name}" AND password ="${password}"`;
      console.log("HACE LA QUERY");
      conn.query(sql, function (err, result, fields) {
        console.log("result: " + result);
        if (err) throw err;
        if (result.length>0){
          conn.end();
          return true;
        }
        else{
          conn.end();
          return false; //redirect a login
        }
      });
  }).catch((err) => {
      console.log(err);
      console.log("No se ha podido realizar la insercción");
      conn.end();
  });
  */

}

function consultaRol(user_name){

}

module.exports = {pool1, pool2, insertUser, consultaContrasenna, consultaRol};