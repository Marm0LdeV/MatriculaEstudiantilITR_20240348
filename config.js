import dotenv from "dotenv"

//Ejecutamos la librería de dotenv 
dotenv.config ()

export const config = {
    db: {
        URI: proccess.env.DB_URI
    },
    JWT: {
        secret: proccess.env.JWT_Secret_Key
    },
    email: {
        user_email: process.env.USER_EMAIL,
        user_password: process.env.USER_PASSWORD 
    }
}