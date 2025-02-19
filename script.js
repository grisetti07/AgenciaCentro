const GITHUB_USERNAME = "grisetti07"; // Tu usuario de GitHub
const REPO_NAME = "agenciacentro"; // Nombre del repositorio
const FILE_PATH = "data/resultados.json"; // Ruta del archivo en GitHub
const RAW_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/main/${FILE_PATH}`;

document.addEventListener("DOMContentLoaded", function () {
    let botonEdicion = document.getElementById("modoEdicion");
    let botonGuardar = document.getElementById("guardarDatos");
    let celdas = document.querySelectorAll("td:not(:first-child)");

    // Cargar datos desde resultados.json
    async function cargarDatos() {
        try {
            let response = await fetch(RAW_URL);
            if (!response.ok) throw new Error("No se pudo cargar resultados.json");

            let data = await response.json();
            document.getElementById("fechaActual").textContent = `Fecha: ${data.fecha}`;

            let filas = document.querySelectorAll("tbody tr");
            let loterias = Object.keys(data.resultados);

            filas.forEach((fila, index) => {
                let celdas = fila.querySelectorAll("td:not(:first-child)");
                celdas.forEach((celda, i) => {
                    celda.textContent = data.resultados[loterias[index]][i] || "0000";
                });
            });

        } catch (error) {
            console.error("Error al cargar los datos:", error);
        }
    }

    // Habilitar edición con contraseña
    botonEdicion.addEventListener("click", function () {
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

    // Guardar datos y actualizar resultados.json en GitHub
    async function guardarDatos() {
        let fecha = new Date().toLocaleDateString("es-AR");
        let filas = document.querySelectorAll("tbody tr");
        let loterias = ["Ciudad", "Provincia", "Córdoba", "Santa Fe", "Entre Ríos", "Montevideo"];
        let data = { fecha: fecha, resultados: {} };

        filas.forEach((fila, index) => {
            let celdas = fila.querySelectorAll("td:not(:first-child)");
            data.resultados[loterias[index]] = Array.from(celdas).map(celda => celda.textContent);
        });

        try {
            let response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/dispatches`, {
                method: "POST",
                headers: {
                    "Accept": "application/vnd.github.everest-preview+json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    event_type: "update_resultados",
                    client_payload: { data: JSON.stringify(data, null, 2) }
                })
            });

            if (response.ok) {
                alert("✅ Datos enviados a GitHub. Se actualizarán en unos segundos.");
            } else {
                let errorMessage = await response.json();
                console.error("Error al subir datos:", errorMessage);
                alert("❌ Error al enviar los datos. Revisa la consola.");
            }

        } catch (error) {
            console.error("Error al subir datos:", error);
            alert("❌ Error inesperado al intentar guardar los datos.");
        }
    }

    botonGuardar.addEventListener("click", guardarDatos);
    cargarDatos(); // Cargar datos al abrir la página
});
