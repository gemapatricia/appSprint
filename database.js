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
  .then(async (conn) => {
    console.log("Conexión establecida");
    setUp(conn);
    const existenUsuarios = await checkUsers(conn);
    if (!existenUsuarios){
      insertUser("pablo", "sánchez", "martín", "admin", "pablosanchez@gmail.com", "Administrador", "admin");
      console.log("Usuario admin creado");
      insertUser("julia", "romero", "lópez", "julia", "juliaromero@gmail.com", "Estándar", "julia123");
      console.log("Usuario estándar creado");
      insertUser("mario", "garcía", "garcía", "mario", "mariogarcia@gmail.com", "Premium", "mario");
      console.log("Usuario premium creado");
    }
    else console.log("La base de datos tiene usuarios");
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
    conn.query("CREATE TABLE IF NOT EXISTS user (id_user INT NOT NULL AUTO_INCREMENT, name VARCHAR(50) NOT NULL" 
                + ", surname1 VARCHAR(50) NOT NULL, surname2 VARCHAR(50), user_name VARCHAR(50) NOT NULL UNIQUE"
                + ", user_type VARCHAR(50) NOT NULL check (user_type in ('Estándar', 'Premium', 'Administrador'))" 
                + ", email VARCHAR(50) UNIQUE, password VARCHAR(20) NOT NULL, PRIMARY KEY (id_user)"
                + ", constraint CHK_Premium check( (user_type='Premium' AND email IS NOT NULL) OR user_type!='Premium'))");
    console.log("Tabla user OK");
}

// Métodos para interactuar con la BBDD

// Comprobar si existen usuarios en la BBDD
async function checkUsers(conn){
  try{
    let sql = `SELECT COUNT(id_user) AS numero FROM user`;
    let consulta = await conn.query(sql);
    let filas = parseInt(consulta[0].numero);
    //console.log(filas);
    
    if (filas > 0) return true;
    else return false;
  }
  catch{(err) => {
      console.log(err);
      console.log("No se ha podido realizar la query");
  };
  }
}


// Insertar usuarios
function insertUser(name, surname1, surname2, user_name, email, user_type, password){
    pool2.getConnection()
    .then((conn) => {
        let sql = `INSERT INTO user (name, surname1, surname2, user_name, email, user_type, password) 
                  VALUES ("${name}"
                       , "${surname1}"
                       , if("${surname2}"='',null,"${surname2}")
                       , "${user_name}"
                       , if("${email}"='',null,"${email}")
                       , "${user_type}"
                       , "${password}")`;
        conn.query(sql)
          .catch(err => { 
            mostrarError(err.errno, err.text);
            console.log(err);
            console.log(err.text);
            console.log("No se ha podido realizar la inserción"); 
          });
        conn.end();
    }).catch((err) => {
      console.log("No se puedo conectar");  
      console.log(err);
    });
}

// Mostrar al usuario la excepción generada
function mostrarError(error, texto){
  let posicion = 0;
  let patron = "";
  let campo = "";
  
  switch (error) {
    case 1062:
      patron = "key ";
      posicion = texto.search(patron)+patron.length;
      campo = texto.substring(posicion);
      switch (campo){
        case ("'user_name'"):
          console.log('Ya existe un usuario registrado con ese nombre de usuario');
          break;
        case ("'email'"):
          console.log('Ya existe un usuario registrado con ese email');
          break;
      }
      break;
    case 'CONSTRAINT `CHK_Premium` failed for `sprint`.`user`':
      console.log('El usuario premium tiene que introducir un email');
      break;
  }
}

// Comprobar si un usuario existe
/**async function checkUserExists(user_name){
  pool2.getConnection()
  .then(async (conn) => {
      let sql = `SELECT id_user FROM user WHERE user_name="${user_name}"`;
      let consulta = await conn.query(sql);
      conn.end();

      if (consulta.length > 0) return true;
      else return false;
      
  }).catch((err) => {
      console.log(err);
      console.log("No se ha podido realizar la query");
  });
}*/

module.exports = {pool1, pool2, insertUser};