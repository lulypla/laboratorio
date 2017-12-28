var listaFinal = [];
var idListas = [33010, 33009, 33011, 33008, 32794, 32773, 33007]

for (var i = 0; i < idListas.length; i++) {

    var data = JSON.stringify({});

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === this.DONE) {
            listaFinal.push(JSON.parse(this.responseText));
        }
    });

    xhr.open("GET", "https://api.themoviedb.org/4/list/" + idListas[i] + "?api_key=ccc669f500ab1888cd571945f2b0699e&page=1");
    xhr.setRequestHeader("content-type", "application/json;charset=utf-8");
    xhr.setRequestHeader("authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2M2NjlmNTAwYWIxODg4Y2Q1NzE5NDVmMmIwNjk5ZSIsInN1YiI6IjU5YWRjNGUzOTI1MTQxMDdhZjA0OWZjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ev06yZptcgdUYfC9fH5gaaRL17un2vHc4635Z7tLq70");

    xhr.send(data);
}

var idPelis = 0;
var aPeliculas = [];
var aUsuarios = [];
var aDirectores = [];
var aActores = [];


//filtros---------------------------------------
var aFiltroPeliTitulo = [];
var aFiltroPeliPorPuntaje = [];
var aUsuariosPorNombre = [];
var aActoresPorNombre = [];
var aActoresPorNacionalidad = [];
var aDirectoresPorNombre = [];
var aDirectoresPorNacionalidad = [];
//consultas--------------------------------------


var aPeliculaEnMasListasDeFavoritos = [];
var aDiezActoresMayorEdad = [];
var aUsuarioFemeninosMenorEdad = [];
var aActoresDePeliculaMasReciente = [];
var aUsuarioMayorPromedioPuntajeFavoritos = [];
var aPelisUsuarioMayorEdad = [];

//CONSTRUCTORES

function Pelicula(id, titulo, fecha, puntaje, director, actores, descripcion, imagenes) {

    this.id = id;
    this.titulo = titulo;
    this.fecha = fecha;
    this.puntaje = puntaje;
    this.director = director;
    this.actores = actores;
    this.descripcion = descripcion;
    this.imagenes = imagenes;

}

function Usuario(pelisFavoritas, nombre, apellido, fecDeNac, sexo) {
    this.pelisFavoritas = pelisFavoritas;
    this.nombre = nombre;
    this.apellido = apellido;
    this.fecDeNac = fecDeNac;
    this.sexo = sexo;

}

function Director(id, paisOrigen, biografia, imgPerfil, nombre, apellido, fecDeNac, sexo) {
    this.id = id;
    this.paisOrigen = paisOrigen;
    this.biografia = biografia;
    this.imgPerfil = imgPerfil;
    this.nombre = nombre;
    this.apellido = apellido;
    this.fecDeNac = fecDeNac;
    this.sexo = sexo;

}

function Actor(id, paisOrigen, biografia, imgPerfil, nombre, apellido, fecDeNac, sexo) {
    this.id = id;
    this.paisOrigen = paisOrigen;
    this.biografia = biografia;
    this.imgPerfil = imgPerfil;
    this.nombre = nombre;
    this.apellido = apellido;
    this.fecDeNac = fecDeNac;
    this.sexo = sexo;

}




//METODOS---------------------------------------------------------


//Nueva pelicula-----------------------------------------------------------

function idMasGrande() {

    for (var i = 0; i < movies_DB.length; i++) {
        for (var j = 0; j < movies_DB[i].peliculas.length; j++) {
            if (movies_DB[i].peliculas[j].id > idPelis) {

                idPelis = movies_DB[i].peliculas[j].id;
            }
        }
    }
}

function ingresarPelicula() {


    var titulo = $("#tituloNP").val();
    var fecha = $("#fechaNP").val();
    var puntaje = $("#puntajeNP").val();
    var director = $("#directorNP").val();
    var actores = $("#actoresNP").val();
    var descripcion = $("#descripcionNP").val();
    var imagen1 = $("#imagen1NP").val();
    var imagen2 = $("#imagen1NP").val();
    var imagenes = [imagen1, imagen2];


    idPelis = idPelis + 1;
    var nuevaPelicula = new Pelicula(idPelis, titulo, fecha, puntaje, director, actores, descripcion, imagenes);
    aPeliculas.push(nuevaPelicula);

}





