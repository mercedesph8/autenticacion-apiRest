const express = require("express"); //Importamos el framework Express para crear el servidor web
const crypto = require("crypto"); //Importamos el módulo crypto de Node.js para encriptar
const cors = require("cors"); //Importamos el módulo cors para permitir peticiones desde el front
const path = require("path");

const app = express(); //Creamos la aplicación express
app.use(express.json()); //Para que convierta los archivos json en JS y pueda manejarlos
app.use(cors()); //Habilitamos CORS para todas las rutas

const frontPath = path.join(__dirname, '../front'); //Definimos la ruta del front
app.use(express.static(frontPath)); //Servimos los archivos estáticos del front

// Ruta raíz que redirige al login
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

//Clave secreta para firmar los tokens JWT
const SECRET_KEY = "mi_clave_secreta";
const PORT = process.env.PORT || 3000; //Le dice que use el puerto que está en la variable de entorno PORT y si no existe, usa el puerto 3000

//Array de usuarios que simula la bbdd
const usuarios = [
    { nombreUsuario: "admin", contrasenia: "admin123" },
    { nombreUsuario: "usuario1", contrasenia: "1111" },
    { nombreUsuario: "usuario2", contrasenia: "2222" }
];


function base64UrlEncode(data) {
    //convertimos a base64 el payload y el header del token
    return Buffer.from(data).toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
//Se reemplazan los caracteres /,+ y = por otros porque pueden dar problemas en las URLs


function base64UrlDecode(data) {
    //Revertimos los cambios y ddecodificamos el header y payload
    data = data.replace(/-/g, '+').replace(/_/g, '/');
    return Buffer.from(data, 'base64').toString('utf8');
}

//Función para crear un JWT
function crearJWT(payload) {
    //Creamos el header
    const header = {
        alg: "HS256",
        typ: 'JWT'
    };
    //Cofidificamos el header y el payload a base64
    const headerCodificado = base64UrlEncode(JSON.stringify(header));
    const payloadCodificado = base64UrlEncode(JSON.stringify(payload));

    //Creamos la firma con HMAC-SHA256
    const firma = crypto
        .createHmac('sha256', SECRET_KEY)// Usamos HMAC-SHA256 con nuestra clave secreta
        .update(`${headerCodificado}.${payloadCodificado}`) //Firmamos el header y el payload codificados
        .digest('base64')//Resultado en base64
        .replace(/\+/g, '-') //Reemplazamos caracteres para que no den problemas en las URLs
        .replace(/\//g, '_')
        .replace(/=/g, '');

    //Unimos las tres partes para formar el JWT
    return `${headerCodificado}.${payloadCodificado}.${firma}`;
};

//Función para verificar un JWT
function verificarJWT(token) {
    const partes = token.split('.'); //Separamos el token en las tres partes

    if (partes.length !== 3) {
        return null//Token inválido
    }
    const [headerCodificado, payloadCodificado, firmaRecibida] = partes;

    //Recreamos la firma con los mismos datos
    const firmaEsperada = crypto
        .createHmac('sha256', SECRET_KEY)
        .update(`${headerCodificado}.${payloadCodificado}`)
        .digest('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');

    //Comparamos la firma recibida con la esperada
    if (firmaRecibida !== firmaEsperada) {
        return null;//Las firas no coinciden, token inválido

    }
    //Decodificamos el payload 
    const payload = JSON.parse(base64UrlDecode(payloadCodificado));
    return payload; //Token válido, por lo que devolvemos los datos
}

//Creamos el Endpoint del login (la ruta que recibe el usuario y contraseña y devuelve el token)
app.post('/api/login', (req, res) => {
    const { nombreUsuario, contrasenia } = req.body;//Recogemos los datos del cuerpo de la petición

    //Buscamos al usuario en el array. Find no devuelve el token, sino un objeto usuario o undefined si no lo encuentra
    const usuario = usuarios.find(user =>
        user.nombreUsuario === nombreUsuario && user.contrasenia === contrasenia
    );

    if (!usuario) {
        return res.status(401).json({
            message: "Credenciales incorrectas"
        });
    }

    const payload = {
        nombreUsuario: usuario.nombreUsuario,
        fechaExpiracion: Math.floor(Date.now() / 1000) + 3600 //El token expira en 1 hora
    };

    //Creamos el token con ese payload
    const token = crearJWT(payload);

    //Enviamos al cliente la respuesta con éxito del token 
    res.json({
        message: 'Autenticación correcta',
        token: token
    });
});

//Endpoint de bienvenida (ruta que necesita el token para acceder)
app.get('/api/bienvenida', (req, res) => {
    //Necesitamos obtener el token que viene en la cabecera (authorization)
    const autenticacionHeader = req.headers['authorization']; //Recogemos el token del header de autorización

    //Verificamos que el header existe, si no existe, error 
    if (!autenticacionHeader) {
        return res.status(403).json({
            message: "No tienes permisos para acceder"
        });
    }

    const token = autenticacionHeader.split(' ')[1]; //Divide el string por espacios y coge el segundo elemento (el token)

    if (!token) {
        return res.status(403).json({
            message: "Token no proporcionado"
        });
    }
    //Verificamos si el token es válido
    const payload = verificarJWT(token);//Si el token es válido, devuelve el payload decodificado. Si es inválido, null. 
    //Si es inválido, error
    if (!payload) {
        return res.status(403).json({
            message: 'Token inválido o expirado'
        });
    }
    //Si el token es válido, devolvemos la bienvenida
    res.json({
        message: 'Bienvenido',
        nombreUsuario: payload.nombreUsuario, //Del JWT decodificado
        hora: new Date().toLocaleString('es-ES')
    });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); //Con esto arrancamos el servidor y se pone a "escuchar" en el puerto que le hemos dicho

