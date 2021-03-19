'use strict';

/*
 *	BIAGIOTTI, LUCAS MARTIN
 */

// Todos los Discos: 
let aDiscos = [];


// Funcion constructora de Disco
function Disco() {
    let nombre = 'Sin nombre';
    let autor = 'Sin datos';
    let codigo = 0;
    let pistas = [];

    let DuracionTotal = function () {
        let total = 0;
        for (let pista of pistas) {
            total += pista.DarDuracion();
        }
        return total;
    }

    let DuracionPromedio = function () {
        return (DuracionTotal() / pistas.length).toFixed(0);
    }

    this.CargarNombre = function () {
        let valNom;
        do {
            valNom = true;
            nombre = prompt('Ingrese el nombre del disco');
            valNom = ValidarNombre(nombre);
        } while (!valNom);
    }

    this.CargarAutor = function () {
        let valNom;
        do {
            valNom = true;
            autor = prompt('Ingrese el nombre del autor/banda del disco');
            valNom = ValidarNombre(autor);
        } while (!valNom);
    }

    this.CargarCodigo = function () {
        let valOk;
        do {
            valOk = true;
            codigo = parseInt(prompt('Ingrese el código numerico único del disco'));
            valOk = ValidarCodigo(codigo);
        } while (valOk);
    }


    this.DarNombre = () => nombre;

    this.DarAutor = () => autor;

    this.DarCodigo = () => codigo;

    this.GuardarPista = function (pista) {
        pistas.push(pista);
    }

    this.ArmarTapa = () => {
        let html = '';
        let nombreMay = nombre.toUpperCase();
        if (nombreMay.length < 8) {
            html += `<h3 class="tomato">`;
        } else if (nombreMay.length < 12) {
            html += `<h3 class="green">`;
        } else if (nombreMay.length < 16) {
            html += `<h3 class="blue">`;
        } else {
            html += `<h3 class="black">`;
        }
        html += `${nombreMay[0]}`;
        for (let i = 0; i < nombreMay.length; i++) {
            if (nombre[i] == ' ') {
                html += `${nombreMay[i + 1]}`;
            }
        }
        html += `</h3>`;
        return html;

    }

    this.ArmarDisco = () => {
        let html = `<div>
        ${this.ArmarTapa()}
        <ul>
		<li>${nombre.charAt(0).toUpperCase() + nombre.slice(1)}</li>
		<li>Autor: ${autor.charAt(0).toUpperCase() + autor.slice(1)}</li>
		<li>Código: #${codigo}</li>
        <li>Pistas: ${pistas.length}</li>
        <li>Duración total: ${ArmarReloj(DuracionTotal())} </li> 
        <li>Duración promedio: ${ArmarReloj(DuracionPromedio())} </li> 
		</ul>
        <ol>`;
        for (let pista of pistas) {
            html += `<li>${pista.ArmarPista()}</li>`;
        }
        html += `</ol></div>`;
        return html;
    }

}



// Funcion constructora de Pistas
function Pista() {
    let nombre = 'Sin nombre';
    let duracion = 0;

    this.CargarNombrePista = function () {
        let valNom;
        do {
            valNom = true;
            nombre = prompt('Ingrese el nombre de la pista');
            valNom = ValidarNombre(nombre);
        } while (!valNom || nombre == null);
    }

    this.CargarDuracionPista = function () {
        let valOk;
        do {
            valOk = true;
            duracion = parseInt(prompt('Ingrese la duracion de la pista'));
            valOk = ValidarDuracion(duracion);
        } while (valOk);
    }

    this.ArmarPista = () => {
        

       return `${nombre.charAt(0).toUpperCase() + nombre.slice(1)} ${duracion > 180 ? `<span class="rojo">${ArmarReloj(duracion)}</span>` : `${ArmarReloj(duracion)}`}`;
    }

    this.DarDuracion = () => duracion;
}

