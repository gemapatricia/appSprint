var nombre = $("button").val(); 
$("button").click(function() {
    var nombre = $(this).val();
    localStorage.setItem('newsref', nombre);

    window.location.href = "/noticiaConcreta";
});



