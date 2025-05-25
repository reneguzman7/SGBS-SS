document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form form");
  const registerForm = document.querySelector("#register-form form");
  const loginSection = document.getElementById("login-form");
  const registerSection = document.getElementById("register-form");
  const loginMessage = document.querySelector("#login-form .message");
  const registerMessage = document.querySelector("#register-form .message");

  // Mostrar el formulario de registro
  document.querySelector(".register-button").addEventListener("click", () => {
    loginSection.style.display = "none";
    registerSection.style.display = "block";
  });

  // Volver al formulario de inicio de sesión
  document.querySelector(".login-button").addEventListener("click", () => {
    registerSection.style.display = "none";
    loginSection.style.display = "block";
  });

  // Función de validación de contraseña
  function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNoSpaces = !/\s/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar &&
      hasNoSpaces
    );
  }

  // Función de validación de correo
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Previene el envío del formulario

    const user = document.getElementById("correo").value;
    const password = document.getElementById("contrasena").value;

    loginMessage.textContent = "";
    loginMessage.classList.remove("error", "success");

    if (!user) {
      loginMessage.textContent =
        "Error: Campo del correo del cliente vacío. Por favor, ingrese un correo.";
      loginMessage.classList.add("error");
    } else if (!password) {
      loginMessage.textContent =
        "Error: Campo de la contraseña del cliente vacío. Por favor, ingrese su contraseña.";
      loginMessage.classList.add("error");
    } else {
      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user, password: password }),
        });

        const result = await response.json();

        if (response.ok) {
          loginMessage.textContent = "Ingreso Satisfactorio";
          loginMessage.classList.add("success");
          setTimeout(() => {
            window.location.href = "../html/menu.html"; // Redirigir al menú
          }, 1500); // Esperar 1.5 segundos antes de redirigir
        } else {
          loginMessage.textContent = result.error || "Ingreso fallido";
          loginMessage.classList.add("error");
        }
      } catch (error) {
        loginMessage.textContent = "Error en el servidor";
        loginMessage.classList.add("error");
      }
    }
  });

  // L gica de registro
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Previene el env o del formulario

    const newUser = document.getElementById("new-correo").value;
    const newPassword = document.getElementById("new-contrasena").value;
    const confirmPassword = document.getElementById("conf-contrasena").value;

    registerMessage.textContent = "";
    registerMessage.classList.remove("error", "success");

    if (!validateEmail(newUser)) {
      registerMessage.textContent = "Correo electrónico no válido";
      registerMessage.classList.add("error");
    } else if (!validatePassword(newPassword)) {
      registerMessage.textContent =
        'La contrase a debe tener una longitud m nima de 8 caracteres, al menos una letra may�scula, una letra min�scula, un n�mero y un car cter especial como !@#$%^&*(),.?":{}|<>';
      registerMessage.classList.add("error");
    } else if (newPassword !== confirmPassword) {
      registerMessage.textContent = "Las contrase�as no coinciden";
      registerMessage.classList.add("error");
    } else {
      try {
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: newUser, password: newPassword }),
        });

        const result = await response.json();

        if (response.ok) {
          registerMessage.textContent = "Registro exitoso";
          registerMessage.classList.add("success");

          setTimeout(() => {
            registerSection.style.display = "none";
            loginSection.style.display = "block";
          }, 1500); // Esperar 1.5 segundos antes de volver a la pantalla de login
        } else {
          registerMessage.textContent = result.error || "Registro fallido";
          registerMessage.classList.add("error");
        }
      } catch (error) {
        registerMessage.textContent = "Error en el servidor";
        registerMessage.classList.add("error");
      }
    }
  });
});
