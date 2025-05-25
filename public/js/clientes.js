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
        if (formType !== 'register') {
          clearFormFields(form); // Limpiar campos si no es el formulario de registro
        }
      } else {
        formElement.classList.add('hidden');
      }
    }
  });

  // Controlar la visibilidad del consult-section
  if (consultSection) {
    if (formType === 'consult') {
      consultSection.classList.remove('hidden');
    } else {
      consultSection.classList.add('hidden');
    }
  }
}

// Función para resetear y ocultar todos los formularios y limpiar datos de los divs
function resetForm() {
  // Limpiar y ocultar todos los formularios
  document.querySelectorAll('form').forEach(form => {
    form.reset(); // Limpiar el formulario
    form.classList.add('hidden'); // Ocultar el formulario
  });

  // Asegurarse de ocultar consult-section
  const consultSection = document.getElementById('consult-section');
  if (consultSection) {
    consultSection.classList.add('hidden');
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


document.getElementById("consultar").addEventListener("click", async () => {
  const documentoIdentidad = document.getElementById("documentoidentidad-consulta").value;

  if (!documentoIdentidad) {
    alert("Por favor, ingrese el documento de identidad.");
    return;
  }

  try {
    // Reemplaza la URL con la ruta correcta de tu API
    const response = await fetch(`http://localhost:3000/clientes/${documentoIdentidad}`);

    if (!response.ok) {
      throw new Error("Error al consultar los datos");
    }

    const data = await response.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    // Llenar los campos del formulario de actualizaci�n con los datos obtenidos
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

    // Mostrar el formulario de actualizaci�n
    document.getElementById("consult-section").classList.remove("hidden");
  } catch (error) {
    console.error("Error al consultar los datos:", error);
    alert("Error al consultar los datos.");
  }
});

document.getElementById("guardar").addEventListener("click", function () {
  // Obtener los valores de los campos del formulario
  const documentoidentidad =
    document.getElementById("documentoidentidad").value;
  const nombrecompleto = document.getElementById("nombrecompleto").value;
  const correo = document.getElementById("correo").value;
  const tipocliente = document.getElementById("tipocliente").value;
  const ciudad = document.getElementById("ciudad").value;
  const direccion = document.getElementById("direccion").value;
  const telefonoaseguradora = document.getElementById(
    "telefonoaseguradora"
  ).value;
  const aseguradora = document.getElementById("company-register").value;
  const tiposeguro = document.getElementById("insuranceType-register").value;
  const producto = document.getElementById("product-register").value;
  const poliza = document.getElementById("poliza").value;
  const deducible =
    parseFloat(document.getElementById("deducible").value) || 0.0;
  const fechainicio = document.getElementById("fechainicio").value;
  const fechainiciovigencia =
    document.getElementById("fechainiciovigencia").value || fechainicio;
  const fechavencimientopoliza = document.getElementById(
    "fechavencimientopoliza"
  ).value;
  const tipo = document.getElementById("tipo").value || "N/A";
  const status = document.getElementById("status").value || "Activo";
  const causacancelacion =
    document.getElementById("causacancelacion").value || null;
  const fechacancelacion =
    document.getElementById("fechacancelacion").value || null;
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

  console.log(jsonData); // Verifica los datos en la consola

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

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const jsonData = {};

  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  // Validación en el frontend
  if (
    !jsonData.documentoidentidad ||
    !jsonData.nombrecompleto ||
    !jsonData.correo ||
    !jsonData.tipocliente ||
    !jsonData.ciudad ||
    !jsonData.direccion ||
    !jsonData.telefonoaseguradora ||
    !jsonData.aseguradora ||
    !jsonData.tiposeguro ||
    !jsonData.fechainicio
  ) {
    alert("Faltan datos obligatorios");
    return;
  }

  console.log(jsonData); // Verifica los datos en la consola

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
  const documentoidentidad = document.getElementById(
    "documentoidentidad-consulta"
  ).value;

  if (!documentoidentidad) {
    alert("Por favor, ingrese el documento de identidad.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/clientes/${documentoidentidad}`
    );

    if (!response.ok) {
      throw new Error("Error al consultar los datos");
    }

    const data = await response.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    // Llenar la tabla con los datos
    const resultsBody = document.getElementById("results-body");
    resultsBody.innerHTML = `
          <tr>
              <td class="py-2 px-4 border-b">${data.nombrecompleto}</td>
              <td class="py-2 px-4 border-b">${data.correo}</td>
              <td class="py-2 px-4 border-b">${data.tipocliente}</td>
              <td class="py-2 px-4 border-b">${data.ciudad}</td>
              <td class="py-2 px-4 border-b">${data.direccion}</td>
              <td class="py-2 px-4 border-b">${data.telefonoaseguradora}</td>
              <td class="py-2 px-4 border-b">${data.aseguradora}</td>
              <td class="py-2 px-4 border-b">${data.tiposeguro}</td>
              <td class="py-2 px-4 border-b">${data.producto}</td>
              <td class="py-2 px-4 border-b">${data.poliza}</td>
              <td class="py-2 px-4 border-b">${data.deducible}</td>
              <td class="py-2 px-4 border-b">${data.fechainicio}</td>
              <td class="py-2 px-4 border-b">${data.fechainiciovigencia}</td>
              <td class="py-2 px-4 border-b">${data.fechavencimientopoliza}</td>
              <td class="py-2 px-4 border-b">${data.tipo}</td>
              <td class="py-2 px-4 border-b">${data.status}</td>
              <td class="py-2 px-4 border-b">${data.causacancelacion}</td>
              <td class="py-2 px-4 border-b">${data.fechacancelacion}</td>
              <td class="py-2 px-4 border-b">${data.observaciones}</td>
          </tr>
      `;

    // Mostrar la tabla con los resultados
    document.getElementById("consult-results").classList.remove("hidden");
  } catch (error) {
    console.error("Error al consultar los datos:", error);
    alert("Error al consultar los datos.");
  }
});

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

    // Llenar los campos del formulario de actualizaci�n con los datos obtenidos
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

    // Mostrar el formulario de actualizaci�n
    document.getElementById("update-section").classList.remove("hidden");
    document.getElementById("consult-results-update").classList.add("hidden");
  } catch (error) {
    console.error("Error al consultar los datos:", error);
    alert("Los datos se han encontrado con exito.");
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

  // Construir el objeto din�micamente
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
    // Solo agregar los campos si no est�n vac�os
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
      alert("Registro actualizado con �xito.");
      resetForm();
    } else {
      alert("No se pudo actualizar el registro.");
    }
  } catch (error) {
    console.error("Error al actualizar el registro:", error);
    alert("Ocurri� un error al actualizar el registro.");
  }
});


