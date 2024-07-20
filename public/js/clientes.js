document.addEventListener('DOMContentLoaded', function() {
    console.log('Módulo de Clientes cargado');
    showSection('register'); // Mostrar por defecto el formulario de registro
});

function showSection(section) {
    const formContainer = document.getElementById('form-container');
    formContainer.innerHTML = ''; // Limpiar el contenido del formulario

    let formHtml = '';

    switch (section) {
        case 'register':
            formHtml = `
                <h3>Registrar Cliente</h3>
                <form id="register-form">
                    <div id="client-fields"></div>
                    <button type="submit">Registrar</button>
                </form>
            `;
            break;
        case 'consult':
            formHtml = `
                <h3>Consultar Cliente</h3>
                <form id="consult-form">
                    <div id="client-fields"></div>
                    <button type="submit">Consultar</button>
                </form>
            `;
            break;
        case 'update':
            formHtml = `
                <h3>Actualizar Cliente</h3>
                <form id="update-form">
                    <div id="client-fields"></div>
                    <button type="submit">Actualizar</button>
                </form>
            `;
            break;
    }

    formContainer.innerHTML = formHtml;
    updateForm(); // Actualizar el formulario según el tipo de cliente seleccionado
}

function updateForm() {
    const clientType = document.getElementById('client-type').value;
    const clientFields = document.getElementById('client-fields');
    clientFields.innerHTML = ''; // Limpiar los campos del formulario
    let fieldsHtml = '';
    if (clientType === 'natural') {
        fieldsHtml = `
            <label for="nombres">Nombres:</label>
            <input type="text" id="nombres" name="nombres" placeholder="Ingrese sus nombres" required><br>
            <label for="apellidos">Apellidos:</label>
            <input type="text" id="apellidos" name="apellidos" placeholder="Ingrese sus apellidos" required><br>
            <label for="fechaNacimiento">Fecha de Nacimiento:</label>
            <input type="date" id="fechaNacimiento" name="fechaNacimiento" required><br>
            <label for="ciudadResidencia">Ciudad de Residencia:</label>
            <input type="text" id="ciudadResidencia" name="ciudadResidencia" placeholder="Ingrese su ciudad de residencia" required><br>
            <label for="tipoDocumento">Tipo de Documento:</label>
            <select name="tipoDocumento" id="tipoDocumento">
                <option value="Cedula de Ciudadania">Cédula de Ciudadanía</option>
                <option value="Pasaporte">Pasaporte</option>
            </select><br>
            <label for="numeroDocumento">Número de Documento:</label>
            <input type="text" id="numeroDocumento" name="numeroDocumento" placeholder="Ingrese su número de documento" required><br>
            <label for="genero">Género:</label>
            <select name="genero" id="genero">
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
            </select><br>
            <label for="numeroTelefono">Número de Teléfono:</label>
            <input type="text" id="numeroTelefono" name="numeroTelefono" placeholder="Ingrese su número de teléfono" required><br>
            <label for="correoElectronico">Correo Electrónico:</label>
            <input type="email" id="correoElectronico" name="correoElectronico" placeholder="Ingrese su correo electrónico" required><br>
            <label for="direccion">Dirección:</label>
            <input type="text" id="direccion" name="direccion" placeholder="Ingrese su dirección" required><br>
            <label for="tipoSeguro">Tipo de Seguro:</label>
            <select name="tipoSeguro" id="tipoSeguro">
                <option value="Salud">Salud</option>
                <option value="Vida">Vida</option>
                <option value="Hogar">Hogar</option>
                <option value="Vehiculo">Vehículo</option>
            </select><br>
            <label for="nombreAseguradora">Nombre Aseguradora:</label>
            <select name="nombreAseguradora" id="nombreAseguradora">
                <option value="Sura">Sura</option>
                <option value="Colpatria">Colpatria</option>
                <option value="Liberty">Liberty</option>
                <option value="Allianz">Allianz</option>
            </select><br>
            <label for="codigoContrato">Código de Contrato:</label>
            <input type="text" id="codigoContrato" name="codigoContrato" placeholder="Ingrese el código de contrato" required><br>
            <label for="fechaInicio">Fecha de Inicio:</label>
            <input type="date" id="fechaInicio" name="fechaInicio" required><br>
            <label for="fechaFin">Fecha de Fin:</label>
            <input type="date" id="fechaFin" name="fechaFin" required><br>
        `;
    } else if (clientType === 'juridico') {
        fieldsHtml = `
            <label for="company-name">Nombre de la Empresa:</label>
            <input type="text" id="company-name" name="company-name" placeholder="Ingrese el nombre de la empresa" required><br>
            <label for="registration-number">Número de Registro:</label>
            <input type="text" id="registration-number" name="registration-number" placeholder="Ingrese el número de registro" required><br>
            <label for="contact-person">Persona de Contacto:</label>
            <input type="text" id="contact-person" name="contact-person" placeholder="Ingrese la persona de contacto" required><br>
            <label for="phone-number">Número de Teléfono:</label>
            <input type="text" id="phone-number" name="phone-number" placeholder="Ingrese el número de teléfono" required><br>
            <label for="email">Correo Electrónico:</label>
            <input type="email" id="email" name="email" placeholder="Ingrese el correo electrónico" required><br>
            <label for="address">Dirección:</label>
            <input type="text" id="address" name="address" placeholder="Ingrese la dirección" required><br>
        `;
    }
    clientFields.innerHTML = fieldsHtml;
}