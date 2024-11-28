
class Luchador {
    constructor(nombre, edad, peso, nacionalidad) {
        this.nombre = nombre;
        this.edad = edad;
        this.peso = peso;
        this.nacionalidad = nacionalidad;
    }
}


class Inscripcion {
    static validarLuchador(fighter) {
        if (fighter.edad < 18) {
            return "El luchador debe tener al menos 18 años.";
        }
        if (fighter.peso < 50 || fighter.peso > 150) {
            return "El peso del luchador debe estar entre 50 kg y 150 kg.";
        }
    }
}


class UFC {
    constructor() {
        this.luchadores = [];
    }

    agregarLuchador(fighter) {
        this.luchadores.push(fighter);
    }

    mostrarLuchadores() {
        const listaLuchadores = document.getElementById("listaLuchadores");
        listaLuchadores.innerHTML = '';
        this.luchadores.forEach(fighter => {
            const li = document.createElement('li');
            li.textContent = `${fighter.nombre} - ${fighter.edad} años - ${fighter.peso} kg - ${fighter.nacionalidad}`;
            listaLuchadores.appendChild(li);
        });
    }

    emparejarLuchadores() {
        const emparejamientosDiv = document.getElementById("emparejamientos");
        emparejamientosDiv.innerHTML = ''; //asegurarse de que no haya datos previos.
        if (this.luchadores.length < 2) {
            emparejamientosDiv.innerHTML = `<p class="error">No hay suficientes luchadores para emparejar.</p>`;
            return;
        }

        const emparejamientos = [];
        const luchadoresCopia = [...this.luchadores]; //Se crea una copia para trabajar con él sin modificar el original.

        while (luchadoresCopia.length > 1) {
            const index1 = Math.floor(Math.random() * luchadoresCopia.length);
            const luchador1 = luchadoresCopia.splice(index1, 1)[0];

            const index2 = Math.floor(Math.random() * luchadoresCopia.length);
            const luchador2 = luchadoresCopia.splice(index2, 1)[0];

            emparejamientos.push(`${luchador1.nombre} vs ${luchador2.nombre}`);
            //Se elige aleatoriamente un luchador luchador1 y se elimina de la copia splice.
            //Se elige otro luchador aleatorio luchador2 y también se elimina.
            //Ambos luchadores se combinan en una cadena del tipo "nombre1 vs nombre2" y se añade al la posicion de emparejamientos.

            //El objeto (Math) en JavaScript es una biblioteca incorporada que proporciona métodos y propiedades para realizar operaciones matemáticas.
            //El método splice() en JavaScript se utiliza para modificar el contenido de un array eliminando, reemplazando o agregando elementos. Es una herramienta muy versátil que afecta directamente al array original.
            //En JavaScript, el método Math.floor() se utiliza para redondear un número decimal hacia abajo al entero más cercano.
            //devuelve un número decimal que está en el rango [0, 1).
        }

        if (luchadoresCopia.length === 1) {
            emparejamientosDiv.innerHTML += `<p class="error">Un luchador no tiene pareja: ${luchadoresCopia[0].nombre}</p>`;
        }

        emparejamientosDiv.innerHTML += `<h3>Emparejamientos:</h3><ul>${emparejamientos.map(p => `<li>${p}</li>`).join('')}</ul>`;
        //Si al finalizar el ciclo del while queda un luchador sin emparejar (porque el total de luchadores era impar), se muestra un mensaje indicando quién es.

    }

}


const btnEmparejar = document.getElementById("btnEmparejar");
btnEmparejar.addEventListener("click", function () {
    ufc.emparejarLuchadores(); //llama a la funcion emparejar luchadores
});
const ufc = new UFC();


const formInscripcion = document.getElementById("formInscripcion");
formInscripcion.addEventListener("submit", function (e) { //El método addEventListener en JavaScript se utiliza para registrar un evento en un elemento del DOM
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const edad = parseInt(document.getElementById("edad").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const nacionalidad = document.getElementById("nacionalidad").value;

    const luchador = new Luchador(nombre, edad, peso, nacionalidad);

    const mensajeError = Inscripcion.validarLuchador(luchador);
    const mensajeDiv = document.getElementById("mensaje");

    if (mensajeError) {
        mensajeDiv.innerHTML = `<p class="error">${mensajeError}</p>`;
    } else {

        ufc.agregarLuchador(luchador);
        ufc.mostrarLuchadores();
        mensajeDiv.innerHTML = `<p class="success">¡Luchador ${nombre} inscrito exitosamente!</p>`;
        formInscripcion.reset();
    }
});

const btnSimularPelea = document.getElementById("btnSimularPelea");
const resultadoPelea = document.getElementById("resultadoPelea");

btnSimularPelea.addEventListener("click", function () {
    if (ufc.luchadores.length < 2) {
        resultadoPelea.innerHTML = `<p class="error">Debe haber al menos dos luchadores para simular una pelea.</p>`;
        return;
        //Se verifica si hay al menos dos luchadores en la lista ufc.luchadores
    }


    const indices = seleccionarDosAleatorios(ufc.luchadores.length);
    const luchador1 = ufc.luchadores[indices[0]];
    const luchador2 = ufc.luchadores[indices[1]];
    //Se utiliza la función seleccionarDosAleatorios para obtener dos índices diferentes aleatorios dentro del rango de la lista de luchadores.
    //Los índices seleccionados se usan para obtener los objetos de los luchadores desde ufc.luchadores.


    const ganador = Math.random() < 0.5 ? luchador1 : luchador2;
    //Utiliza un número aleatorio entre 0 y 1 para decidir el ganador:
    //Si el número es menor a 0.5, el ganador es luchador1.
    //Si es mayor o igual a 0.5, el ganador es luchador2.


    resultadoPelea.innerHTML = `
        <p>Pelea entre: <strong>${luchador1.nombre}</strong> y <strong>${luchador2.nombre}</strong></p>
        <p><strong>Ganador: ${ganador.nombre}</strong></p>
    `;
});


function seleccionarDosAleatorios(max) {
    let index1 = Math.floor(Math.random() * max);
    let index2;
    do {
        index2 = Math.floor(Math.random() * max);
    } while (index1 === index2);
    return [index1, index2];
}
//Genera dos números aleatorios diferentes entre 0 y max - 1:
//Se obtiene el primer índice (index1).
//En un bucle do-while, se genera el segundo índice (index2) hasta que sea diferente al primero.
