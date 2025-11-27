## 🚀 Características

- ✅ Sistema de login y registro
- ✅ Generación manual de JWT (sin librerías)
- ✅ Validación de tokens en el servidor
- ✅ Protección de rutas mediante middleware
- ✅ Páginas protegidas que requieren autenticación
- ✅ Almacenamiento de tokens en localStorage
- ✅ Cierre de sesión funcional
- ✅ Página de acceso denegado


## Flujo de la Aplicación
1. Usuario accede a `login.html`
2. Ingresa credenciales y las envía mediante `fetch()` (POST)
3. El servidor valida las credenciales
4. Si son correctas, genera un JWT manualmente y lo devuelve
5. El frontend guarda el token en `localStorage`
6. El usuario es redirigido a `bienvenida.html`
7. La página protegida verifica el token antes de mostrar contenido
8. Si no hay token o es inválido, redirige a `prohibido.html`

## Autora

Mercedes Peña Herrera