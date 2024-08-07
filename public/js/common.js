const insuranceData = {
  Zurich: {
    "Veh�culos": ["Seguro Planeta", "Tailor Made"],
    "Responsabilidad Civil": ["Responsabilidad Civil para Empresas"],
    "Seguro Hogar": ["Hogar Total", "Hogar Protegido", "Seguro por Dentro"],
    "Incendio y Desastres Naturales": [],
  },
  Latina: {
    "Veh�culos": ["B�sicos", "Premium"],
    Desgravamen: [],
  },
  AMA: {
    "Responsabilidad Civil": ["RC", "Profesional Individual", "Sociedades"],
    "Veh�culos": ["B�sicos", "Premium"],
  },
  Sweden: {
    "Veh�culos": ["Veh�culo", "Motocicleta"],
    Viaje: ["Hogar Seguro Sylver"],
  },
  MAFRE: {
    "Veh�culos": [],
    "Responsabilidad Civil": [],
    Desgravamen: [],
    "Incendio y L�neas Aliadas": [],
  },
  Equinoccial: {
    Vida: [],
  },
  Hispana: {
    "Veh�culos": [],
  },
  BMI: {
    "Medicina Prepagada": ["Individual", "Corporativo"],
    Ahorro: [],
    Vida: [],
    Dental: [],
    "Cobertura por C�ncer": [],
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
    return "La c�dula debe contener solo n�meros.";
  }
  if (ci.length !== 10) {
    return "La c�dula debe ser de 10 d�gitos.";
  }
  if (parseInt(ci, 10) === 0) {
    return "La c�dula ingresada no puede ser cero.";
  }
  if (ci.startsWith("30")) {
    return "La c�dula es v�lida.";
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
    return "La c�dula es v�lida.";
  } else {
    return "La c�dula ingresada no es v�lida.";
  }
}

function isNumeric(value) {
  return /^\d+$/.test(value);
}

function validateRUC(ruc) {
  if (ruc.length !== 13) {
    return "El RUC debe ser de 13 d�gitos.";
  }
  if (!ruc.endsWith("001")) {
    return "El RUC debe terminar en '001'.";
  }

  let ci = ruc.substring(0, 10);
  let ciValidation = validateCI(ci);

  if (ciValidation === "La c�dula es v�lida.") {
    return "El RUC es v�lido.";
  } else {
    return "El RUC ingresado no es v�lido.";
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (re.test(email)) {
    return "El correo electr�nico es v�lido.";
  } else {
    return "El correo electr�nico no es v�lido.";
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
        "El documento debe ser de 10 d�gitos (c�dula) o 13 d�gitos (RUC).";
    }

    const validationMessageElement = document.getElementById("documentoidentidad-validation");
    validationMessageElement.textContent = validationMessage;
    validationMessageElement.style.color = validationMessage.includes("v�lida")
      ? "green"
      : "red";
  });

  correoInput.addEventListener("blur", function () {
    const value = correoInput.value;
    const validationMessage = validateEmail(value);

    const validationMessageElement = document.getElementById("correo-validation");
    validationMessageElement.textContent = validationMessage;
    validationMessageElement.style.color = validationMessage.includes("v�lido")
      ? "green"
      : "red";
  });
});
