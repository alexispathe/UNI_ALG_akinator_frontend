import { urlAlgoritmos } from "../urlAlgoritmos";
import { ListaPaises } from "../../../../../components/proyectos/escuela/materias/01_algoritmos/proyectos/covid/ListaPaises";
const urlCovid = urlAlgoritmos+"/covid"
export const covidRoutes =[
    {
        path: urlCovid+"/casos-covid",
        element: <ListaPaises/>
    }
]