import express from "express"; 
import materiascontroller from "../Controller/materiasController.js"
//Router () nos ayudara a colocar los métodos que tendra mi endpoint

const router = express.Router ();

router.route("/")
.get(materiascontroller.getStudents);

router.route("/searchByName").post(materiascontroller.searchByName)

router.route("/:id")
.put(materiascontroller.updateStudents)
.delete(materiascontroller.deleteStudents);

export default router; 