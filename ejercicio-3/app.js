const prompt = require('prompt-sync')();

// Constructor del objeto Tarea
function Tarea(titulo, descripcion, estado, vencimiento, dificultad) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.estado = estado;
    this.fechaCreacion = new Date().toLocaleString();
    this.fechaVencimiento = vencimiento;
    this.dificultad = dificultad;
}

// Métodos agregados al prototipo de Tarea
Tarea.prototype.mostrarResumen = function (indice) {
    console.log(`\n--- Tarea ${indice + 1} ---`);
    console.log(`Título: ${this.titulo}`);
    console.log(`Estado: ${this.estado}`);
};

Tarea.prototype.mostrarDetalles = function (indice) {
    console.log(`\n--- Tarea ${indice + 1} ---`);
    console.log(`Título: ${this.titulo}`);
    console.log(`Descripción: ${this.descripcion}`);
    console.log(`Estado: ${this.estado}`);
    console.log(`Dificultad: ${this.dificultad}`);
    console.log(`Fecha de Creación: ${this.fechaCreacion}`);
    console.log(`Fecha de Vencimiento: ${this.fechaVencimiento}`);
};

// Arreglo que almacena las tareas
let tareas = [];
let opcion;

do {
    console.clear();
    console.log("Bienvenido");
    console.log("Qué deseas hacer?");
    console.log("Menu Principal");
    console.log("1.Ver mis tareas");
    console.log("2.Buscar tarea");
    console.log("3.Agregar tarea");
    console.log("4.Ver Detalles de Tareas");
    console.log("5.Salir\n");

    opcion = prompt("Elige una opción: ");

    switch (opcion) {
        case "1":
            verTareas();
            break;

        case "2":
            buscarTarea();
            break;

        case "3":
            if (tareas.length < 10) {
                let titulo = prompt("Ingresa el título: ");
                let descripcion = prompt("Ingresa la descripción: ");
                let estado = prompt("Ingresa el estado de la tarea (En curso, Pendiente, Terminada): ");
                let vencimiento = prompt("Ingresa la fecha de vencimiento (opcional): ");
                let dificultad = prompt("Ingresa la dificultad (fácil, medio, difícil): ");

                let nuevaTarea = new Tarea(titulo, descripcion, estado, vencimiento, dificultad);
                tareas.push(nuevaTarea);

                console.log("\n¡Tarea agregada con éxito!");
            } else {
                console.log("\n¡No se pueden agregar más tareas! El espacio está lleno.");
            }
            prompt("Presiona Enter para continuar...");
            break;

        case "4":
            mostrarDetalles();
            break;

        case "5":
            console.log("Salir");
            break;

        default:
            console.log("Opción no válida. Intenta de nuevo.");
            prompt("Presiona Enter para continuar...");
            break;
    }
} while (opcion !== "5");


// --- FUNCIÓN VER TAREAS ---
function verTareas() {
    console.clear();
    let subOpcion;
    console.log("¿Qué tarea deseas ver?");
    console.log("1.Todas");
    console.log("2.Pendientes");
    console.log("3.Terminadas");
    console.log("4.En Curso");
    console.log("5.Volver");
    subOpcion = prompt("Elige una opción: ");

    switch (subOpcion) {
        case "1":
            console.clear();
            console.log("Todas tus tareas:");
            if (tareas.length === 0) {
                console.log("No tienes tareas agregadas.");
            } else {
                tareas.forEach((tarea, i) => tarea.mostrarDetalles(i));
            }
            break;

        case "2":
            mostrarPorEstado("pendiente");
            break;

        case "3":
            mostrarPorEstado("terminada");
            break;

        case "4":
            mostrarPorEstado("en curso");
            break;

        case "5":
            console.log("Volviendo...");
            break;

        default:
            console.log("Opción no válida.");
            break;
    }
    prompt("\nPresiona Enter para continuar...");
}

// --- FUNCIÓN MOSTRAR DETALLES ---
function mostrarDetalles() {
    console.clear();
    let estadoBuscado = prompt("Ingresa el estado de la tarea que quieres ver (Pendiente, Terminada, En Curso): ");
    let contador = 0;

    console.log(`\nMostrando detalles de tareas: ${estadoBuscado}`);

    tareas.forEach((tarea, i) => {
        if (tarea.estado && tarea.estado.toLowerCase() === estadoBuscado.toLowerCase()) {
            tarea.mostrarDetalles(i);
            contador++;
        }
    });

    if (contador === 0) {
        console.log("No hay tareas con ese estado.");
    }
    prompt("\nPresiona Enter para continuar...");
}

// --- FUNCIÓN BUSCAR TAREA ---
function buscarTarea() {
    console.clear();
    console.log("--- Búsqueda de Tarea ---");

    let terminoBusqueda = prompt("Ingresa el título, descripción o estado de la tarea a buscar: ").toLowerCase();
    let contadorResultados = 0;

    tareas.forEach((tarea, i) => {
        if (tarea.titulo.toLowerCase().includes(terminoBusqueda) ||
            tarea.descripcion.toLowerCase().includes(terminoBusqueda) ||
            tarea.estado.toLowerCase().includes(terminoBusqueda)) {
            console.log(`\n--- Coincidencia Encontrada (Tarea ${i + 1}) ---`);
            tarea.mostrarDetalles(i);
            contadorResultados++;
        }
    });

    if (contadorResultados === 0) {
        console.log(`\nNo se encontraron tareas que coincidan con "${terminoBusqueda}".`);
    }

    prompt("\nPresiona Enter para continuar...");
}

// --- FUNCIÓN AUXILIAR: mostrar tareas por estado ---
function mostrarPorEstado(estadoBuscado) {
    console.clear();
    console.log(`Tus tareas ${estadoBuscado}:`);
    let contador = 0;

    tareas.forEach((tarea, i) => {
        if (tarea.estado && tarea.estado.toLowerCase() === estadoBuscado.toLowerCase()) {
            tarea.mostrarResumen(i);
            contador++;
        }
    });

    if (contador === 0) {
        console.log(`No tienes tareas ${estadoBuscado}.`);
    }
}
