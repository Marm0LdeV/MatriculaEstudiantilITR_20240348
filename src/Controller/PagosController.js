const PagosController = {};
//import de la coleccion que ocuparemos 
import pagosModel from "../models/PagosdeMatricula.js";

//SELECT 
PagosController.getPayments = async (req, res) => {
    const { student_id,
    amount,
    paymentDate,
    method,
    status,
    referenceNumber} = req.body;
    const newPayment = new pagosModel ({student_id, amount, paymentDate, method, status, referenceNumber});
    await newPayment.save();
    res.json ({message: "Registro de estudiante guardado"});
};

//UPDATE 
PagosController.updatePayments = async (req, res) => {
    const {student_id,
    amount,
    paymentDate,
    method,
    status,
    referenceNumber
    } = req.body;
    await studentsModel.findByIdAndUpdate(
        req.params.id,
        {
            student_id, amount, paymentDate, method, status, referenceNumber
        },
        {new: true}
    );
    res.json({message: "El pago ha sido actualizado correctamente"});
};

//Eliminar
PagosController.deletePayments = async (req, res) => {
    await pagosModel.findByIdAndDelete(req.params.id);
    res.json({message: "Pago Cancelado"});
};

//INSERT 
PagosController.insertPayments = async (req, res) => { 
    const {student_id, amount, paymentDate, method, status, referenceNumber} = req.body;
    const newPayment = new pagosModel ({student_id, amount, paymentDate, method, status, referenceNumber});
    await newPayment.save();
    res.json({ message: "Pago guardado exitosamente"});
}



export default PagosController

