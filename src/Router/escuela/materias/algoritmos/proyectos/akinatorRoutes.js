import { urlAlgoritmos } from "../urlAlgoritmos";
import { FormPersonaje } from "../../../../../components/proyectos/escuela/materias/01_algoritmos/proyectos/akinator/forms/FormPersonaje";
import { FormHobbie } from "../../../../../components/proyectos/escuela/materias/01_algoritmos/proyectos/akinator/forms/FormHobbie";
import { Game } from "../../../../../components/proyectos/escuela/materias/01_algoritmos/proyectos/akinator/Game";
import { FormCategoryAkinator } from "../../../../../components/proyectos/escuela/materias/01_algoritmos/proyectos/akinator/forms/FormCategoryAkinator";
import { FormSubCategoryAkinator } from "../../../../../components/proyectos/escuela/materias/01_algoritmos/proyectos/akinator/forms/FormSubCategoryAkinator";
export const urlAkinator = urlAlgoritmos + "/akinator";
export const akinatorRoutes = [
    {
        path: urlAkinator + '/jugar',
        element: <Game />
    },
    {
        path: urlAkinator + '/crear-nuevo-personaje',
        element: <FormPersonaje  />
    },
    {
        path: urlAkinator + '/crear-hobbie',
        element: <FormHobbie />
    },
    {
        path: urlAkinator + '/crear-categoria',
        element: <FormCategoryAkinator />
    },
    {
        path: urlAkinator + '/crear-sub-categoria',
        element: <FormSubCategoryAkinator />
    }
]
