/*
Campos: 
    specialityName
    isAvailable 
*/

import mongoose, { Schema, model} from "mongoose";

const SpecialitySchema = new Schema ( 
    {
        specialityName: {type: String},       
        isAvailable: {type: Boolean},
    },
);

export default model ("Speciality", SpecialitySchema);
