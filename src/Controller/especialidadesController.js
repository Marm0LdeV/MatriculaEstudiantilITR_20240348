const SpecialitiesController = {};
//import de la coleccion que ocuparemos 
import specialitiesModel from "../models/Especialidades.js";

//SELECT 
SpecialitiesController.getSpecialities = async (req, res) => {
    const {
    specialityName,
    isAvailable } = req.body;
    const newSpeciality = new specialitiesModel ({specialityName, isAvailable});
    await newSpeciality.save();
    res.json ({message: "Registro de la especialidad guardado"});
};

//UPDATE 
SpecialitiesController.UpdateSpecialities = async (req, res) => {
    const {
    specialityName,
    isAvailable 
    } = req.body;
    await specialitiesModel.findByIdAndUpdate(
        req.params.id,
        {
            specialityName, isAvailable
        },
        {new: true}
    );
    res.json({message: "la especialidad ha sido actualizada correctamente"});
};

//DELETE
SpecialitiesController.DeleteSpecialities = async (req, res) => {
    await specialitiesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Speciality deleted"});
};

//INSERT 
SpecialitiesController.insertSpecialities = async (req, res) => { 
    const {specialityName, isAvailable} = req.body;
    const newSpeciality = new specialitiesModel ({specialityName, isAvailable});
    await newSpeciality.save();
    res.json({ message: "Speciality saved"});
}

export default SpecialitiesController

