document.addEventListener("DOMContentLoaded", function() {
    let botonEdicion = document.getElementById("modoEdicion");
    let celdas = document.querySelectorAll("td:not(:first-child)"); // Excluye la primera columna con horarios

    // ✅ Función para cargar datos guardados en el navegador
    function cargarDatos() {
        celdas.forEach((celda, index) => {
            let datoGuardado = localStorage.getItem("celda_" + index);
            if (datoGuardado !== null) {
                celda.textContent = datoGuardado; // Muestra los datos guardados siempre
            }
        });
    }

    // ✅ Función para guardar los datos cuando el usuario los edita
    function guardarDatos() {
        celdas.forEach((celda, index) => {
            celda.addEventListener("input", function() {
                localStorage.setItem("celda_" + index, celda.textContent);
            });
        });
    }

    // ✅ Ejecutar carga de datos al iniciar la página (para que siempre se vean)
    cargarDatos();

    // ✅ Verificar si el botón de edición existe antes de asignar la acción
    if (botonEdicion) {
        botonEdicion.addEventListener("click", function() {
            let password = prompt("Ingrese la contraseña para habilitar la edición:");

            if (password === "1234") {  // 🔒 Cambia "1234" por tu contraseña segura
                celdas.forEach((celda) => {
                    celda.setAttribute("contenteditable", "true");
                });

                alert("Modo edición activado. Ahora puedes escribir en la tabla.");
                guardarDatos();  // Activar el guardado después de desbloquear
            } else {
                alert("Contraseña incorrecta. No tienes permiso para editar.");
            }
        });
    } else {
        console.error("El botón 'modoEdicion' no se encontró en la página.");
    }
});
