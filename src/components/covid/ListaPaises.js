import { useState } from "react"
export const ListaPaises = ({ nombrePais }) => {
    const [pais, setPais] = useState('');
    const handleChange=(option)=>{
        console.log(option.target)
    }
    return (
        <>
            <form>
                <div className="form-group">
                    <select className="form-select" onChange={(value)=> handleChange(value)}>
                        {nombrePais.map(nombre=>(
                            // console.log(nombre.ISO2)
                            <option value={nombre.ISO2} key={nombre.ISO2}>{nombre.Country}</option>                            
                        ))}
                    </select>
                </div>
            </form>
        </>
    )
}