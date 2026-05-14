import teacherModel from "../models/profesores.js";

import { config } from "../../config.js"

//Creo un array de funciones
const registerTeacherController = {}; 

registerTeacherController.register = async (req, res) => {
    //#1- Solicitar los datos a resgistrar
    const {
    name,
    lastName,
    email,
    password,
    phone,
    hiredate,
    isActive,
    isVerified,
    loginAttempts,
    timeOut
    } = req.body; 

    try {
        //Verificar si el estudiante ya existe
        const existTeacher = await teacherModel.findOne({ email });
        if ( existTeacher ) {
            return res.status (400).json ({message: "Teacher already exist"});
        }
        
        //Encriptar la contraseña 
        const passwordHash = await bcrypt.hash(password,10);

        //generamos un código aleatorio 
        const verificationCode = crypto.randombytes(3).toString("hex")

        //generamos token para guardar el codigo aleatroio
        const tokenCode = JsonWebToken.sign (
            //#1- ¿Que vamos a guardar?
        {       name,
            lastName,
            email,
            passwordHash,
            phone,
            hiredate,
            isActive,
            isVerified,
            loginAttempts,
            timeOut
        },
        //#2 - Secret key
        config.JWT.secret,
        //#3- ¿Cuando expira?
        { expiresIn: "15m"},
        );
        res.cookie("verificationToken", tokenCode, {maxAge: 15 * 60 * 1000});

        //#1 transporter => ¿Quien envía el correo? 
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass:config.email.user_password,
            },
        });

        //#2- mailOptions => ¿Quien lo recibe? 
        const mailOptions = {
            From: config.email.user_email,
            to: email,
            subject: "Verificación de cuenta",
            text:
            "Para verificar tu cuenta utiliza este codigo" + verificationCode + "expira en 15 minutos",
        };

        //#3- Enviar el correo
        transporter.sendMail(mailOptions,(error,info)=>{
            if (error) {
                console.log("error" + error);
                return res.status(500).json({message: "error"})
            }
        });
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({ message: "internal server error"});
    }
};

//Verificar que el código que le acabamos de mandar
registerTeacherController.verifyCode = async (req,res) => {
    try {
        //#1- Solicitmos el código que el usuario haya escrito en el frontend
        const {verificationCodeRequest} = req.body

        //#2 - Obtener el token de las cookies
        const token = req.cookies.verifictionToken;

        //#3- Ver que código esta en el token
        const decoded = JsonWebToken.verify(token, config.JWT.secret);
        const{
        name,
        lastName,
        email,
        password,
        phone,
        verificationCode: storedCode,
        hiredate,
        isActive,
        isVerified,
        loginAttempts,
        timeOut          
        } = decoded; 

        //Paso Final: comparar el código que el usuario escribe con el código que esta en el token
        if(verificationCodeRequest !== storedCode) {
            return res.status (400).json({message: "Invalid code"}); 
        }

        //Guardamos todo en la base de datos
        const newTeacher = new teacherModel({
        name,
        lastName,
        email,
        password: passwordHash,
        phone,
        verificationCode: storedCode,
        hiredate,
        isActive,
        isVerified,
        loginAttempts,
        timeOut           
        });

        //Guardamos todo 
        await newTeacher.save();

        //SI el código esta bien, entonces colocamos el campo isverified
        const teacher = await teacherModel.findOne({email})
        teacher.isVerified = true;
        await teacher.save();
        //
        res.json ({ message: "Email verified succesfully"});
    } catch (error) {
        console.log("error" + error);
        return res.status (500).json({message: "Internal server error"});
    }
};

export default registerTeacherController