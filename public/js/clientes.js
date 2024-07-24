document.addEventListener('DOMContentLoaded', function () {
    console.log('Módulo de Clientes cargado');
    showSection('register'); // Mostrar por defecto el formulario de registro
});

function showForm(formType) {
    const registerForm = document.getElementById('register-form');
    const consultForm = document.getElementById('consult-form');
    const updateForm = document.getElementById('update-form');

    registerForm.classList.add('hidden');
    consultForm.classList.add('hidden');
    updateForm.classList.add('hidden');

    switch (formType) {
        case 'register':
            registerForm.classList.remove('hidden');
            break;
        case 'consult':
            consultForm.classList.remove('hidden');
            break;
        case 'update':
            updateForm.classList.remove('hidden');
            break;
    }
}

function consultClient() {
    const searchId = document.getElementById('searchId-consult').value;
    fetch(`/consultClient?searchId=${searchId}`)
        .then(response => response.json())
        .then(data => {
            const consultResults = document.getElementById('consult-results');
            consultResults.innerHTML = `
                <p><strong>Nombre:</strong> ${data.name}</p>
                <p><strong>Apellido:</strong> ${data.lastname}</p>
                <p><strong>Cédula:</strong> ${data.identification}</p>
                <p><strong>Fecha de Nacimiento:</strong> ${data.birthdate}</p>
                <p><strong>Teléfono:</strong> ${data.phone}</p>
                <p><strong>Dirección:</strong> ${data.address}</p>
                <p><strong>Correo Electrónico:</strong> ${data.email}</p>
            `;
        })
        .catch(error => console.error('Error al consultar cliente:', error));
}

