import { urlAlgoritmos } from "../urlAlgoritmos";
import { ExerciseSection } from "../../../../../components/projects_container/escuela/materias/01_algoritmos/ejercicios/ExerciseSection";
import { Conversiones } from "../../../../../components/projects_container/escuela/materias/01_algoritmos/ejercicios/conversiones/Conversiones";
const urlEjercicios = urlAlgoritmos + "/ejercicios";
export const EjerciciosRoutes =[
    {
        path: urlEjercicios+"",
        element: <ExerciseSection/>
    },
    {
        path: urlEjercicios+"/conversiones",
        element: <Conversiones/>
    }
]