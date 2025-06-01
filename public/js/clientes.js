let currentUpdatingClientId = null;

// Función para mostrar un formulario y ocultar los demás, incluyendo secciones específicas
function showForm(formType) {
  resetForm(); // Call reset first to ensure a clean state

  let formToShow = null;
  if (formType === 'register') {
    formToShow = document.getElementById('register-form');
  } else if (formType === 'consult') {
    formToShow = document.getElementById('consult-form');
  } else if (formType === 'update') {
    formToShow = document.getElementById('update-form');
  }

  if (formToShow) {
    formToShow.classList.remove('hidden');
    formToShow.style.display = 'block';
    formToShow.scrollIntoView({ behavior: "smooth" });
  }
}

// Función para resetear y ocultar todos los formularios y limpiar datos de los divs
function resetForm() {
  // Hide all main forms
  const formsToHide = ['register-form', 'consult-form', 'update-form'];
  formsToHide.forEach(formId => {
    const formElement = document.getElementById(formId);
    if (formElement) {
      formElement.classList.add('hidden');
      formElement.style.display = 'none';
    }
  });

  // Reset cliente-form (the actual form tag)
  const clienteForm = document.getElementById('cliente-form');
  if (clienteForm) {
    clienteForm.reset(); // Reset values

    // Re-enable all fields and make them writable
    const elements = clienteForm.elements;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.tagName === 'SELECT' || element.tagName === 'BUTTON') {
        element.disabled = false;
      } else {
        element.readOnly = false;
      }
      // Ensure documentoidentidad is writable
      if (element.id === 'documentoidentidad') {
        element.readOnly = false;
      }
    }

    // Set default button visibility for cliente-form
    const guardarButton = document.getElementById('guardar');
    if (guardarButton) {
      guardarButton.style.display = 'inline-block'; // Or 'block'
    }
    const updateButton = document.getElementById('update-button');
    if (updateButton) {
      updateButton.style.display = 'none';
    }
    const cancelarButtonClienteForm = document.querySelector('#cliente-form .ss-btn-outline');
    if (cancelarButtonClienteForm) {
      cancelarButtonClienteForm.style.display = 'inline-block'; // Or 'block'
    }
  }

  // Obsolete sections cleanup can be removed if HTML is also cleaned
  // const consultSection = document.getElementById('consult-section');
  // if (consultSection) { ... }
  // const updateFields = document.getElementById('update-fields');
  // if (updateFields) { ... }
  // const consultResults = document.getElementById('consult-results');
  // if (consultResults) { ... }

  // Limpiar cualquier otro div que pueda tener datos persistentes (if any remain relevant)
  // For now, this can be kept if .data-container is still used elsewhere, otherwise review.
  document.querySelectorAll('.data-container').forEach(div => {
    div.innerHTML = ''; // Limpiar el contenido de los divs
  });
}

// Función para manejar el cambio de módulo
function changeModule(formType) {
  // Limpia todos los formularios y datos
  resetForm();

  // Muestra el formulario correspondiente
  showForm(formType);
}

