document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form form');
    const registerForm = document.querySelector('#register-form form');
    const userField = document.getElementById('usuario');
    const passwordField = document.getElementById('contrasena');
    const message = document.querySelector('.login-form .message');

    const registerSection = document.getElementById('register-form');
    const loginSection = document.getElementById('login-form');

    // Mostrar el formulario de registro
    document.querySelector('.register-button').addEventListener('click', () => {
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
    });

    // Volver al formulario de inicio de sesión
    document.querySelector('.login-button').addEventListener('click', () => {
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    // Lógica de inicio de sesión
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Previene el envío del formulario

        const user = userField.value;
        const password = passwordField.value;

        if (user === 'root' && password === '1234') {
            message.textContent = 'Ingreso Satisfactorio';
            message.className = 'message success';
        } else {
            message.textContent = 'Ingreso fallido';
            message.className = 'message error';
        }
    });

    // Puedes añadir la lógica de registro aquí si es necesario
});
