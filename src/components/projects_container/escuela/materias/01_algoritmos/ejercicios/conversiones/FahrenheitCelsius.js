import { useState } from "react"

export const FahrenheitCelsius = () => {
    const [celsius, setCelsius] = useState(0);
    const [fahrenheit, setFahrenheit] = useState(0);
    const celsisuSubmit = (e) => {
        e.preventDefault();
        setCelsius((fahrenheit- 32)*5/9);
    }
    return (
        <>
            <div className="container">
                <form className="form-container" onSubmit={celsisuSubmit}>
                    <h2>6. Convertir grados  Fahrenheit a Celsius </h2>
                    <div className="form-input-container">
                        <div className="input-container">
                            <input type="number" className="form-input" name="fahrenheit" required placeholder="Escribe los grados Fahrenheit a convertir" onChange={(evt) => setFahrenheit(evt.target.value)} />
                        </div>
                      
                        <div className="input-btn-container">
                            <input type="submit" value="calcular" className="" />
                        </div>
                        {celsius > 0 ? <div className="input-result "><p>{celsius.toFixed(2)} Grados Fahrenheit</p></div> : ''}

                    </div>
                </form>
            </div>
        </>
    )
}