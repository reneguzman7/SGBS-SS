// Función para mostrar un formulario y ocultar los demás, incluyendo secciones específicas
function showForm(formType) {
  const forms = ['register-form', 'consult-form', 'update-form', 'cliente-form'];
  const consultSection = document.getElementById('consult-section');

  // Limpiar datos de todos los formularios y divs antes de mostrar el formulario actual
  resetForm();

  // Mostrar el formulario correspondiente y limpiar sus campos
  forms.forEach(form => {
    const formElement = document.getElementById(form);
    if (formElement) {
      if (form === `${formType}-form` || form === 'cliente-form') {
        formElement.classList.remove('hidden');
        formElement.style.display = 'block';
        if (formType !== 'register') {
          clearFormFields(form); // Limpiar campos si no es el formulario de registro
        }
      } else {
        formElement.classList.add('hidden');
        formElement.style.display = 'none';
      }
    }
  });

  // Controlar la visibilidad del consult-section
  if (consultSection) {
    if (formType === 'consult') {
      consultSection.classList.remove('hidden');
      consultSection.style.display = 'block';
    } else {
      consultSection.classList.add('hidden');
      consultSection.style.display = 'none';
    }
  }
}

// Función para resetear y ocultar todos los formularios y limpiar datos de los divs
function resetForm() {
  // Limpiar y ocultar todos los formularios
  document.querySelectorAll('form').forEach(form => {
    form.reset(); // Limpiar el formulario
    form.classList.add('hidden'); // Ocultar el formulario
    form.style.display = 'none';
  });

  // Asegurarse de ocultar consult-section
  const consultSection = document.getElementById('consult-section');
  if (consultSection) {
    consultSection.classList.add('hidden');
    consultSection.style.display = 'none';
  }

  // Asegurarse de ocultar update-fields
  const updateFields = document.getElementById('update-fields');
  if (updateFields) {
    updateFields.classList.add('hidden');
    updateFields.style.display = 'none';
  }

  // Asegurarse de ocultar consult-results
  const consultResults = document.getElementById('consult-results');
  if (consultResults) {
    consultResults.classList.add('hidden');
    consultResults.style.display = 'none';
  }

  // Limpiar cualquier otro div que pueda tener datos persistentes
  document.querySelectorAll('.data-container').forEach(div => {
    div.innerHTML = ''; // Limpiar el contenido de los divs
  });
}

