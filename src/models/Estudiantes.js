/*
Campos: 
    name
    lastName
    email
    password
    birthdate
    speciality_id
    carnet
    phone
    isVerified
    loginAttempts
    timeOut
*/

import mongoose, { Schema, model} from "mongoose";

const studentsSchema = new Schema ( 
    {
        name: {type: String},
        lastName: {type: String},
        email: {type: String},
        password: {type: String},
        birthdate: {type: Date},
        speciality_id: {type: String},
        carnet: {type: Number},
        phone: {type: String},
        isVerified: {type: Boolean},
        loginAttempts: {type: Number},
        timeOut:{type: Number} 
    },
    {
        timestamps: true,
        strict: false
    }
);

export default model ("Student", studentsSchema);
