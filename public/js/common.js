const insuranceData = {
  Zurich: {
    "Vehículos": ["Seguro Planeta", "Tailor Made"],
    "Responsabilidad Civil": ["Responsabilidad Civil para Empresas"],
    "Seguro Hogar": ["Hogar Total", "Hogar Protegido", "Seguro por Dentro"],
    "Incendio y Desastres Naturales": [],
  },
  Latina: {
    "Vehículos": ["Básicos", "Premium"],
    Desgravamen: [],
  },
  AMA: {
    "Responsabilidad Civil": ["RC", "Profesional Individual", "Sociedades"],
    "Vehículos": ["Básicos", "Premium"],
  },
  Sweden: {
    "Vehículos": ["Vehículo", "Motocicleta"],
    Viaje: ["Hogar Seguro Sylver"],
  },
  MAFRE: {
    "Vehículos": [],
    "Responsabilidad Civil": [],
    Desgravamen: [],
    "Incendio y Líneas Aliadas": [],
  },
  Equinoccial: {
    Vida: [],
  },
  Hispana: {
    "Vehículos": [],
  },
  BMI: {
    "Medicina Prepagada": ["Individual", "Corporativo"],
    Ahorro: [],
    Vida: [],
    Dental: [],
    "Cobertura por Cáncer": [],
  },
  Cofiamed: {
    "Medicina Prepagada": [],
  },
  Humanda: {
    "Medicina Prepagada": [],
  },
  Saludsa: {
    "Medicina Prepagada": [],
  },
};

function updateInsuranceTypes(company) {
  const insuranceTypeSelect = document.getElementById("insuranceType-register");
  const productSelect = document.getElementById("product-register");

  insuranceTypeSelect.innerHTML =
    '<option value="">Seleccione el tipo de seguro</option>';
  productSelect.innerHTML =
    '<option value="">Seleccione el producto (si aplica)</option>';

  if (company && insuranceData[company]) {
    const insuranceTypes = Object.keys(insuranceData[company]);
    insuranceTypes.forEach((type) => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      insuranceTypeSelect.appendChild(option);
    });
  }
}

function updateProducts(insuranceType) {
  const company = document.getElementById("company-register").value;
  const productSelect = document.getElementById("product-register");

  productSelect.innerHTML =
    '<option value="">Seleccione el producto (si aplica)</option>';

  if (company && insuranceType && insuranceData[company][insuranceType]) {
    const products = insuranceData[company][insuranceType];
    products.forEach((product) => {
      const option = document.createElement("option");
      option.value = product;
      option.textContent = product;
      productSelect.appendChild(option);
    });
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

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (re.test(email)) {
    return "El correo electrónico es válido.";
  } else {
    return "El correo electrónico no es válido.";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const documentoidentidadInput = document.getElementById("documentoidentidad");
  const correoInput = document.getElementById("correo");

  documentoidentidadInput.addEventListener("blur", function () {
    const value = documentoidentidadInput.value;
    let validationMessage = "";

    if (value.length === 10) {
      validationMessage = validateCI(value);
    } else if (value.length === 13) {
      validationMessage = validateRUC(value);
    } else {
      validationMessage =
        "El documento debe ser de 10 dígitos (cédula) o 13 dígitos (RUC).";
    }

    const validationMessageElement = document.getElementById("documentoidentidad-validation");
    validationMessageElement.textContent = validationMessage;
    validationMessageElement.style.color = validationMessage.includes("válida")
      ? "green"
      : "red";
  });

  correoInput.addEventListener("blur", function () {
    const value = correoInput.value;
    const validationMessage = validateEmail(value);

    const validationMessageElement = document.getElementById("correo-validation");
    validationMessageElement.textContent = validationMessage;
    validationMessageElement.style.color = validationMessage.includes("válido")
      ? "green"
      : "red";
  });
});