// Registrar un cliente
document.getElementById("guardar").addEventListener("click", function () {
  // Obtener los valores de los campos del formulario
  const documentoidentidad = document.getElementById("documentoidentidad").value;
  const nombrecompleto = document.getElementById("nombrecompleto").value;
  const correo = document.getElementById("correo").value;
  const tipocliente = document.getElementById("tipocliente").value;
  const ciudad = document.getElementById("ciudad").value;
  const direccion = document.getElementById("direccion").value;
  const telefonoaseguradora = document.getElementById("telefonoaseguradora").value;
  const aseguradora = document.getElementById("company-register").value;
  const tiposeguro = document.getElementById("insuranceType-register").value;
  const producto = document.getElementById("product-register").value;
  const poliza = document.getElementById("poliza").value;
  const deducible = parseFloat(document.getElementById("deducible").value) || 0.0;
  const fechainicio = document.getElementById("fechainicio").value;
  const fechainiciovigencia = document.getElementById("fechainiciovigencia").value || fechainicio;
  const fechavencimientopoliza = document.getElementById("fechavencimientopoliza").value;
  const tipo = document.getElementById("tipo").value || "N/A";
  const status = document.getElementById("status").value || "Activo";
  const causacancelacion = document.getElementById("causacancelacion").value || null;
  const fechacancelacion = document.getElementById("fechacancelacion").value || null;
  const observaciones = document.getElementById("observaciones").value || "";

  // Validación básica
  if (!documentoidentidad || !nombrecompleto || !correo || !tipocliente || !ciudad ||
    !direccion || !telefonoaseguradora || !aseguradora || !tiposeguro || !fechainicio) {
    alert("Faltan datos obligatorios");
    return;
  }

  // Crear el objeto JSON
  const jsonData = {
    documentoidentidad,
    nombrecompleto,
    correo,
    tipocliente,
    ciudad,
    direccion,
    telefonoaseguradora,
    aseguradora,
    tiposeguro,
    producto: producto || null,
    poliza: poliza || null,
    deducible,
    fechainicio,
    fechainiciovigencia,
    fechavencimientopoliza: fechavencimientopoliza || null,
    tipo,
    status,
    causacancelacion,
    fechacancelacion,
    observaciones,
  };
  // Enviar el objeto JSON al servidor mediante POST
  fetch("/clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert("Error: " + data.error);
      } else {
        alert("Éxito: " + data.message);
        document.getElementById("cliente-form").reset();
      }
    })
    .catch((error) => {
      console.error("Error al enviar los datos:", error);
      alert("Error al enviar los datos.");
    });
});

document.querySelectorAll("button[onclick]").forEach((button) => {
  button.addEventListener("click", () => {
    const formType = button.getAttribute("onclick").split("'")[1];
    showForm(formType);
  });
});

const form = document.getElementById("cliente-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const jsonData = {};

  formData.forEach((value, key) => {
    jsonData[key] = value;
  });
  // Enviar los datos al servidor
  fetch("/clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert("Error: " + data.error);
      } else {
        alert("Éxito: " + data.message);
        form.reset();
      }
    })
    .catch((error) => {
      console.error("Error al enviar los datos:", error);
      alert("Error al enviar los datos.");
    });
});

