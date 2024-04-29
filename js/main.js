// Función para calcular el valor de trabajo freelance
function calcularValorFreelance(datosUsuario) {
    const cobrosMensuales = datosUsuario.desarrollo + datosUsuario.ads + datosUsuario.seo + datosUsuario.diseno + datosUsuario.copy + datosUsuario.ux + datosUsuario.ui + datosUsuario.asesoria;
    const horasTrabajo = datosUsuario.horasTrabajo;
    const diasTrabajo = datosUsuario.diasTrabajo;
    const horasMes = 160; // 40 horas por semana * 4 semanas
    const costoHora = cobrosMensuales / horasMes; 
    const ingresoMinimo = costoHora * horasTrabajo * diasTrabajo;
    return Math.floor(ingresoMinimo); // Redondear para obtener un número entero
}

// Función para mostrar el resultado con SweetAlert
function mostrarResultado(nombre, valorFreelance) {
    // Calcular retención aplicada del 13.75%
    const retencion = Math.floor(valorFreelance * 0.1375);
    // Calcular valor líquido (con retención)
    const valorLiquido = valorFreelance - retencion;
    // Calcular valor bruto (sin retención)
    const valorBruto = valorFreelance + retencion;

    Swal.fire({
        title: 'Resultado',
        html: `
        <h3>VALOR LIQUIDO</h3>
        <p>${nombre}, debes hacer la Boleta por: $${valorLiquido}</p>
        <p>Recibirás un pago de: $${valorFreelance}</p>
        <p>Retención SII: $${retencion}</p>
        <h3>VALOR BRUTO</h3>
        <p>${nombre}, debes hacer la Boleta por: $${valorBruto}</p>
        <p>Recibirás un pago de: $${valorFreelance}</p>
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
        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let email = document.getElementById('email').value;
        let desarrollo = parseFloat(document.getElementById('desarrollo').value);
        let ads = parseFloat(document.getElementById('ads').value);
        let seo = parseFloat(document.getElementById('seo').value);
        let diseno = parseFloat(document.getElementById('diseno').value);
        let copy = parseFloat(document.getElementById('copy').value);
        let ux = parseFloat(document.getElementById('ux').value);
        let ui = parseFloat(document.getElementById('ui').value);
        let asesoria = parseFloat(document.getElementById('asesoria').value);
        let diasTrabajo = parseInt(document.getElementById('diasTrabajo').value);
        let horasTrabajo = parseInt(document.getElementById('horasTrabajo').value);

        // Crear objeto con los datos del usuario
        let datosUsuario = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            desarrollo: desarrollo,
            ads: ads,
            seo: seo,
            diseno: diseno,
            copy: copy,
            ux: ux,
            ui: ui,
            asesoria: asesoria,
            diasTrabajo: diasTrabajo,
            horasTrabajo: horasTrabajo
        };

        // Calcular valor de trabajo freelance
        let valorFreelance = calcularValorFreelance(datosUsuario);
        mostrarResultado(nombre, valorFreelance);
    });
});
