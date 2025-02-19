document.addEventListener("DOMContentLoaded", function() {
    let botonEdicion = document.getElementById("modoEdicion");
    let botonGuardar = document.getElementById("guardarDatos");
    let celdas = document.querySelectorAll("td:not(:first-child)");

    // Cargar datos guardados en el navegador
    function cargarDatos() {
        let datosGuardados = localStorage.getItem("resultados");
        if (datosGuardados) {
            let data = JSON.parse(datosGuardados);
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
        }
    }

    // Guardar datos en el navegador
    function guardarDatos() {
        let fecha = document.getElementById("fechaActual").textContent;
        let filas = document.querySelectorAll("tbody tr");
        let loterias = ["Ciudad", "Provincia", "Córdoba", "Santa Fe", "Entre Ríos", "Montevideo"];
        let data = { fecha: fecha, resultados: {} };

        filas.forEach((fila, index) => {
            let celdas = fila.querySelectorAll("td:not(:first-child)");
            data.resultados[loterias[index]] = Array.from(celdas).map(celda => celda.textContent);
        });

        localStorage.setItem("resultados", JSON.stringify(data));
        alert("Datos guardados correctamente.");
    }

    // Activar edición con contraseña
    if (botonEdicion) {
        botonEdicion.addEventListener("click", function() {
            let password = prompt("Ingrese la contraseña para habilitar la edición:");

            if (password === "1234") {
                celdas.forEach((celda) => {
                    celda.setAttribute("contenteditable", "true");
                });

                alert("Modo edición activado. Ahora puedes escribir en la tabla.");
            } else {
                alert("Contraseña incorrecta. No tienes permiso para editar.");
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
