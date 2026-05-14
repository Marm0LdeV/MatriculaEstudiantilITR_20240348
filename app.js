import express from "express"

//IMPORTS DE ENDPOINTS



//Ejecutar express
const app = express ();

app.use (cors ({
    origin: ["http//localhost: 5173", "http://localhost:5174"],
    //Permitir el envío de cookies y creenciales
    credentials: true 
}))

app.use( limiter );

app.use ( cookieParser ());

app.use (express.json());

//ENDPOINTS