//Cargar pelis de base ------------------------------------------------------

function cargarPeliculas() {
    var repeticion = 0;
    for (var i = 0; i < movies_DB.length; i++) {
        for (var j = 0; j < movies_DB[i].peliculas.length; j++) {
            idPeli = movies_DB[i].peliculas[j].id;
            titulo = movies_DB[i].peliculas[j].title;
            fecha = movies_DB[i].peliculas[j].release_date;
            puntaje = movies_DB[i].peliculas[j].vote_average;
            director = movies_DB[i].peliculas[j].director;
            actores = movies_DB[i].peliculas[j].actores;
            descripcion = movies_DB[i].peliculas[j].overview;
            imagenes = movies_DB[i].peliculas[j].poster_path;
            if (aPeliculas.length == 0) {
                var nuevaPelicula = new Pelicula(idPeli, titulo, fecha, puntaje, director, actores, descripcion, imagenes);
                aPeliculas.push(nuevaPelicula);
            } else {

                for (var t = 0; t < aPeliculas.length; t++) {
                    if (aPeliculas[t].id == idPeli) {

                        repeticion = 1;
                    }


                }
                if (repeticion == 0) {
                    var nuevaPelicula = new Pelicula(idPeli, titulo, fecha, puntaje, director, actores, descripcion, imagenes);
                    aPeliculas.push(nuevaPelicula);

                }
                repeticion = 0;
            }
        } //cierro el for objetos .pelicula
    } //cierro el for movies_DB
}



//Cargar uruarios--------------------------------------------------------------

function cargarUsuarios(pelisFavoritas, nombre, apellido, fecDeNac, sexo) {

    var pelisFavoritas = [];
    for (var i = 0; i < movies_DB.length; i++) {
        for (var j = 0; j < movies_DB[i].peliculas.length; j++) {
            peliFavorita = movies_DB[i].peliculas[j].id;
            pelisFavoritas.push(peliFavorita)
        } //cierro el for pelis
        nombre = movies_DB[i].nombre;
        apellido = movies_DB[i].apellido;
        fecDeNac = movies_DB[i].fechaDeNac;
        sexo = movies_DB[i].sexo;

        var nuevoUsuario = new Usuario(pelisFavoritas, nombre, apellido, fecDeNac, sexo);
        aUsuarios.push(nuevoUsuario);
        var pelisFavoritas = [];
    } //cierro el for listas             
}




//Cargo Directores---------------------------------------------------------------------------------

function cargarDirectores(id, paisOrigen, biografia, imgPerfil, nombre, apellido, fecDeNac, sexo) {
    for (var i = 0; i < directores_DB.length; i++) {
        id = directores_DB[i].id;
        paisOrigen = directores_DB[i].place_of_birth;
        biografia = directores_DB[i].biography;
        imgPerfil = directores_DB[i].profile_path;
        nameAux = directores_DB[i].name.split(" ");
        nombre = nameAux[0];
        apellido = "";
        for (var j = 1; j < nameAux.length; j++) {
            apellido = apellido + nameAux[j] + " ";
        }

        fecDeNac = directores_DB[i].birthday;
        sexo = directores_DB[i].gender;
        if (sexo != 1) {
            sexo = "Masculino"
        } else { sexo = "Femenino" }
        //cierro el for
        var nuevoDirector = new Director(id, paisOrigen, biografia, imgPerfil, nombre, apellido, fecDeNac, sexo);
        aDirectores.push(nuevoDirector);
    }
}



//Cargar Actores-------------------------------------------------------------------------------------