document.getElementById("guardar").addEventListener("click", async () => {
  const documentoidentidad = document.getElementById(
    "documentoidentidad-update"
  ).value;
  const nombrecompleto = document.getElementById("nombrecompleto-update").value;
  const correo = document.getElementById("correo-update").value;
  const tipocliente = document.getElementById("tipocliente-update").value;
  const ciudad = document.getElementById("ciudad-update").value;
  const direccion = document.getElementById("direccion-update").value;
  const telefonoaseguradora = document.getElementById(
    "telefonoaseguradora-update"
  ).value;
  const aseguradora = document.getElementById("aseguradora-update").value;
  const tiposeguro = document.getElementById("tiposeguro-update").value;
  const producto = document.getElementById("producto-update").value;
  const poliza = document.getElementById("poliza-update").value;
  const deducible = document.getElementById("deducible-update").value;
  const fechainicio = document.getElementById("fechainicio-update").value;
  const fechainiciovigencia = document.getElementById(
    "fechainiciovigencia-update"
  ).value;
  const fechavencimientopoliza = document.getElementById(
    "fechavencimientopoliza-update"
  ).value;
  const tipo = document.getElementById("tipo-update").value;
  const status = document.getElementById("status-update").value;
  const causacancelacion = document.getElementById(
    "causacancelacion-update"
  ).value;
  const fechacancelacion = document.getElementById(
    "fechacancelacion-update"
  ).value;
  const observaciones = document.getElementById("observaciones-update").value;

  if (!documentoidentidad) {
    alert("Por favor, ingresa el Documento de Identidad.");
    return;
  }

  try {
    // Reemplaza con la URL de tu API para actualizar el registro
    const response = await fetch(`/clientes/:documentoidentidad`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        documentoidentidad,
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
    } else {
      alert("No se pudo actualizar el registro.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error al actualizar el registro.");
  }


});



