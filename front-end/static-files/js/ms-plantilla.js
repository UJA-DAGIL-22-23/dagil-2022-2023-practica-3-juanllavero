/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

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

Personas.anteriorID = "";
Personas.siguienteID = "";

/// Vector con las personas obtenidas de la base de datos
Personas.vectorPersonas = [];

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
                    <th width="10%">País</th>
                    <th width="15%">Participaciones mundiales</th>
                    <th width="10%">Medallas de oro</th>
                    <th></th>
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

Personas.plantillaParaUnaPersona = function () {
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
                <a href="javascript:Personas.mostrar('${Personas.anteriorID}')" class="opcion-secundaria mostrar">Anterior</a>
            </div>
        </td>
        <td>
            <div>
                <a href="javascript:Personas.mostrar('${Personas.siguienteID}')" class="opcion-secundaria mostrar">Siguiente</a>
            </div>
        </td>
    </tr>
    `;
}

Personas.plantillaParaVariasPersonas = function () {
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
}

Personas.form = {
    NOMBRE: "form-persona-nombre",
    APELLIDO: "form-persona-apellido",
    PAÍS: "form-persona-pais",
    ["MEDALLAS DE ORO"]: "form-persona-medallas",
}

//Persona que se muestra actualmente
Personas.personaMostrada = null

/// Plantilla para poner los datos de una persona en un tabla dentro de un formulario
Personas.plantillaFormularioPersona = {}

// Cabecera del formulario
Personas.plantillaFormularioPersona.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
            <th width="10%">Id</th><th width="20%">Nombre</th><th width="20%">Apellido</th><th width="10%">Fecha de nacimiento</th>
            <th width="15%">País</th><th width="25%">Participaciones mundiales</th><th width="10%">Medallas de oro</th>
        </thead>
        <tbody>
            <tr title="${Personas.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                        value="${Personas.plantillaTags.ID}" 
                        name="id_persona"/>
                </td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nombre" required value="${Personas.plantillaTags.NOMBRE}" 
                        name="nombre_persona"/>
                </td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-apellido" value="${Personas.plantillaTags.APELLIDO}" 
                        name="apellido_persona"/>
                <td><input type="text" class="form-persona-elemento" disabled
                        id="form-persona-fechaN" value="${Personas.plantillaTags["FECHA DE ACIMIENTO"]}" 
                        name="fechaN_persona"/>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-pais" required value="${Personas.plantillaTags.PAÍS}" 
                        name="pais_persona"/>
                </td>
                <td><input type="text" class="form-persona-elemento" disabled
                        id="form-persona-participaciones" required value="${Personas.plantillaTags["PARTICIPACIONES MUNDIALES"]}" 
                        name="participaciones_persona"/>
                </td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-medallas" max="20" required value="${Personas.plantillaTags["MEDALLAS DE ORO"]}" 
                        name="medallas_persona"/>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <div>
                        <a href="javascript:Personas.mostrar('${Personas.anteriorID}')" class="opcion-secundaria mostrar">Anterior</a>
                    </div>
                </td>
                <td>
                    <div><a href="javascript:Personas.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                </td>
                <td>
                    <div><a href="javascript:Personas.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                </td>
                <td>
                    <div><a href="javascript:Personas.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
                <td>
                    <div>
                        <a href="javascript:Personas.mostrar('${Personas.siguienteID}')" class="opcion-secundaria mostrar">Siguiente</a>
                    </div>
                </td>
                <td></td>
            </tr>
        </tbody>
    </table>
</form>
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

    // Muestro todas las personas que se han descargado
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
 * Actualiza el formulario con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
 Personas.plantillaFormularioPersona.actualiza = function (persona) {
    return Personas.sustituyeTags(this.formulario, persona)
}

/**
 * Imprime los datos de una persona como una tabla dentro de un formulario usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
 Personas.personaComoFormulario = function (persona) {
    return Personas.plantillaFormularioPersona.actualiza(persona);
}

/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */
 Personas.imprimeMuchasPersonas = function (vector) {
    Personas.plantillaParaVariasPersonas();

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Personas.plantillaTablaPersonas.cabecera
    Personas.vectorPersonas = []
    vector.forEach(p => Personas.vectorPersonas.push(p.ref['@ref'].id))
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
 * @param {persona} persona Datos de la persona a mostrar
 */
 Personas.imprimeUnaPersona = function (persona) {
    Personas.anteriorID = Personas.anterior(persona.ref['@ref'].id)
    Personas.siguienteID = Personas.siguiente(persona.ref['@ref'].id)

    //Personas.plantillaParaUnaPersona();
    let msj = Personas.personaComoFormulario(persona);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    Personas.almacenaDatos(persona)
}

/**
 * Almacena los datos de la persona que se está mostrando
 * @param {Persona} persona Datos de la persona a almacenar
 */
 Personas.almacenaDatos = function (persona) {
    Personas.personaMostrada = persona;
}

/**
 * Recupera los valores almacenados de la persona que se estaba mostrando
 * @return Datos de la persona a almacenada
 */
 Personas.recuperaDatosAlmacenados = function () {
    return this.personaMostrada;
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

/**
 * Función para actualizar la variable que almacena el ID de la persona anterior a la actual
 */
Personas.anterior = function (idPersona) {
    if (Personas.vectorPersonas.length == 0)
        return "No hay personas"
    for (let i = 1; i < Personas.vectorPersonas.length; i++){
        if (Personas.vectorPersonas[i] == idPersona){
            return Personas.vectorPersonas[i - 1]
        }
    } 
    return Personas.vectorPersonas[Personas.vectorPersonas.length - 1];
}

/**
 * Función para actualizar la variable que almacena el ID de la persona siguiente a la actual
 */
 Personas.siguiente = function (idPersona) {
    if (Personas.vectorPersonas.length == 0)
        return "No hay personas"
    for (let i = 0; i < Personas.vectorPersonas.length - 1; i++){
        if (Personas.vectorPersonas[i] == idPersona){
            return Personas.vectorPersonas[i + 1]
        }
    }
    return Personas.vectorPersonas[0];
}

/**
 * Establece disable = habilitando en los campos editables
 * @param {boolean} Deshabilitando Indica si queremos deshabilitar o habilitar los campos
 * @returns El propio objeto Personas, para concatenar llamadas
 */
 Personas.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Personas.form) {
        document.getElementById(Personas.form[campo]).disabled = deshabilitando
    }
    return this
}

/**
 * Establece disable = true en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Personas.deshabilitarCamposEditables = function () {
    Personas.habilitarDeshabilitarCamposEditables(true)
    return this
}


/**
 * Establece disable = false en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Personas.habilitarCamposEditables = function () {
    Personas.habilitarDeshabilitarCamposEditables(false)
    return this
}

/**
 * ????Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
 Personas.opcionesMostrarOcultar = function (classname, mostrando) {
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseAniadir = !mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR

    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], claseQuitar)
            .aniadirClase(opciones[i], claseAniadir)
    }
    return this
}

/**
 * Oculta todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Personas.ocultarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}


/**
 * Muestra todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Personas.mostrarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}


/**
 * Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Personas.mostrarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}


/**
 * Oculta las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Personas.ocultarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}

/**
 * Función que permite modificar los datos de una persona
 */
 Personas.editar = function () {
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}

/**
 * Función que permite cancelar la acción sobre los datos de una persona
 */
Personas.cancelar = function () {
    this.imprimeUnaPersona(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}

/**
 * Función para guardar los nuevos datos de una persona
 */
Personas.guardar = async function () {
    try {
        let url = Frontend.API_GATEWAY + "/plantilla/setTodo/"
        let id_persona = document.getElementById("form-persona-id").value
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "id": id_persona,
                "nombre": document.getElementById("form-persona-nombre").value,
                "apellido": document.getElementById("form-persona-apellido").value,
                "pais": document.getElementById("form-persona-pais").value,
                "medallasOro": document.getElementById("form-persona-medallas").value,
            }), // body data type must match "Content-Type" header
        })
        Personas.mostrar(id_persona)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
    }
}