// Consultar un cliente
document.getElementById("consultar").addEventListener("click", async () => {
  const documentoidentidad = document.getElementById("documentoidentidad-consulta").value;

  if (!documentoidentidad) {
    alert("Por favor, ingrese el documento de identidad.");
    return;
  }

  try {
    console.log(`Consultando cliente con ID: ${documentoidentidad}`); const response = await fetch(
      `/clientes/${documentoidentidad}`
    );
    console.log("Respuesta recibida:", response.status, response.statusText);

    if (!response.ok) {
      if (response.status === 404) {
        alert("Cliente no encontrado. Verifique el documento de identidad.");
        return;
      }
      throw new Error(`Error al consultar los datos: ${response.status}`);
    }

    const data = await response.json();
    console.log("Datos recibidos:", data);

    // Mostrar el formulario de registro y llenarlo con los datos
    const registerForm = document.getElementById('register-form');
    const clienteForm = document.getElementById('cliente-form');
    const consultForm = document.getElementById('consult-form');

    // Llenar los campos del formulario de registro (cliente-form)
    document.getElementById("documentoidentidad").value = data.documentoidentidad || "";
    document.getElementById("nombrecompleto").value = data.nombrecompleto || "";
    document.getElementById("correo").value = data.correo || "";
    document.getElementById("tipocliente").value = data.tipocliente || "";
    document.getElementById("ciudad").value = data.ciudad || "";
    document.getElementById("direccion").value = data.direccion || "";
    document.getElementById("telefonoaseguradora").value = data.telefonoaseguradora || "";
    document.getElementById("company-register").value = data.aseguradora || "";
    // Actualizar y deshabilitar selectores dependientes si es necesario
    // updateInsuranceTypes(data.aseguradora || ""); // Esto podría necesitar lógica adicional si se quiere pre-seleccionar y luego deshabilitar
    document.getElementById("insuranceType-register").value = data.tiposeguro || "";
    // updateProducts(data.tiposeguro || ""); // Similar para productos
    document.getElementById("product-register").value = data.producto || "";
    document.getElementById("poliza").value = data.poliza || "";
    document.getElementById("deducible").value = data.deducible || "";
    document.getElementById("fechainicio").value = data.fechainicio ? data.fechainicio.split('T')[0] : "";
    document.getElementById("fechainiciovigencia").value = data.fechainiciovigencia ? data.fechainiciovigencia.split('T')[0] : "";
    document.getElementById("fechavencimientopoliza").value = data.fechavencimientopoliza ? data.fechavencimientopoliza.split('T')[0] : "";
    document.getElementById("tipo").value = data.tipo || "";
    document.getElementById("status").value = data.status || "";
    document.getElementById("causacancelacion").value = data.causacancelacion || "";
    document.getElementById("fechacancelacion").value = data.fechacancelacion ? data.fechacancelacion.split('T')[0] : "";
    document.getElementById("observaciones").value = data.observaciones || "";

    // Hacer todos los campos de cliente-form read-only o disabled
    const elements = clienteForm.elements;
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.tagName === 'SELECT' || element.tagName === 'BUTTON') {
        element.disabled = true;
      } else {
        element.readOnly = true;
      }
    }

    // Ocultar botones de acción del formulario de registro
    const guardarButton = document.getElementById('guardar');
    if (guardarButton) {
      guardarButton.style.display = 'none';
    }
    // El botón de cancelar dentro de cliente-form
    const cancelarButtonClienteForm = document.querySelector('#cliente-form .ss-btn-outline');
    if (cancelarButtonClienteForm) {
      cancelarButtonClienteForm.style.display = 'none';
    }

    // Asegurar que el botón de actualizar (si existe fuera y es relevante) esté oculto
    const updateButtonGlobal = document.getElementById('update-button'); // Asumiendo que este es el ID del botón de actualizar global
    if (updateButtonGlobal) {
      updateButtonGlobal.style.display = 'none';
    }


    // Ocultar el formulario de consulta y sus resultados
    if (consultForm) {
      consultForm.style.display = 'none';
      consultForm.classList.add('hidden');
    }
    const consultResults = document.getElementById("consult-results");
    if (consultResults) {
      consultResults.style.display = "none";
      consultResults.classList.remove("hidden");
    }

    // Mostrar el formulario de registro (que ahora contiene los datos en modo lectura)
    if (registerForm) {
      registerForm.style.display = 'block';
      registerForm.classList.remove('hidden');
      registerForm.scrollIntoView({ behavior: "smooth" });
    }

  } catch (error) {
    console.error("Error al consultar los datos:", error);
    alert("Error al consultar los datos.");
  }
});

