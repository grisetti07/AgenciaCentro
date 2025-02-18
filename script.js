async function obtenerResultados() {
    try {
        const response = await fetch('https://dejugadas.com/cabezas');
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // CAMBIAR ESTE SELECTOR SEGÚN LO QUE INSPECCIONASTE EN LA PÁGINA
        const resultados = doc.querySelectorAll('container-xl.px-0.px-lg-3');  

        let html = '<h2>Últimos Resultados</h2><table border="1"><tr><th>Horario</th><th>Resultado</th></tr>';
        resultados.forEach((resultado, index) => {
            html += <tr><td>Horario ${index + 1}</td><td>${resultado.textContent.trim()}</td></tr>;
        });
        html += '</table>';

        document.getElementById('resultados').innerHTML = html;
    } catch (error) {
        document.getElementById('resultados').innerHTML = "Error al obtener los resultados.";
        console.error("Error:", error);
    }
}

// Ejecutar la función cuando la página cargue
window.onload = obtenerResultados;
