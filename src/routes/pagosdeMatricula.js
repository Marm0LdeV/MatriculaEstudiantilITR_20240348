import express from "express"; 
import PagosController from "../Controller/PagosController.js";

//Router () nos ayudara a colocar los métodos que tendra mi endpoint

const router = express.Router ();

router.route("/")
.get(PagosController.getPayments)
.post(PagosController.insertPayments);

// router.route("/searchByName").post(studentsController.searchByName)


router.route("/:id")
.put(PagosController.updatePayments)
.delete(PagosController.deletePayments);

export default router; 