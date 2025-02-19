const GITHUB_USERNAME = "grisetti07"; // Tu usuario de GitHub
const REPO_NAME = "agenciacentro"; // Nombre del repositorio
const FILE_PATH = "data/resultados.json"; // Ruta del archivo en GitHub
const TOKEN = "TOKEN_GITHUB"; // 🔴 Reemplázalo con tu token de GitHub

document.addEventListener("DOMContentLoaded", function() {
    let botonEdicion = document.getElementById("modoEdicion");
    let botonGuardar = document.getElementById("guardarDatos");
    let celdas = document.querySelectorAll("td:not(:first-child)");

    // Habilitar edición con contraseña
    if (botonEdicion) {
        botonEdicion.addEventListener("click", function() {
            let password = prompt("Ingrese la contraseña para habilitar la edición:");

            if (password === "1234") {
                celdas.forEach((celda) => {
                    celda.setAttribute("contenteditable", "true");
                });

                alert("🔓 Modo edición activado. Ahora puedes modificar los datos.");
            } else {
                alert("❌ Contraseña incorrecta. No tienes permiso para editar.");
            }
        });
    }

    // Guardar datos y subirlos a GitHub
    async function guardarDatos() {
        let fecha = document.getElementById("fechaActual").textContent.replace("Fecha: ", "");
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
            let response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`, {
                headers: { 
                    "Authorization": `Bearer ${TOKEN}`,
                    "Accept": "application/vnd.github.v3+json"
                }
            });

            let fileData = await response.json();
            let sha = fileData.sha || "";

            let updateResponse = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${TOKEN}`,
                    "Accept": "application/vnd.github.v3+json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: "Actualización automática de resultados",
                    content: base64Content,
                    sha: sha
                })
            });

            if (updateResponse.ok) {
                alert("✅ Datos guardados y subidos a GitHub correctamente.");
            } else {
                let errorMessage = await updateResponse.json();
                console.error("Error al subir datos:", errorMessage);
                alert("❌ Error al subir datos a GitHub. Revisa la consola.");
            }

        } catch (error) {
            console.error("Error al subir datos:", error);
            alert("❌ Error inesperado al intentar guardar los datos.");
        }
    }

    // Evento del botón Guardar
    if (botonGuardar) {
        botonGuardar.addEventListener("click", guardarDatos);
    }
});
