import HTMLRecoveryEmail from "../utils/SendmailRecovery.js"

import { config } from "../../config.js";

import studentsModel from "../models/Estudiantes.js";
import { JsonWebTokenError } from "jsonwebtoken";
import { json } from "express";

const recoveryPasswordController = {};

//Solicitar el código por correo electrónico
recoveryPasswordController.requestCode = async (req,res) => {
    try {
        //Solicitamos los datos 
        const { email } = req.body;

        //Validar que el correo si este en la BD
        const userFound = await customerModel.findOne({ email });

        if (!userFOund){
            return res.json({message: "User not found"});
        }

        //Generar código aleatorio 
        const code = crypto.randomBytes(3).toString("hex");
        
        //Guardar todo en un token
        const token = jsonwebtoken.sign (
            //#1- ¿Que vamos a guardar? payload
            {email, code, usertype: "customer", verified: false},
            //#2- Secret key
            config.JWT.secret,
            //#3- ¿Cuanto expira? 
            { expiresIn: "15m"},
        );

        res.cookie("recoveryCookie", token, {maxAge: 15* 60* 1000});
        
        //Enviar correo electronico 
        //#1- ¿Quien lo envía? 
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password,
            },
        });

        //#2- ¿Quien o recibe y como?
        const mailOptions ={
            from: config.mail.user_email,
            to: email,
            subject: "Correo de recuperación",
            body: "Usa este codigo para recuperar tu cuenta",
            html: HTMLRecoveryEmail(code),
        }
        //#3- Enviar el correo 
        transporter.sendMail(mailOptions,(error,info)=>{
            if (error) {
                console.log ("error" + error);
                return res.status(500).json({message: "email sent"});
            }
            return res.status (200).json ({message: "email sent"});
        });
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
};

//Verificar el código 
recoveryPasswordController.verifyCode= async (req,res) => {
    try {
        // #1- Solicitar los datos
        const { codeRequest } = req.body;

        //OBtenemos la informacion que esta dentro del token
        //Accedo al token que esta en la cookie de RecoveryCookie

        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token,config.JWT.secret)

        //COmparar lo que el usuario ingreso
        if(codeRequest !== decoded.code){
            return res.status (400).json({ message: "Invalid code"});
        }

        //Si lo escribe bien, vamos a colocar el token 
        //que ya esta verificado
        const newToken = jsonwebtoken.sign (
            //#1- QUe vamos a guardar 
            {email: decoded.email, usertype: "customer", verified: true},
            //#2- Secret key
            config.JWT.secret,
            { expiresIn: "15m"},
        );

        res.cookie("recoveryCookie", newToken, { maxAge: 15 * 60 * 1000});

        return res.status(200).json({message: "Code"})
    } catch (error) {
        
    }
}