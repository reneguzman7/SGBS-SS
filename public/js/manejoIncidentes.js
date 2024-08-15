class FormHandler {
  constructor() {
    this.registerForm = document.getElementById('register-form');
    this.consultForm = document.getElementById('consult-form');
    this.updateForm = document.getElementById('update-form');

    this.setupEventListeners();
  }

  setupEventListeners() {
    // Event listener para el botón de consulta en el formulario de actualización
    document.getElementById('consultar-update').addEventListener('click', () => this.consultIncident());

    // Event listener para el formulario de registro
    this.registerForm.addEventListener('submit', (event) => this.registerIncident(event));

    // Event listener para el botón de actualización
    document.getElementById('update-button').addEventListener('click', () => this.updateIncident());

    // Event listener para el botón de consulta en el formulario de consulta
    document.getElementById('consultar').addEventListener('click', () => this.consultIncidentFromConsultForm());
  }

  showSection(section) {
    // Oculta todas las secciones y muestra solo la sección solicitada
    ['register', 'consult', 'update'].forEach(s => {
      document.getElementById(`${s}-form`).classList.add('hidden');
    });
    document.getElementById(`${section}-form`).classList.remove('hidden');
  }

  hideForm(formId) {
    // Oculta el formulario especificado
    document.getElementById(`${formId}-form`).classList.add('hidden');
  }

  async consultIncidentFromConsultForm() {
    const documentId = document.getElementById('document-id-consult').value;

    if (!documentId) {
      alert("Por favor, ingrese el documento de identidad.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/incidentes/${documentId}`);
      if (!response.ok) {
        throw new Error("Error al consultar los datos");
      }

      const data = await response.json();
      if (data.error) {
        alert(data.error);
        return;
      }

      // Llena los campos con la información del incidente
      document.getElementById('incident-date-consult').value = data.fechaincidente || '';
      document.getElementById('description-consult').value = data.descripcion || '';
      document.getElementById('location-consult').value = data.lugarincidente || '';
      document.getElementById('evidence-consult').value = data.evidencia || '';
      document.getElementById('incident-type-consult').value = data.tipoincidente || '';
      document.getElementById('incident-status-consult').value = data.estadoincidente || '';

      this.showSection('consult');
    } catch (error) {
      console.error("Error al consultar el incidente:", error);
      alert("Error al consultar el incidente.");
    }
  }

  async consultIncident() {
    const documentId = document.getElementById('documentoidentidad-update').value;

    if (!documentId) {
      alert("Por favor, ingrese el documento de identidad.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/incidentes/${documentId}`);
      if (!response.ok) {
        throw new Error("Error al consultar los datos");
      }

      const data = await response.json();
      if (data.error) {
        alert(data.error);
        return;
      }

      // Llena los campos con la información del incidente
      document.getElementById('incident-date-update').value = data.fechaincidente || '';
      document.getElementById('description-update').value = data.descripcion || '';
      document.getElementById('location-update').value = data.lugarincidente || '';
      document.getElementById('evidence-update').value = data.evidencia || '';
      document.getElementById('incident-type-update').value = data.tipoincidente || '';
      document.getElementById('incident-status-update').value = data.estadoincidente || '';

      this.showSection('update');
    } catch (error) {
      console.error("Error al consultar el incidente:", error);
      alert("Error al consultar el incidente.");
    }
  }

  async registerIncident(event) {
    event.preventDefault();

    const documentId = document.getElementById('register-document-id').value;
    const incidentDate = document.getElementById('register-date').value;
    const description = document.getElementById('register-description').value;
    const location = document.getElementById('register-location').value;
    const evidence = document.getElementById('register-evidence').value;
    const incidentType = document.getElementById('register-incident-type').value;
    const incidentStatus = document.getElementById('register-incident-status').value;

    if (!documentId || !incidentDate || !description || !location || !incidentType || !incidentStatus) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    const jsonData = {
      documentoidentidad: documentId,
      fechaincidente: incidentDate,
      descripcion: description,
      lugarincidente: location,
      evidencia: evidence,
      tipoincidente: incidentType,
      estadoincidente: incidentStatus,
    };

    try {
      const response = await fetch('http://localhost:3000/incidentes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      const data = await response.json();

      if (data.error) {
        alert("Error: " + data.error);
      } else {
        alert("Éxito: " + data.message);
        this.registerForm.reset();
        this.hideForm('register');
      }
    } catch (error) {
      console.error("Error al registrar el incidente:", error);
      alert("Error al registrar el incidente.");
    }
  }

  async updateIncident() {
    const documentoidentidad = document.getElementById("documentoidentidad-update").value.trim();
    const incidentDate = document.getElementById("incident-date-update").value;
    const description = document.getElementById("description-update").value.trim() || null;
    const location = document.getElementById("location-update").value.trim();
    const evidence = document.getElementById("evidence-update").value.trim() || null;
    const incidentType = document.getElementById("incident-type-update").value.trim();
    const incidentStatus = document.getElementById("incident-status-update").value.trim() || 'Abierto';

    if (!documentoidentidad) {
      alert("Por favor, ingrese el Documento de Identidad.");
      return;
    }

    const updateData = {
      fechaincidente: incidentDate,
      lugarincidente: location,
      tipoincidente: incidentType,
      estadoincidente: incidentStatus,
      ...(description && { descripcion: description }),
      ...(evidence && { evidencia: evidence }),
    };

    try {
      const response = await fetch(`http://localhost:3000/incidentes/${documentoidentidad}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        alert("Incidente actualizado con éxito.");
        this.updateForm.reset();
        this.hideForm('update');
      } else {
        const errorData = await response.json();
        alert("Error: " + (errorData.error || "No se pudo actualizar el incidente."));
      }
    } catch (error) {
      // alert("Ocurrió un error al actualizar el incidente.");
    }
  }
}


function validateCI(ci) {
  if (!isNumeric(ci)) {
      return "La cédula debe contener solo números.";
  }
  if (ci.length !== 10) {
      return "La cédula debe ser de 10 dígitos.";
  }
  if (parseInt(ci, 10) === 0) {
      return "La cédula ingresada no puede ser cero.";
  }
  if (ci.startsWith("30")) {
      return "La cédula es válida.";
  }

  let total = 0;
  for (let i = 0; i < 9; i++) {
      let num = parseInt(ci[i], 10);
      if (i % 2 === 0) {
          let val = num * 2;
          if (val > 9) val -= 9;
          total += val;
      } else {
          total += num;
      }
  }

  let lastDigit = parseInt(ci[9], 10);
  let checksum = total % 10 === 0 ? 0 : 10 - (total % 10);

  if (checksum === lastDigit) {
      return "La cédula es válida.";
  } else {
      return "La cédula ingresada no es válida.";
  }
}

function isNumeric(value) {
  return /^\d+$/.test(value);
}

function validateRUC(ruc) {
  if (ruc.length !== 13) {
      return "El RUC debe ser de 13 dígitos.";
  }
  if (!ruc.endsWith("001")) {
      return "El RUC debe terminar en '001'.";
  }

  let ci = ruc.substring(0, 10);
  let ciValidation = validateCI(ci);

  if (ciValidation === "La cédula es válida.") {
      return "El RUC es válido.";
  } else {
      return "El RUC ingresado no es válido.";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const documentoidentidadInput = document.getElementById("register-document-id");

  documentoidentidadInput.addEventListener("blur", function () {
      const value = documentoidentidadInput.value;
      let validationMessage = "";

      if (value.length === 10) {
          validationMessage = validateCI(value);
      } else if (value.length === 13) {
          validationMessage = validateRUC(value);
      } else {
          validationMessage = "El documento debe ser de 10 dígitos (cédula) o 13 dígitos (RUC).";
      }

      const validationMessageElement = document.getElementById("register-document-id-validation");
      validationMessageElement.textContent = validationMessage;
      validationMessageElement.style.color = validationMessage.includes("válida") ? "green" : "red";
  });
});
// Inicializar el FormHandler
document.addEventListener('DOMContentLoaded', () => {
  new FormHandler();
});
