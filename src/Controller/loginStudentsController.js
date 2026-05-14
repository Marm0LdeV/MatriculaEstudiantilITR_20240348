import { JsonWebTokenError } from "jsonwebtoken";
import { config } from "../../config"

//Array de funciones 
const loginStudentsController = {}; 

loginStudentsController.login = async (req, res) => {
    try {
        //Solicitar los datos
        const {email, password} = req.body;
        const userFound = await studentModel.findOne({email});

        if(!userFound) {
            return res.status(404).json({message: "Estudiante no encontrado"});
        }

        //Validar la contraseña
        const isMatch = await bcrypt.compare(password, userFound.password);

        if(!isMatch) {
            //Sumar intentos si el usuario ingresa incorrectamente la contraseña
            userFound.loginAttempts = (userFound.loginAttempts || 0 ) + 1;
       

        //Bloquear la cuenta si el usuario gasta sus 5 intentos 

        if(userFound.loginAttempts >= 5){
            userFound.timeOut= Date.now()+ 15* 60* 1000;
            userFound.loginAttempts = 0;

            await userFound.save();
            return res.status(403).json({message: "Cuenta bloqueada, vuelve a intentarlo luego de 15 minutos"});
        }

        await userFound.save();
        return res.status(401).json({message: "Contraseña incorrecta"});
         }

        userFound.loginAttempts = 0; 
        userFound.timeOut = null;
        await userFound.save();

        //crear el token 
        const token = JsonWebToken.sign(
        //#1- ¿Que vamos a guardar
        { id: userFound._id, usertype: "customer"},
        //#2- Secret Key
        config.JWT.secret,
        {expiresIn: "30d"},
        );

        //Guardamos el token en una cookie
        res.cookie("authcookie", token);

        //Listo!
        return res.status(200).json({ message: "Login exitoso"});
    } catch (error) {
        console.log("error" + error);
        return res.status(500).json({message: "Internal server error"});
    }
}