let boton = document.getElementById("botonForm");
let condiciones = true;

debugger;

boton.addEventListener("click", function (e) {
  let pass1 = document.getElementById("pass1").value;
  let pass2 = document.getElementById("pass2").value;
  
  if (pass1 !== pass2) {
    condiciones = false;
    alert("Las contraseñas no son iguales");
  }

  if (!condiciones) e.preventDefault();
});