function cargarActores(idActor, paisOrigen, biografia, imgPerfil, nombre, apellido, fecDeNac, sexo) {

    for (var i = 0; i < actores_DB.length; i++) {
        idActor = actores_DB[i].id;
        paisOrigen = actores_DB[i].place_of_birth;
        biografia = actores_DB[i].biography;
        imgPerfil = actores_DB[i].profile_path;
        nameAux = actores_DB[i].name.split(" ");
        nombre = nameAux[0];
        apellido = "";
        for (var j = 1; j < nameAux.length; j++) {
            apellido = apellido + nameAux[j] + " ";
        }
        fecDeNac = actores_DB[i].birthday;
        sexo = actores_DB[i].gender;
        if (sexo != 1) {
            sexo = "Masculino"
        } else { sexo = "Femenino" }
        //cierro el for
        var nuevoActor = new Actor(idActor, paisOrigen, biografia, imgPerfil, nombre, apellido, fecDeNac, sexo);
        aActores.push(nuevoActor);
    }

}

function eliminarPelicula(id) {

    for (var t = 0; t < aPeliculas.length; t++) {
        if (aPeliculas[t].id == id) {

            aPeliculas.splice(t, 1)
        }


    }
    mensajePeliEliminada();
}


///fecha-------------------------------------------------------------

function Fecha(d, m, a) {
    // variable privada
    var dia = d;
    // variable privada
    var mes = m;
    // variable privada
    var anio = a;

    this.toString = function() {
        return dia + "/" + mes + "/" + anio;
    }

    //Privilegiado getter
    this.getDia = function() {
            return dia;
        }
        //Privilegiado setter
    this.setDia = function(d) {
        dia = d;
    }

    this.getMes = function() {
            return mes;
        }
        //Privilegiado setter
    this.setMes = function(m) {
        mes = m;
    }
    this.getAnio = function() {
            return anio;
        }
        //Privilegiado setter
    this.setAnio = function(a) {
        anio = a;
    }

    // privilegiado y usa variable privada directo 
    this.esIgual2 = function(fecha) {
        if ((dia == fecha.getDia()) && (mes == fecha.getMes()) && (anio == fecha.getAnio()))
            return true;
        else
            return false;
    }

    this.esPosterior = function(fecha) {
        if (anio > fecha.getAnio())
            return true;
        else if (anio == fecha.getAnio())
            if (mes > fecha.getMes())
                return true;
            else if (mes == fecha.getMes())
            if (dia > fecha.getDia())
                return true;
            else
                return false;
        else
            return false;
        else
            return false;
    }
}

Fecha.prototype.esIgual = function(fecha) {
    if ((fecha.getDia() == fecha.getDia()) && (mes == fecha.getMes()) && (anio == fecha.getAnio()))
        return true;
    else
        return false;
}








//FILTROS---------------------------------------------------------------------------------

//filtro Peliculas Por titulo------------------------------------------

function filtroPeliTitulo() {
    aFiltroPeliTitulo = [];
    var tituloBuscar = $("#buscarP").val().toUpperCase();
    for (var i = 0; i < aPeliculas.length; i++) {
        var src = aPeliculas[i].titulo.toUpperCase();
        var pos = src.search(tituloBuscar);
        if (pos != -1) {
            aFiltroPeliTitulo.push(aPeliculas[i])
        }
    }
    agregarPeliculasTabla(aFiltroPeliTitulo);
};

//filtro Pelicula Por Puntaje-----------------------------------------

function filtroPeliPorPuntaje() {
    aFiltroPeliPorPuntaje = [];
    var puntaje = $("#puntajeNP1").val();
    for (var i = 0; i < aPeliculas.length; i++) {
        if (Math.round(aPeliculas[i].puntaje) == puntaje) {
            aFiltroPeliPorPuntaje.push(aPeliculas[i]);
        }
    }
    agregarPeliculasTabla(aFiltroPeliPorPuntaje);
};

//filtro Usuario Por Nombre-----------------------------------------

function usuarioPorNombre() {
    aUsuariosPorNombre = [];
    var usuarioBuscar = $("#buscarU").val().toUpperCase();
    for (var i = 0; i < aUsuarios.length; i++) {
        var src = aUsuarios[i].nombre.toUpperCase();
        var src2 = aUsuarios[i].apellido.toUpperCase();
        var pos = src.search(usuarioBuscar);
        var pos2 = src2.search(usuarioBuscar);
        if (pos != -1 || pos2 != -1) {
            aUsuariosPorNombre.push(aUsuarios[i])
        }
    }
    agregarUsuariosTabla(aUsuariosPorNombre)
};

