document.addEventListener('DOMContentLoaded', function () {
    console.log('Módulo de aseguradoras cargado');
    showSection('register'); // Mostrar por defecto el formulario de registro
});

function showSection(section) {
    const formContainer = document.getElementById('form-container2');
    formContainer.innerHTML = ''; // Limpiar el contenido del formulario

    let formHtml = '';

    switch (section) {
        case 'register':
            formHtml = `
                <h3>Registrar Aseguradora</h3>
                <form id="register-form">
                    <div id="insurance-fields"></div>
                    <button type="submit">Registrar</button>
                </form>
            `;
            break;
        case 'consult':
            formHtml = `
                <h3>Consultar Aseguradora</h3>
                <form id="consult-form">
                    <label for="searchId">Ingrese Cédula/RUC:</label>
                    <input type="text" id="searchId" name="searchId" placeholder="Ingrese la cédula o RUC">
                    <button type="button" onclick="consultInsurance()">Consultar</button>
                    <div id="insurance-fields"></div>
                </form>
            `;
            break;
        case 'update':
            formHtml = `
                <h3>Actualizar Aseguradora</h3>
                <form id="update-form">
                    <label for="searchId">Ingrese Nombre Aseguradora:</label>
                    <input type="text" id="searchId" name="searchId" placeholder="Ingrese el nombre de la aseguradora">
                    <button type="button" onclick="updateInsurance()">Actualizar</button>
                    <div id="insurance-fields"></div>
                </form>
            `;
            break;
    }

    formContainer.innerHTML = formHtml;
    updateForm(section); // Pasar el parámetro de sección para actualizar el formulario
}

function updateForm(section) {
    const insuranceFields = document.getElementById('insurance-fields');
    insuranceFields.innerHTML = ''; // Limpiar los campos del formulario
    let fieldsHtml = '';

    if (section === 'register' || section === 'update') {
        fieldsHtml = `
            <label for="company">Compañía de Seguros:</label>
            <input type="text" id="company" name="company" placeholder="Ingrese la compañía de seguros" required>

            <label for="insuranceType">Tipo de Seguros:</label>
            <input type="text" id="insuranceType" name="insuranceType" placeholder="Ingrese el tipo de seguro" required>

            <label for="ruc-aseguradora">RUC:</label>
            <input type="text" id="ruc-aseguradora" name="ruc-aseguradora" placeholder="Ingrese el RUC" required>

            <label for="product">Producto:</label>
            <input type="text" id="product" name="product" placeholder="Ingrese el producto" required>

            <label for="phone">Teléfono:</label>
            <input type="text" id="phone" name="phone" placeholder="Ingrese el teléfono" required>

            <label for="address">Dirección:</label>
            <input type="text" id="address" name="address" placeholder="Ingrese la dirección" required>

            <label for="email">Correo Electrónico:</label>
            <input type="email" id="email" name="email" placeholder="Ingrese el correo electrónico" required>

            <label for="startDate">Fecha de Inicio Contrato:</label>
            <input type="date" id="startDate" name="startDate" required>

            <label for="endDate">Fecha de Fin Contrato:</label>
            <input type="date" id="endDate" name="endDate" required>

            <label for="percentageComission">Porcentaje de Comisión:</label>
            <input type="text" id="percentageComission" name="percentageComission" placeholder="Ingrese el porcentaje de comisión" required>
        `;
    }

    insuranceFields.innerHTML = fieldsHtml;
}

function consultInsurance() {
    const searchId = document.getElementById('searchId').value;
    fetch(`/consultInsurance?searchId=${searchId}`)
        .then(response => response.json())
        .then(data => {
            // Aquí debes rellenar los campos del formulario con los datos recibidos
            document.getElementById('company').value = data.company;
            // Rellena los demás campos de aseguradora
        })
        .catch(error => console.error('Error al consultar Aseguradora:', error));
}

function updateInsurance() {
    const searchId = document.getElementById('searchId').value;
    fetch(`/updateInsurance?searchId=${searchId}`)
        .then(response => response.json())
        .then(data => {
            // Aquí debes rellenar los campos del formulario con los datos recibidos
            document.getElementById('company').value = data.company;
            // Rellena los demás campos de aseguradora
        })
        .catch(error => console.error('Error al actualizar Aseguradora:', error));
}
