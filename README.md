# **Aplicación Web Sprint**

## Miembros del proyecto
Elena Cores, María Calvo, Ramón Merchán y Patricia Herrera.

## Aplicación Web Sprint
Aplicación web de deportes cuyo objetivo es proporcionar información para que los usuarios que visiten la página, puedan iniciarse en un amplio rango de deportes. Se podrá visualizar noticias de interés e información sobre deportistas del deporte por el que se esté interesado, y también ver productos en nuestra tienda online. Como novedad, los usuarios pueden compartir sus experiencias y recomendaciones de cada deporte para que los demás puedan tenerlo en cuenta a la hora de practicar una actividad.

## Requisitos para su ejecución
Es necesario tener instaladas las herramientas de `Node.js` con su gestor de paquetes `npm`,  la base de datos `MariaDB`, una shell para ejecutar el entorno, y por último, un navegador para acceder a la aplicación (se recomienda Chrome).

## Preparación del entorno y despliegue
### Instalación de Node.js y npm
Descargue e instale la versión LTS más actualizada de Node.js del siguiente link: https://nodejs.org/en/

Compruebe que lo ha instalado correctamente, en la shell escriba:
~~~
>node --version
~~~
Y debería haber obtenido una versión igual o superior a la siguiente salida por consola:
~~~
v16.18.0
~~~

### Instalación y configuración de MariaDB
Dirígase a la web oficial de descarga de MariaDB y descargue e instale el ejecutable de instalación de MariaDB: https://mariadb.com/downloads/

Siga las instrucciones del wizard de instalación y configure las opciones necesarias, como el puerto de escucha de la BD (3306 por defecto) y usuario/contraseña administrador de la base de datos.

Dentro del proyecto, en el archivo `database.js`, en sus constantes `pool1` y `pool2` modifique los argumentos `user` y `password` de acuerdo al usuario y contraseña que estableció durante la instalación de MariaDB.

## Modo de Empleo
Para ejecutar el programa, abra una shell, y dentro de la raíz del proyecto, ejecute para instalar las dependencias:
~~~
>npm install
~~~

A continuación, inicie la aplicación:
~~~
>npm start
~~~

Por último, acceda al navegador, y conéctese al puerto donde escucha la aplicación: 3000/tcp
~~~
En la barra del navegador: localhost:3000
~~~

En este momento, puede disfrutar de la aplicación navegando por las distintas secciones.

Para información más detallada, visite la documentación oficial: `docs/memoriaSPRINT.pdf`.

# Logo de Sprint

![plot](docs/logo.png)