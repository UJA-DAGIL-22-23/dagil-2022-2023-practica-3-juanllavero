/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}

//Personas para probar los tests
let persona = {
    ref: {
        "@ref": {
            id: "214145321233"
        }
    },
    ts: 1680537333040000,
    data: {
        nombre: "Andreas",
        apellido: "Prommegger",
        fechaNacimiento: {
            dia: 10,
            mes: 11,
            año: 1980
        },
        pais: "Austria",
        partMundiales: [
            2003,
            2004,
            2006,
            2009,
            2015
        ],
        medallasOro: 3
    }
}

let otra = {
    ref: {
        "@ref": {
            id: "1244351234"
        }
    },
    ts: 1680537333040000,
    data: {
        nombre: "Andrew",
        apellido: "Prom",
        fechaNacimiento: {
            dia: 1,
            mes: 1,
            año: 1985
        },
        pais: "Austria",
        partMundiales: [
            2003,
            2004
        ],
        medallasOro: 2
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})

describe("Personas.personaComoTabla: ", function () {
    let d = {
        ref: {
            "@ref": {
                id: "214145321233"
            }
        },
        ts: 1680537333040000,
        data: {
            nombre: "Andreas",
            apellido: "Prommegger",
            fechaNacimiento: {
                dia: 10,
                mes: 11,
                año: 1980
            },
            pais: "Austria",
            partMundiales: [
                2003,
                2004,
                2006,
                2009,
                2015
            ],
            medallasOro: 3
        }
    }

    it("debería devolver una fila de tabla con los datos de una persona",
        function () {
            let msj = Personas.personaComoTabla(d)
            expect(msj.includes(d.ref["@ref"].id)).toBeTrue();
            expect(msj.includes(d.data.nombre)).toBeTrue();
            expect(msj.includes(d.data.apellido)).toBeTrue();
            expect(msj.includes(d.data.fechaNacimiento.dia)).toBeTrue();
            expect(msj.includes(d.data.fechaNacimiento.mes)).toBeTrue();
            expect(msj.includes(d.data.fechaNacimiento.año)).toBeTrue();
            expect(msj.includes(d.data.pais)).toBeTrue();
            expect(msj.includes(d.data.partMundiales)).toBeTrue();
            expect(msj.includes(d.data.medallasOro)).toBeTrue();
        });
})

describe("Personas.sustituyeTags: ", function () {

    it("debería devolver una fila de tabla con los datos de una persona",
        function () {
            let msj = Personas.personaComoTabla(persona)
            expect(msj.includes(persona.ref["@ref"].id)).toBeTrue();
            expect(msj.includes(persona.data.nombre)).toBeTrue();
            expect(msj.includes(persona.data.apellido)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.dia)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.mes)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.año)).toBeTrue();
            expect(msj.includes(persona.data.pais)).toBeTrue();
            expect(msj.includes(persona.data.partMundiales)).toBeTrue();
            expect(msj.includes(persona.data.medallasOro)).toBeTrue();
        });
})

describe("Personas.plantillaTablaPersonas.actualiza: ", function () {
    let d = {
        ref: {
            "@ref": {
                id: "214145321233"
            }
        },
        ts: 1680537333040000,
        data: {
            nombre: "Andreas",
            apellido: "Prommegger",
            fechaNacimiento: {
                dia: 10,
                mes: 11,
                año: 1980
            },
            pais: "Austria",
            partMundiales: [
                2003,
                2004,
                2006,
                2009,
                2015
            ],
            medallasOro: 3
        }
    }

    it("debería devolver una fila de tabla con los datos de una persona",
        function () {
            let msj = Personas.plantillaTablaPersonas.actualiza(d)
            expect(msj.includes(d.ref["@ref"].id)).toBeTrue();
            expect(msj.includes(d.data.nombre)).toBeTrue();
            expect(msj.includes(d.data.apellido)).toBeTrue();
            expect(msj.includes(d.data.fechaNacimiento.dia)).toBeTrue();
            expect(msj.includes(d.data.fechaNacimiento.mes)).toBeTrue();
            expect(msj.includes(d.data.fechaNacimiento.año)).toBeTrue();
            expect(msj.includes(d.data.pais)).toBeTrue();
            expect(msj.includes(d.data.partMundiales)).toBeTrue();
            expect(msj.includes(d.data.medallasOro)).toBeTrue();
        });
})

describe("Personas.imprimeMuchasPersonas: ", function () {

    it("debería mostrar todas las personas del vector que se le pasa, almacenando en el vector Personas.vectorPersonasID las IDs de cada persona",
        function () {
            Personas.imprimeMuchasPersonas(Personas.vectorPersonas)
            for (let i = 0; i < Personas.vectorPersonas.length; i++){
                expect(Personas.vectorPersonas[i].ref['@ref'].id == Personas.vectorPersonasID[i]).toBeTrue();
            }
        });
})

