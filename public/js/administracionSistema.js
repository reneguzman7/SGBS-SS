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
