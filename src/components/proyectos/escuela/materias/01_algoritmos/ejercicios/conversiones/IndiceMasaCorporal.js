import { useState } from "react"

export const IndiceMasaCorporal = () => {
    /*VARIABLES Y FUNCIONES DEL EJERCICIO 2 PARA SACAR EL INDICE DE MASA CORPORAL*/
    const [peso, setPeso] = useState(0);
    const [altura,setAltura] = useState(0);
    const [IMC, setIMC] = useState(0)
    const IMCChange = (evt) => {
        if (evt.target.name === "peso") setPeso(evt.target.value);
        if (evt.target.name === "altura") setAltura(evt.target.value);
    }
    const IMCSubmit = (e) => {
        e.preventDefault();
        const aux = parseInt(altura)/100
        setIMC(parseInt(peso) /(altura/100)**2);

    }
    /********************FIN EJERCICIO 2*************************/
    return (
        <>
            <div className="container">
                {/* EJERCIO 2 SACAR EL INDICE DE MASA CORPORAL */}
                <form className="form-container" onSubmit={IMCSubmit}>
                    <h2>2. Calcular Indice de masa corporal</h2>
                    <div className="form-input-container">
                        <div className="input-container">
                            <input type="number" className="form-input" name="peso" required placeholder="Escribe tu peso en KG" onChange={(evt) => IMCChange(evt)} />
                        </div>
                        <div className="input-container">
                            <input type="number" className="form-input" name="altura" required placeholder="Escribe tu estatura en CENTIMETROS" onChange={(evt) => IMCChange(evt)} />
                        </div>
                        <div className="input-btn-container">
                            <input type="submit" value="calcular" className="" />
                        </div>
                        {IMC > 0 ? <div className="input-result "><p>Tu IMC es: {IMC.toFixed(2)}</p></div> : ''}

                    </div>
                </form>
                {/* FIN EJERCICIO 1 */}
            </div>
        </>
    )
}