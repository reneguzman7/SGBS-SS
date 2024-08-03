document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form');
    const registerForm = document.querySelector('#register-form');
    const userField = document.getElementById('correo');
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

    // Funci�n de validaci�n de contraseña
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
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previene el env�o del formulario

        const user = userField.value;
        const password = passwordField.value;

        if (!user || !password) {
            loginMessage.textContent = 'Correo y contraseña no pueden estar en blanco';
            loginMessage.className = 'message error';
        } else {
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: user, password: password }),
                });

                const result = await response.json();

                if (response.ok) {
                    loginMessage.textContent = 'Ingreso Satisfactorio';
                    loginMessage.className = 'message success';
                    setTimeout(() => {
                        window.location.href = '../html/clientes.html'; // Redirigir a la p�gina principal
                    }, 1500); // Esperar 1.5 segundos antes de redirigir
                } else {
                    loginMessage.textContent = result.error || 'Ingreso fallido';
                    loginMessage.className = 'message error';
                }
            } catch (error) {
                loginMessage.textContent = 'Error en el servidor';
                loginMessage.className = 'message error';
            }
        }
    });

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previene el envío del formulario
    
        const newUser = document.getElementById('new-correo').value;
        const newPassword = document.getElementById('new-contrasena').value;
    
        if (!validateEmail(newUser)) {
            registerMessage.textContent = 'Correo electrónico no válido';
            registerMessage.className = 'message error';
        } else if (!validatePassword(newPassword)) {
            registerMessage.textContent = 'La contraseña no cumple con los requisitos de seguridad';
            registerMessage.className = 'message error';
        } else {
            try {
                const response = await fetch('/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: newUser, password: newPassword }),
                });
    
                const result = await response.json();
    
                if (response.ok) {
                    registerMessage.textContent = 'Registro exitoso';
                    registerMessage.className = 'message success';
    
                    setTimeout(() => {
                        registerSection.style.display = 'none';
                        loginSection.style.display = 'block';
                        registerMessage.textContent = '';
                    }, 1500);
                } else {
                    registerMessage.textContent = result.error || 'Registro fallido';
                    registerMessage.className = 'message error';
                }
            } catch (error) {
                registerMessage.textContent = 'Error en el servidor';
                registerMessage.className = 'message error';
            }
        }
    });