async function obtenerDatosQuiniela() {
    try {
        const respuesta = await fetch("https://www.dejugadas.com/cabezas");
        const textoHTML = await respuesta.text();

        // Crear un DOM virtual para extraer datos
        const parser = new DOMParser();
        const doc = parser.parseFromString(textoHTML, "text/html");

        // Seleccionamos la tabla que contiene los resultados
        const filas = doc.querySelectorAll("table tr");

        let datos = [];
        filas.forEach((fila, index) => {
            if (index > 0 && index <= 5) {  // Tomamos solo las 5 primeras filas de resultados
                const columnas = fila.querySelectorAll("td");
                let filaDatos = [];
                columnas.forEach((columna) => {
                    filaDatos.push(columna.innerText);
                });
                datos.push(filaDatos);
            }
        });

        mostrarDatos(datos);
    } catch (error) {
        console.error("Error obteniendo los datos:", error);
    }
}

function mostrarDatos(datos) {
    const tbody = document.querySelector("#tabla-quiniela tbody");
    tbody.innerHTML = "";

    datos.forEach((fila) => {
        let tr = document.createElement("tr");
        fila.forEach((dato) => {
            let td = document.createElement("td");
            td.textContent = dato;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

obtenerDatosQuiniela();
