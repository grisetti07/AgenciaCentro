async function obtenerResultados() {
    try {
        // Nuevo proxy para evitar CORS
        const proxyUrl = "https://corsproxy.io/?";
        const targetUrl = "https://dejugadas.com/cabezas";

        // Hacer la solicitud al proxy
        const respuesta = await fetch(proxyUrl + encodeURIComponent(targetUrl));
        const texto = await respuesta.text();

        // Crear un parser para analizar el HTML
        let parser = new DOMParser();
        let doc = parser.parseFromString(texto, "text/html");

        // Buscar la tabla de resultados
        let tabla = doc.querySelector(".tabla-de-resultados"); // Ajustar si la clase es diferente

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
