document.addEventListener("DOMContentLoaded", function () {
  console.log("Módulo de aseguradoras cargado");
  showForm("register"); // Mostrar por defecto el formulario de registro
});

function showForm(formId) {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.classList.add("hidden");
  });

  const formToShow = document.getElementById(formId);
  if (formToShow) {
    formToShow.classList.remove("hidden");
  }
}

function fetchUserDetailsById() {
  const userId = document.getElementById('user-id').value;
  if (!userId) {
    alert('Por favor ingrese un ID de usuario');
    return;
  }
  // Simulate fetch (replace with real API call if available)
  // Example: fetch(`/api/users/${userId}`).then(...)
  // For now, populate with sample data
  document.getElementById('user-details').style.display = 'block';
  document.getElementById('update-email').value = 'usuario@ejemplo.com';
  document.getElementById('update-status').value = 'activo';
}
