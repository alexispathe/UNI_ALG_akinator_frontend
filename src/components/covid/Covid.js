import { Casos } from "./Casos";
import { DataCovid} from "../../database/covid";
import { useState } from "react";
import { grafica } from "./Grafica";
export const Covid = () => {
    const [dataCovid, setDataCovid] = useState(DataCovid);

    return (
        <>
            <Casos dataCovid={dataCovid} setDataCovid={setDataCovid} />
        </>
    );
}