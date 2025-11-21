// Este archivo maneja la página de bienvenida y verifica la autenticación

document.addEventListener("DOMContentLoaded", async () => {
  //Esperar a que la página se cargue completamente

  const token = localStorage.getItem("token"); //Nos traemos el token del localStorage

  //Si no hay token, redirige a la página de permisos
  if (!token) {
    window.location.href = "prohibido.html";
    return;
  }

  //Si hay token, pedimos los datos al servidor
  obtenerDatosUsuario(token);

  //Configuramos el botón de cerrar sesión
  const botonCerrarSesion = document.getElementById("botonCerrarSesion");
  botonCerrarSesion.addEventListener("click", cerrarSesion);
});

//Funcion para obtener datos del usuario desde el servidor
async function obtenerDatosUsuario(token) {
  const response = await fetch("/api/bienvenida", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, //Enviamos el token en la cabecera de autorización
    },
  });

  //Convertimos la respuesta a JSON
  const data = await response.json();

  if (response.ok) {
    //Si el token es válido
    //Mostramos los datos en la página
    mostrarDatosUsuario(data);
  } else {
    //Si el token no es valido, redirigimos a permisos
    window.location.href = "prohibido.html";
  }
}


 function mostrarDatosUsuario(data) {
    //Mostramos nombre de usuario
    const nombreUsuario = document.getElementById("nombreUsuario");
    nombreUsuario.textContent = data.nombreUsuario;
    //Mostramos hora de acceso
    const fechayHora = document.getElementById("fechaHora");
    fechayHora.textContent = data.hora;
  }

  //Función para cerrar sesión
  function cerrarSesion() {
    //Preguntamos si esta seguro de cerrar sesión
    const confirmar = confirm("¿Estás seguro de que quieres cerrar la sesión?");
    if (confirmar) {
      //Si confirma, borramos el token del localStorage y redirigimos al login
      localStorage.removeItem("token");

      //Redirigimos al login
      window.location.href = "login.html";
    }
  }