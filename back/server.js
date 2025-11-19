import express from "express"; //Importamos la librería
import path from "path";//importamos el módulo path de Node.js para trabajar con rutas de archivos
import { fileURLToPath} from "url";//Necesitamos esta función para convertir URLs arutas del sistema
const __filename = fileURLToPath (import.meta.url); //Con estas dos lineas le decimos a Express dónde están los archivos HTML del front
const __dirname = path.dirname(__filename);

const app = express(); //Creamos la aplicación express
app.use (express.json()); //Para que convierta los archivos json en JS y pueda manejarlos
app.use (express.static(path.join(__dirname, "../front"))); //Le estamos diciendo que todos los archivos estáticos están en la carpeta front y que los sirva como páginas web

import loginRouter from "./api/login.js"; //Importamos el codigo del archivo login.js
import bienvenidaRouter from "./api/bienvenida.js";//Importamos el codigo del archivo bienvenida.js

app.use("/api/login", loginRouter); //Le decimos a la app que cuando se haga una peticion a /api/login use el código que está en LoginRouter
app.use("/api/bienvenida", bienvenidaRouter); //Le decimos a la app que cuando se haga una peticion a /api/bienvenida use el código que está en bienvenidaRouter

const PORT = process.env.PORT || 3000; //Le dice que use el puerto que está en la variable de entorno PORT y si no existe, usa el puerto 3000

app.listen (PORT, () => {
    console.log (`Servidor corriendo en http://localhost:${PORT}`);
}); //Con esto arrancamos el servidor y se pone a "escuchar" en el puerto que le hemos dicho