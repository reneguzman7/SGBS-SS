document.addEventListener('DOMContentLoaded', function () {
    console.log('Módulo de Manejo de Incidentes cargado');
    showSection('register'); // Mostrar por defecto el formulario de registro
});

function showSection(section) {
    const formContainer = document.getElementById('form-container1');
    formContainer.innerHTML = ''; // Limpiar el contenido del formulario

    let formHtml = '';

    switch (section) {
        case 'register':
            formHtml = `
                <h3>Registrar Incidente</h3>
                <form id="register-form">
                    <div id="incidentFields"></div>
                    <button type="submit">Registrar</button>
                </form>
            `;
            break;
        case 'consult':
            formHtml = `
                <h3>Consultar Incidente</h3>
                <form id="consult-form">
                    <label for="searchId">Ingrese ID Incidente:</label>
                    <input type="text" id="searchId" name="searchId" placeholder="Ingrese el ID del incidente">
                    <button type="button" onclick="consultIncident()">Consultar</button>
                    <div id="client-fields"></div>
                </form>
            `;
            break;
        case 'update':
            formHtml = `
                <h3>Actualizar Incidente</h3>
                <form id="update-form">
                    <label for="searchId">Ingrese ID Incidente:</label>
                    <input type="text" id="searchId" name="searchId" placeholder="Ingrese el ID del incidente">
                    <button type="button" onclick="updateIncident()">Actualizar</button>
                    <div id="client-fields"></div>
                </form>
            `;
            break;
    }

    formContainer.innerHTML = formHtml;
    updateForm(section); // Pasar la sección actual a la función updateForm
}

function updateForm(section) {
    const incidentFields = document.getElementById('incidentFields');
    if (!incidentFields) return; // Si no existe, salir de la función
    incidentFields.innerHTML = ''; // Limpiar los campos del formulario
    let fieldsHtml = '';

    if (section === 'register' || section === 'update') {
        fieldsHtml = `
            <label for="id-cedula-ruc">Cédula/RUC:</label>
            <input type="text" id="id-cedula-ruc" name="id-cedula-ruc" placeholder="Ingrese la cédula o RUC" required>

            <label for="id-incident">ID Incidente:</label>
            <input type="text" id="id-incident" name="id-incident" placeholder="Ingrese el ID del incidente" required>

            <label for="description">Descripción:</label>
            <input type="text" id="description" name="description" placeholder="Ingrese la descripción" required>

            <label for="annexes">Anexos:</label>
            <input type="text" id="annexes" name="annexes" placeholder="Ingrese los anexos" required>

            <label for="date">Fecha:</label>
            <input type="date" id="date" name="date" required>

            <label for="place">Lugar:</label>
            <input type="text" id="place" name="place" placeholder="Ingrese el lugar" required>

            <label for="evidence">Evidencia:</label>
            <input type="text" id="evidence" name="evidence" placeholder="Ingrese la evidencia" required>

            <label for="incidentType">Tipo de Incidente:</label>
            <input type="text" id="incidentType" name="incidentType" placeholder="Ingrese el tipo de incidente" required>

            <label for="statusIncident">Estado del Incidente:</label>
            <input type="text" id="statusIncident" name="statusIncident" placeholder="Ingrese el estado del incidente" required>
        `;
    }

    incidentFields.innerHTML = fieldsHtml;
}

function consultIncident() {
    const searchId = document.getElementById('searchId').value;
    fetch(`/consultIncident?searchId=${searchId}`)
        .then(response => response.json())
        .then(data => {
            // Aquí debes rellenar los campos del formulario con los datos recibidos
            document.getElementById('id-cedula-ruc').value = data.idCedulaRuc;
            document.getElementById('id-incident').value = data.idIncident;
            document.getElementById('description').value = data.description;
            document.getElementById('annexes').value = data.annexes;
            document.getElementById('date').value = data.date;
            document.getElementById('place').value = data.place;
            document.getElementById('evidence').value = data.evidence;
            document.getElementById('incidentType').value = data.incidentType;
            document.getElementById('statusIncident').value = data.statusIncident;
        })
        .catch(error => console.error('Error al consultar incidente:', error));
}

function updateIncident() {
    const searchId = document.getElementById('searchId').value;
    fetch(`/updateIncident?searchId=${searchId}`)
        .then(response => response.json())
        .then(data => {
            // Aquí debes rellenar los campos del formulario con los datos recibidos
            document.getElementById('id-cedula-ruc').value = data.idCedulaRuc;
            document.getElementById('id-incident').value = data.idIncident;
            document.getElementById('description').value = data.description;
            document.getElementById('annexes').value = data.annexes;
            document.getElementById('date').value = data.date;
            document.getElementById('place').value = data.place;
            document.getElementById('evidence').value = data.evidence;
            document.getElementById('incidentType').value = data.incidentType;
            document.getElementById('statusIncident').value = data.statusIncident;
        })
        .catch(error => console.error('Error al actualizar incidente:', error));
}
