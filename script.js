async function obtenerResultados() {
    try {
        const response = await fetch('https://dejugadas.com/');
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // AJUSTAR SEGÚN EL CÓDIGO DE LA PÁGINA
        const resultados = doc.querySelectorAll('.clase-de-los-resultados');  

        let html = '<h2>Últimos Resultados</h2><table border="1"><tr><th>Horario</th><th>Resultado</th></tr>';
        resultados.forEach(resultado => {
            html += <tr><td>Horario X</td><td>${resultado.textContent}</td></tr>;
        });
        html += '</table>';

        document.getElementById('resultados').innerHTML = html;
    } catch (error) {
        document.getElementById('resultados').innerHTML = "
