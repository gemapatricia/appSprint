/*function click_here(button_id)
{
    alert("id:"+ button_id);
}*/

function alerta(id){
    var opcion = confirm("¿Seguro que quiere eliminar el usuario "+ id +"?");
    if (opcion == true) {
        mensaje = "Se eliminará el usuario "+ id;
        } else {
        mensaje = "No se elimina";
        }
        document.getElementById("ejemplo").innerHTML = mensaje;
}