// Función Cargar:
function Cargar() {
    let disco = new Disco();
    let valCar;

    do {
        disco.CargarNombre();
        if (disco.DarNombre() == null) {
            valCar = confirm('Desea salir?');
        } else {
            disco.CargarAutor();
            if (disco.DarAutor() == null) {
                valCar = confirm('Desea salir?');
            } else {
                disco.CargarCodigo();
                do {
                    let pista = new Pista();
                    pista.CargarNombrePista();
                    pista.CargarDuracionPista();
                    disco.GuardarPista(pista);
                } while (confirm('Cargar otra pista?'))
                aDiscos.push(disco);
                valCar = true;
            }
        }
    }
    while (!valCar);
}

// Función Mostrar:
function Mostrar() {
    // Variable para ir armando la cadena:
    let html = '';

    for (let nDiscos of aDiscos) {
        html += nDiscos.ArmarDisco();
    }

    // Si modificaste el nombre de la variable para ir armando la cadena, también hacelo acá:
    document.getElementById('info').innerHTML = html;
    document.getElementById('cargados').innerHTML = `<h4>Cantidad de discos: ${aDiscos.length}</h4>`; // <--- ahí es acá
}

// Todas las funciones que necesites:

function ValidarCodigo(codigo) {
    if (isNaN(codigo)) {
        alert('Debe ingresar un código válido');
        return true;
    }

    if (codigo < 1 || codigo > 999) {
        alert('El código debe estar entre 1 y 999');
        return true;
    }

    if (aDiscos[0] != undefined) {
        for (let indice in aDiscos) {
            if (codigo == aDiscos[indice].DarCodigo()) {
                alert('El código ingresado ya existe, por favor ingrese uno nuevo');
                return true;
            }
        }
    }
    return false;
}

function ValidarDuracion(duracion) {
    if (isNaN(duracion)) {
        alert('Debe ingresar un valor numérico válido');
        return true;
    }
    if (duracion < 0 || duracion > 7200) {
        alert('La duración de la pista debe estar entre 0 y 7200 segundos');
        return true;
    }

}

function ValidarNombre(nombre) {

    if (nombre != null) {
        if (nombre.length < 2) {
            alert('El nombre debe tener al menos una letra');
            return false;
        } else if (ValidarCaracteres(nombre)) {
            alert('No se aceptan caracteres especiales');
        } else if (nombre.indexOf(' ', nombre.length-1) == nombre.length - 1|| nombre.indexOf(' ', 0) == 0) {
            alert('No se admiten espacios al comienzo ni al final');
        } else {
            return true;
        }
    } else {
        return true;
    }
}

function ValidarCaracteres(nombre) {
    let caracteres = 'ºª!|"@#$%&/()=?¿¡^`[*+]¨´{Çç}-_.:…–;,„<>≤\\';
    for (let i = 0; i < nombre.length; i++) {
        for (let j = 0; j < caracteres.length; j++) {
            if (nombre.charAt(i) == caracteres.charAt(j)) {
                return true;
            }
        }
    }
}


function ArmarReloj(duracion) {
        let seg = (duracion%60).toFixed(0);
        let min = ((duracion/60)%60).toFixed(0);
        let hor = Math.floor((duracion/60)/60);

        return `${hor}:${min}:${seg}`;
}

// Función Ordenar:
function Ordenar() {
    let html = ' ';
    let ver;

    for (let i in aDiscos) {
        ver = aDiscos.sort((a, b) => {
            if (a.DarNombre() > b.DarNombre()) {
                return 1;
            }
            if (a.DarNombre() < b.DarNombre()) {
                return -1;
            }
            return 0;
        });
    }

    for (let nDiscos of aDiscos) {
        html += nDiscos.ArmarDisco();
    }

    console.log(ver);

    // Si modificaste el nombre de la variable para ir armando la cadena, también hacelo acá:
    document.getElementById('info').innerHTML = html; 
    // <--- ahí es acá

}