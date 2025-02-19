const urlJSON = "https://raw.githubusercontent.com/TU_USUARIO/agenciacentro/main/data/resultados.json";

async function cargarDatos() {
    try {
        let response = await fetch(urlJSON);
        let data = await response.json();
        
        // Mostrar la fecha
        document.getElementById("fechaActual").textContent = data.fecha;

        // Llenar la tabla con los datos del JSON
        let filas = document.querySelectorAll("tbody tr");
        let loterias = ["Ciudad", "Provincia", "Córdoba", "Santa Fe", "Entre Ríos", "Montevideo"];

        filas.forEach((fila, index) => {
            let celdas = fila.querySelectorAll("td:not(:first-child)");
            let resultados = data.resultados[loterias[index]];

            resultados.forEach((numero, i) => {
                celdas[i].textContent = numero;
            });
        });

    } catch (error) {
        console.error("Error cargando datos:", error);
    }
}

// ✅ Habilitar la edición después de ingresar la contraseña
document.addEventListener("DOMContentLoaded", function() {
    let botonEdicion = document.getElementById("modoEdicion");
    let celdas = document.querySelectorAll("td:not(:first-child)");

    if (botonEdicion) {
        botonEdicion.addEventListener("click", function() {
            let password = prompt("Ingrese la contraseña para habilitar la edición:");

            if (password === "1234") {  
                celdas.forEach((celda) => {
                    celda.setAttribute("contenteditable", "true");
                });

                alert("Modo edición activado. Ahora puedes escribir en la tabla.");
            } else {
                alert("Contraseña incorrecta. No tienes permiso para editar.");
            }
        });
    }
});

// ✅ Guardar los datos editados y generar JSON
async function guardarDatos() {
    let fecha = document.getElementById("fechaActual").textContent;
    let filas = document.querySelectorAll("tbody tr");
    let loterias = ["Ciudad", "Provincia", "Córdoba", "Santa Fe", "Entre Ríos", "Montevideo"];
    let data = { fecha: fecha, resultados: {} };

    filas.forEach((fila, index) => {
        let celdas = fila.querySelectorAll("td:not(:first-child)");
        data.resultados[loterias[index]] = Array.from(celdas).map(celda => celda.textContent);
    });

    console.log("Datos guardados:", JSON.stringify(data, null, 2));
    alert("Los datos se guardaron. Ahora sube `resultados.json` manualmente a GitHub.");
}

// ✅ Cargar los datos al iniciar la página
cargarDatos();
