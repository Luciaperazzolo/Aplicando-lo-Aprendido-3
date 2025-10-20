const prompt = require('prompt-sync')(); //Importa la librería 'prompt-sync' para poder pedir datos al usuario de forma síncrona en la consola.

// Constructor del objeto Tarea
function Tarea(titulo, descripcion, estado, vencimiento, dificultad) { //Definimos la función constructora para crear objetos Tarea.
    this.titulo = titulo; //Asigna el título de la tarea.
    this.descripcion = descripcion;
    this.estado = estado;
    this.fechaCreacion = new Date().toLocaleString(); //Asigna la fecha y hora actuales como fecha de creación.
    this.fechaVencimiento = vencimiento;
    this.dificultad = dificultad;
}

// Métodos agregados al prototipo de Tarea
Tarea.prototype.mostrarResumen = function (indice) { //Agrega un método al prototipo para mostrar un resumen de la tarea.
    console.log(`\n--- Tarea ${indice + 1} ---`); //Muestra un encabezado para la tarea.
    console.log(`Título: ${this.titulo}`); //Muestra el título de la tarea.
    console.log(`Estado: ${this.estado}`); //Muestra el estado de la tarea.
};

Tarea.prototype.mostrarDetalles = function (indice) { //Agrega un método al prototipo para mostrar los detalles de la tarea.
    console.log(`\n--- Tarea ${indice + 1} ---`); //Muestra un encabezado para la tarea.
    console.log(`Título: ${this.titulo}`); //Muestra el título de la tarea.
    console.log(`Descripción: ${this.descripcion}`); //Muestra la descripción de la tarea.
    console.log(`Estado: ${this.estado}`); //Muestra el estado de la tarea.
    console.log(`Dificultad: ${this.dificultad}`); //Muestra la dificultad de la tarea.
    console.log(`Fecha de Creación: ${this.fechaCreacion}`); //Muestra la fecha de creación de la tarea.
    console.log(`Fecha de Vencimiento: ${this.fechaVencimiento}`); //Muestra la fecha de vencimiento de la tarea.
};

// Arreglo que almacena las tareas
let tareas = []; //Se inicializa un array vacío para guardar todos los objetos Tarea.
let opcion; //Variable que almacena la opcción elegida por el usuario.

do {
    console.clear(); //Limpia la consola.
    console.log("Bienvenido");
    console.log("Qué deseas hacer?");
    console.log("Menu Principal");
    console.log("1.Ver mis tareas");
    console.log("2.Buscar tarea");
    console.log("3.Agregar tarea");
    console.log("4.Ver Detalles de Tareas");
    console.log("5.Salir\n");

    opcion = prompt("Elige una opción: "); //Se le pide al usuario que elija una opción.

    switch (opcion) { //Inicia un bloque para manejar la opción elegida.
        case "1":
            verTareas(); //Llama a la función para ver las tareas.
            break; //Sale del switch.

        case "2":
            buscarTarea(); //Llama a la función para buscar tareas.
            break;

        case "3":
            if (tareas.length < 10) { //Comprueba si el array tiene menos de 10 tareas (límite).
                let titulo = prompt("Ingresa el título: "); //Se le pide al usuario que ingrese el título de la tarea.
                let descripcion = prompt("Ingresa la descripción: "); //Se le pide al usuario que ingrese la descripción de la tarea.
                let estado = prompt("Ingresa el estado de la tarea (En curso, Pendiente, Terminada): "); //Se le pide al usuario que ingrese el estado de la tarea.
                let vencimiento = prompt("Ingresa la fecha de vencimiento (opcional): "); //Se le pide al usuario que ingrese la fecha de vencimiento de la tarea.
                let dificultad = prompt("Ingresa la dificultad (fácil, medio, difícil): "); //Se le pide al usuario que ingrese la dificultad de la tarea.

                let nuevaTarea = new Tarea(titulo, descripcion, estado, vencimiento, dificultad); //Se crea un nuevo objeto Tarea con los datos ingresados.
                tareas.push(nuevaTarea); //Se agrega la nueva tarea al array.
                //Es el array que contiene todos los objetos Tarea existentes.
                //.push() es el método estándar de los arrays en JavaScript que se usa para añadir elementos y (nuevaTarea) es el objeto recién creado que se está añadiendo a la lista.

                console.log("\n¡Tarea agregada con éxito!"); //Mensaje de confirmación.
            } else {
                console.log("\n¡No se pueden agregar más tareas! El espacio está lleno."); //Mensaje de que el límite se ha alcanzado.
            }
            prompt("Presiona Enter para continuar...");
            break;

        case "4":
            mostrarDetalles(); //Llama a la función para mostrar detalles de tareas por estado.
            break;

        case "5":
            console.log("Salir"); //Mensaje de despedida.
            break;

        default: //Si la opción no es ninguna de las anteriores.
            console.log("Opción no válida. Intenta de nuevo.");
            prompt("Presiona Enter para continuar...");
            break;
    }
} while (opcion !== "5"); //El bucle continúa mientras la opción no sea "5".


