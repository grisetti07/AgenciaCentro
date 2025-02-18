async function obtenerResultados() {
    try {
        const urlAPI = "https://script.google.com/macros/s/AKfycbxTwd6pMG_DH-LsdVByNRF6bjw69aqFusBuPLjtwx5fZ-oSdVckbPc_0BN8PKzLIb1mCg/exec"; // Reemplazar con tu nueva URL de Google Apps Script
        const respuesta = await fetch(urlAPI);
        const texto = await respuesta.text();

        let parser = new DOMParser();
        let doc = parser.parseFromString(texto, "text/html");

        let quinielas = ["Ciudad", "Provincia", "Córdoba", "Santa Fe", "Entre Ríos", "Montevideo"];
        let horarios = ["Previa", "Primera", "Matutina", "Vespertina", "Nocturna"];

        let tabla = document.getElementById("resultados");
        tabla.innerHTML = ""; // Limpiar la tabla antes de actualizar

        horarios.forEach((horario) => {
            let fila = document.createElement("tr");
            let celdaHorario = document.createElement("td");
            celdaHorario.textContent = horario;
            fila.appendChild(celdaHorario);

            quinielas.forEach((quiniela) => {
                let celda = document.createElement("td");
                
                // Aquí buscamos el número ganador en el HTML obtenido
                let resultado = doc.querySelector(`[data-quiniela="${quiniela}"][data-horario="${horario}"]`);
                
                // Si lo encontramos, lo ponemos en la tabla, si no, mostramos "---"
                celda.textContent = resultado ? resultado.textContent.trim() : "---";
                fila.appendChild(celda);
            });

            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error("Error obteniendo los datos:", error);
    }
}

// Actualizar la tabla cada 60 segundos
setInterval(obtenerResultados, 60000);
obtenerResultados();
