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
      document.getElementById('update-button').addEventListener('click', (event) => this.updateIncident(event));

      // Event listener para el botón de consulta en el formulario de consulta
      document.getElementById('consultar').addEventListener('click', () => this.consultIncidentFromConsultForm());

      // Event listener para validar en tiempo real
      document.getElementById('register-document-id').addEventListener('input', () => this.validateDocumentId());
  }

  showSection(section) {
      // Oculta todas las secciones y muestra solo la sección solicitada
      ['register', 'consult', 'update'].forEach(s => {
          const form = document.getElementById(`${s}-form`);
          if (form) {
              form.classList.add('hidden');
          }
      });
      const sectionForm = document.getElementById(`${section}-form`);
      if (sectionForm) {
          sectionForm.classList.remove('hidden');
      }
  }

  hideForm(formId) {
      // Oculta el formulario especificado
      const form = document.getElementById(`${formId}-form`);
      if (form) {
          form.classList.add('hidden');
      } else {
          console.error(`Form with ID '${formId}-form' is missing.`);
      }
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

      const documentId = document.getElementById('register-document-id').value.trim();
      const incidentDate = document.getElementById('register-date').value;
      const description = document.getElementById('register-description').value.trim();
      const location = document.getElementById('register-location').value.trim();
      const evidence = document.getElementById('register-evidence').value.trim();
      const incidentType = document.getElementById('register-incident-type').value.trim();
      const incidentStatus = document.getElementById('register-incident-status').value.trim();

      // Validación de campos incompletos
      if (!documentId || !incidentDate || !description || !location || !incidentType || !incidentStatus) {
          if (!documentId) {
              alert("? Por favor, complete el campo de Documento de Identidad.");
          } else if (!incidentDate) {
              alert("? Por favor, complete el campo de Fecha del Incidente.");
          } else if (!description) {
              alert("? Por favor, complete el campo de Descripción.");
          } else if (!location) {
              alert("? Por favor, complete el campo de Lugar del Incidente.");
          } else if (!incidentType) {
              alert("? Por favor, complete el campo de Tipo de Incidente.");
          } else if (!incidentStatus) {
              alert("? Por favor, complete el campo de Estado del Incidente.");
          }
          return;
      }

      // Validación de cada campo
      if (this.validateDocumentIdField(documentId) && this.validateDescriptionField(description) &&
          this.validateEvidenceField(evidence) && this.validateIncidentStatusField(incidentStatus)) {

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
                  alert("Incidente registrado");
                  this.registerForm.reset();
                  this.hideForm('register');
              }
          } catch (error) {
              console.error("Error al registrar el incidente:", error);
              alert("Error al registrar incidente");
          }
      }
  }

  validateDocumentIdField(documentId) {
      if (!documentId) {
          alert("? Documento de identidad inválido. Vuelva a ingresar");
          return false;
      }

      if (documentId.length === 10 && validateCI(documentId) !== "La cédula es válida.") {
          alert("? Documento de identidad inválido. Vuelva a ingresar");
          return false;
      }

      if (documentId.length === 13 && validateRUC(documentId) !== "El RUC es válido.") {
          alert("? RUC inválido. Vuelva a ingresar");
          return false;
      }

      if (documentId.length !== 10 && documentId.length !== 13) {
          alert("? Documento de identidad inválido. Vuelva a ingresar");
          return false;
      }

      return true;
  }

  validateDescriptionField(description) {
      if (!description) {
          alert("? Descripción inválida. Vuelva a ingresar");
          return false;
      }
      return true;
  }

  validateEvidenceField(evidence) {
      // Aquí puedes agregar cualquier otra lógica para validar el campo de evidencia
      if (!evidence) {
          alert("? Evidencias inválidas. Vuelva a ingresar");
          return false;
      }
      return true;
  }

  validateIncidentStatusField(incidentStatus) {
      const validStatuses = ["Abierto", "Cerrado", "En proceso"]; // Ejemplo de estados válidos
      if (!validStatuses.includes(incidentStatus)) {
          alert("? Estado del incidente inválido. Vuelva a ingresar");
          return false;
      }
      return true;
  }

  async updateIncident(event) {
      event.preventDefault();

      const documentoidentidad = document.getElementById("documentoidentidad-update").value.trim();
      const incidentDate = document.getElementById("incident-date-update").value;
      const description = document.getElementById("description-update").value.trim();
      const location = document.getElementById("location-update").value.trim();
      const evidence = document.getElementById("evidence-update").value.trim();
      const incidentType = document.getElementById("incident-type-update").value.trim();
      const incidentStatus = document.getElementById("incident-status-update").value.trim();

      // Validación de campos incompletos
      if (!documentoidentidad || !incidentDate || !description || !location || !incidentType || !incidentStatus) {
          if (!documentoidentidad) {
              alert("? Por favor, complete el campo de Documento de Identidad.");
          } else if (!incidentDate) {
              alert("? Por favor, complete el campo de Fecha del Incidente.");
          } else if (!description) {
              alert("? Por favor, complete el campo de Descripción.");
          } else if (!location) {
              alert("? Por favor, complete el campo de Lugar del Incidente.");
          } else if (!incidentType) {
              alert("? Por favor, complete el campo de Tipo de Incidente.");
          } else if (!incidentStatus) {
              alert("? Por favor, complete el campo de Estado del Incidente.");
          }
          return;
      }

      // Validación de cada campo
      if (this.validateDocumentIdField(documentoidentidad) && this.validateDescriptionField(description) &&
          this.validateEvidenceField(evidence) && this.validateIncidentStatusField(incidentStatus)) {

          const updateData = {
              fechaincidente: incidentDate,
              descripcion: description,
              lugarincidente: location,
              evidencia: evidence,
              tipoincidente: incidentType,
              estadoincidente: incidentStatus,
          };

          try {
              const response = await fetch(`http://localhost:3000/incidentes/${documentoidentidad}`, {
                  method: 'PATCH',
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify(updateData),
              });

              if (response.status === 500) {
                  alert("Error: Error al actualizar incidente.");
              } else if (response.ok) {
                  const data = await response.json();
                  alert("Éxito: " + (data.message || "Incidente actualizado con éxito."));
                  this.updateForm.reset();
                  this.hideForm('update');
              } else if (response.status === 404) {
                  alert("Error: Incidente no encontrado.");
              } else if (response.status === 400) {
                  const errorData = await response.json();
                  alert("Error: " + (errorData.error || "Datos inválidos para la actualización."));
              } else {
                  const errorData = await response.json();
                  alert("Error: " + (errorData.error || "Error al actualizar incidente."));
              }
          } catch (error) {
              console.error("Error al actualizar el incidente:", error);
              alert("Error al actualizar el incidente.");
          }
      }
  }

  validateDocumentId() {
      const documentIdInput = document.getElementById('register-document-id');
      const validationMessage = document.getElementById('register-document-id-validation');
      const documentId = documentIdInput.value.trim();

      // Validar cédula o RUC
      let message = '';
      if (documentId.length === 10) {
          message = validateCI(documentId);
      } else if (documentId.length === 13) {
          message = validateRUC(documentId);
      } else {
          message = "El documento debe ser de 10 dígitos (cédula) o 13 dígitos (RUC).";
      }

      validationMessage.textContent = message;
      validationMessage.style.color = message.includes("válida") ? "green" : "red";
  }
}

// Validaciones de Cédula y RUC
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

document.addEventListener('DOMContentLoaded', () => {
  window.formHandler = new FormHandler();
});
