class FormHandler {
  constructor() {
    this.registerForm = document.getElementById('register-form');
    this.consultForm = document.getElementById('consult-form');
    this.updateForm = document.getElementById('update-form');
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.getElementById('consultar').addEventListener('click', () => this.consultIncident());
    this.registerForm.addEventListener('submit', (event) => this.registerIncident(event));
    document.getElementById('update-button').addEventListener('click', () => this.updateIncident());
  }

  showSection(section) {
    ['register', 'consult', 'update'].forEach(s => {
      document.getElementById(`${s}-form`).classList.add('hidden');
    });
    document.getElementById(`${section}-form`).classList.remove('hidden');
  }

  hideForm(formId) {
    document.getElementById(`${formId}-form`).classList.add('hidden');
  }

  async consultIncident() {
    const documentId = document.getElementById('document-id-consult').value;

    if (!documentId) {
      alert("Por favor, ingrese el documento de identidad.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/incidentes/${documentId}`);
      const data = await response.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      document.getElementById('incident-date-consult').value = data.fecha || '';
      document.getElementById('description-consult').value = data.descripcion || '';
      document.getElementById('location-consult').value = data.lugar || '';
      document.getElementById('evidence-consult').value = data.evidencia || '';
      document.getElementById('incident-type-consult').value = data.tipo || '';
      document.getElementById('incident-status-consult').value = data.estado || '';

      this.showSection('consult');
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
      fecha: incidentDate,
      descripcion: description,
      lugar: location,
      evidencia: evidence,
      tipo: incidentType,
      estado: incidentStatus,
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
      descripcion: description,
      lugarincidente: location,
      evidencia: evidence,
      tipoincidente: incidentType,
      estadoincidente: incidentStatus,
    };

    Object.keys(updateData).forEach(key => updateData[key] === null && delete updateData[key]);

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
      console.error("Error al actualizar el incidente:", error);
      alert("Ocurrió un error al actualizar el incidente.");
    }
  }
} 