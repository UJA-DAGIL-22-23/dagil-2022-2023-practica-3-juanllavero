/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

let mostrandoUna = false;

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}




/// Espacio de nombres para jugadores
let Personas = {};

// Tags que voy a usar para sustituir los campos
Personas.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDO": "### APELLIDO ###",
    "FECHA DE ACIMIENTO": "### FECHA DE ACIMIENTO ###",
    "PAÍS": "### PAÍS ###",
    "PARTICIPACIONES MUNDIALES": "### PARTICIPACIONES MUNDIALES ###",
    "MEDALLAS DE ORO": "### MEDALLAS DE ORO ###"
}

/// Plantilla para poner los datos de varias personas dentro de una tabla
Personas.plantillaTablaPersonas = {}


// Cabecera de la tabla
Personas.plantillaTablaPersonas.cabecera = `<table width="100%" class="listado-personas">
                    <thead>
                        <th width="10%">ID</th>
                        <th width="10%">Nombre</th>
                        <th width="20%">Apellido</th>
                        <th width="10%">Fecha de nacimiento</th>
                        <th width="15%">País</th>
                        <th width="15%">Participaciones mundiales</th>
                        <th width="10%">Medallas de oro</th>
                    </thead>
                    <tbody>
    `;

// Elemento TR que muestra los datos de una persona
Personas.plantillaTablaPersonas.cuerpo = `
    <tr title="${Personas.plantillaTags.ID}">
        <td>${Personas.plantillaTags.ID}</td>
        <td>${Personas.plantillaTags.NOMBRE}</td>
        <td>${Personas.plantillaTags.APELLIDO}</td>
        <td>${Personas.plantillaTags["FECHA DE ACIMIENTO"]}</td>
        <td>${Personas.plantillaTags.PAÍS}</td>
        <td>${Personas.plantillaTags["PARTICIPACIONES MUNDIALES"]}</td>
        <td>${Personas.plantillaTags["MEDALLAS DE ORO"]}</td>
        <td>
            <div>
                <a href="javascript:Personas.mostrar('${Personas.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a>
            </div>
        </td>
    </tr>
    `;

// Pie de la tabla
Personas.plantillaTablaPersonas.pie = `        </tbody>
             </table>
             `;

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
 Personas.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Personas.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Personas.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Personas.plantillaTags.APELLIDO, 'g'), persona.data.apellido)
        .replace(new RegExp(Personas.plantillaTags["FECHA DE ACIMIENTO"], 'g'), persona.data.fechaNacimiento.dia + "/" + persona.data.fechaNacimiento.mes + "/" + persona.data.fechaNacimiento.año)
        .replace(new RegExp(Personas.plantillaTags.PAÍS, 'g'), persona.data.pais)
        .replace(new RegExp(Personas.plantillaTags["PARTICIPACIONES MUNDIALES"], 'g'), persona.data.partMundiales)
        .replace(new RegExp(Personas.plantillaTags["MEDALLAS DE ORO"], 'g'), persona.data.medallasOro)
}
             
/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Personas.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
    }
}

/**
 * Función que recuperar todas las personas llamando al MS Personas. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idPersona Identificador de la persona a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
 Personas.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idPersona
        const response = await fetch(url);
        if (response) {
            const persona = await response.json()
            callBackFn(persona)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}

/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Personas.plantillaTablaPersonas.actualiza = function (persona) {
    return Personas.sustituyeTags(this.cuerpo, persona)
}

/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */
 Personas.imprimeMuchasPersonas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Personas.plantillaTablaPersonas.cabecera
    vector.forEach(e => msj += Personas.plantillaTablaPersonas.actualiza(e))
    msj += Personas.plantillaTablaPersonas.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de personas", msj)
}

/**
 * Imprime los datos de una persona como una tabla usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
 Personas.personaComoTabla = function (persona) {
    return Personas.plantillaTablaPersonas.cabecera
        + Personas.plantillaTablaPersonas.actualiza(persona)
        + Personas.plantillaTablaPersonas.pie;
}

/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {Persona} persona Datos de la persona a mostrar
 */
 Personas.imprimeUnaPersona = function (persona) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Personas.personaComoTabla(persona);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)
}

/**
 * Función principal para recuperar las personas desde el MS y, posteriormente, imprimirlas.
 */
 Personas.listar = function () {
    Personas.recupera(Personas.imprimeMuchasPersonas);
}

/**
 * Función principal para mostrar los datos de una persona desde el MS y, posteriormente, imprimirla.
 * @param {String} idPersona Identificador de la persona a mostrar
 */
 Personas.mostrar = function (idPersona) {
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}