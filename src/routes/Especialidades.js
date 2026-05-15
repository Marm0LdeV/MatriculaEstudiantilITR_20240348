import express from "express"; 
import especialidadesController from "../Controller/especialidadesController.js";

//Router () nos ayudara a colocar los métodos que tendra mi endpoint

const router = express.Router ();

router.route("/")
.post(especialidadesController.insertSpecialities)
.get(especialidadesController.getSpecialities);

router.route("/:id")
.put(especialidadesController.UpdateSpecialities)
.delete(especialidadesController.DeleteSpecialities);

export default router; 