function updateClient() {
    const searchId = document.getElementById('searchId-update').value;
    fetch(`/updateClient?searchId=${searchId}`)
        .then(response => response.json())
        .then(data => {
            const updateFields = document.getElementById('update-fields');
            updateFields.innerHTML = `
                <div>
        <label for="company" class="block text-gray-700 font-semibold mb-2">Compañía de Seguros:</label>
        <input type="text" id="company" name="company" placeholder="Ingrese la compañía de seguros" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="insuranceType" class="block text-gray-700 font-semibold mb-2">Tipo de Seguro:</label>
        <input type="text" id="insuranceType" name="insuranceType" placeholder="Ingrese el tipo de seguro" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="product" class="block text-gray-700 font-semibold mb-2">Producto:</label>
        <input type="text" id="product" name="product" placeholder="Ingrese el producto" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="policy" class="block text-gray-700 font-semibold mb-2">Póliza:</label>
        <input type="text" id="policy" name="policy" placeholder="Ingrese la póliza" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="deductible" class="block text-gray-700 font-semibold mb-2">Deducible:</label>
        <input type="number" id="deductible" name="deductible" step="0.01" placeholder="Ingrese el deducible" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="startDate" class="block text-gray-700 font-semibold mb-2">Fecha de Inicio:</label>
        <input type="date" id="startDate" name="startDate" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="effectiveDate" class="block text-gray-700 font-semibold mb-2">Inicio Vigencia:</label>
        <input type="date" id="effectiveDate" name="effectiveDate" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="expiryDate" class="block text-gray-700 font-semibold mb-2">Vencimiento:</label>
        <input type="date" id="expiryDate" name="expiryDate" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="insuredAmount" class="block text-gray-700 font-semibold mb-2">Suma Asegurada:</label>
        <input type="number" id="insuredAmount" name="insuredAmount" step="0.01" placeholder="Ingrese la suma asegurada" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="clientType" class="block text-gray-700 font-semibold mb-2">Individual/Corporativo:</label>
        <select id="clientType" name="clientType" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
          <option value="individual">Individual</option>
          <option value="corporate">Corporativo</option>
        </select>
      </div>
      
      <div>
        <label for="status" class="block text-gray-700 font-semibold mb-2">Status:</label>
        <select id="status" name="status" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
          <option value="vigente">Vigente</option>
          <option value="cancelado">Cancelado</option>
          <option value="anulado">Anulado</option>
        </select>
      </div>
      
      <div>
        <label for="cancellationCause" class="block text-gray-700 font-semibold mb-2">Causa de Cancelación:</label>
        <input type="text" id="cancellationCause" name="cancellationCause" placeholder="Ingrese la causa de cancelación" class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="insuredName" class="block text-gray-700 font-semibold mb-2">Asegurado (Nombres y Apellidos):</label>
        <input type="text" id="insuredName" name="insuredName" placeholder="Ingrese los nombres del asegurado" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="idNumber" class="block text-gray-700 font-semibold mb-2">Cédula/RUC:</label>
        <input type="text" id="idNumber" name="idNumber" placeholder="Ingrese la cédula o RUC" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="birthDate" class="block text-gray-700 font-semibold mb-2">Fecha de Nacimiento:</label>
        <input type="date" id="birthDate" name="birthDate" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="invoiceName" class="block text-gray-700 font-semibold mb-2">Factura a Nombre de:</label>
        <input type="text" id="invoiceName" name="invoiceName" placeholder="Ingrese el nombre para la factura" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="invoiceIdNumber" class="block text-gray-700 font-semibold mb-2">Cédula/RUC (factura):</label>
        <input type="text" id="invoiceIdNumber" name="invoiceIdNumber" placeholder="Ingrese la cédula o RUC para la factura" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="province" class="block text-gray-700 font-semibold mb-2">Provincia:</label>
        <input type="text" id="province" name="province" placeholder="Ingrese la provincia" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="city" class="block text-gray-700 font-semibold mb-2">Ciudad:</label>
        <input type="text" id="city" name="city" placeholder="Ingrese la ciudad" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="address" class="block text-gray-700 font-semibold mb-2">Dirección:</label>
        <input type="text" id="address" name="address" placeholder="Ingrese la dirección" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="phone1" class="block text-gray-700 font-semibold mb-2">Teléfono 1:</label>
        <input type="tel" id="phone1" name="phone1" placeholder="Ingrese el teléfono principal" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="phone2" class="block text-gray-700 font-semibold mb-2">Teléfono 2:</label>
        <input type="tel" id="phone2" name="phone2" placeholder="Ingrese el segundo teléfono" class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="phone3" class="block text-gray-700 font-semibold mb-2">Teléfono 3:</label>
        <input type="tel" id="phone3" name="phone3" placeholder="Ingrese el tercer teléfono" class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="email" class="block text-gray-700 font-semibold mb-2">Correo Electrónico:</label>
        <input type="email" id="email" name="email" placeholder="Ingrese el correo electrónico" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="brand" class="block text-gray-700 font-semibold mb-2">Marca:</label>
        <input type="text" id="brand" name="brand" placeholder="Ingrese la marca" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="model" class="block text-gray-700 font-semibold mb-2">Modelo:</label>
        <input type="text" id="model" name="model" placeholder="Ingrese el modelo" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="year" class="block text-gray-700 font-semibold mb-2">Año:</label>
        <input type="number" id="year" name="year" placeholder="Ingrese el año" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="licensePlate" class="block text-gray-700 font-semibold mb-2">Placa:</label>
        <input type="text" id="licensePlate" name="licensePlate" placeholder="Ingrese la placa" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="lastDigit" class="block text-gray-700 font-semibold mb-2">Último Dígito de la Placa:</label>
        <input type="text" id="lastDigit" name="lastDigit" placeholder="Ingrese el último dígito de la placa" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      
      <div>
        <label for="enrollmentForm" class="block text-gray-700 font-semibold mb-2">Formulario de Vinculación/Enrolamiento:</label>
        <select id="enrollmentForm" name="enrollmentForm" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
          <option value="yes">Sí</option>
          <option value="no">No</option>
        </select>
      </div>
      
      <div>
        <label for="debitAuthorization" class="block text-gray-700 font-semibold mb-2">Autorización de Débito:</label>
        <select id="debitAuthorization" name="debitAuthorization" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
          <option value="yes">Sí</option>
          <option value="no">No</option>
        </select>
      </div>
      
      <div>
        <label for="signedPolicy" class="block text-gray-700 font-semibold mb-2">Póliza Firmada:</label>
        <select id="signedPolicy" name="signedPolicy" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
          <option value="yes">Sí</option>
          <option value="no">No</option>
        </select>
      </div>
`;

        })
        .catch(error => console.error('Error al consultar cliente:', error));

    }