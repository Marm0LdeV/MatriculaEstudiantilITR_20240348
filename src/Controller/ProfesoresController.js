const teachersController = {};
//import de la coleccion que ocuparemos 
import TeachersModel from "../models/profesores.js";

//SELECT 
teachersController.getTeachers = async (req, res) => {
    const { name,
    lastName,
    email,
    password,
    phone,
    hiredate,
    isActive,
    isVerified,
    loginAttempts,
    timeOut} = req.body;
    const newTeacher = new TeachersModel ({name, lastName, email, password, hiredate, phone});
    await newTeacher.save();
    res.json ({message: "Registro de profesores guardado"});
};

//UPDATE 
teachersController.updateTeachers = async (req, res) => {
    const { name,
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
    await TeachersModel.findByIdAndUpdate(
        req.params.id,
        {
            name, lastName, email, password, hiredate, phone
        },
        {new: true}
    );
    res.json({message: "El profesor ha sido actualizado correctamente"});
};

//Eliminar
teachersController.deleteTeacher = async (req, res) => {
    await TeachersModel.findByIdAndDelete(req.params.id);
    res.json({message: "Profesor eliminado"});
};

//Buscar por nombre de profesor 
teachersController.searchByName = async (req, res) => { 
    try {
        //#1- Solicito los datos
        const { name } = req.body

        const teachers = await TeachersModel.find ({ name: {$regex: name, $options: "i"},
        })

        if(!teachers) {
            return res.status(404).json({message:"Profesor no encontrado"})
        }

        return res.status (200).json(teachers);
    } catch (error) {
        console.log ("error" + error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export default teachersController

