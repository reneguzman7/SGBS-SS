document.getElementById('guardar').addEventListener('click', function() {
  // Obtener los valores de los campos del formulario
  const documentoidentidad = document.getElementById('documentoidentidad').value;
  const nombrecompleto = document.getElementById('nombrecompleto').value;
  const correo = document.getElementById('correo').value;
  const tipocliente = document.getElementById('tipocliente').value;
  const ciudad = document.getElementById('ciudad').value;
  const direccion = document.getElementById('direccion').value;
  const telefonoaseguradora = document.getElementById('telefonoaseguradora').value;
  const aseguradora = document.getElementById('aseguradora').value;
  const tiposeguro = document.getElementById('tiposeguro').value;
  const producto = document.getElementById('producto').value;
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
          alert('Éxito: ' + data.message);
          document.getElementById('cliente-form').reset();
      }
  })
  .catch((error) => {
      console.error('Error al enviar los datos:', error);
      alert('Error al enviar los datos.');
  });
});
