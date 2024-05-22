// Aplicacion de objetos y Arrays
function calcularValorFreelance(datosUsuario) {
    const servicios = [datosUsuario.desarrollo, datosUsuario.ads, datosUsuario.seo, datosUsuario.diseno, datosUsuario.copy, datosUsuario.ux, datosUsuario.ui, datosUsuario.asesoria];
    const cobrosMensuales = servicios.reduce((acc, val) => acc + val, 0);
    const horasTrabajo = datosUsuario.horasTrabajo;
    const diasTrabajo = datosUsuario.diasTrabajo;
    const horasMes = 160; // 40 horas por semana * 4 semanas
    const costoHora = cobrosMensuales / horasMes; 
    const ingresoMinimo = costoHora * horasTrabajo * diasTrabajo;
    return Math.floor(ingresoMinimo); // Redondear para obtener un número entero 
}

// Aplicación de funciones y condicionales
function mostrarResultado(nombre, valorFreelance) {
    // Calculo retención aplicada del 13.75%
    const retencion = Math.floor(valorFreelance * 0.1375);
    // Calculo valor líquido (con retención)
    const valorLiquido = valorFreelance - retencion;
    // Calculo valor bruto (sin retención)
    const valorBruto = valorFreelance + retencion;
// Generación del DOM para cargar al ejecutar el código de fomra dinámica
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

// Generación del DOM para cargar al ejecutar el código de fomra dinámica
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

    // Manejo de promesas y carga de datos desde datos.json
    fetch('./datos.json')
        .then(response => response.json())
        .then(datos => {
            document.getElementById('desarrollo').value = datos.desarrollo;
            document.getElementById('ads').value = datos.ads;
            document.getElementById('seo').value = datos.seo;
            document.getElementById('diseno').value = datos.diseno;
            document.getElementById('copy').value = datos.copy;
            document.getElementById('ux').value = datos.ux;
            document.getElementById('ui').value = datos.ui;
            document.getElementById('asesoria').value = datos.asesoria;
            document.getElementById('diasTrabajo').value = datos.diasTrabajo;
            document.getElementById('horasTrabajo').value = datos.horasTrabajo;
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});
