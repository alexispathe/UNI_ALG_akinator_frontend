import { urlAlgoritmos } from "../urlAlgoritmos";
import { FormPersonaje } from "../../../../../components/proyectos/escuela/materias/01_algoritmos/proyectos/akinator/forms/FormPersonaje";
import { FormHobbie } from "../../../../../components/proyectos/escuela/materias/01_algoritmos/proyectos/akinator/forms/FormHobbie";
import { Game } from "../../../../../components/proyectos/escuela/materias/01_algoritmos/proyectos/akinator/Game";

export const urlAkinator = urlAlgoritmos+"/akinator"
export const akinatorRoutes =[
    {
        path: urlAkinator+'/jugar',
        element: <Game/>
    },
    {
        path: urlAkinator+'/crear-nuevo-personaje',
        element: <FormPersonaje/>
    },
    {
        path: urlAkinator+'/crear-hobbie',
        element: <FormHobbie/>
    }
]
