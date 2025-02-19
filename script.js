const urlJSON = "https://raw.githubusercontent.com/TU_USUARIO/agenciacentro/main/data/resultados.json";

// Cargar datos desde GitHub
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

// Guardar datos en GitHub (solo funciona manualmente)
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

// Cargar datos cuando se abre la página
cargarDatos();
