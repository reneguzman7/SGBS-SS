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
  if (!searchId) {
    alert("Por favor ingrese un RUC o cédula");
    return;
  }
  fetch(`/consultPayments?searchId=${searchId}`)
    .then((response) => response.json())
    .then((data) => {
      // Populate fields
      document.getElementById("consultRUC").value = data.RUC || searchId;
      document.getElementById("consultAmount").value = data.amount || "";
      // Populate payments table
      const tableBody = document.getElementById("payments-table-body");
      if (Array.isArray(data.payments) && data.payments.length > 0) {
        tableBody.innerHTML = data.payments
          .map(
            (payment) => `
          <tr>
            <td>${payment.date || ""}</td>
            <td>${payment.contractNumber || ""}</td>
            <td>${payment.amount || ""}</td>
            <td>${payment.method || ""}</td>
            <td><span class="ss-badge ss-badge-${payment.statusClass || "success"
              }">${payment.status || ""}</span></td>
            <td>
              <button class="ss-btn ss-btn-sm ss-btn-outline"><i class="bi bi-eye"></i></button>
            </td>
          </tr>
        `
          )
          .join("");
      } else {
        tableBody.innerHTML =
          '<tr><td colspan="6">No se encontraron pagos</td></tr>';
      }
      document.getElementById("consult-results").style.display = "block";
    })
    .catch((error) => {
      document.getElementById("consultRUC").value = "";
      document.getElementById("consultAmount").value = "";
      document.getElementById("payments-table-body").innerHTML =
        '<tr><td colspan="6">Error al consultar pagos</td></tr>';
      document.getElementById("consult-results").style.display = "block";
      console.error("Error al consultar pagos:", error);
    });
}
