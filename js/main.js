// Array para almacenar el historial de cálculos
let historial = [];

// Función para guardar resultados en el historial
function guardarHistorial(monto, valorBruto, valorNeto) {
    historial.push({ monto: monto, valorBruto: valorBruto, valorNeto: valorNeto });
    localStorage.setItem('historial', JSON.stringify(historial)); // Almacenar en localStorage como JSON
}

// Función para calcular el valor bruto y líquido
function calcularValor(monto) {
    const retencion = 0.1375;
    let retencionMonto = monto * retencion;
    let valorBruto = monto + retencionMonto;
    let valorNeto = monto - retencionMonto;

    return [valorBruto.toFixed(2), valorNeto.toFixed(2)]; // Redondear a dos decimales
}

// Función para mostrar el historial de cálculos
function mostrarHistorial() {
    if (historial.length === 0) {
        alert("El historial está vacío.");
        return;
    }

    let historialString = "Historial de cálculos:\n";
    historial.forEach((registro, index) => {
        historialString += "Registro " + (index + 1) + ":\n";
        historialString += "Monto: $" + registro.monto + "\n";
        historialString += "Valor Bruto: $" + registro.valorBruto + "\n";
        historialString += "Valor Neto: $" + registro.valorNeto + "\n\n";
    });
    alert(historialString);
}

// Función para buscar un registro en el historial por monto
function buscarPorMonto(monto) {
    return historial.find(registro => registro.monto === monto);
}

// Inicializar historial desde localStorage
if (localStorage.getItem('historial')) {
    historial = JSON.parse(localStorage.getItem('historial'));
}

// Capturar evento del botón Calcular
document.getElementById('calcularBtn').addEventListener('click', function() {
    let montoInput = document.getElementById('montoInput').value;
    if (isNaN(montoInput) || montoInput === "") {
        document.getElementById('resultado').innerText = "Por favor, ingresa un monto válido.";
    } else {
        let monto = parseFloat(montoInput);
        let resultado = calcularValor(monto);
        guardarHistorial(monto, resultado[0], resultado[1]);
        document.getElementById('resultado').innerText = `El valor bruto que debes escribir en la boleta es: $${resultado[0]}\nEl valor líquido que recibirás es: $${resultado[1]}`;
    }
});

// Capturar evento del usuario para enviar por mail
document.getElementById('enviarEmailBtn').addEventListener('click', function() {
    let email = prompt("Por favor, ingresa tu correo electrónico para enviar los resultados:");
    if (email) {
        // Código para envío del mail con los resultados
        alert("Los resultados han sido enviados a: " + email);
    }
});
