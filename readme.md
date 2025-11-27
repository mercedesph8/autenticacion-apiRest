# Sistema de Autenticación JWT con Node.js

Aplicación web full-stack que permite a los usuarios registrarse, iniciar sesión y acceder a páginas protegidas mediante tokens JWT. Desarrollado como práctica educativa para comprender el funcionamiento interno de JWT y la autenticación basada en tokens.

## 🚀 Características

- ✅ Sistema de login y registro
- ✅ Generación manual de JWT (sin librerías)
- ✅ Validación de tokens en el servidor
- ✅ Protección de rutas mediante middleware
- ✅ Páginas protegidas que requieren autenticación
- ✅ Almacenamiento de tokens en localStorage
- ✅ Cierre de sesión funcional
- ✅ Página de acceso denegado
- ✅ Diseño moderno con SCSS

## 🛠️ Tecnologías Utilizadas

**Backend:**
- Node.js
- Express.js
- JWT manual (implementación propia)

**Frontend:**
- HTML5
- JavaScript (Vanilla)
- SCSS/CSS3
- Fetch API

## 👤 Usuarios de Prueba

| Usuario  | Contraseña |
|----------|------------|
| admin    | 1234       |
| usuario  | abcd       |


## 📖 Flujo de la Aplicación

1. Usuario accede a `login.html`
2. Ingresa credenciales y las envía mediante `fetch()` (POST)
3. El servidor valida las credenciales
4. Si son correctas, genera un JWT manualmente y lo devuelve
5. El frontend guarda el token en `localStorage`
6. El usuario es redirigido a `bienvenida.html`
7. La página protegida verifica el token antes de mostrar contenido
8. Si no hay token o es inválido, redirige a `prohibido.html`

## 🔑 Funcionamiento del JWT Manual

El proyecto implementa JWT de forma manual sin usar librerías como `jsonwebtoken`:

1. **Generación del token:** Se crea un objeto con los datos del usuario y se codifica en Base64
2. **Firma del token:** Se genera una firma usando un secret key
3. **Validación:** El servidor verifica la firma antes de aceptar el token

## 🎨 Diseño

- **Paleta de colores:** Morado moderno con tonos oscuros
- **Estilo:** Minimalista y profesional
- **Arquitectura CSS:** SCSS modular con variables y mixins reutilizables

## 📚 Conceptos Aprendidos

- Arquitectura cliente-servidor
- Comunicación asíncrona con Fetch API
- JSON Web Tokens (JWT) - implementación manual
- Middleware de autenticación
- localStorage para persistencia
- Express.js y manejo de rutas
- SCSS modular y compilación
- Protección de rutas en aplicaciones web

## 👩‍💻 Autora

**MariMer**  
Estudiante de DAW (Desarrollo de Aplicaciones Web)  
Proyecto académico - Módulo DWEC

## 📝 Notas

- Este proyecto implementa JWT de forma **manual** con fines educativos
- Las contraseñas **NO** están encriptadas (solo para aprendizaje)
- En producción se recomienda:
  - Usar librerías establecidas (`jsonwebtoken`)
  - Encriptar contraseñas con `bcrypt`
  - Usar HTTPS
  - Implementar refresh tokens
  - Añadir tiempos de expiración

---

**Fecha de realización:** Noviembre 2024