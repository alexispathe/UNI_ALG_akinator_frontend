import { Grafica } from "./Grafica";
import { ListaPaises } from "./ListaPaises";
export const Covid = ({options, casosCovid, nombrePais}) => {
    return (
        <>

            <div className="container">
                <h1 className="text-center">Predicción de contagios COVID-19</h1>
                <ListaPaises nombrePais={nombrePais}/>
                <Grafica options={options} casosCovid={casosCovid} />
            </div>
        </>
    );
}