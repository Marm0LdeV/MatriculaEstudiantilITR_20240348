import express from "express"; 
import teacherController from "../Controller/ProfesoresController.js";

//Router () nos ayudara a colocar los métodos que tendra mi endpoint

const router = express.Router ();

router.route("/")
.get(teacherController.getTeachers);

router.route("/searchByName").post(teacherController.searchByName)

router.route("/:id")
.put(teacherController.updateTeachers)
.delete(teacherController.deleteTeacher);

export default router; 