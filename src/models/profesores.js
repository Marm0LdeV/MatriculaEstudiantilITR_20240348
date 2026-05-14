/*
Campos: 
    name
    lastName
    email
    password
    phone
    hiredate
    isActive
    isVerified
    loginAttempts
    timeOut
*/

import mongoose, { Schema, model} from "mongoose";

const TeachersSchema = new Schema ( 
    {
        name: {type: String},
        lastName: {type: String},
        email: {type: String},
        password: {type: String},
        phone: {type: String},
        hiredate: {type: Date},
        isActive: {type: Boolean},
        isVerified: {type: Boolean},
        loginAttempts: {type: Number},
        timeOut:{type: Number} 
    },
    {
        timestamps: true,
        strict: false
    }
);

export default model ("Teacher", TeachersSchema);
