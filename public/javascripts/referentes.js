var nombre = $("button").val(); 
$("button").click(function() {
    var nombre = $(this).val();
    localStorage.setItem('nombreref', nombre);

    window.location.href = "/deportistaConcreto";
});



    