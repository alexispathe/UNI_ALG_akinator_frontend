import {useState} from 'react';
export const Form =()=>{
    const [arrayHobbies, setArryHobbies]= useState([]);
    const x=(e)=>{
        // alert("a")
        e.preventDefault();
        deleteDuplicate();
        
    }
    const handleChange=(e)=>{
        setArryHobbies( [...arrayHobbies,e.target.value])
        console.log(arrayHobbies)
        /*
        NOTA: AUN DEBEMOS DE BUSCAR LA MANERA PARA QUE CUANDO EL USUARIO QUITE LA SELECCION DE UN PASATIEMPO, ESTE SEA ELIMINADO DE "arrayHobbies"
        */ 
        
    }
    // Estamos borrando los datos duplicados del arreglo 
    const deleteDuplicate=()=>{
        let x  = new Set(arrayHobbies);
        x=[...x];
        console.log(x)
    }
    return(
        <>
        <div className="container">
            <h1 className="text-center">Este es el formulario</h1>
            <div className="form-container">
                <form onClick={x}>
                    <div className="form-group">
                        <h2 className="text-primary">Nombre: </h2>
                        <input type="text"  className="form-control" name="name" onChange={(e)=> handleChange(e)} placeholder="Escribe tu nombre"/>
                    </div>
                    <h1 className="text-primary">Pasatiempos</h1>
                    {/* Contenedor donde almacena todos los checkbox */}
                    <div className="d-flex">
                        <div className="form-check">
                            <label className="form-check-label">Jugar futbol</label>
                            <input type="checkbox" className="form-check-input" onChange={(e)=> handleChange(e)} value="Jugar-futbol" />
                        </div>
                        <div className="form-check">
                            <label className="form-check-label">Bailer</label>
                            <input type="checkbox" className="form-check-input" onChange={(e)=> handleChange(e)} value="Bailar" />
                        </div>
                    </div>
                    <div className="from-control d-flex justify-content-end ">
                            <input type="button" value="Guardar respuestas" className="btn btn-success "/>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}