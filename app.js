//IMPORTS DE ENDPOINTS
import express from "express"
import EspecialidadesRoutes from "./src/routes/Especialidades.js"
import MateriasRoutes from "./src/routes/Materias.js"
import PagosRoutes from "./src/routes/pagosdeMatricula.js"
import ProfesoresRoutes from "./src/routes/profesores.js"
import EstudiantesRoutes from "./src/routes/students.js"
import logoutRoutes from "./src/routes/logout.js"
import LoginEstudiantes from "./src/routes/loginStudents.js"
import RegisterStudentRoutes from "./src/routes/registerStudent.js"
import RegisterTeacher from "./src/routes/registerTeachers.js"
import StudentsRecoveryPass from "./src/routes/recoveryPasswordStudents.js"
import TeachersRecoveryPass from "./src/routes/recoveryPasswordStudents.js"

//Ejecutar express
const app = express ();

app.use (cors ({
    origin: ["http//localhost: 5173", "http://localhost:5174"],
    //Permitir el envío de cookies y creenciales
    credentials: true 
}))

app.use( limiter );

app.use ( cookieParser ());

app.use (express.json());

//ENDPOINTS
app.use("/api/Especialidades", EspecialidadesRoutes);
app.use("/api/Pagos", PagosRoutes);
app.use("/api/Estudiantes", EstudiantesRoutes);
app.use("/api/loginEstudiantes", LoginEstudiantes);
app.use("/api/logout", logoutRoutes);
app.use("/api/Materias", MateriasRoutes);
app.use("/api/Profesores", ProfesoresRoutes);
app.use("/api/RegisterStudent", RegisterStudentRoutes);
app.use("/api/RegisterTeacher", RegisterTeacher);
app.use("/api/StudentsRecoveryPass", StudentsRecoveryPass);
app.use("/api/TeachersRecoveryPass", TeachersRecoveryPass);
app.use("/api/loginTeachers", loginTeachers);

export default app;