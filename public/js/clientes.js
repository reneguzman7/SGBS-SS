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
  const documentoidentidad = document.getElementById('documentoidentidad-consulta').value;

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










document.getElementById('search-button').addEventListener('click', async () => {
  const documentoidentidad = document.getElementById('search-documentoidentidad').value;
  
  if (!documentoidentidad) {
      alert('Por favor, ingresa un Documento de Identidad.');
      return;
  }
  
  try {
      // Reemplaza con la URL de tu API para buscar el registro
      const response = await fetch(`/api/getRecord?documentoidentidad=${encodeURIComponent(documentoidentidad)}`);
      const data = await response.json();

      if (response.ok && data) {
          document.getElementById('documentoidentidad-update').value = data.documentoidentidad || '';
          document.getElementById('nombrecompleto-update').value = data.nombrecompleto || '';
          document.getElementById('correo-update').value = data.correo || '';
          document.getElementById('tipocliente-update').value = data.tipocliente || '';
          document.getElementById('ciudad-update').value = data.ciudad || '';
          document.getElementById('direccion-update').value = data.direccion || '';
          document.getElementById('telefonoaseguradora-update').value = data.telefonoaseguradora || '';
          document.getElementById('aseguradora-update').value = data.aseguradora || '';
          document.getElementById('tiposeguro-update').value = data.tiposeguro || '';
          document.getElementById('producto-update').value = data.producto || '';
          document.getElementById('poliza-update').value = data.poliza || '';
          document.getElementById('deducible-update').value = data.deducible || '';
          document.getElementById('fechainicio-update').value = data.fechainicio || '';
          document.getElementById('fechainiciovigencia-update').value = data.fechainiciovigencia || '';
          document.getElementById('fechavencimientopoliza-update').value = data.fechavencimientopoliza || '';
          document.getElementById('tipo-update').value = data.tipo || '';
          document.getElementById('status-update').value = data.status || '';
          document.getElementById('causacancelacion-update').value = data.causacancelacion || '';
          document.getElementById('fechacancelacion-update').value = data.fechacancelacion || '';
          document.getElementById('observaciones-update').value = data.observaciones || '';

          // Muestra el formulario de actualización
          document.getElementById('update-form').classList.remove('hidden');
      } else {
          alert('No se encontró ningún registro con ese Documento de Identidad.');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al buscar el registro.');
  }
});

document.getElementById('guardar').addEventListener('click', async () => {
  const documentoidentidad = document.getElementById('documentoidentidad-update').value;
  const nombrecompleto = document.getElementById('nombrecompleto-update').value;
  const correo = document.getElementById('correo-update').value;
  const tipocliente = document.getElementById('tipocliente-update').value;
  const ciudad = document.getElementById('ciudad-update').value;
  const direccion = document.getElementById('direccion-update').value;
  const telefonoaseguradora = document.getElementById('telefonoaseguradora-update').value;
  const aseguradora = document.getElementById('aseguradora-update').value;
  const tiposeguro = document.getElementById('tiposeguro-update').value;
  const producto = document.getElementById('producto-update').value;
  const poliza = document.getElementById('poliza-update').value;
  const deducible = document.getElementById('deducible-update').value;
  const fechainicio = document.getElementById('fechainicio-update').value;
  const fechainiciovigencia = document.getElementById('fechainiciovigencia-update').value;
  const fechavencimientopoliza = document.getElementById('fechavencimientopoliza-update').value;
  const tipo = document.getElementById('tipo-update').value;
  const status = document.getElementById('status-update').value;
  const causacancelacion = document.getElementById('causacancelacion-update').value;
  const fechacancelacion = document.getElementById('fechacancelacion-update').value;
  const observaciones = document.getElementById('observaciones-update').value;

  if (!documentoidentidad) {
      alert('Por favor, ingresa el Documento de Identidad.');
      return;
  }

  try {
      // Reemplaza con la URL de tu API para actualizar el registro
      const response = await fetch(`/api/updateRecord`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              documentoidentidad,
              nombrecompleto,
              correo,
              tipocliente,
              ciudad,
              direccion,
              telefonoaseguradora,
              aseguradora,
              tiposeguro,
              producto,
              poliza,
              deducible,
              fechainicio,
              fechainiciovigencia,
              fechavencimientopoliza,
              tipo,
              status,
              causacancelacion,
              fechacancelacion,
              observaciones,
          }),
      });

      if (response.ok) {
          alert('Registro actualizado con éxito.');
      } else {
          alert('No se pudo actualizar el registro.');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al actualizar el registro.');
  }
});
