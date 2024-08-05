document.getElementById('guardar').addEventListener('click', function() {
  // Obtener los valores de los campos del formulario
  const documentoidentidad = document.getElementById('documentoidentidad').value;
  const nombrecompleto = document.getElementById('nombrecompleto').value;
  const correo = document.getElementById('correo').value;
  const tipocliente = document.getElementById('tipocliente').value;
  const ciudad = document.getElementById('ciudad').value;
  const direccion = document.getElementById('direccion').value;
  const telefonoaseguradora = document.getElementById('telefonoaseguradora').value;
  const aseguradora = document.getElementById('company-register').value;
  const tiposeguro = document.getElementById('insuranceType-register').value;
  const producto = document.getElementById('product-register').value;
  const poliza = document.getElementById('poliza').value;
  const deducible = parseFloat(document.getElementById('deducible').value) || 0.00;
  const fechainicio = document.getElementById('fechainicio').value;
  const fechainiciovigencia = document.getElementById('fechainiciovigencia').value || fechainicio;
  const fechavencimientopoliza = document.getElementById('fechavencimientopoliza').value;
  const tipo = document.getElementById('tipo').value || 'N/A';
  const status = document.getElementById('status').value || 'Activo';
  const causacancelacion = document.getElementById('causacancelacion').value || null;
  const fechacancelacion = document.getElementById('fechacancelacion').value || null;
  const observaciones = document.getElementById('observaciones').value || '';

  // Crear el objeto JSON
  const jsonData = {
      documentoidentidad,
      nombrecompleto,
      correo,
      tipocliente,
      ciudad,
      direccion,
      telefonoaseguradora,
      aseguradora,
      tiposeguro,
      producto: producto || null,
      poliza: poliza || null,
      deducible,
      fechainicio,
      fechainiciovigencia,
      fechavencimientopoliza: fechavencimientopoliza || null,
      tipo,
      status,
      causacancelacion,
      fechacancelacion,
      observaciones
  };

  // Enviar el objeto JSON al servidor mediante POST
  fetch('http://localhost:3000/clientes', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
  })
  .then(response => response.json())
  .then(data => {
      if (data.error) {
          alert('Error: ' + data.error);
      } else {
          alert('�xito: ' + data.message);
          document.getElementById('cliente-form').reset();
      }
  })
  .catch((error) => {
      console.error('Error al enviar los datos:', error);
      alert('Error al enviar los datos.');
  });
});


const form = document.getElementById('cliente-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const jsonData = {};

  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  console.log(jsonData); // Verifica los datos en la consola

  fetch('http://localhost:3000/clientes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      alert('Error: ' + data.error);
    } else {
      alert('Éxito: ' + data.message);
      form.reset();
    }
  })
  .catch((error) => {
    console.error('Error al enviar los datos:', error);
    alert('Error al enviar los datos.');
  });
});


form.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const formData = new FormData(form);
    const jsonData = {};
  
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });
  
    // Validación en el frontend
    if (!jsonData.documentoidentidad || !jsonData.nombrecompleto || !jsonData.correo || !jsonData.tipocliente || !jsonData.ciudad || !jsonData.direccion || !jsonData.telefonoaseguradora || !jsonData.aseguradora || !jsonData.tiposeguro || !jsonData.fechainicio) {
      alert('Faltan datos obligatorios');
      return;
    }
  
    console.log(jsonData); // Verifica los datos en la consola
  
    fetch('http://localhost:3000/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert('Error: ' + data.error);
      } else {
        alert('Éxito: ' + data.message);
        form.reset();
      }
    })
    .catch((error) => {
      console.error('Error al enviar los datos:', error);
      alert('Error al enviar los datos.');
    });
  });
  


  // Consultar un cliente
document.getElementById('consultar').addEventListener('click', async () => {
  const documentoidentidad = document.getElementById('documentoidentidad').value;

  if (!documentoidentidad) {
      alert('Por favor, ingrese el documento de identidad.');
      return;
  }

  try {
      const response = await fetch(`http://localhost:3000/clientes/${documentoidentidad}`);
      
      if (!response.ok) {
          throw new Error('Error al consultar los datos');
      }

      const data = await response.json();

      if (data.error) {
          alert(data.error);
          return;
      }

      // Llenar la tabla con los datos
      const resultsBody = document.getElementById('results-body');
      resultsBody.innerHTML = `
          <tr>
              <td class="py-2 px-4 border-b">${data.nombrecompleto}</td>
              <td class="py-2 px-4 border-b">${data.correo}</td>
              <td class="py-2 px-4 border-b">${data.tipocliente}</td>
              <td class="py-2 px-4 border-b">${data.ciudad}</td>
              <td class="py-2 px-4 border-b">${data.direccion}</td>
              <td class="py-2 px-4 border-b">${data.telefonoaseguradora}</td>
              <td class="py-2 px-4 border-b">${data.aseguradora}</td>
              <td class="py-2 px-4 border-b">${data.tiposeguro}</td>
              <td class="py-2 px-4 border-b">${data.producto}</td>
              <td class="py-2 px-4 border-b">${data.poliza}</td>
              <td class="py-2 px-4 border-b">${data.deducible}</td>
              <td class="py-2 px-4 border-b">${data.fechainicio}</td>
              <td class="py-2 px-4 border-b">${data.fechainiciovigencia}</td>
              <td class="py-2 px-4 border-b">${data.fechavencimientopoliza}</td>
              <td class="py-2 px-4 border-b">${data.tipo}</td>
              <td class="py-2 px-4 border-b">${data.status}</td>
              <td class="py-2 px-4 border-b">${data.causacancelacion}</td>
              <td class="py-2 px-4 border-b">${data.fechacancelacion}</td>
              <td class="py-2 px-4 border-b">${data.observaciones}</td>
          </tr>
      `;

      // Mostrar la tabla con los resultados
      document.getElementById('consult-results').classList.remove('hidden');

  } catch (error) {
      console.error('Error al consultar los datos:', error);
      alert('Error al consultar los datos.');
  }
});
