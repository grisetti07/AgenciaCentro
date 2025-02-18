async function obtenerResultados() {
    try {
        const urlAPI = "PEGAR_AQUI_LA_URL_DE_TU_GOOGLE_SCRIPT";
        const respuesta = await fetch(urlAPI);
        const texto = await respuesta.text();

        let parser = new DOMParser();
        let doc = parser.parseFromString(texto, "text/html");

        let quinielas = ["Ciudad", "Provincia", "Córdoba", "Santa Fe", "Entre Ríos", "Montevideo"];
        let horarios = ["Previa", "Primera", "Matutina", "Vespertina", "Nocturna"];

        let tabla = document.getElementById("resultados");
        tabla.innerHTML = "";

        horarios.forEach((horario) => {
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
        console.error("Error obteniendo los datos:", error);
    }
}

// Actualizar cada 60 segundos
setInterval(obtenerResultados, 60000);
obtenerResultados();
