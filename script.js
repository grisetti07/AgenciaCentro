document.addEventListener("DOMContentLoaded", function() {
    let celdas = document.querySelectorAll("td[contenteditable]");
    let botonEdicion = document.getElementById("modoEdicion");

    // Verifica si el botón existe antes de asignar el evento
    if (botonEdicion) {
        botonEdicion.addEventListener("click", function() {
            let password = prompt("Ingrese la contraseña para habilitar la edición:");

            if (password === "1234") {  // Cambia "1234" por tu contraseña segura
                celdas.forEach((celda, index) => {
                    celda.setAttribute("contenteditable", "true");

                    // Cargar datos guardados en el navegador
                    let datoGuardado = localStorage.getItem("celda_" + index);
                    if (datoGuardado) {
                        celda.textContent = datoGuardado;
                    }

                    // Guardar cambios en localStorage cuando se edita una celda
                    celda.addEventListener("input", function() {
                        localStorage.setItem("celda_" + index, celda.textContent);
                    });
                });

                alert("Modo edición activado. Ahora puedes escribir en la tabla.");
            } else {
                alert("Contraseña incorrecta. No tienes permiso para editar.");
            }
        });
    } else {
        console.error("El botón 'modoEdicion' no se encontró en la página.");
    }
});
