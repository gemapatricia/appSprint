var nombre = $("button").val(); 
$("button").click(function() {
    var nombre = $(this).val();
    localStorage.setItem('sportref', nombre);

    window.location.href = "/deporteConcreto";
});



