document.addEventListener("DOMContentLoaded", function () {
  console.log("Módulo de aseguradoras cargado");
  showForm("register"); // Mostrar por defecto el formulario de registro
});

function showForm(formType) {
  const registerForm = document.getElementById("register-form");
  const consultForm = document.getElementById("consult-form");
  const updateForm = document.getElementById("update-form");

  registerForm.classList.add("hidden");
  consultForm.classList.add("hidden");
  updateForm.classList.add("hidden");

  switch (formType) {
    case "register":
      registerForm.classList.remove("hidden");
      break;
    case "consult":
      consultForm.classList.remove("hidden");
      break;
    case "update":
      updateForm.classList.remove("hidden");
      break;
  }
}

function consultInsurance() {
  const searchId = document.getElementById("searchId-consult").value;
  if (!searchId) {
    alert('Por favor ingrese un RUC o cédula');
    return;
  }
  fetch(`/consultInsurance?searchId=${searchId}`)
    .then((response) => response.json())
    .then((data) => {
      // Populate the table body with id 'insurance-details'
      const detailsBody = document.getElementById('insurance-details');
      if (!data || data.error) {
        detailsBody.innerHTML = `<tr><td colspan='2'>No se encontró la aseguradora</td></tr>`;
        document.getElementById('consult-results').style.display = 'block';
        return;
      }
      detailsBody.innerHTML = `
        <tr><td><strong>Compañía</strong></td><td>${data.company || ''}</td></tr>
        <tr><td><strong>Tipo de Seguros</strong></td><td>${data.insuranceType || ''}</td></tr>
        <tr><td><strong>RUC</strong></td><td>${data.ruc || ''}</td></tr>
        <tr><td><strong>Producto</strong></td><td>${data.product || ''}</td></tr>
        <tr><td><strong>Teléfono</strong></td><td>${data.phone || ''}</td></tr>
        <tr><td><strong>Dirección</strong></td><td>${data.address || ''}</td></tr>
        <tr><td><strong>Correo Electrónico</strong></td><td>${data.email || ''}</td></tr>
        <tr><td><strong>Fecha de Inicio Contrato</strong></td><td>${data.startDate || ''}</td></tr>
        <tr><td><strong>Fecha de Fin Contrato</strong></td><td>${data.endDate || ''}</td></tr>
        <tr><td><strong>Porcentaje de Comisión</strong></td><td>${data.percentageComission || ''}</td></tr>
        <tr><td><strong>Estado</strong></td><td>${data.status || ''}</td></tr>
      `;
      document.getElementById('consult-results').style.display = 'block';
    })
    .catch((error) => {
      const detailsBody = document.getElementById('insurance-details');
      detailsBody.innerHTML = `<tr><td colspan='2'>Error al consultar aseguradora</td></tr>`;
      document.getElementById('consult-results').style.display = 'block';
      console.error("Error al consultar Aseguradora:", error);
    });
}

function updateInsurance() {
  const searchId = document.getElementById("searchId-update").value;
  fetch(`/updateInsurance?searchId=${searchId}`)
    .then((response) => response.json())
    .then((data) => {
      const updateFields = document.getElementById("update-fields");
      updateFields.innerHTML = `
                <div>
                    <label for="company-update" class="block text-gray-700 font-semibold mb-2">Compañía de Seguros:</label>
                    <input type="text" id="company-update" name="company" value="${data.company}" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                </div>
                <div>
                    <label for="insuranceType-update" class="block text-gray-700 font-semibold mb-2">Tipo de Seguros:</label>
                    <input type="text" id="insuranceType-update" name="insuranceType" value="${data.insuranceType}" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                </div>
                <div>
                    <label for="ruc-update" class="block text-gray-700 font-semibold mb-2">RUC:</label>
                    <input type="text" id="ruc-update" name="ruc" value="${data.ruc}" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                </div>
                <div>
                    <label for="product-update" class="block text-gray-700 font-semibold mb-2">Producto:</label>
                    <input type="text" id="product-update" name="product" value="${data.product}" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                </div>
                <div>
                    <label for="phone-update" class="block text-gray-700 font-semibold mb-2">Teléfono:</label>
                    <input type="text" id="phone-update" name="phone" value="${data.phone}" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                </div>
                <div>
                    <label for="address-update" class="block text-gray-700 font-semibold mb-2">Dirección:</label>
                    <input type="text" id="address-update" name="address" value="${data.address}" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                </div>
                <div>
                    <label for="email-update" class="block text-gray-700 font-semibold mb-2">Correo Electrónico:</label>
                    <input type="email" id="email-update" name="email" value="${data.email}" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                </div>
                <div>
                    <label for="startDate-update" class="block text-gray-700 font-semibold mb-2">Fecha de Inicio Contrato:</label>
                    <input type="date" id="startDate-update" name="startDate" value="${data.startDate}" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                </div>
                <div>
                    <label for="endDate-update" class="block text-gray-700 font-semibold mb-2">Fecha de Fin Contrato:</label>
                    <input type="date" id="endDate-update" name="endDate" value="${data.endDate}" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                </div>
                <div>
                    <label for="percentageComission-update" class="block text-gray-700 font-semibold mb-2">Porcentaje de Comisión:</label>
                    <input type="text" id="percentageComission-update" name="percentageComission" value="${data.percentageComission}" required class="block w-full bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                </div>
            `;
    })
    .catch((error) => console.error("Error al actualizar Aseguradora:", error));
}
