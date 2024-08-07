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
  fetch(`/consultInsurance?searchId=${searchId}`)
    .then((response) => response.json())
    .then((data) => {
      const consultResults = document.getElementById("consult-results");
      consultResults.innerHTML = `
                <p><strong>Compañía de Seguros:</strong> ${data.company}</p>
                <p><strong>Tipo de Seguros:</strong> ${data.insuranceType}</p>
                <p><strong>RUC:</strong> ${data.ruc}</p>
                <p><strong>Producto:</strong> ${data.product}</p>
                <p><strong>Teléfono:</strong> ${data.phone}</p>
                <p><strong>Dirección:</strong> ${data.address}</p>
                <p><strong>Correo Electrónico:</strong> ${data.email}</p>
                <p><strong>Fecha de Inicio Contrato:</strong> ${data.startDate}</p>
                <p><strong>Fecha de Fin Contrato:</strong> ${data.endDate}</p>
                <p><strong>Porcentaje de Comisión:</strong> ${data.percentageComission}</p>
            `;
    })
    .catch((error) => console.error("Error al consultar Aseguradora:", error));
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
