const mysql = require("mariadb");

const pool1 = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
});

const pool2 = mysql.createPool({
    host: "localhost",
    database: "sprint",
    user: "root",
    password: "root",
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

// Insertar usuarios
function insertUser(name, surname1, surname2="NULL", user_name, email="NULL", user_type, password){
    pool2.getConnection()
    .then((conn) => {
        let sql = `INSERT INTO user (name, surname1, surname2, user_name, email, user_type, password) 
                  VALUES ("${name}", "${surname1}", "${surname2}", "${user_name}", "${email}", "${user_type}", "${password}")`;
        conn.query(sql);
        conn.end();
    }).catch((err) => {
        console.log(err);
        console.log("No se ha podido realizar la insercción");
    });
}

// Comprobar si un usuario existe
function checkUserExists(user_name){
  pool2.getConnection()
  .then((conn) => {
      let sql = `SELECT id_user FROM user WHERE user_name="${user_name}"`;
      let consulta = conn.query(sql);
      conn.end();

      if (consulta.length > 0) return true;
      else return false;
      
  }).catch((err) => {
      console.log(err);
      console.log("No se ha podido realizar la query");
  });
}

module.exports = {pool1, pool2, insertUser};