//filtro Actor Por Nombre----------------------------------------- 

function actorPorNombre() {
    aActoresPorNombre = [];
    var actorBuscar = $("#buscarA").val().toUpperCase();
    for (var i = 0; i < aActores.length; i++) {
        var src = aActores[i].nombre.toUpperCase();
        var src2 = aActores[i].apellido.toUpperCase();
        var pos = src.search(actorBuscar);
        var pos2 = src2.search(actorBuscar);
        if (pos != -1 || pos2 != -1) {
            aActoresPorNombre.push(aActores[i])
        }
    }
    agregarActoresTabla(aActoresPorNombre);
};

//filtro Director Por Nombre----------------------------------------- 

function directorPorNombre() {
    aDirectoresPorNombre = [];
    var directorBuscar = $("#buscarD").val().toUpperCase();
    for (var i = 0; i < aDirectores.length; i++) {
        var src = aDirectores[i].nombre.toUpperCase();
        var src2 = aDirectores[i].apellido.toUpperCase();
        var pos = src.search(directorBuscar);
        var pos2 = src2.search(directorBuscar);
        if (pos != -1 || pos2 != -1) {
            aDirectoresPorNombre.push(aDirectores[i])
        }
    }
    agregarDirectoresTabla(aDirectoresPorNombre);
}



//filtro Director Por Nacionalidad----------------------------------------- 

function directoresPorNacionalidad() {
    aDirectoresPorNacionalidad = [];
    var directorBuscar = $("#buscarDN").val().toUpperCase();
    for (var i = 0; i < aDirectores.length; i++) {
        var src = aDirectores[i].paisOrigen.toUpperCase();
        var pos = src.search(directorBuscar);
        if (pos != -1) {
            aDirectoresPorNacionalidad.push(aDirectores[i])
        }
    }
    agregarDirectoresTabla(aDirectoresPorNacionalidad);
    return aDirectoresPorNacionalidad;
}


//filtro Actor Por Nacionalidad----------------------------------------- 

function actoresPorNacionalidad() {
    aActoresPorNacionalidad = [];
    var actorBuscar = $("#buscarAN").val().toUpperCase();
    for (var i = 0; i < aActores.length; i++) {
        if (aActores[i].paisOrigen != null) {
            var src = aActores[i].paisOrigen.toUpperCase();
            var pos = src.search(actorBuscar);
            if (pos != -1) {
                aActoresPorNacionalidad.push(aActores[i])
            }
        }
    }
    agregarActoresTabla(aActoresPorNacionalidad);
}




//CONSULTAS--------------------------------------------------------------------------------



function peliculaEnMasListasDeFavoritos() {
    aPeliculaEnMasListasDeFavoritos = [];
    var auxPeliculas = aPeliculas;
    /*Esto si da el tiempo agrego el atributo
        contadorFavoritos en 0 en el constructor de pelis y listo, creamos el aux para no
        modificar el array original, a demas que no se deberia inventar una variable del objeto aca.*/
    var comparar = 0;
    var repeticion2 = 0;
    for (var p = 0; p < auxPeliculas.length; p++) {
        auxPeliculas[p].contadorFavoritos = 0;

    }
    for (var t = 0; t < aUsuarios.length; t++) {
        for (var j = 0; j < aUsuarios[t].pelisFavoritas.length; j++) {
            for (var i = 0; i < auxPeliculas.length; i++) {
                if (auxPeliculas[i].id == aUsuarios[t].pelisFavoritas[j]) {

                    auxPeliculas[i].contadorFavoritos++;
                }
            }
        }
    }
    for (var k = 0; k < auxPeliculas.length; k++) {
        if (auxPeliculas[k].contadorFavoritos >= comparar) {
            comparar = auxPeliculas[k].contadorFavoritos;
            if (aPeliculaEnMasListasDeFavoritos.length != 0) {
                aPeliculaEnMasListasDeFavoritos.push(auxPeliculas[k])
            } else {
                for (var u = 0; u < aPeliculaEnMasListasDeFavoritos.length; u++) {
                    if (aPeliculaEnMasListasDeFavoritos[u].id == auxPeliculas[k].id) {
                        repeticion2 = 1
                    }
                }
                if (repeticion2 == 0) {
                    aPeliculaEnMasListasDeFavoritos.push(auxPeliculas[k])
                }
                repeticion2 == 0;
            }
        }
    }
    agregarPeliculasTabla(aPeliculaEnMasListasDeFavoritos);
};


