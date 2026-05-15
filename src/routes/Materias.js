import express from "express"; 
import materiascontroller from "../Controller/materiasController.js"
//Router () nos ayudara a colocar los métodos que tendra mi endpoint

const router = express.Router ();

router.route("/")
.get(materiascontroller.getMaterias)
.post(materiascontroller.insert);

// router.route("/searchByName").post(materiascontroller.searchByName)

router.route("/:id")
.put(materiascontroller.UpdateMaterias)
.delete(materiascontroller.DeleteMaterias);

export default router; 