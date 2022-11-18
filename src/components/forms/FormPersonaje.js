import { useState } from 'react';
import { hobbies } from '../../database/users';
export const FormPersonaje = () => {
    const [arrayHobbies, setArryHobbies] = useState([...hobbies]);
    const [hobbiesData, setHobbiesData] = useState([]);
    const [name, setName] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name,
            hobbies: hobbiesData
        }
        console.log("Datos ", data)
    }
    const handleChange = (e) => {
        if (e.target.name === "name") {
            setName(e.target.value)
        }
        if (e.target.name === "hobbies") {
            // Aqui hacemos la validacion de que este siendo seleccionado alguna casilla del checbox
            if (e.target.checked) {
                setHobbiesData([...hobbiesData, e.target.value])
                console.log(hobbiesData)
            } else {
                setHobbiesData([...hobbiesData.filter(hobbie => hobbie !== e.target.value)])
                console.log(hobbiesData)
            }
        }
    }

    return (
        <>
            <div className="container">
                <h1 className="text-center">Registrar personaje</h1>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <h2 className="text-primary">Nombre: </h2>
                            <input type="text" className="form-control" name="name" required onChange={(e) => handleChange(e)} placeholder="Escribe tu nombre" />
                        </div>
                        <h1 className="text-primary">Pasatiempos</h1>
                        {/* Contenedor donde almacena todos los checkbox */}
                        <div className="row m-auto ">
                            {arrayHobbies.map((hobbies, id) => (
                                <div className="form-check col col-xl-2 col-lg-3 col-sm-4 col-12" key={id}>
                                    <label className="form-check-label">{hobbies.name}</label>
                                    <input type="checkbox" className="form-check-input" name='hobbies' onChange={(e) => handleChange(e)} value={hobbies.name} />
                                </div>
                            ))

                            }


                        </div>
                        <div className="from-control d-flex justify-content-end ">
                            <input type="submit" value="Guardar personaje" className="btn btn-success " />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}