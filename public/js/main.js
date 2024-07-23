document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form form');
    const registerForm = document.querySelector('#register-form form');
    const userField = document.getElementById('usuario');
    const passwordField = document.getElementById('contrasena');
    const loginMessage = document.querySelector('.login-form .message');
    const registerMessage = document.querySelector('.register-form .message');

    const registerSection = document.getElementById('register-form');
    const loginSection = document.getElementById('login-form');

    // Mostrar el formulario de registro
    document.querySelector('.register-button').addEventListener('click', () => {
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
    });

    // Volver al formulario de inicio de sesi�n
    document.querySelector('.login-button').addEventListener('click', () => {
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
    });

    // Funci�n de validaci�n de contrase�a
    function validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasNoSpaces = !/\s/.test(password);

        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && hasNoSpaces;
    }

    // L�gica de inicio de sesi�n
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Previene el env�o del formulario

        const user = userField.value;
        const password = passwordField.value;

        if (!user || !password) {
            loginMessage.textContent = 'Usuario y contrase�a no pueden estar vac�os';
            loginMessage.className = 'message error';
        } else if (user === 'root' && password === '1234') {
            loginMessage.textContent = 'Ingreso Satisfactorio';
            loginMessage.className = 'message success';
            setTimeout(() => {
                window.location.href = 'clientes.html'; // Redirigir a la p�gina principal
            }, 1500); // Esperar 1.5 segundos antes de redirigir
        }
        else if (!validatePassword(password)) {
            loginMessage.textContent = 'La contrase�a no cumple con los requisitos de seguridad';
            loginMessage.className = 'message error';
        } else {
            loginMessage.textContent = 'Ingreso fallido';
            loginMessage.className = 'message error';
        }
    });

    // L�gica de registro
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previene el env�o del formulario

        const newUser = document.getElementById('new-usuario').value;
        const newPassword = document.getElementById('new-contrasena').value;
        const confirmPassword = document.getElementById('conf-contrasena').value;

        if (!newUser) {
            registerMessage.textContent = 'El nombre de usuario no puede estar vac�o';
            registerMessage.className = 'message error';
        } else if (!newPassword || !confirmPassword) {
            registerMessage.textContent = 'Las contrase�as no pueden estar vac�as';
            registerMessage.className = 'message error';
        } else if (!validatePassword(newPassword)) {
            registerMessage.textContent = 'La contrase�a no cumple con los requisitos de seguridad';
            registerMessage.className = 'message error';
        } else if (newPassword !== confirmPassword) {
            registerMessage.textContent = 'Las contrase�as no coinciden';
            registerMessage.className = 'message error';
        } else {
            registerMessage.textContent = 'Registro exitoso';
            registerMessage.className = 'message success';

            // Esperar 1.5 segundos y luego volver al inicio de sesi�n
            setTimeout(() => {
                registerSection.style.display = 'none';
                loginSection.style.display = 'block';
                registerMessage.textContent = '';
            }, 1500);
        }
    });
});
