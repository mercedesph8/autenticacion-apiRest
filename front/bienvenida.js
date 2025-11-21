// Este archivo maneja la página de bienvenida y verifica la autenticación

document.addEventListener('DOMContentLoaded', async () => {
  //Esperar a que la página se cargue completamente


  const token = localStorage.getItem('token'); //Nos traemos el token del localStorage

  //Si no hay token, redirige a la página de permisos
  if(!token){
    window.location.href = 'permisos.html';
    return;
  }

  //Si hay token, pedimos los datos al servidor
  obtenerDatosUsuario(token);
})