// Función para limpiar los campos específicos de un formulario
function clearFormFields(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.reset(); // Limpiar los campos del formulario
  }
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
  fetch("http://localhost:3000/clientes", {
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
  fetch("http://localhost:3000/clientes", {
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
    console.log(`Consultando cliente con ID: ${documentoidentidad}`);
    const response = await fetch(
      `http://localhost:3000/clientes/${documentoidentidad}`
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

    // Llenar los campos del formulario de consulta
    document.getElementById("documentoidentidad-consult").value = data.documentoidentidad || "";
    document.getElementById("nombrecompleto-consult").value = data.nombrecompleto || "";
    document.getElementById("correo-consult").value = data.correo || "";
    document.getElementById("tipocliente-consult").value = data.tipocliente || "";
    document.getElementById("ciudad-consult").value = data.ciudad || "";
    document.getElementById("direccion-consult").value = data.direccion || "";
    document.getElementById("telefonoaseguradora-consult").value = data.telefonoaseguradora || "";
    document.getElementById("aseguradora-consult").value = data.aseguradora || "";
    document.getElementById("tiposeguro-consult").value = data.tiposeguro || "";
    document.getElementById("producto-consult").value = data.producto || "";
    document.getElementById("poliza-consult").value = data.poliza || "";
    document.getElementById("deducible-consult").value = data.deducible || "";
    document.getElementById("fechainicio-consult").value = data.fechainicio || "";
    document.getElementById("fechainiciovigencia-consult").value = data.fechainiciovigencia || "";
    document.getElementById("fechavencimientopoliza-consult").value = data.fechavencimientopoliza || "";
    document.getElementById("tipo-consult").value = data.tipo || "";
    document.getElementById("status-consult").value = data.status || "";
    document.getElementById("causacancelacion-consult").value = data.causacancelacion || "";
    document.getElementById("fechacancelacion-consult").value = data.fechacancelacion || "";
    document.getElementById("observaciones-consult").value = data.observaciones || "";

    // Mostrar los resultados de la consulta
    const consultResults = document.getElementById("consult-results");
    consultResults.style.display = "block";
    consultResults.classList.remove("hidden");
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
    const response = await fetch(`http://localhost:3000/clientes/${documentoidentidad}`);
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

    // Llenar los campos del formulario de actualización con los datos obtenidos
    document.getElementById("nombrecompleto-update").value = data.nombrecompleto || "";
    document.getElementById("correo-update").value = data.correo || "";
    document.getElementById("tipocliente-update").value = data.tipocliente || "";
    document.getElementById("ciudad-update").value = data.ciudad || "";
    document.getElementById("direccion-update").value = data.direccion || "";
    document.getElementById("telefonoaseguradora-update").value = data.telefonoaseguradora || "";
    document.getElementById("aseguradora-update").value = data.aseguradora || "";
    document.getElementById("tiposeguro-update").value = data.tiposeguro || "";
    document.getElementById("producto-update").value = data.producto || "";
    document.getElementById("poliza-update").value = data.poliza || "";
    document.getElementById("deducible-update").value = data.deducible || "";
    document.getElementById("fechainicio-update").value = data.fechainicio || "";
    document.getElementById("fechainiciovigencia-update").value = data.fechainiciovigencia || "";
    document.getElementById("fechavencimientopoliza-update").value = data.fechavencimientopoliza || "";
    document.getElementById("tipo-update").value = data.tipo || "";
    document.getElementById("status-update").value = data.status || "";
    document.getElementById("causacancelacion-update").value = data.causacancelacion || "";
    document.getElementById("fechacancelacion-update").value = data.fechacancelacion || "";
    document.getElementById("observaciones-update").value = data.observaciones || "";

    // Mostrar el formulario de actualización
    const updateFields = document.getElementById("update-fields");
    updateFields.style.display = "block";
    updateFields.classList.remove("hidden");
  } catch (error) {
    console.error("Error al consultar los datos:", error);
    alert("Error al consultar los datos. Verifique el documento e inténtelo de nuevo.");
  }
});

// Actualizar un cliente
document.getElementById("update-button").addEventListener("click", async () => {
  const documentoidentidad = document.getElementById("documentoidentidad-update").value;
  const nombrecompleto = document.getElementById("nombrecompleto-update").value;
  const correo = document.getElementById("correo-update").value;
  const tipocliente = document.getElementById("tipocliente-update").value;
  const ciudad = document.getElementById("ciudad-update").value;
  const direccion = document.getElementById("direccion-update").value;
  const telefonoaseguradora = document.getElementById("telefonoaseguradora-update").value;
  const aseguradora = document.getElementById("aseguradora-update").value;
  const tiposeguro = document.getElementById("tiposeguro-update").value;
  const producto = document.getElementById("producto-update").value;
  const poliza = document.getElementById("poliza-update").value;
  const deducible = parseFloat(document.getElementById("deducible-update").value) || 0.0;
  const fechainicio = document.getElementById("fechainicio-update").value;
  const fechainiciovigencia = document.getElementById("fechainiciovigencia-update").value;
  const fechavencimientopoliza = document.getElementById("fechavencimientopoliza-update").value;
  const tipo = document.getElementById("tipo-update").value;
  const status = document.getElementById("status-update").value;
  const causacancelacion = document.getElementById("causacancelacion-update").value;
  const fechacancelacion = document.getElementById("fechacancelacion-update").value;
  const observaciones = document.getElementById("observaciones-update").value;

  if (!documentoidentidad) {
    alert("Por favor, ingresa el Documento de Identidad.");
    return;
  }

  // Construir el objeto dinámicamente
  const updateData = {
    nombrecompleto,
    correo,
    tipocliente,
    ciudad,
    direccion,
    telefonoaseguradora,
    aseguradora,
    tiposeguro,
    producto,
    poliza,
    deducible,
    fechainicio,
    fechainiciovigencia,
    fechavencimientopoliza,
    tipo,
    status,
    // Solo agregar los campos si no están vacíos
    ...(causacancelacion && { causacancelacion }),
    ...(fechacancelacion && { fechacancelacion }),
    ...(observaciones && { observaciones }),
  };

  try {
    const response = await fetch(`http://localhost:3000/clientes/${documentoidentidad}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (response.ok) {
      alert("Registro actualizado con éxito.");
      resetForm();
      showForm('update');
    } else {
      alert("No se pudo actualizar el registro.");
    }
  } catch (error) {
    console.error("Error al actualizar el registro:", error);
    alert("Ocurrió un error al actualizar el registro.");
  }
});
