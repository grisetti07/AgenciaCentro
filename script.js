const GITHUB_USERNAME = "TU_USUARIO"; // Reemplaza con tu usuario de GitHub
const REPO_NAME = "agenciacentro"; // Reemplaza con el nombre de tu repositorio
const FILE_PATH = "data/resultados.json"; // Ruta donde se guardará el archivo en GitHub
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`;

document.addEventListener("DOMContentLoaded", function() {
    let botonEdicion = document.getElementById("modoEdicion");
    let botonGuardar = document.getElementById("guardarDatos");
    let celdas = document.querySelectorAll("td:not(:first-child)");

    // Cargar datos desde GitHub
    async function cargarDatos() {
        try {
            let response = await fetch(`https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/${FILE_PATH}`);
            let data = await response.json();
            
            document.getElementById("fechaActual").textContent = data.fecha;
            
            let filas = document.querySelectorAll("tbody tr");
            let loterias = ["Ciudad", "Provincia", "Córdoba", "Santa Fe", "Entre Ríos", "Montevideo"];
            
            filas.forEach((fila, index) => {
                let celdas = fila.querySelectorAll("td:not(:first-child)");
                let resultados = data.resultados[loterias[index]];

                resultados.forEach((numero, i) => {
                    celdas[i].textContent = numero;
                });
            });

        } catch (error) {
            console.error("Error cargando datos:", error);
        }
    }

    // Guardar datos y subirlos a GitHub automáticamente
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
            // Obtener SHA del archivo actual en GitHub
            let getFileResponse = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`, {
                headers: { 
                    "Authorization": `Bearer ${process.env.TOKEN}`, // Usando el secreto de GitHub
                    "Accept": "application/vnd.github.v3+json"
                }
            });

            let fileData = await getFileResponse.json();
            let sha = fileData.sha || "";

            // Subir el archivo actualizado a GitHub
            let response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${process.env.TOKEN}`, // Usando el secreto de GitHub
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

    // Activar edición con contraseña
    if (botonEdicion) {
        botonEdicion.addEventListener("click", function() {
            let password = prompt("Ingrese la contraseña para habilitar la edición:");

            if (password === "1234") {
                celdas.forEach((celda) => {
                    celda.setAttribute("contenteditable", "true");
                });

                alert("🔓 Modo edición activado. Ahora puedes escribir en la tabla.");
            } else {
                alert("❌ Contraseña incorrecta. No tienes permiso para editar.");
            }
        });
    }

    // Evento del botón Guardar
    if (botonGuardar) {
        botonGuardar.addEventListener("click", guardarDatos);
    }

    // Cargar datos al iniciar
    cargarDatos();
});
