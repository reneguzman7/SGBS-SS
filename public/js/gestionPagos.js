document.addEventListener('DOMContentLoaded', function () {
    console.log('Módulo de gestión de pagos cargado');
    showSection('register'); // Mostrar por defecto el formulario de registro
});

let currentSection = 'register'; // Variable para mantener la sección actual

function showSection(section) {
    currentSection = section; // Actualizar la sección actual
    const formContainer = document.getElementById('form-container5');
    formContainer.innerHTML = ''; // Limpiar el contenido del formulario

    let formHtml = '';

    switch (section) {
        case 'register':
            formHtml = `
                <h3>Registrar Pago</h3>
                <form id="register-form">
                    <div id="payment-fields"></div>
                    <button type="submit">Registrar</button>
                </form>
            `;
            break;
        case 'consult':
            formHtml = `
                <h3>Consultar Pago</h3>
                <form id="consult-form">
                    <label for="searchId">Ingrese Cédula/RUC:</label>
                    <input type="text" id="searchId" name="searchId" placeholder="Ingrese la cédula o RUC">
                    <button type="button" onclick="consultPayments()">Consultar</button>
                    <div id="payment-fields"></div>
                </form>
            `;
            break;
    }

    formContainer.innerHTML = formHtml;
    updateForm(section); // Pasar el parámetro de sección para actualizar el formulario
}

function updateForm(section) {
    const paymentFields = document.getElementById('payment-fields');
    paymentFields.innerHTML = ''; // Limpiar los campos del formulario
    let fieldsHtml = '';

    if (section === 'register' || section === 'consult') {
        fieldsHtml = `
            <label for="RUC">RUC:</label>
            <input type="text" id="RUC" name="RUC" placeholder="Ingrese el RUC" required>

            <label for="amount">Monto:</label>
            <input type="text" id="amount" name="amount" placeholder="Ingrese el monto" required>

            <label for="contractNumber">Número de Contrato:</label>
            <input type="text" id="contractNumber" name="contractNumber" placeholder="Ingrese el número de contrato" required>
        `;
    }

    paymentFields.innerHTML = fieldsHtml;
}

function consultPayments() {
    const searchId = document.getElementById('searchId').value;
    fetch(`/consultPayments?searchId=${searchId}`)
        .then(response => response.json())
        .then(data => {
            // Aquí debes rellenar los campos del formulario con los datos recibidos
            document.getElementById('RUC').value = data.RUC;
            document.getElementById('amount').value = data.amount;
            document.getElementById('contractNumber').value = data.contractNumber;
        })
        .catch(error => console.error('Error al consultar Pagos:', error));
}
