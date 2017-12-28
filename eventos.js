$().ready(function() {

    mostrarPeliculas();
    cargarPeliculas();
    idMasGrande();
    cargarUsuarios();
    cargarDirectores();
    cargarActores();
})

function mostrarPeliculas() {
    $("#nuevaPelicula").hide();
    $("#cDirectores").hide();
    $("#cActores").hide();
    $("#cUsuarios").hide();
    $("#cPeliculas").show();
}

function mostrarUsuarios() {
    $("#nuevaPelicula").hide();
    $("#cDirectores").hide();
    $("#cActores").hide();
    $("#cUsuarios").show();
    $("#cPeliculas").hide();
}

function mostrarActores() {
    $("#nuevaPelicula").hide();
    $("#cDirectores").hide();
    $("#cActores").show();
    $("#cPeliculas").hide();
    $("#cUsuarios").hide();
}

function mostrarDirectores() {
    $("#nuevaPelicula").hide();
    $("#cDirectores").show();
    $("#cActores").hide();
    $("#cPeliculas").hide();
    $("#cUsuarios").hide();


}

//EVENTO MOSTRAR - ESCONDER NUEVA PELI
function mostrarNuevaPeli() {
    $("#nuevaPelicula").show();
}

function esconderNuevaPeli() {
    $("#nuevaPelicula").hide();
}

//--------------------------------------------------------------------------------

//EVENTO AGREGAR NUEVA PELI

function borrarDatos() {
    $("#tituloNP").val("");
    $("#fechaNP").val("");
    $("#puntajeNP").val("");
    $("#directorNP").val("");
    $("#actoresNP").val("");
    $("#descripcionNP").val("");
    $("#imagen1NP").val("");
    $("#imagen2NP").val("");
}

// EVENTOS LISTAR---------------------------------------------------------
function agregarDirectoresTabla(parametro) {
    $("#tablaDirectores").empty();
    $("#tablaDirectores").append('<thead>' + '<tr>' + '<th>' + 'Actores' + '</th>' + '<th>' + 'Pais De Origen' + '</th>' + '</tr>' + '</thead>' + '<tbody>')
    for (var i = 0; i < parametro.length; i++) {
        //Agregar la pelicula a la tabla
        $("#tablaDirectores").append(
            '<tr>' +
            '<td>' + parametro[i].nombre + " " + parametro[i].apellido + '</td>' +
            '<td>' + parametro[i].paisOrigen + '</td>' +

            '</tr>')
    }
    $("#tablaDirectores").append('</tbody>')
}

function agregarPeliculasTabla(parametro) {
    $("#tablaPeliculas").empty();
    $("#tablaPeliculas").append('<thead>' + '<tr>' + '<th>' + 'Pelicula' + '</th>' + '<th>' + 'Fecha' + '</th>' + '<th>' + 'Puntaje' + '</th>' + '<th>' + 'Eliminar' + '</th>' + '</tr>' + '</thead>' + '<tbody>')
    for (var i = 0; i < parametro.length; i++) {
        //Agregar la pelicula a la tabla
        $("#tablaPeliculas").append(
            '<tr>' +
            '<td>' + parametro[i].titulo + '</td>' +
            '<td>' + parametro[i].fecha + '</td>' +
            '<td>' + parametro[i].puntaje + '</td>' +
            '<td>' + '<button ' + ' type="button" class="btn btn-default btn-sm" onclick="eliminarPelicula(' + parametro[i].id + ')">' + ' <span class="glyphicon glyphicon-trash"></span>' + '</button>' + '</td>' +
            '</tr>')
    }
    $("#tablaPeliculas").append('</tbody>')
}

function agregarActoresTabla(parametro) {
    $("#tablaActores").empty();
    $("#tablaActores").append('<thead>' + '<tr>' + '<th>' + 'Actores' + '</th>' + '<th>' + 'Pais De Origen' + '</th>' + '</tr>' + '</thead>' + '<tbody>')
    for (var i = 0; i < parametro.length; i++) {
        //Agregar la pelicula a la tabla
        $("#tablaActores").append(
            '<tr>' +
            '<td>' + parametro[i].nombre + " " + parametro[i].apellido + '</td>' +
            '<td>' + parametro[i].paisOrigen + '</td>' +

            '</tr>')
    }
    $("#tablaActores").append('</tbody>')
}

