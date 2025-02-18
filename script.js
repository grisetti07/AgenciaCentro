async function obtenerResultados() {
    try {
        // Hacer la solicitud a la página de resultados
        const respuesta = await fetch("https://dejugadas.com/cabezas");
        const texto = await respuesta.text();

        // Crear un parser para analizar el HTML
        let parser = new DOMParser();
        let doc = parser.parseFromString(texto, "text/html");

        // Buscar la tabla de resultados en la página
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
