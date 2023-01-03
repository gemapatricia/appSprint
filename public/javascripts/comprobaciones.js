let boton = document.getElementById("botonForm");
let condiciones = true;
let condicionCorreo = false;

debugger;



function selector() {
  var combo = document.getElementById("tipoUsuario");
  var selected = combo.options[combo.selectedIndex].text;
  if (selected == "Premium (usuario de pago)") {
    condicionCorreo = true;
    if ($("#correoPremium").css("display") == "none")
      mostrar({ id: "formReg" }, "#correoPremium");
  } else {
    $("#correoPremium").css("display", "none");
  }
}


function mostrar(e, g) {
  if (e.id == 'formReg') {
    $(g).each(function () {
      displaying = $(this).css("display");
      if (displaying == "block") {
        $(this).fadeOut('slow', function () {
          $(this).css("display", "none");
        });
      } else {
        $(this).fadeIn('slow', function () {
          $(this).css("display", "block");
        });
      }
    });
  }
}

boton.addEventListener("click", function (e) {

  let user = document.getElementById("username").value;
  let nombre = document.getElementById("name").value;
  let ape1 = document.getElementById("ap1").value;
  let pass1 = document.getElementById("pass1").value;
  let pass2 = document.getElementById("pass2").value;


  if (nombre.length == 0) {
    condiciones = false;
  }

  if (ape1.length == 0) {
    condiciones = false;
  }

  if (pass1.length == 0) {
    condiciones = false;
  }

  if (pass2.length == 0) {
    condiciones = false;
  }


  //Verifica que tiene una mayuscula, un numero y la longitud tiene que ser más de 8 digitos
  var politicacontra = /(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  var mayusculasClave = /[A-Z]/;
  var numeroClave = /\d/;
  var comprobarCorreo = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  let correo = document.getElementById("correo").value;

  if (correo.length != 0 && condicionCorreo) {

    if (/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(correo)) {
      $("#error3").css("display", "none");
    } else {
      condiciones = false;
      document.getElementById("correo").style.backgroundColor = '#d93025';
      if ($("#error3").css("display") == "none") {
        mostrar({ id: "formReg" }, "#error3");
      }
    }

  }



  if (politicacontra.test(pass1) && (pass1.length != 0 || pass2.length != 0)) {
    if (pass1 == pass2) {
      condiciones = true;
    }
  } else {

    if (!(pass1 == pass2)) {
      condiciones = false;

      document.getElementById("pass1").style.borderColor = '#d93025';
      document.getElementById("pass2").style.borderColor = '#d93025';

      if ($("#error").css("display") == "none")
        mostrar({ id: "formReg" }, "#error");
    } else {
      $("#error").css("display", "none");
    }


    if (!(pass1.length >= 8) || !(pass2.length >= 8)) {
      condiciones = false;
      document.getElementById("pass1").style.borderColor = '#d93025';
      document.getElementById("pass2").style.borderColor = '#d93025';
      if ($("#error1").css("display") == "none") {
        mostrar({ id: "formReg" }, "#error1");
      }
    } else {
      $("#error1").css("display", "none");
    }


    if (!mayusculasClave.test(pass1) || !mayusculasClave.test(pass2)) {
      condiciones = false;
      document.getElementById("pass1").style.borderColor = '#d93025';
      document.getElementById("pass2").style.borderColor = '#d93025';
      if ($("#error2").css("display") == "none")
        mostrar({ id: "formReg" }, "#error2");
    } else {
      $("#error2").css("display", "none");
    }

    if (!numeroClave.test(pass1) || !numeroClave.test(pass2)) {
      condiciones = false;
      document.getElementById("pass1").style.borderColor = '#d93025';
      document.getElementById("pass2").style.borderColor = '#d93025';
      if ($("#error4").css("display") == "none")
        mostrar({ id: "formReg" }, "#error4");
    } else {
      $("#error4").css("display", "none");
    }

  }



  if (nombre.length == 0) {
    document.getElementById("name").style.borderColor = '#d93025';
    condiciones = false;

  } else {
    document.getElementById("name").style.borderColor = "rgba(163,158,158,255)";

  }
  if (ape1.length == 0) {
    document.getElementById("ap1").style.borderColor = '#d93025';
    condiciones = false;

  } else {
    document.getElementById("ap1").style.borderColor = "rgba(163,158,158,255)";
  }


  if (user.length == 0) {
    document.getElementById("username").style.borderColor = '#d93025';
    condiciones = false;

  } else {
    document.getElementById("username").style.borderColor = "rgba(163,158,158,255)";
  }

  if (!condiciones) e.preventDefault();

});