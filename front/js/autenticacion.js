//importamos el módulo crypto de node.js para encriptar la firma del token
const crypto = require('crypto');   

//Array de usuarios que simula la bbdd
const usuarios = [
    {nombreUsuario: "admin", contrasenia: "admin123"},
    {nombreUsuario: "usuario1", contrasenia: "1111"},
    {nombreUsuario: "usuario2", contrasenia: "2222"}
];


//Clave secreta para firmar los tokens JWT
const SECRET_KEY = "mi_clave_secreta";

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
function crearJWT(payload){
    //Creamos el header
    const header = {
        alg: "HS356",
        typ: 'JWT'
    };
    //Cofidificamos el header y el payload a base64
    const headerCodificado= base64UrlEncode(JSON.stringify(header));
    const payloadCodificado= base64UrlEncode (JSON.stringify(payload));

    //Creamos la firma con HMAC-SHA256
    const firma = crypto
    .createHmac('sha256', SECRET_KEY)// Usamos HMAC-SHA256 con nuestra clave secreta
    .update(`${headerCodificado}.${payloadCodificado}`) //Firmamos el header y el payload codificados
    .digest('base64')//Resultado en base64
    .replace(/\+/g, '-') //Reemplazamos caracteres para que no den problemas en las URLs
    .replace (/\//g,'_')
    .replace(/=/g, '');

//Unimos las tres partes para formar el JWT
return `${headerCodificado}.${payloadCodificado}.${firma}`;
};

//Función para verificar un JWT
function verificarJWT(token){
    const partes = token.sprit('.'); //Separamos el token en las tres partes

    if (partes.length !== 3){
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
            if (firmaRecibida !== firmaEsperada){
                return null;//Las firas no coinciden, token inválido

            }
            //Decodificamos el payload 
            const payload  = JSON.parse(base64UrlDecode(payloadCodificado));
            return payload; //Token válido, por lo que devolvemos los datos
}

//Creamos el Endpoint del login (la ruta que recibe el usuario y contraseña y devuelve el token)
function login(req,res){
    const { nombreUsuario,contrasenia } = req.body;//Recogemos los datos del cuerpo de la petición
    
    //Buscamos al usuario en el array. Find no devuelve el token, sino un objeto usuario o undefined si no lo encuentra
    const usuario = usuarios.find( user =>
        user.nombreUsuario === nombreUsuario && user.contrasenia === contrasenia
    );

    if (!usuario) {
        return res.status (401).json({
            message: "Credenciales incorrectas"
        });
    }

    //Si las credenciales son correctas, creamos el token
    const token = crearJWT(payload);

    //Enviamos al cliente el token de vuelta
    res.json({
        message: 'Autenticación correcta',
        token: token
    })

}

//Endpoint de bienvenida (ruta que necesita el token para acceder)




