async function obtenerDatosQuiniela() {
    try {
        const url = "https://corsproxy.io/?" + encodeURIComponent("https://www.dejugadas.com/cabezas");
        const respuesta = await fetch(url);
        const textoHTML = await respuesta.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(textoHTML, "text/html");

        const filas = doc.querySelectorAll("table tr");
        let datos = [];

        filas.forEach((fila, index) => {
            if (index > 0 && index <= 5) {
                const columnas = fila.querySelectorAll("td");
                let filaDatos = [];
                columnas.forEach(columna => filaDatos.push(columna.innerText));
                datos.push(filaDatos);
            }
        });

        mostrarDatos(datos);
    } catch (error) {
        console.error("Error obteniendo los datos:", error);
    }
}

obtenerDatosQuiniela();
