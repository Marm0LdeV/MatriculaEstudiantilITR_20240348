/*
Campos: 
    subjectName
    teacher_id
    isAvailable 
*/

import mongoose, { Schema, model} from "mongoose";

const SubjectsSchema = new Schema ( 
    {
        subjectName: {type: String},
        teacher_id: {type: mongoose.Schema.Types.ObjectId,
                     ref: "teachers",},
        isAvailable: {type: Boolean},
 
    },
);

export default model ("Subjects", SubjectsSchema);