// ---------------------------------------- Diez Actores de Mayor edad--------------------------------------------------------------
function diezActoresMayorEdad() {

    aDiezActoresMayorEdad = [];
    actoresOrdenados = [];
    var elActorMasViejo = [];

    var auxActores = [];
    var fechaObj1;
    var fechaObj2;
    var fecha1;
    var fecha2;

    for (var v = 0; v < aActores.length; v++) {
        if (aActores[v].fecDeNac != null) {

            auxActores.push(aActores[v])
        }
    }

    while (auxActores.length > 0) {
        fecha1 = auxActores[auxActores.length - 1].fecDeNac;
        fecha1 = fecha1.split("-");
        fechaObj1 = new Fecha(parseInt(fecha1[2]), parseInt(fecha1[1]), parseInt(fecha1[0]));
        elActorMasViejo = [0];

        for (var q = 0; q < auxActores.length; q++) {
            fecha2 = auxActores[q].fecDeNac;
            fecha2 = fecha2.split("-");
            fechaObj2 = new Fecha(parseInt(fecha2[2]), parseInt(fecha2[1]), parseInt(fecha2[0]));
            if (fechaObj1.esPosterior(fechaObj2)) {

                fechaObj1 = fechaObj2;

                elActorMasViejo = [auxActores[q]];
            } else {
                if (fechaObj1.esIgual2(fechaObj2)) {
                    elActorMasViejo = [auxActores[q]];
                }
            }
            if (q == auxActores.length - 1) { n = 0 }
        }

        if (elActorMasViejo[0] != 0) {
            for (var y = 0; y < elActorMasViejo.length; y++) {
                actoresOrdenados.push(elActorMasViejo[y])
                for (var e = 0; e < auxActores.length; e++) {
                    if (auxActores[e].id == elActorMasViejo[y].id) {
                        auxActores.splice(e, 1)
                    }
                }
            }
        }
    }

    for (var i = 0; i < actoresOrdenados.length; i++) {
        if (aDiezActoresMayorEdad.length < 10) {
            aDiezActoresMayorEdad.push(actoresOrdenados[i])
        } else {
            if (aDiezActoresMayorEdad.length == 9 && aDiezActoresMayorEdad[aDiezActoresMayorEdad.length - 1].fecDeNac == actoresOrdenados[i].fecDeNac) { aDiezActoresMayorEdad.push(actoresOrdenados[i]) }
        }
    }

    agregarActoresTabla(aDiezActoresMayorEdad);
}


function usuarioFemeninosMenorEdad() {
    var aUsuariosMenorEdad = [];
    var aUsuariaFemininaMenorEdad = [];
    var primerFecha;
    var segundaFecha;
    var fecha1;
    var fecha2;
    for (var p = 0; p < aUsuarios.length; p++) {
        if (p == 0) {
            fecha1 = aUsuarios[p].fecDeNac;
            fecha1 = fecha1.split("-");
            primerFecha = new Fecha(parseInt(fecha1[2]), parseInt(fecha1[1]), parseInt(fecha1[0]));
            aUsuariosMenorEdad = [aUsuarios[p]];
        } else {
            fecha2 = aUsuarios[p].fecDeNac;
            fecha2 = fecha2.split("-");
            segundaFecha = new Fecha(parseInt(fecha2[2]), parseInt(fecha2[1]), parseInt(fecha2[0]));
            if (segundaFecha.esPosterior(primerFecha)) {
                primerFecha = segundaFecha;
                aUsuariosMenorEdad = [aUsuarios[p]];
            } else {
                if (primerFecha.esIgual2(segundaFecha)) {
                    aUsuariosMenorEdad.push(aUsuarios[p]);
                }
            }
        }
    }
    for (var u = 0; u < aUsuariosMenorEdad.length; u++) {
        if (aUsuariosMenorEdad[u].sexo == 1) {
            aUsuariaFemininaMenorEdad.push(aUsuariosMenorEdad[u])
        }
    }
    agregarUsuariosTabla(aUsuariaFemininaMenorEdad)
};


