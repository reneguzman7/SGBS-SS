document.addEventListener("DOMContentLoaded", function () {
  console.log("Módulo de gestión de pagos cargado");
  showSection("register"); // Mostrar por defecto el formulario de registro
});

function showSection(section) {
  const sections = ["register", "consult"];
  sections.forEach((sec) => {
    document.getElementById(`${sec}-section`).classList.add("hidden");
  });
  document.getElementById(`${section}-section`).classList.remove("hidden");
}

function consultPayments() {
  const searchId = document.getElementById("consultSearchId").value;
  fetch(`/consultPayments?searchId=${searchId}`)
    .then((response) => response.json())
    .then((data) => {
      // Aquí debes rellenar los campos del formulario con los datos recibidos
      document.getElementById("consultRUC").value = data.RUC;
      document.getElementById("consultAmount").value = data.amount;
      document.getElementById("consultContractNumber").value =
        data.contractNumber;
    })
    .catch((error) => console.error("Error al consultar pagos:", error));
}