// Consultar para actualizar
document.getElementById("consultar-update").addEventListener("click", async () => {
  const documentoidentidad = document.getElementById("documentoidentidad-update").value;

  if (!documentoidentidad) {
    alert("Por favor, ingrese el documento de identidad.");
    return;
  }

  try {
    console.log(`Consultando cliente para actualizar con ID: ${documentoidentidad}`);
    const response = await fetch(`/clientes/${documentoidentidad}`);
    console.log("Respuesta recibida:", response.status, response.statusText);

    if (!response.ok) {
      if (response.status === 404) {
        alert("Cliente no encontrado. Verifique el documento de identidad.");
        return;
      }
      throw new Error(`Error al consultar los datos: ${response.status}`);
    }

    const data = await response.json();
    console.log("Datos recibidos para actualizar:", data);

    currentUpdatingClientId = data.documentoidentidad; // Store the ID for the update operation

    // Get form elements
    const registerForm = document.getElementById('register-form');
    const clienteForm = document.getElementById('cliente-form'); // Main form for data entry
    const updateForm = document.getElementById('update-form'); // Form containing "consultar-update" button

    // Ensure cliente-form fields are reset and editable (resetForm should handle this)
    // showForm('register') could be an option if it correctly sets up everything
    // For now, let's assume resetForm has done its job of making fields writable.

    // Populate the main registration form (cliente-form)
    document.getElementById("documentoidentidad").value = data.documentoidentidad || "";
    document.getElementById("nombrecompleto").value = data.nombrecompleto || "";
    document.getElementById("correo").value = data.correo || "";
    document.getElementById("tipocliente").value = data.tipocliente || "";
    document.getElementById("ciudad").value = data.ciudad || "";
    document.getElementById("direccion").value = data.direccion || "";
    document.getElementById("telefonoaseguradora").value = data.telefonoaseguradora || "";
    document.getElementById("company-register").value = data.aseguradora || "";
    // updateInsuranceTypes(data.aseguradora || ""); // Consider if these need to be called and then fields re-enabled
    document.getElementById("insuranceType-register").value = data.tiposeguro || "";
    // updateProducts(data.tiposeguro || "");
    document.getElementById("product-register").value = data.producto || "";
    document.getElementById("poliza").value = data.poliza || "";
    document.getElementById("deducible").value = data.deducible || "";
    document.getElementById("fechainicio").value = data.fechainicio ? data.fechainicio.split('T')[0] : "";
    document.getElementById("fechainiciovigencia").value = data.fechainiciovigencia ? data.fechainiciovigencia.split('T')[0] : "";
    document.getElementById("fechavencimientopoliza").value = data.fechavencimientopoliza ? data.fechavencimientopoliza.split('T')[0] : "";
    document.getElementById("tipo").value = data.tipo || "";
    document.getElementById("status").value = data.status || "";
    document.getElementById("causacancelacion").value = data.causacancelacion || "";
    document.getElementById("fechacancelacion").value = data.fechacancelacion ? data.fechacancelacion.split('T')[0] : "";
    document.getElementById("observaciones").value = data.observaciones || "";

    // Make documentoidentidad read-only
    document.getElementById("documentoidentidad").readOnly = true;

    // Hide the update-form (where "consultar-update" was clicked)
    if (updateForm) {
      updateForm.style.display = 'none';
      updateForm.classList.add('hidden');
    }
    // Also hide the specific update-fields div if it exists from old structure
    const updateFields = document.getElementById("update-fields");
    if (updateFields) {
      updateFields.style.display = "none";
      updateFields.classList.add("hidden");
    }

    // Show the register-form (which contains cliente-form)
    if (registerForm) {
      registerForm.style.display = 'block';
      registerForm.classList.remove('hidden');
      registerForm.scrollIntoView({ behavior: "smooth" });
    }

    // Configure buttons for update mode
    const guardarButton = document.getElementById('guardar');
    if (guardarButton) {
      guardarButton.style.display = 'none';
    }
    const updateButton = document.getElementById('update-button');
    if (updateButton) {
      updateButton.style.display = 'inline-block'; // or 'block'
    }
    // Ensure "Cancelar" button in cliente-form is visible (resetForm should handle this)
    const cancelarButtonClienteForm = document.querySelector('#cliente-form .ss-btn-outline');
    if (cancelarButtonClienteForm) {
      cancelarButtonClienteForm.style.display = 'inline-block'; // or 'block'
    }

  } catch (error) {
    console.error("Error al consultar los datos para actualizar:", error);
    alert("Error al consultar los datos para actualizar. Verifique el documento e inténtelo de nuevo.");
  }
});

