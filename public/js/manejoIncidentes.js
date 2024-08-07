document.addEventListener("DOMContentLoaded", function () {
  console.log("Módulo de Manejo de Incidentes cargado");
  showSection("register"); // Mostrar por defecto el formulario de registro
});

function showSection(section) {
  const forms = document.querySelectorAll("#form-container > div");
  forms.forEach((form) => form.classList.add("hidden")); // Ocultar todos los formularios

  const activeForm = document.getElementById(section + "-form");
  if (activeForm) {
    activeForm.classList.remove("hidden"); // Mostrar el formulario activo
  }
}

function consultIncident() {
  const searchId = document.getElementById("searchId").value;
  fetch(`/consultIncident?searchId=${searchId}`)
    .then((response) => response.json())
    .then((data) => {
      // Rellenar campos del formulario con los datos recibidos
      const details = `
                <p><strong>Cédula/RUC:</strong> ${data.idCedulaRuc}</p>
                <p><strong>ID Incidente:</strong> ${data.idIncident}</p>
                <p><strong>Descripción:</strong> ${data.description}</p>
                <p><strong>Anexos:</strong> ${data.annexes}</p>
                <p><strong>Fecha:</strong> ${data.date}</p>
                <p><strong>Lugar:</strong> ${data.place}</p>
                <p><strong>Evidencia:</strong> ${data.evidence}</p>
                <p><strong>Tipo de Incidente:</strong> ${data.incidentType}</p>
                <p><strong>Estado del Incidente:</strong> ${data.statusIncident}</p>
            `;
      document.getElementById("incident-details").innerHTML = details;
    })
    .catch((error) => console.error("Error al consultar incidente:", error));
}

function updateIncident() {
  const searchId = document.getElementById("searchIdUpdate").value;
  fetch(`/updateIncident?searchId=${searchId}`)
    .then((response) => response.json())
    .then((data) => {
      // Rellenar campos del formulario con los datos recibidos
      const details = `
                <p><strong>Cédula/RUC:</strong> ${data.idCedulaRuc}</p>
                <p><strong>ID Incidente:</strong> ${data.idIncident}</p>
                <p><strong>Descripción:</strong> ${data.description}</p>
                <p><strong>Anexos:</strong> ${data.annexes}</p>
                <p><strong>Fecha:</strong> ${data.date}</p>
                <p><strong>Lugar:</strong> ${data.place}</p>
                <p><strong>Evidencia:</strong> ${data.evidence}</p>
                <p><strong>Tipo de Incidente:</strong> ${data.incidentType}</p>
                <p><strong>Estado del Incidente:</strong> ${data.statusIncident}</p>
            `;
      document.getElementById("incident-details-update").innerHTML = details;
    })
    .catch((error) => console.error("Error al actualizar incidente:", error));
}
