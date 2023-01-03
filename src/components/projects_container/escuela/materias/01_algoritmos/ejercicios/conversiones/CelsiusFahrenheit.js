import { useState } from "react"

export const CelsiusFahrenheit = () => {
    const [celsius, setCelsius] = useState(0);
    const [fahrenheit, setFahrenheit] = useState(0);
    const fahrenheitSubmit = (e) => {
        e.preventDefault();
        setFahrenheit((celsius* 9/5)+32);
    }
    return (
        <>
            <div className="container">
                <form className="form-container" onSubmit={fahrenheitSubmit}>
                    <h2>5. Convertir grados Celsius a Fahrenheit</h2>
                    <div className="form-input-container">
                        <div className="input-container">
                            <input type="number" className="form-input" name="celsius" required placeholder="Escribe los grados Celsius a convertir" onChange={(evt) => setCelsius(evt.target.value)} />
                        </div>
                      
                        <div className="input-btn-container">
                            <input type="submit" value="calcular" className="" />
                        </div>
                        {fahrenheit > 0 ? <div className="input-result "><p>{fahrenheit.toFixed(2)} Grados Fahrenheit</p></div> : ''}

                    </div>
                </form>
            </div>
        </>
    )
}