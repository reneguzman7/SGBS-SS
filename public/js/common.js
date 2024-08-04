// public/js/common.js

const insuranceData = {
    "Zurich": {
      "Vehículos": ["Seguro Planeta", "Tailor Made"],
      "Responsabilidad Civil": ["Responsabilidad Civil para Empresas"],
      "Seguro Hogar": ["Hogar Total", "Hogar Protegido", "Seguro por Dentro"],
      "Incendio y Desastres Naturales": []
    },
    "Latina": {
      "Vehículos": ["Básicos", "Premium"],
      "Desgravamen": []
    },
    "AMA": {
      "Responsabilidad Civil": ["RC", "Profesional Individual", "Sociedades"],
      "Vehículos": ["Básicos", "Premium"]
    },
    "Sweden": {
      "Vehículos": ["Vehículo", "Motocicleta"],
      "Viaje": ["Hogar Seguro Sylver"]
    },
    "MAFRE": {
      "Vehículos": [],
      "Responsabilidad Civil": [],
      "Desgravamen": [],
      "Incendio y Líneas Aliadas": []
    },
    "Equinoccial": {
      "Vida": []
    },
    "Hispana": {
      "Vehículos": []
    },
    "BMI": {
      "Medicina Prepagada": ["Individual", "Corporativo"],
      "Ahorro": [],
      "Vida": [],
      "Dental": [],
      "Cobertura por Cáncer": []
    },
    "Cofiamed": {
      "Medicina Prepagada": []
    },
    "Humanda": {
      "Medicina Prepagada": []
    },
    "Saludsa": {
      "Medicina Prepagada": []
    }
  };
  
  function updateInsuranceTypes(company) {
    const insuranceTypeSelect = document.getElementById('insuranceType-register');
    const productSelect = document.getElementById('product-register');
  
    insuranceTypeSelect.innerHTML = '<option value="">Seleccione el tipo de seguro</option>';
    productSelect.innerHTML = '<option value="">Seleccione el producto (si aplica)</option>';
  
    if (company && insuranceData[company]) {
      const insuranceTypes = Object.keys(insuranceData[company]);
      insuranceTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        insuranceTypeSelect.appendChild(option);
      });
    }
  }
  
  function updateProducts(insuranceType) {
    const company = document.getElementById('company-register').value;
    const productSelect = document.getElementById('product-register');
  
    productSelect.innerHTML = '<option value="">Seleccione el producto (si aplica)</option>';
  
    if (company && insuranceType && insuranceData[company][insuranceType]) {
      const products = insuranceData[company][insuranceType];
      products.forEach(product => {
        const option = document.createElement('option');
        option.value = product;
        option.textContent = product;
        productSelect.appendChild(option);
      });
    }
  }