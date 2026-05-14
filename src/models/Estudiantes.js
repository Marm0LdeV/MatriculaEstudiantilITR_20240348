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

const studentsSchema = new schema ( 
    {
        name: {type: String}
    },
    {
        lastName: {type: String}
    },
    {
        password: {type: String}
    },
    {
        birthdate: {type: Date}
    },
    {
        speciality_id: {type: String}
    },
    {
        carnet: {type: Number}
    },
    {
        phone: {type: String}
    },
    {
        isVerified: {type: Boolean}
    },
    {
        timestamps: true,
        strict: false,
    },
);

export default model ("Student", studentsSchema);
