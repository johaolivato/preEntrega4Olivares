// Función para calcular el valor bruto a partir del valor líquido
function calcularValorBruto(valorLiquido) {
    return Math.round(valorLiquido / 0.8625);
}

// Función para calcular el valor líquido a partir del valor bruto
function calcularValorLiquido(valorBruto) {
    return Math.round(valorBruto * 0.8625);
}

// Función para calcular la retención
function calcularRetencion(valorBruto) {
    return Math.round(valorBruto * 0.1375);
}

// Función para mostrar el resultado con SweetAlert
function mostrarResultado(valorBruto, valorLiquido, retencion) {
    Swal.fire({
        title: 'Resultado',
        html: `
        <h3>VALOR LIQUIDO</h3>
        <p>Debes hacer la Boleta por: $${valorBruto}</p>
        <p>Recibirás un pago de: $${valorLiquido}</p>
        <p>Retención SII: $${retencion}</p>
        <h3>VALOR BRUTO</h3>
        <p>Debes hacer la Boleta por: $${valorBruto}</p>
        <p>Recibirás un pago de: $${valorBruto}</p>
        <p>Retención SII: $${retencion}</p>
        `,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

// Este bloque de código debe ejecutarse después de que se cargue el DOM
document.addEventListener('DOMContentLoaded', function () {
    // Capturar evento del botón Calcular
    document.getElementById('calcularBtn').addEventListener('click', function() {
        // Obtener valores de los campos de entrada
        let desarrollo = parseFloat(document.getElementById('desarrollo').value);
        let ads = parseFloat(document.getElementById('ads').value);
        let seo = parseFloat(document.getElementById('seo').value);
        let diseno = parseFloat(document.getElementById('diseno').value);
        let copy = parseFloat(document.getElementById('copy').value);
        let ux = parseFloat(document.getElementById('ux').value);
        let ui = parseFloat(document.getElementById('ui').value);
        let asesoria = parseFloat(document.getElementById('asesoria').value);
        let diasTrabajo = parseInt(document.getElementById('diasTrabajo').value);

        // Calcular el costo diario
        let costoDiario = desarrollo + ads + seo + diseno + copy + ux + ui + asesoria;

        // Calcular el valor bruto y líquido
        let valorBruto = calcularValorBruto(costoDiario * diasTrabajo);
        let retencion = calcularRetencion(valorBruto);
        let valorLiquido = valorBruto - retencion;

        mostrarResultado(valorBruto, valorLiquido, retencion);
    });
});
