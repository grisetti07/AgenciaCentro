document.addEventListener("DOMContentLoaded", function() {
    let botonEdicion = document.getElementById("modoEdicion");
    let celdas = document.querySelectorAll("td[contenteditable]");

    // Cargar datos guardados cuando la página se abre
    function cargarDatos() {
        celdas.forEach((celda, index) => {
            let datoGuardado = localStorage.getItem("celda_" + index);
            if (datoGuardado) {
                celda.textContent = datoGuardado;
            }
        });
    }

    // Guardar datos cuando se edita una celda
    function guardarDatos() {
        celdas.forEach((celda, index) => {
            celda.addEventListener("input", function() {
                localStorage.setItem("celda_" + index, celda.textContent);
            });
        });
    }

    // Ejecutar carga de datos al iniciar
    cargarDatos();

    // Verificar si el botón existe antes de asignar el evento
    if (botonEdicion) {
        botonEdicion.addEventListener("click", function() {
            let password = prompt("Ingrese la contraseña para habilitar la edición:");

            if (password === "1234") {  // 🔒 Cambia "1234" por la contraseña que prefieras
                celdas.forEach((celda) => {
                    celda.setAttribute("contenteditable", "true");
                });

                alert("Modo edición activado. Ahora puedes escribir en la tabla.");
                guardarDatos();  // Habilitar guardado después de desbloquear
            } else {
                alert("Contraseña incorrecta. No tienes permiso para editar.");
            }
        });
    } else {
        console.error("El botón 'modoEdicion' no se encontró en la página.");
    }
});