// --- FUNCIÓN VER TAREAS ---
function verTareas() { //Define la función para ver las tareas con un sub-menú.
    console.clear();
    let subOpcion; //Variable que almacena la opción elegida por el usuario.
    console.log("¿Qué tarea deseas ver?");
    console.log("1.Todas");
    console.log("2.Pendientes");
    console.log("3.Terminadas");
    console.log("4.En Curso");
    console.log("5.Volver");
    subOpcion = prompt("Elige una opción: "); //Se le pide al usuario que elija una opcion.

    switch (subOpcion) { //Inicia un bloque para manejar la opcion elegida.
        case "1":
            console.clear();
            console.log("Todas tus tareas:"); //Muestra un encabezado para las tareas.
            if (tareas.length === 0) { //Comprueba si el array de tareas esta vacio.
                console.log("No tienes tareas agregadas."); //Muestra un mensaje si el array de tareas esta vacio.
            } else {
                tareas.forEach((tarea, i) => tarea.mostrarDetalles(i)); //Itera sobre el array de tareas y muestra los detalles de cada tarea.
               // .forEach() es un método, su propósito es iterar sobre cada elemento del array, uno por uno, y ejecutar una función específica para cada uno de ellos.
               //((tarea, i) => ...) esto es una función flecha => indica que lo que viene después es el cuerpo de la función que se va a ejecutar.
               //(tarea, i) Representa el elemento actual del array y su respectivo índice.
            }
            break;

        case "2":
            mostrarPorEstado("pendiente"); //Llama a la función auxiliar para mostrar tareas con estado "pendiente" y así con todas las demas.
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
            console.log("Opción no válida."); //Muestra un mensaje si la opcion elegida no es ninguna de las anteriores.
            break;
    }
    prompt("\nPresiona Enter para continuar...");
}

// --- FUNCIÓN MOSTRAR DETALLES ---
function mostrarDetalles() { //Define la función para mostrar los detalles de tareas filtradas por el estado que pida el usuario.
    console.clear();
    // Pide al usuario el estado por el que quiere filtrar (Pendiente, Terminada, En Curso).
    let estadoBuscado = prompt("Ingresa el estado de la tarea que quieres ver (Pendiente, Terminada, En Curso): ");
    let contador = 0; //Inicializa un contador para saber cuántas tareas se encontraron.

    console.log(`\nMostrando detalles de tareas: ${estadoBuscado}`); //Muestra un encabezado para las tareas.

    tareas.forEach((tarea, i) => { //Itera sobre todas las tareas.
        //Comprueba si la tarea tiene un estado y si ese estado (convertido a minúsculas) coincide con el estado buscado (convertido a minúsculas).
        if (tarea.estado && tarea.estado.toLowerCase() === estadoBuscado.toLowerCase()) { 
            tarea.mostrarDetalles(i); //Muestra los detalles de la tarea.
            contador++; //Incrementa el contador.
        }
    });

    if (contador === 0) { //Si el contador es cero (no se encontró ninguna tarea).
        console.log("No hay tareas con ese estado."); //Muestra un mensaje indicando que no se encontraron tareas.
    }
    prompt("\nPresiona Enter para continuar...");
}

// --- FUNCIÓN BUSCAR TAREA ---
function buscarTarea() { //Define la función para buscar tareas por palabra clave.
    console.clear();
    console.log("--- Búsqueda de Tarea ---"); //Muestra un encabezado.

    // Pide el término de búsqueda y lo convierte a minúsculas para una búsqueda sin distinción entre mayúsculas y minúsculas.
    let terminoBusqueda = prompt("Ingresa el título, descripción o estado de la tarea a buscar: ").toLowerCase(); //
    let contadorResultados = 0; //Inicializa un contador para saber cuántas tareas se encontraron.

    tareas.forEach((tarea, i) => { //Itera sobre todas las tareas.
        //Comprueba si el término de búsqueda está incluido en el título, la descripción O el estado (todos convertidos a minúsculas).
        //.includes(terminoBusqueda) es un método que verifica si la cadena de descripción contiene la cadena almacenada en la variable terminoBusqueda. Si la contiene, devuelve true.
        if (tarea.titulo.toLowerCase().includes(terminoBusqueda) || 
            tarea.descripcion.toLowerCase().includes(terminoBusqueda) ||
            tarea.estado.toLowerCase().includes(terminoBusqueda)) {
            console.log(`\n--- Coincidencia Encontrada (Tarea ${i + 1}) ---`); //Mensaje de que se encontró una coincidencia.
            tarea.mostrarDetalles(i); //Muestra los detalles de la tarea.
            contadorResultados++; //Incrementa el contador.
        }
    });

    if (contadorResultados === 0) { //Si no se encontraron resultados.
        console.log(`\nNo se encontraron tareas que coincidan con "${terminoBusqueda}".`); //Muestra un mensaje indicando que no se encontraron resultados.
    }

    prompt("\nPresiona Enter para continuar...");
}

// --- FUNCIÓN AUXILIAR: mostrar tareas por estado ---
function mostrarPorEstado(estadoBuscado) { //Definimos una función auxiliar para filtrar y mostrar tareas por un estado específico.
    console.clear();
    console.log(`Tus tareas ${estadoBuscado}:`); //Muestra un encabezado con el estado buscado.
    let contador = 0; //Inicializa un contador para saber cuantas tareas se encontraron.

    tareas.forEach((tarea, i) => { //Itera sobre todas las tareas.
        //Comprueba si la tarea tiene un estado y si ese estado (en minúsculas) coincide con el estado buscado (en minúsculas).
        if (tarea.estado && tarea.estado.toLowerCase() === estadoBuscado.toLowerCase()) { 
            tarea.mostrarResumen(i); //Si coincide, llama al método para mostrar solo un resumen de la tarea.
            contador++; //Incrementa el contador.
        }
    });

    if (contador === 0) { //Si el contador es cero (no se encontraron tareas con ese estado).
        console.log(`No tienes tareas ${estadoBuscado}.`); //Muestra un mensaje indicando que no se encontraron tareas con ese estado.
    }
}
