const GITHUB_USERNAME = "grisetti07"; // Tu usuario de GitHub
const REPO_NAME = "agenciacentro"; // Nombre del repositorio
const FILE_PATH = "data/resultados.json"; // Ruta del archivo en GitHub

async function obtenerToken() {
    // Aquí el código intentará obtener el token desde GitHub Secrets (en el futuro, desde GitHub Actions).
    return process.env.TOKEN; // Esto funcionará cuando usemos GitHub Actions.
}

async function guardarDatos() {
    let fecha = document.getElementById("fechaActual").textContent;
    let filas = document.querySelectorAll("tbody tr");
    let loterias = ["Ciudad", "Provincia", "Córdoba", "Santa Fe", "Entre Ríos", "Montevideo"];
    let data = { fecha: fecha, resultados: {} };

    filas.forEach((fila, index) => {
        let celdas = fila.querySelectorAll("td:not(:first-child)");
        data.resultados[loterias[index]] = Array.from(celdas).map(celda => celda.textContent);
    });

    let jsonStr = JSON.stringify(data, null, 2);
    let base64Content = btoa(unescape(encodeURIComponent(jsonStr))); // Convertir JSON a Base64

    try {
        let token = await obtenerToken(); // Obtenemos el token de forma segura

        let getFileResponse = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`, {
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Accept": "application/vnd.github.v3+json"
            }
        });

        let fileData = await getFileResponse.json();
        let sha = fileData.sha || "";

        let response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/vnd.github.v3+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Actualización automática de resultados",
                content: base64Content,
                sha: sha
            })
        });

        if (response.ok) {
            alert("✅ Datos guardados y subidos a GitHub correctamente.");
        } else {
            let errorMessage = await response.json();
            console.error("Error al subir datos:", errorMessage);
            alert("❌ Error al subir datos a GitHub. Revisa la consola.");
        }

    } catch (error) {
        console.error("Error al subir datos:", error);
        alert("❌ Error inesperado al intentar guardar los datos.");
    }
}
