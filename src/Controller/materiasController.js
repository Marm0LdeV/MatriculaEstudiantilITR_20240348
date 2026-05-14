const MateriasController = {};
//import de la coleccion que ocuparemos 
import MateriasModel from "../models/Materias.js";

//SELECT 
MateriasController.getMaterias = async (req, res) => {
    const {
    subjectName,
    teacher_id,
    isAvailable  } = req.body;
    const newMateria = new MateriasModel ({subjectName, teacher_id, isAvailable});
    await newMateria.save();
    res.json ({message: "Registro de la materia guardada"});
};

//UPDATE 
MateriasController.UpdateMaterias = async (req, res) => {
    const {
    subjectName,
    teacher_id, 
    isAvailable 
    } = req.body;
    await MateriasModel.findByIdAndUpdate(
        req.params.id,
        {
              subjectName, teacher_id, isAvailable 
        },
        {new: true}
    );
    res.json({message: "la materia ha sido actualizada correctamente"});
};

//DELETE
MateriasController.DeleteMaterias = async (req, res) => {
    await MateriasModel.findByIdAndDelete(req.params.id);
    res.json({message: "Subject deleted"});
};

//INSERT 
MateriasController.insert = async (req, res) => { 
    const {specialityName, isAvailable} = req.body;
    const newMateria = new MateriasModel ({specialityName, teacher_id, isAvailable});
    await newMateria.save();
    res.json({ message: "Subject saved"});
}

export default MateriasController

