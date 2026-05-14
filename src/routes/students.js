import express from "express"; 
import studentsController from "../Controller/EstudiantesController.js";

//Router () nos ayudara a colocar los métodos que tendra mi endpoint

const router = express.Router ();

router.route("/")
.get(studentsController.getStudents);

router.route("/searchByName").post(studentsController.searchByName)

router.route("/:id")
.put(studentsController.updateStudents)
.delete(studentsController.deleteStudents);

export default router; 