function agregarUsuariosTabla(parametro) {
    $("#tablaUsuarios").empty();
    $("#tablaUsuarios").append('<thead>' + '<tr>' + '<th>' + 'Usuario' + '</th> ' + '<th>' + 'Fecha De Nacimiento' + '</th> ' + '</tr>' + '</thead>' + '<tbody>');
    for (var p = 0; p < parametro.length; p++) {
        for (var i = 0; i < parametro.length; i++) {
            //Agregar la pelicula a la tabla
            $("#tablaUsuarios").append(
                '<tr>' +
                '<td>' + parametro[i].nombre + " " + parametro[i].apellido + '</td>' +
                '<td>' + parametro[i].fecDeNac + '</td>' +
                '</tr>')
        }
    }
    $("#tablaUsuarios").append('</tbody>')
}


function agregarPeliculasTabla2(parametro) {
    $("#tablaPeliculas").empty();
    $("#tablaPeliculas").append('<thead>' + '<tr>' + '<th>' + 'Usuario' + '</th> ' + '<th>' + 'Fecha De Nacimiento' + '</th> ' + '</tr>' + '</thead>' + '<tbody>');
    for (var p = 0; p < parametro.length; p++) {
        var aPelisPorUsuario = [];
        var usuario = parametro[p];
        $("#tablaPeliculas").append(
            '<tr>' +
            '<td>' + usuario.nombre + " " + usuario.apellido + '</td>' +
            '<td>' + usuario.fecDeNac + '</td>' +
            '</tr>' + '<tr>' + '<th>' + 'Pelicula' + '</th>' + '<th>' + 'Fecha' + '</th>' + '<th>' + 'Puntaje' + '</th>' + '</tr>');
        for (var y = 0; y < usuario.pelisFavoritas.length; y++) {
            var idPeli = usuario.pelisFavoritas[y];
            for (var t = 0; t < aPeliculas.length; t++) {
                if (aPeliculas[t].id == idPeli) {
                    aPelisPorUsuario.push(aPeliculas[t])
                }
            }
        }

        for (var u = 0; u < aPelisPorUsuario.length; u++) {

            $("#tablaPeliculas").append(
                '<tr>' +
                '<td>' + aPelisPorUsuario[u].titulo + '</td>' +
                '<td>' + aPelisPorUsuario[u].fecha + '</td>' +
                '<td>' + aPelisPorUsuario[u].puntaje + '</td>' +
                '</tr>')
        }
    }
    $("#tablaPeliculas").append('</tbody>');
}

function agregarActoresTabla2(parametro) {
    $("#tablaActores").empty();

    for (var i = 0; i < parametro.length; i++) {
        //Agregar la pelicula a la tabla
        $("#tablaActores").append('<thead>' + '<tr>' + '<th>' + 'Pelicula' + '</th>' + '<th>' + 'Fecha' + '</th>' + '<th>' + 'Puntaje' + '</th>' + '</tr>' + '</thead>' + '<tbody>');
        $("#tablaActores").append(
            '<tr>' +
            '<td>' + parametro[i].title + '</td>' +
            '<td>' + parametro[i].release_date + '</td>' +
            '<td>' + parametro[i].vote_average + '</td>' +
            '</tr>')


        $("#tablaActores").append('<tr>' + '<th>' + 'Actores' + '</th>' + '<th>' + 'Pais De Origen' + '</th>' + '<th>' + '' + '</th>' + '</tr>');

        for (var q = 0; q < parametro[i].actores.length; q++) {
            for (var u = 0; u < aActores.length; u++) {
                if (aActores[u].id == parametro[i].actores[q].id) {

                    var actorConPais = aActores[u].paisOrigen;

                    $("#tablaActores").append(
                        '<tr>' +
                        '<td>' + parametro[i].actores[q].name + '</td>' +
                        '<td>' + aActores[u].paisOrigen + '</td>' +

                        '</tr>')

                }
            }
        }

        $("#tablaActores").append('</tbody>');
    }
}

function mensajePeliEliminada() {
    $("#tablaPeliculas").empty();
    $("#tablaPeliculas").append('Pelicula eliminada')
}