describe("Personas.anterior: ", function () {

    it("debería devolver el id correcto, o en su defecto el primer id",
        function () {
            Personas.vectorPersonasID = [ "214145321233235", "21414567844321233", "214145321234233" ]
            expect(Personas.anterior("214145321233235") == "214145321234233").toBeTrue();
            expect(Personas.anterior("214145321234233") == "21414567844321233").toBeTrue();
            expect(Personas.anterior("adsadasf") == "214145321234233").toBeTrue();
            expect(Personas.anterior(0) == "214145321234233").toBeTrue();
        });
})

describe("Personas.siguiente: ", function () {

    it("debería devolver el id correcto, o en su defecto el último id",
        function () {
            Personas.vectorPersonasID = [ "214145321233235", "21414567844321233", "214145321234233" ]
            expect(Personas.siguiente("214145321233235") == "21414567844321233").toBeTrue();
            expect(Personas.siguiente("214145321234233") == "214145321233235").toBeTrue();
            expect(Personas.siguiente("adsadasf") == "214145321233235").toBeTrue();
            expect(Personas.siguiente(0) == "214145321233235").toBeTrue();
        });
})

describe("Personas.almacenaDatos: ", function () {
    Personas.almacenaDatos(persona)

    it("se debería haber almacenado correctamente la persona en la variable Personas.personaMostrada",
        function () {
            expect(Personas.personaMostrada == persona).toBeTrue();
            expect(Personas.personaMostrada == otra).toBeFalse();
            expect(Personas.personaMostrada == null).toBeFalse();
        });
})

describe("Personas.recuperaDatosAlmacenados: ", function () {
    Personas.personaMostrada = persona

    it("debe devolver la persona que se hay almacenada (p)",
        function () {
            expect(Personas.recuperaDatosAlmacenados() == persona).toBeTrue();
            expect(Personas.recuperaDatosAlmacenados() == otra).toBeFalse();
            expect(Personas.recuperaDatosAlmacenados() == null).toBeFalse();
        });
})

describe("Personas.plantillaFormularioPersona.actualiza: ", function () {

    it("debería devolver una fila de tabla con los datos de una persona, utilizando la función de Personas.plantillaFormularioPersona",
        function () {
            let msj = Personas.plantillaFormularioPersona.actualiza(persona)
            expect(msj.includes(persona.ref["@ref"].id)).toBeTrue();
            expect(msj.includes(persona.data.nombre)).toBeTrue();
            expect(msj.includes(persona.data.apellido)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.dia)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.mes)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.año)).toBeTrue();
            expect(msj.includes(persona.data.pais)).toBeTrue();
            expect(msj.includes(persona.data.partMundiales)).toBeTrue();
            expect(msj.includes(persona.data.medallasOro)).toBeTrue();
        });
})

describe("Personas.personaComoFormulario: ", function () {

    it("debería devolver una fila de tabla con los datos de una persona, utilizando la función de Personas.personaComoFormulario",
        function () {
            let msj = Personas.personaComoFormulario(persona)
            expect(msj.includes(persona.ref["@ref"].id)).toBeTrue();
            expect(msj.includes(persona.data.nombre)).toBeTrue();
            expect(msj.includes(persona.data.apellido)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.dia)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.mes)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.año)).toBeTrue();
            expect(msj.includes(persona.data.pais)).toBeTrue();
            expect(msj.includes(persona.data.partMundiales)).toBeTrue();
            expect(msj.includes(persona.data.medallasOro)).toBeTrue();
        });
})

describe("Personas.imprimeUnaPersona: ", function () {

    it("debería mostrar la persona que se le pasa como parámetro",
        function () {
            let msj = Personas.imprimeUnaPersona(persona)
            expect(msj.includes(persona.ref["@ref"].id)).toBeTrue();
            expect(msj.includes(persona.data.nombre)).toBeTrue();
            expect(msj.includes(persona.data.apellido)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.dia)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.mes)).toBeTrue();
            expect(msj.includes(persona.data.fechaNacimiento.año)).toBeTrue();
            expect(msj.includes(persona.data.pais)).toBeTrue();
            expect(msj.includes(persona.data.partMundiales)).toBeTrue();
            expect(msj.includes(persona.data.medallasOro)).toBeTrue();
        });
})

describe("Personas.ordenarPor: ", function () {
    
    it("debería ordenar el vector Personas.vectorPersonas según el parámetro pasado y posteriormente mostrar la lista de personas",
        function () {
            expect(Personas.ordenarPor("ID")).toBeTrue();
            expect(Personas.ordenarPor("nombre")).toBeTrue();
            expect(Personas.ordenarPor("apellido")).toBeTrue();
            expect(Personas.ordenarPor("pais")).toBeTrue();
            expect(Personas.ordenarPor("fechaNacimiento")).toBeTrue();
            expect(Personas.ordenarPor("partMundiales")).toBeTrue();
            expect(Personas.ordenarPor("medallasOro")).toBeTrue();
            expect(Personas.ordenarPor("Nada")).toBeFalse();
        });
})


/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
