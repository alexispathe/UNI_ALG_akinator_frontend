import { useState } from "react"

export const CalculadoraFTPULaCM = () => {

    const [pies, setPies] = useState(0);
    const [pulgadas, setPulgadas] = useState(0);
    const [ftCM, setFtCM] = useState(0);
    const [pulCM, setPulCM] = useState(0);
    const ft = 0.0328084;
    const pul = 2.54;

    const piesChange = (evt) => setPies(evt.target.value);
    const piesSubmit = (e) => {
        e.preventDefault();
        setFtCM(pies / ft)

    }

    const pulgadasChange = (evt) => setPulgadas(evt.target.value);
    const pulgadasSubmit = (e) => {
        e.preventDefault();
        setPulCM(pulgadas * pul)
        console.log(pulgadas)
    }
    return (
        <>
            <div className="container">
                <form className="form-container" onSubmit={piesSubmit}>
                    <h2>3. Pies a Centimetros</h2>
                    <div className="form-input-container">
                        <div className="input-container">
                            <input type="number" className="form-input" name="pies" required placeholder="Escribe los Pies" onChange={(evt) => piesChange(evt)} />
                        </div>
                        <div className="input-btn-container">
                            <input type="submit" value="calcular" className="" />
                        </div>
                        {ftCM > 0 ? <div className="input-result "><p>{ftCM.toFixed(2)} Centimetros</p></div> : ''}

                    </div>
                </form>
                <form className="form-container" onSubmit={pulgadasSubmit}>
                    <h2>4.  Pulgadas a  Centimetros</h2>
                    <div className="form-input-container">
                        <div className="input-container">
                            <input type="number" className="form-input" name="pulgadas" required placeholder="Escribe las pulgadas" onChange={(evt) => pulgadasChange(evt)} />
                        </div>
                        <div className="input-btn-container">
                            <input type="submit" value="calcular" className="" />
                        </div>
                        {pulCM > 0 ? <div className="input-result "><p>{pulCM.toFixed(2)} Centimetros</p></div> : ''}

                    </div>
                </form>
            </div>
        </>
    )
}