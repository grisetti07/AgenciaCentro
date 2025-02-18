async function obtenerResultados() {
    try {
        const respuesta = await fetch("https://dejugadas.com/cabezas");
        const texto = await respuesta.text();

        // Extraer los datos manualmente desde el HTML
        let parser = new DOMParser();
        let doc = parser.parseFromString(texto, "text/html");

        let quinielas = ["Ciudad", "Provincia", "Córdoba", "Santa Fe", "Entre Ríos", "Montevideo"];
        let horarios = ["Previa", "Primera", "Matutina", "Vespertina", "Nocturna"];

        let tabla = document.getElementById("resultados");
        tabla.innerHTML = ""; // Limpiar la tabla

        horarios.forEach((horario, i) => {
            let fila = document.createElement("tr");
            let celdaHorario = document.createElement("td");
            celdaHorario.textContent = horario;
            fila.appendChild(celdaHorario);

            quinielas.forEach((quiniela) => {
                let celda = document.createElement("td");
                let resultado = doc.querySelector(`[data-quiniela="${quiniela}"][data-horario="${horario}"]`);
                celda.textContent = resultado ? resultado.textContent.trim() : "---";
                fila.appendChild(celda);
            });

            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error("Error obteniendo los resultados:", error);
    }
}

// Cargar los resultados cada 60 segundos
setInterval(obtenerResultados, 60000);
obtenerResultados();
