// Manejo de botones principales
function showForm(formType) {
  const forms = ['register-form', 'consult-form', 'update-form'];

  forms.forEach(form => {
    const formElement = document.getElementById(form);
    if (formElement) {
      if (form === `${formType}-form`) {
        formElement.classList.remove('hidden');
      } else {
        formElement.classList.add('hidden');
      }
    }
  });
}

// Función para resetear y ocultar formularios
function resetForm() {
  document.querySelectorAll('form').forEach(form => {
    form.reset();
    form.classList.add('hidden');
  });
}

// Evento para guardar datos (crear un nuevo cliente)
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
        resetForm();
      }
    })
    .catch((error) => {
      console.error("Error al enviar los datos:", error);
      alert("Error al enviar los datos.");
    });
});

// Manejo de botones para mostrar formularios
document.querySelectorAll("button[onclick]").forEach((button) => {
  button.addEventListener("click", () => {
    const formType = button.getAttribute("onclick").split("'")[1];
    showForm(formType);
  });
});

// Consultar un cliente
document.getElementById("consultar-update").addEventListener("click", async () => {
  const documentoidentidad = document.getElementById("documentoidentidad-update").value;

  if (!documentoidentidad) {
    alert("Por favor, ingrese el documento de identidad.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/clientes/${documentoidentidad}`);

    if (!response.ok) {
      throw new Error("Error al consultar los datos");
    }

    const data = await response.json();

    if (data.error) {
      alert(data.error);
      return;
    }

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
    document.getElementById("update-section").classList.remove("hidden");
    document.getElementById("consult-results-update").classList.add("hidden");
  } catch (error) {
    console.error("Error al consultar los datos:", error);
    alert("Error al consultar los datos.");
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

  try {
    const response = await fetch(`http://localhost:3000/clientes/${documentoidentidad}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
        causacancelacion,
        fechacancelacion,
        observaciones,
      }),
    });

    if (response.ok) {
      alert("Registro actualizado con éxito.");
      resetForm();
    } else {
      alert("No se pudo actualizar el registro.");
    }
  } catch (error) {
    console.error("Error al actualizar el registro:", error);
    alert("Ocurrió un error al actualizar el registro.");
  }
});
