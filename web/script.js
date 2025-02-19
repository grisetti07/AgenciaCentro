const GITHUB_USERNAME = "grisetti07"; // Tu usuario de GitHub
const REPO_NAME = "agenciacentro"; // Nombre del repositorio
const FILE_PATH = "data/resultados.json"; // Ruta del archivo en GitHub

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

    // Evento del botón Guardar
    if (botonGuardar) {
        botonGuardar.addEventListener("click", function() {
            alert("⚠️ El guardado en GitHub aún no está implementado.");
        });
    });
});
