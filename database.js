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
  .then(async (conn) => {
    console.log("Conexión establecida");
    setUp(conn);
    const existenUsuarios = await checkUsers(conn);
    if (!existenUsuarios){
      insertUser("Pablo", "Sánchez", "Martín", "admin", "pablosanchez@gmail.com", "Administrador", "Admin123");
      console.log("Usuario admin creado");
      insertUser("Julia", "Romero", "López", "julia", "", "Estándar", "Julia123");
      console.log("Usuario estándar creado");
      insertUser("Mario", "García", "García", "mario", "mariogarcia@gmail.com", "Premium", "Mario123");
      console.log("Usuario premium creado");
      //borrar
      insertOpiniones("Leed la noticia de Federer, es muy interesante", "04/01/2023", 1);
      insertOpiniones("El fútbol es muy apasionante", "04/01/2023", 2);
      insertOpiniones("Probé el boxeo, es para valientes jajaja", "04/01/2023", 3);
      insertOpiniones("El tenis no me gustó mucho", "04/01/2023", 3);
      insertOpiniones("Está genial el tenis!!!!", "04/01/2023", 2);
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
                + ", email VARCHAR(50) UNIQUE, password VARCHAR(41) NOT NULL, PRIMARY KEY (id_user)"
                + ", constraint CHK_UserTypeNoStandard check( (user_type in ('Premium', 'Administrador')"
                + "                                            AND email IS NOT NULL) OR user_type='Estándar')"
                + ", constraint CHK_UserTypeStandard   check( (user_type='Estándar' AND email IS NULL) OR user_type!='Estándar')"
                + ", constraint CHK_EmailPattern       check (email    REGEXP '^\\\\w+([.-_+]?\\\\w+)*@\\\\w+([.-]?\\\\w+)*(\\\\.\\\\w{2,10})+$'))");
    console.log("Tabla user OK");
    conn.query("CREATE TABLE IF NOT EXISTS opinion (id_opinion INT NOT NULL AUTO_INCREMENT"
                + ", contenido VARCHAR(300) NOT NULL"
                + ", timestamp VARCHAR(20) NOT NULL" 
                + ", id_user INT NOT NULL"
                + ", PRIMARY KEY (id_opinion)"
                + ", FOREIGN KEY (id_user) REFERENCES user(id_user) ON DELETE CASCADE)");
    console.log("Tabla opinion OK");
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
async function insertUser(name, surname1, surname2, user_name, email, user_type, password){
  let mensajeError = "";
  let campoError = "";
    await pool2.getConnection()
    .then( async (conn) => {
        let sql = `INSERT INTO user (name, surname1, surname2, user_name, email, user_type, password) 
                  VALUES ("${name}"
                       , "${surname1}"
                       , if("${surname2}"='',null,"${surname2}")
                       , "${user_name}"
                       , if("${email}"='',null,"${email}")
                       , "${user_type}"
                       , PASSWORD("${password}"))`;
        await conn.query(sql)
          .catch(err => { 
            [mensajeError,campoError] = mostrarError(err.errno, err.text);
            console.log(err);
            console.log(err.text);
          });
        conn.end();
    }).catch((err) => {
      mensajeError = "No se puedo conectar";  
      console.log(err);
    });
    //console.log("insertUser -> " + mensajeError);
    return [mensajeError,campoError];
}

//deporte,contenido,timestamp,id_user
// Insertar Opiniones
async function insertOpiniones(contenido, timestamp, id_user){
  await pool2.getConnection()
  .then( async (conn) => {
      let sql = `INSERT INTO opinion (contenido, timestamp, id_user) 
                VALUES ("${contenido}"
                     , "${timestamp}"
                     , "${id_user}")`;
      console.log("Se ha registrado las opiniones");
      await conn.query(sql)
        .catch(err => { 
          console.log("No se ha podido realizar la query");
          console.log(err);
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
  let posicionFin = 0;
  let patron = "";
  let campo = "";
  let mensajeError = "";
  let campoError = "";
  
  switch (error) {
    case 1062:
      patron = "key ";
      posicion = texto.search(patron)+patron.length;
      campo = texto.substring(posicion);
      switch (campo){
        case ("'user_name'"):
          mensajeError = 'Ya existe un usuario registrado con ese nombre de usuario';
          campoError = "username";
          break;
        case ("'email'"):
          mensajeError = 'Ya existe un usuario registrado con ese email';
          campoError = "correo";
          break;
      }
      break;
    case 4025:
      patron = "CONSTRAINT ";
      posicion = texto.search(patron)+patron.length;
      patron = " failed"
      posicionFin = texto.search(patron);
      campo = texto.substring(posicion, posicionFin);
      console.log(campo);
      switch (campo){
        case ("`CHK_UserTypeNoStandard`"):
          mensajeError = 'Para registrar un usuario premium o administrador hay que introducir un email';
          break;
        case ("`CHK_UserTypeStandard`"):
          mensajeError = 'Para registrar un usuario estándar no hay que introducir un email';
          break;
        case ("`CHK_EmailPattern`"):
          mensajeError = 'El formato de correo es incorrecto';
          break;
      }
      break;
  }
  //console.log("mostrarError -> " + mensajeError);
  return [mensajeError, campoError];
}

async function deleteUserById(id){
  await pool2.getConnection()
  .then( async (conn) => {

      await conn.query(`DELETE FROM user WHERE id_user = "${id}";`)
      .catch(err => { 
        console.log("No se ha podido realizar la query");
        console.log(err);
        });
      console.log("se ha eliminado el usuario cuyo id es "+id);
      conn.end();
  }).catch((err) => {
    console.log("No se puedo conectar");  
    console.log(err);
  }); 
}

module.exports = {pool1, pool2, insertUser, deleteUserById};