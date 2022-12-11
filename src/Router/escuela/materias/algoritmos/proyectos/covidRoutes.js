import { urlAlgoritmos } from "../urlAlgoritmos";
import { DatosCovidContainer } from "../../../../../components/proyectos/escuela/materias/01_algoritmos/proyectos/covid/DatosCovidContainer";
const urlCovid = urlAlgoritmos + "/covid"
export const covidRoutes = [
    {
        path: urlCovid + "/casos-covid",
        element: <DatosCovidContainer />
    }
]