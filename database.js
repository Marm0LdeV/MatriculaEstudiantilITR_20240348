import mongoose from "mongoose";
import { config } from "./config.js"

mongoose.connect (config.db.URI);

// -- comprobar que todo funcione
//Creamos una constante que es igual a la conexion

const connection = mongoose.connection;

connection.on ("open", () => {
    console.log ("DB is connected")
})

connection.on("disconnected", () => {
    console.log("DB is disconnected")
})

connection.on("error", (error) => {
    console.log ("error Found" + error)
}); 

