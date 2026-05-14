/*
Campos: 
    student_id
    amount
    paymentDate
    method
    status
    referenceNumber
*/

import mongoose, { Schema, model} from "mongoose";

const PaymentSchema = new Schema ( 
    {
        student_id: {type: mongoose.Schema.Types.ObjectId,
        ref: "students",},
        amount: {type: Number},
        paymentDate: {type: Date},
        method: {type: String},
        status: {type: String},
        referenceNumber: {type: String}
    },
);

export default model ("Payments", PaymentSchema);
