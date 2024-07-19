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
        } else if (newPassword !== confirmPassword) {
            registerMessage.textContent = 'Las contrase�as no coinciden';
            registerMessage.className = 'message error';
        } else {
            registerMessage.textContent = 'Registro exitoso';
            registerMessage.className = 'message success';
            
            // Esperar 3 segundos y luego volver al inicio de sesi�n
            await sleep(1500);
            registerSection.style.display = 'none';
            loginSection.style.display = 'block';
            registerMessage.textContent = '';
        }
    });

    // Funci�n sleep
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});
