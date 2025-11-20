import express from "express";
const router = express.Router();

//Array de usuarios que simula la base de datos
const usuarios = [
  {nombreUsuario: "admin", contrasenia: "admin"},
  {nombreUsuario: "mercedes", contrasenia: "0000"},
  {nombreUsuario: "jesus", contrasenia: "1234"},
]

//Funcion para generar el tokem de autenticacion 
function generarToken(nombreUsuario){
  return Buffer.from(nombreUsuario).toString('base64'); //Para convertir el nombre de usuario a base64

}