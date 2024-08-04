document.addEventListener('DOMContentLoaded', () => {
    console.log('Módulo de Clientes cargado');
    showForm('register'); // Mostrar por defecto el formulario de registro
  });
  
  function showForm(formType) {
    const forms = {
      register: document.getElementById('register-form'),
      consult: document.getElementById('consult-form'),
      update: document.getElementById('update-form')
    };
  
    Object.values(forms).forEach(form => form.classList.add('hidden'));
  
    if (forms[formType]) {
      forms[formType].classList.remove('hidden');
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
        updateFields.innerHTML = generateUpdateForm(data);
      })
      .catch(error => console.error('Error al actualizar cliente:', error));
  }
  
  function generateUpdateForm(data) {
    return `
      <div>
        <label for="company" class="block text-gray-700 font-semibold mb-2">Compañía de Seguros:</label>
        <input type="text" id="company" name="company" placeholder="Ingrese la compañía de seguros" value="${data.company}" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      <div>
        <label for="insuranceType" class="block text-gray-700 font-semibold mb-2">Tipo de Seguro:</label>
        <input type="text" id="insuranceType" name="insuranceType" placeholder="Ingrese el tipo de seguro" value="${data.insuranceType}" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      <div>
        <label for="product" class="block text-gray-700 font-semibold mb-2">Producto:</label>
        <input type="text" id="product" name="product" placeholder="Ingrese el producto" value="${data.product}" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      <div>
        <label for="policy" class="block text-gray-700 font-semibold mb-2">Póliza:</label>
        <input type="text" id="policy" name="policy" placeholder="Ingrese la póliza" value="${data.policy}" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
      <div>
        <label for="deductible" class="block text-gray-700 font-semibold mb-2">Deducible:</label>
        <input type="number" id="deductible" name="deductible" step="0.01" placeholder="Ingrese el deducible" value="${data.deductible}" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
      </div>
    `;
  }
  
  document.getElementById('cedula').addEventListener('input', validateCedula);
  document.getElementById('ruc').addEventListener('input', validateRUC);
  
  function validateCedula() {
    const cedula = document.getElementById('cedula').value;
    const cedulaError = document.getElementById('cedulaError');
    if (cedula.length !== 10) {
      cedulaError.textContent = 'La cédula debe tener 10 dígitos';
      return;
    }
    const ultimo_digito = cedula.substring(9, 10);
    const pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));
    let impares = 0;
    [0, 2, 4, 6, 8].forEach(i => {
      let num = parseInt(cedula.substring(i, i + 1)) * 2;
      if (num > 9) num -= 9;
      impares += num;
    });
    const suma_total = pares + impares;
    const primer_digito_suma = String(suma_total).substring(0, 1);
    const decena = (parseInt(primer_digito_suma) + 1) * 10;
    let digito_validador = decena - suma_total;
    if (digito_validador === 10) digito_validador = 0;
    if (digito_validador === parseInt(ultimo_digito)) {
      cedulaError.textContent = '';
    } else {
      cedulaError.textContent = 'La cédula es incorrecta';
    }
  }
  
  function validateRUC() {
    const ruc = document.getElementById('ruc').value;
    const rucError = document.getElementById('rucError');
    if (ruc.length !== 13 || ruc.substring(10, 13) !== '001') {
      rucError.textContent = 'El RUC es incorrecto';
    } else {
      rucError.textContent = '';
    }
  }