// Actualizar un cliente
document.getElementById("update-button").addEventListener("click", async () => {
  // Use currentUpdatingClientId for the fetch URL
  if (!currentUpdatingClientId) {
    alert("No se ha seleccionado ningún cliente para actualizar. Por favor, busque el cliente primero.");
    return;
  }

  // Get data from the main cliente-form
  const nombrecompleto = document.getElementById("nombrecompleto").value;
  const correo = document.getElementById("correo").value;
  const tipocliente = document.getElementById("tipocliente").value;
  const ciudad = document.getElementById("ciudad").value;
  const direccion = document.getElementById("direccion").value;
  const telefonoaseguradora = document.getElementById("telefonoaseguradora").value;
  const aseguradora = document.getElementById("company-register").value; // ID from cliente-form
  const tiposeguro = document.getElementById("insuranceType-register").value; // ID from cliente-form
  const producto = document.getElementById("product-register").value; // ID from cliente-form
  const poliza = document.getElementById("poliza").value;
  const deducible = parseFloat(document.getElementById("deducible").value) || 0.0;
  const fechainicio = document.getElementById("fechainicio").value;
  const fechainiciovigencia = document.getElementById("fechainiciovigencia").value || fechainicio;
  const fechavencimientopoliza = document.getElementById("fechavencimientopoliza").value;
  const tipo = document.getElementById("tipo").value;
  const status = document.getElementById("status").value;
  const causacancelacion = document.getElementById("causacancelacion").value || null;
  const fechacancelacion = document.getElementById("fechacancelacion").value || null;
  const observaciones = document.getElementById("observaciones").value || "";

  // Construct updateData (documentoidentidad is not included in the body for PATCH)
  const updateData = {
    nombrecompleto,
    correo,
    tipocliente,
    ciudad,
    direccion,
    telefonoaseguradora,
    aseguradora,
    tiposeguro,
    producto: producto || null,
    poliza: poliza || null,
    deducible,
    fechainicio,
    fechainiciovigencia,
    fechavencimientopoliza: fechavencimientopoliza || null,
    tipo,
    status,
    causacancelacion,
    fechacancelacion,
    observaciones,
  };

  // Basic validation (optional, can be more comprehensive)
  if (!nombrecompleto || !correo) {
    alert("Nombre completo y correo son obligatorios.");
    return;
  }

  try {
    const response = await fetch(`/clientes/${currentUpdatingClientId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (response.ok) {
      alert("Registro actualizado con éxito.");
      currentUpdatingClientId = null; // Reset the global ID
      resetForm(); // Resets cliente-form, re-enables fields, hides/shows correct primary buttons

      // Hide the main update-form (which contains "documentoidentidad-update" and "consultar-update")
      const updateForm = document.getElementById('update-form');
      if (updateForm) {
        updateForm.style.display = 'none';
        updateForm.classList.add('hidden');
      }
      // Show the initial state for update (the form with "consultar-update" button)
      // Or, decide on a neutral state, e.g., hide all specific content forms
      // showForm('update'); // This will show the "update-form" again for a new search.

      // Explicitly hide the "Actualizar Cliente" button and show "Guardar Cliente"
      // Note: resetForm already makes 'guardar' visible and 'documentoidentidad' writable.
      const updateButton = document.getElementById('update-button');
      if (updateButton) {
        updateButton.style.display = 'none';
      }
      // The 'guardar' button's visibility is handled by resetForm and showForm logic.
      // Ensure register-form is displayed if that's the desired default after update.
      // For now, resetForm hides all forms, and showForm('update') would re-show the update search.
      // If we want to go to a neutral view (e.g. just the main action buttons visible):
      document.getElementById('register-form').style.display = 'none'; // Hide the form used for update
      document.getElementById('register-form').classList.add('hidden');


    } else {
      const errorData = await response.json().catch(() => null); // Try to parse error
      alert(`No se pudo actualizar el registro. ${errorData ? errorData.error : response.statusText}`);
    }
  } catch (error) {
    console.error("Error al actualizar el registro:", error);
    alert("Ocurrió un error al actualizar el registro.");
  }
});
