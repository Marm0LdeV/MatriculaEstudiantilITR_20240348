const studentsController = {};
//import de la coleccion que ocuparemos 
import studentsModel from "../models/Estudiantes.js";

//SELECT 
studentsController.getStudents = async (req, res) => {
    const { name,
    lastName,
    email,
    password,
    birthdate,
    speciality_id,
    carnet,
    phone} = req.body;
    const newStudent = new studentsModel ({name, lastName, email, password, birthdate, speciality_id, carnet, phone});
    await newStudent.save();
    res.json ({message: "Regisro de estudiante guardado"});
};

//UPDATE 
studentsController.updateStudents = async (req, res) => {
    const {name,
    lastName,
    email,
    password,
    birthdate,
    speciality_id,
    carnet,
    phone
    } = req.body;
    await studentsModel.findByIdAndUpdate(
        req.params.id,
        {
            name, lastName, email, password, birthdate, speciality_id, carnet, phone
        },
        {new: true}
    );
    res.json({message: "El estudiante ha sido actualizado correctamente"});
};

//Eliminar
studentsController.deleteStudents = async (req, res) => {
    await studentsModel.findByIdAndDelete(req.params.id);
    res.json({message: "student deleted"});
};

//Buscar por nombre de estudiante 
studentsController.searchByName = async (req, res) => { 
    try {
        //#1- Solicito los datos
        const { name } = req.body

        const students = await studentsModel.find ({ name: {$regex: name, $options: "i"},
        })

        if(!students) {
            return res.status(404).json({message:"Estudiante no encontrado"})
        }

        return res.status (200).json(students);
    } catch (error) {
        console.log ("error" + error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export default studentsController

