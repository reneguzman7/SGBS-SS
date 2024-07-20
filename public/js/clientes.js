document.addEventListener('DOMContentLoaded', function () {
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
                    <label for="searchId">Ingrese Cédula/RUC:</label>
                    <input type="text" id="searchId" name="searchId" placeholder="Ingrese la cédula o RUC">
                    <button type="button" onclick="consultClient()">Consultar</button>
                    <div id="client-fields"></div>
                </form>
            `;
            break;
        case 'update':
            formHtml = `
                  <h3>Actualizar Cliente</h3>
                <form id="update-form">
                    <label for="searchId">Ingrese Cédula/RUC:</label>
                    <input type="text" id="searchId" name="searchId" placeholder="Ingrese la cédula o RUC">
                    <button type="button" onclick="updateClient()">Actualizar</button>
                    <div id="client-fields"></div>
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
            

 <label for="company">Compañía de Seguros:</label>
        <input type="text" id="company" name="company" placeholder="Ingrese la compañía de seguros" required>

        <label for="insuranceType">Tipo de Seguro:</label>
        <input type="text" id="insuranceType" name="insuranceType" placeholder="Ingrese el tipo de seguro" required>

        <label for="product">Producto:</label>
        <input type="text" id="product" name="product" placeholder="Ingrese el producto" required>

        <label for="policy">Póliza:</label>
        <input type="text" id="policy" name="policy" placeholder="Ingrese la póliza" required>

        <label for="deductible">Deducible:</label>
        <input type="number" id="deductible" name="deductible" step="0.01" placeholder="Ingrese el deducible" required>

        <label for="startDate">Fecha de Inicio:</label>
        <input type="date" id="startDate" name="startDate" required>

        <label for="effectiveDate">Inicio Vigencia:</label>
        <input type="date" id="effectiveDate" name="effectiveDate" required>

        <label for="expiryDate">Vencimiento:</label>
        <input type="date" id="expiryDate" name="expiryDate" required>

        <label for="insuredAmount">Suma Asegurada:</label>
        <input type="number" id="insuredAmount" name="insuredAmount" step="0.01" placeholder="Ingrese la suma asegurada" required>

        <label for="clientType">Individual/Corporativo:</label>
        <select id="clientType" name="clientType" required>
            <option value="individual">Individual</option>
            <option value="corporate">Corporativo</option>
        </select>

        <label for="status">Status:</label>
        <select id="status" name="status" required>
            <option value="vigente">Vigente</option>
            <option value="cancelado">Cancelado</option>
            <option value="anulado">Anulado</option>
        </select>

        <label for="cancellationCause">Causa de Cancelación:</label>
        <input type="text" id="cancellationCause" name="cancellationCause" placeholder="Ingrese la causa de cancelación">

        <label for="insuredName">Asegurado (Nombres y Apellidos):</label>
        <input type="text" id="insuredName" name="insuredName" placeholder="Ingrese los nombres del asegurado" required>

        <label for="idNumber">Cédula/RUC:</label>
        <input type="text" id="idNumber" name="idNumber" placeholder="Ingrese la cédula o RUC" required>

        <label for="birthDate">Fecha de Nacimiento:</label>
        <input type="date" id="birthDate" name="birthDate" required>

        <label for="invoiceName">Factura a Nombre de:</label>
        <input type="text" id="invoiceName" name="invoiceName" placeholder="Ingrese el nombre para la factura" required>

        <label for="invoiceIdNumber">Cédula/RUC (factura):</label>
        <input type="text" id="invoiceIdNumber" name="invoiceIdNumber" placeholder="Ingrese la cédula o RUC para la factura" required>

        <label for="province">Provincia:</label>
        <input type="text" id="province" name="province" placeholder="Ingrese la provincia" required>

        <label for="city">Ciudad:</label>
        <input type="text" id="city" name="city" placeholder="Ingrese la ciudad" required>

        <label for="address">Dirección:</label>
        <input type="text" id="address" name="address" placeholder="Ingrese la dirección" required>

        <label for="phone1">Teléfono 1:</label>
        <input type="tel" id="phone1" name="phone1" placeholder="Ingrese el teléfono principal" required>

        <label for="phone2">Teléfono 2:</label>
        <input type="tel" id="phone2" name="phone2" placeholder="Ingrese el segundo teléfono">

        <label for="phone3">Teléfono 3:</label>
        <input type="tel" id="phone3" name="phone3" placeholder="Ingrese el tercer teléfono">

        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email" placeholder="Ingrese el correo electrónico" required>

        <label for="brand">Marca:</label>
        <input type="text" id="brand" name="brand" placeholder="Ingrese la marca" required>

        <label for="model">Modelo:</label>
        <input type="text" id="model" name="model" placeholder="Ingrese el modelo" required>

        <label for="year">Año:</label>
        <input type="number" id="year" name="year" placeholder="Ingrese el año" required>

        <label for="licensePlate">Placa:</label>
        <input type="text" id="licensePlate" name="licensePlate" placeholder="Ingrese la placa" required>

        <label for="lastDigit">Último Dígito de la Placa:</label>
        <input type="text" id="lastDigit" name="lastDigit" placeholder="Ingrese el último dígito de la placa" required>

        <label for="enrollmentForm">Formulario de Vinculación/Enrolamiento:</label>
        <select id="enrollmentForm" name="enrollmentForm" required>
            <option value="yes">Sí</option>
            <option value="no">No</option>
        </select>

        <label for="debitAuthorization">Autorización de Débito:</label>
        <select id="debitAuthorization" name="debitAuthorization" required>
            <option value="yes">Sí</option>
            <option value="no">No</option>
        </select>

        <label for="signedPolicy">Póliza Firmada:</label>
        <select id="signedPolicy" name="signedPolicy" required>
            <option value="yes">Sí</option>
            <option value="no">No</option>
        </select>
        `;
    } else if (clientType === 'juridico') {
        fieldsHtml = `
            <label for="company-name">Nombre de la Empresa:</label>
            <input type="text" id="company-name" name="company-name" placeholder="Ingrese el nombre de la empresa" required><br>
            <label for="ruc">RUC:</label>
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

function consultClient() {
    const searchId = document.getElementById('searchId').value;
    fetch(`/consultClient?searchId=${searchId}`)
        .then(response => response.json())
        .then(data => {
            // Aquí debes rellenar los campos del formulario con los datos recibidos
            document.getElementById('company').value = data.company;
            // Rellena los demás campos de cliente natural o jurídico
        })
        .catch(error => console.error('Error al consultar cliente:', error));
}

function updateClient() {
    const searchId = document.getElementById('searchId').value;
    fetch(`/updateClient?searchId=${searchId}`)
        .then(response => response.json())
        .then(data => {
            // Aquí debes rellenar los campos del formulario con los datos recibidos
            document.getElementById('company').value = data.company;
            // Rellena los demás campos de cliente natural o jurídico
        })
        .catch(error => console.error('Error al consultar cliente:', error));
}