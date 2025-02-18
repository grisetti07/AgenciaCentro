async function obtenerResultados() {
    try {
        // URL del servidor intermedio (proxy) que evitará el bloqueo CORS
        const proxyUrl = "https://api.allorigins.win/get?url=";
        const targetUrl = "https://dejugadas.com/cabezas";

        // Hacer la solicitud al proxy
        const respuesta = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        const datos = await respuesta.json();

        // Convertir la respuesta en HTML
        let parser = new DOMParser();
        let doc = parser.parseFromString(datos.contents, "text/html");

        // Buscar la tabla de resultados
        let tabla = doc.querySelector(".tabla-de-resultados"); // Ajustar si es otra clase

        if (tabla) {
            document.getElementById("resultados").innerHTML = tabla.outerHTML;
        } else {
            document.getElementById("resultados").innerHTML = "No se encontraron resultados.";
        }

    } catch (error) {
        console.error("Error al obtener los resultados:", error);
        document.getElementById("resultados").innerHTML = "Error al cargar los resultados.";
    }
}

// Llamar a la función cuando la página cargue
obtenerResultados();
