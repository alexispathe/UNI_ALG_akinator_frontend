import { useState } from "react"

export const Media = () => {
    /*VARIABLES Y FUNCIONES DEL EJERCICIO 1 PARA SACAR LA MEDIA*/
    const [mediaNum1, setMediaNum1] = useState(0);
    const [mediaNum2, setMediaNum2] = useState(0);
    const [media, setMedia] = useState(0)
    const mediaChange = (evt) => {
        if (evt.target.name === "mediaNum1") setMediaNum1(evt.target.value);
        if (evt.target.name === "mediaNum2") setMediaNum2(evt.target.value);
    }
    const mediaSubmit = (e) => {
        e.preventDefault();
        setMedia((parseInt(mediaNum1) + parseInt(mediaNum2)) / 2)

    }
    /********************FIN EJERCICIO 1*************************/
    return (
        <>
            <div className="container">
                {/* EJERCIO 1 SACAR MEDIA */}
                <form className="form-container" onSubmit={mediaSubmit}>
                    <h2>1. Calcular la media</h2>
                    <div className="form-input-container">
                        <div className="input-container">
                            <input type="number" className="form-input" name="mediaNum1" required placeholder="Escribe el primer numero" onChange={(evt) => mediaChange(evt)} />
                        </div>
                        <div className="input-container">
                            <input type="number" className="form-input" name="mediaNum2" required placeholder="Escribe el primer numero" onChange={(evt) => mediaChange(evt)} />
                        </div>
                        <div className="input-btn-container">
                            <input type="submit" value="calcular" className="" />
                        </div>
                        {media > 0 ? <div className="input-result "><p>La media es: {media}</p></div> : ''}

                    </div>
                </form>
                {/* FIN EJERCICIO 1 */}
            </div>
        </>
    )
}