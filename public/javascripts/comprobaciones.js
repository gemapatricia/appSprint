let boton = document.getElementById("botonForm");
let condiciones = true;
let condicionCorreo = false;

debugger;



function selector() {
  var combo = document.getElementById("tipoUsuario");
  var selected = combo.options[combo.selectedIndex].text;
  if (selected == "Premium (usuario de pago)") {
        condicionCorreo = true;
    if ($("#correoi").css("display") == "none")
      mostrar({ id: "formReg" }, "#correoi");
    if ($("#correo").css("display") == "none")
      mostrar({ id: "formReg" }, "#correo");
    if ($("#correoLabel").css("display") == "none")
      mostrar({ id: "formReg" }, "#correoLabel");
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
  //let user = document.getElementById("user").value;
  let pass1 = document.getElementById("pass1").value;
  let pass2 = document.getElementById("pass2").value;


  //Verifica que tiene una mayuscula, un numero y la longitud tiene que ser más de 8 digitos
  var politicacontra = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  var mayusculasClave =  /[A-Z]/;
  //var mayusculasClave = /^[A-Z]+[.]$/;

  let correo = document.getElementById("correo").value;

  if(correo != null && condicionCorreo){
    if (/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(correo)){
     } else {
      document.getElementById("correo").style.backgroundColor = 'red';
      if ($("#error3").css("display") == "none")
        mostrar({ id: "formReg" }, "#error3");
     }
  }
   
   
  if (politicacontra.test(pass1)) {
    if (pass1 == pass2) {
      //redireccionar al inicio
    }
  } else {
    if (!(pass1 == pass2)) {
      condiciones = false;
      document.getElementById("pass1").style.backgroundColor = 'red';
      document.getElementById("pass2").style.backgroundColor = 'red';

      if ($("#error").css("display") == "none")
        mostrar({ id: "formReg" }, "#error");
    }
    if (!(pass1.length >= 8) || !(pass2.length >= 8)) {
      condiciones = false;
      document.getElementById("pass1").style.backgroundColor = 'red';
      document.getElementById("pass2").style.backgroundColor = 'red';
      if ($("#error1").css("display") == "none")
        mostrar({ id: "formReg" }, "#error1");
    }
    if (!mayusculasClave.test(pass1) || !mayusculasClave.test(pass2)) {
      condiciones = false;
      document.getElementById("pass1").style.backgroundColor = 'red';
      document.getElementById("pass2").style.backgroundColor = 'red';
      if ($("#error2").css("display") == "none")
        mostrar({ id: "formReg" }, "#error2");
    }
   // comprobar();
  }

  function comprobar() {
    
    if (pass1.length >= 8 || pass2.length >= 8) {
      condiciones = false;
      if ($("#error1").css("display") == "none")
        mostrar({ id: "formReg" });
    }

    if (!mayusculasClave.test(pass1) || !mayusculasClave.test(pass2)) {
      condiciones = false;
      if ($("#error2").css("display") == "none")
        mostrar({ id: "formReg" });
    }
  }

   if (!condiciones) e.preventDefault();
});