function actoresDePeliculaMasRecientes() {
    var aPeliculaMasReciente = [];
    var primerFecha;
    var segundaFecha;
    var fecha1;
    var fecha2;
    var misPeliculasConActores;
    for (var p = 0; p < movies_DB.length; p++) {
        if (movies_DB[p].listaId == 33008) {
            misPeliculasConActores = movies_DB[p].peliculas;
            for (var i = 0; i < misPeliculasConActores.length; i++) {
                if (i == 0) {
                    fecha1 = misPeliculasConActores[i].release_date;
                    fecha1 = fecha1.split("-");
                    primerFecha = new Fecha(parseInt(fecha1[2]), parseInt(fecha1[1]), parseInt(fecha1[0]));
                } else {
                    fecha2 = misPeliculasConActores[i].release_date;
                    fecha2 = fecha2.split("-");
                    segundaFecha = new Fecha(parseInt(fecha2[2]), parseInt(fecha2[1]), parseInt(fecha2[0]));
                    if (primerFecha.esPosterior(segundaFecha)) {

                        aPeliculaMasReciente = [misPeliculasConActores[i]];
                    } else {
                        if (primerFecha.esIgual2(segundaFecha)) {

                            aPeliculaMasReciente.push(misPeliculasConActores[i]);
                        }
                    }
                }
            }
        }
    }
    agregarActoresTabla2(aPeliculaMasReciente);
}

function usuarioMayorPromedioPuntajeFavoritos() {
    aUsuarioMayorPromedioPuntajeFavoritos = [];
    var promedio = 0;
    for (var i = 0; i < aUsuarios.length; i++) {
        var pelis = aUsuarios[i].pelisFavoritas
        var puntajeInt = 0;
        var cantidadPeliculas = 0;
        for (var j = 0; j < aPeliculas.length; j++) {
            for (var l = 0; l < pelis.length; l++) {
                if (aPeliculas[j].id == pelis[l]) {
                    puntajeInt = puntajeInt + aPeliculas[j].puntaje;
                    cantidadPeliculas++;
                }
            }
        }
        var promedioInt = puntajeInt / cantidadPeliculas;
        if (promedioInt == promedio) {
            aUsuarioMayorPromedioPuntajeFavoritos = aUsuarioMayorPromedioPuntajeFavoritos.push(aUsuarios[i]);
        }
        if (promedioInt > promedio) {
            promedio = promedioInt;
            aUsuarioMayorPromedioPuntajeFavoritos = [aUsuarios[i]]
        }
    }
    agregarUsuariosTabla(aUsuarioMayorPromedioPuntajeFavoritos);
};



function pelisUsuarioMayorEdad() {

    var usuarioMayorEdad = [];
    var fecha1;
    var fecha2;
    var fechaObj1;
    var fechaObj2;
    for (var i = 0; i < aUsuarios.length; i++) {
        if (i == 0) {
            fecha1 = aUsuarios[i].fecDeNac;
            fecha1 = fecha1.split("-");
            fechaObj1 = new Fecha(parseInt(fecha1[2]), parseInt(fecha1[1]), parseInt(fecha1[0]));
        } else {
            fecha2 = aUsuarios[i].fecDeNac;
            fecha2 = fecha2.split("-");
            fechaObj2 = new Fecha(parseInt(fecha2[2]), parseInt(fecha2[1]), parseInt(fecha2[0]));
            if (fechaObj1.esPosterior(fechaObj2)) {
                usuarioMayorEdad = [aUsuarios[i]];
                fechaObj1 = fechaObj2;
            } else {
                if (fechaObj1.esIgual2(fechaObj2)) {
                    usuarioMayorEdad.push(aUsuarios[i]);
                }
            }
        } //cierro el else si no es el primer usuario para guardar primera fecha
    } //cierro for usuarios
    agregarPeliculasTabla2(usuarioMayorEdad);
}