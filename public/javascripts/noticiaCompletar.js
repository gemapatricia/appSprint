const nombreNoticia = localStorage.getItem('newsref');

let news = ["Pele", "Silvestre", "EuroBasket", "RogerFederer"];

let titleNews = ["FALLECE EL TRES VECES GANADOR DEL MUNDO, PELÉ, A LOS 82 AÑOS","VEN A CORRER LA SAN SILVESTRE VALLECANA ", "ESPAÑA GANA EL EUROBASKET POR CUARTA VEZ EN TODA SU HISTORIA", "ROGER FEDERER SE RETIRA DEL TENIS"];

let newsSummary = ["<p id='newsSummary'><b>El futbolista ha fallecido como consecuencia de un cáncer de colon en el hospital Albert Einstein de São Paulo, donde llevaba un mes ingresado</b></p>",
                   "<p id='newsSummary'>Como todos los finales de año, miles de personas se han reunido en Vallecas para correr la icónica ruta del barrio madrileño <br> Una de las tradiciones que muchos madrileños comparten es la de correr todos los 31 de diciembre la San Silvestre Vallecana. Con un recorrido de 10 kilómetros y miles de participantes, esta mítica ruta ha cumplido en 2022 nada más y nada menos que 58 ediciones.</p>", 
                   "<p id='newsSummary'>La selección española de baloncesto agrandó su leyenda al derrotar a Francia en la final del Eurobasket 2022 para colgarse un oro completamente inesperado y que se convierte en el cuarto oro de la historia de España en un campeonato de Europa, todos ellos bajo el mando de Sergio Scariolo, y la medalla número 20 en el palmarés español, que ahora aúna los títulos de campeón de Europa y del mundo.</p>",
                   "<p id='newsSummary'>Roger Federer ha anunciado su retirada del tenis. Una leyenda como pocas ha existido en el deporte de la raqueta. A los 41 años y tras unas temporadas muy difíciles por las lesiones, el suizo ha decidido colgar las zapatillas.<br><br> Federer deja un legado único en la historia del tenis. El primer tenista masculino en alcanzar los 20 títulos de Grand Slam, además de hacerlo con un estilo muy característico y elogiado por millones de personas. Su técnica y elegancia sobre el verde jamás serán olvidadas.</p>"];

let src = ["https://imagenes.elpais.com/resizer/ivXE4WDehPHV0gXkuGcBhGZwr88=/1200x675/cloudfront-eu-central-1.images.arcpublishing.com/prisa/XWYNF4ONCJFIDF4G4DW5QL6TTM.jpg",
            "https://thelastlap.run/wp-content/uploads/2022/12/San-Silvestre_1-1210x700.webp", 
            "https://estaticosgn-cdn.deia.eus/clip/3b45b39f-2308-4a00-a1d3-7f6de0c6b76a_16-9-discover-aspect-ratio_default_0_x2482y1945.jpg",
           "https://d2me2qg8dfiw8u.cloudfront.net/content/uploads/2022/09/21065559/Roger-Federer-applauding.jpg"];

let newsDescription = ["<p id='newsDescription'>Pelé, el único futbolista que conquistó tres Mundiales, el primero de fama planetaria, ha fallecido este jueves con 82 años como consecuencia de un cáncer de colon en el hospital Albert Einstein de São Paulo, según ha confirmado su hija Kely Nascimento. “Todo lo que somos es gracias a ti, te amamos infinitamente. Descanse en paz”, ha escrito en su cuenta de Instagram. Con él, acaba una era en la historia del fútbol y en Brasil. Los que tuvieron el privilegio de verle jugar en directo o lo han visto en vídeo recuerdan con precisión aquel gol de cabeza con el que abrió el marcador en su tercer Mundial. La final del 4-1 contra Italia en México 70. Un instante que, junto a jugadas y goles legendarios, ha cristalizado en la memoria colectiva como la expresión máxima del fútbol bello, eficaz e irreverente. “Encantado, soy Ronald Reagan, presidente de los Estados Unidos. Usted no necesita presentarse porque todo el mundo sabe quién es Pelé”, le dijo su anfitrión en una de sus primeras visitas a la Casa Blanca. <br> Edson Arantes do Nascimento nació el 23 de octubre de 1940 en Tres Corações, un pueblito de Minas Gerais. Hijo del futbolista profesional João Ramos, Dondinho, y del ama de casa Celeste, lo bautizaron Edson en honor al padre de la bombilla. Gracias a su don para el fútbol, a los diez años ya era una celebridad local. Con 15 años, su primer viaje a la ciudad costera de Santos marcó dos hitos en su vida: cumplió su sueño de ver el mar y fichó por el club al que siempre fue fiel, el Santos. Arrancaba una carrera fulgurante que le llevó a ser consagrado como uno de los mejores deportistas del siglo XX.</p>",
                       "<p id='newsDescription'>hello</p>",
                       "<p id='newsDescription'>España gana el Eurobasket por cuarta vez en toda su historia. <br> Se trata del decimocuarto metal para la selección en un Europeo, y el cuarto oro del combinado nacional, que ya lo había conseguido en el 2009, 2011 y 2015 y que parecía muy lejano cuando empezó el campeonato. Se consigue así mejorar lo conseguido en 2017, cuando España logró el bronce, un metal que ya había conseguido 1991, 2001 y 2013.    Además, España cuenta en su haber con seis medallas de plata, que consiguió en 1935, 1973, 1983, 1999, 2003 y 2007. La última de ellas había sido en el Eurobasket celebrado en España, donde el combinado nacional cayó en la final contra Rusia. <br> El combinado nacional ha conseguido así aglutinar el título de campeón del Europa y del mundo, algo que había conseguido en el año 2009. Tras ganar el Mundial 2006 en Japón, España cayó en la final del Eurobasket 2007 y se quedó a las puertas de lograrlo, pero aprovechó su segunda oportunidad en Polonia y disfrutó de ese honor durante algo menos de un año. <br> A estos logros en Europa, España suma haber ganado dos veces el Mundial, del que es vigente campeona tras reinar en China 2019 y que también había ganado en 2006 en Japón. Además, en Juegos Olímpicos, han sido cuatro las medallas de España, tres de ellas de plata: Los Ángeles 1984, Pekín 2008 y Londres 2012; y una de bronce en Río 2016.</p>",
                       "<p id='newsDescription'>goodbye</p>"];

let cont = 0;
for(let i = 0; i< news.length; i++){
    if(news[i] == nombreNoticia){
        cont = i;
    }
}

document.getElementById('titleNews').innerHTML = titleNews[cont];
document.getElementById("newsSummary").innerHTML = newsSummary[cont];
document.getElementById("imgNews").src = src[cont];
document.getElementById("newsDes").src = newsDescription[cont];