//Este archivo maneja el formulario de login y la comunicación con el servidor para autenticar a los usuarios

document.addEventListener('DOMContentLoaded', () => { //Esperar a que la página se cargue completamente


//Capturamos el formulario del login por id
const loginForm = document.getElementById('loginForm');

//Agregar un envent Listener para escuchar cuando se envie el formulario
loginForm.addEventListener('submit', async (event) =>{
  event.preventDefault(); //Para detener el comportamiento por defecto del formulario

  //Recogemos los valores de los campos del formulario
  const nombreUsuario = document.getElementById('nombreUsuario').value;
  const contrasenia = document.getElementById('contrasenia').value;

  //Enviamos los datos al servidor usando fetch
  const response = await fetch ('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
  },
    body: JSON.stringify({ //Convertimos los dos valores de JS a TEXTO para que el servidor lo entienda
      nombreUsuario: nombreUsuario,
      contrasenia: contrasenia,
    })
  });

//Convertimos la respuesta del servidor a JSON
const data = await response.json();

//Comprobamos si el login ha sido exitoso
if(response.ok){
  //Guardamos el token en el localStorage del navegador
  localStorage.setItem('token',data.token);
  //Redirigimos a la página de bienvenida
  window.location.href = '/bienvenida.html';
} else {
  alert("Credenciales incorrectas");
}
});
});
