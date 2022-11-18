import {useState} from 'react';
export const FormHobbie =()=>{
    const [name, setName]  =useState([]);
    const handleSubmit=(e)=>{
        e.preventDefault();
        const data ={
            name
        }
        console.log("Datos ", data)
        
    }
    const handleChange=(e)=>{
        setName(e.target.value);
    }
  
    return(
        <>
        <div className="container">
            <h1 className="text-center">Crear nuevo pasatiempos</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <h2 className="text-primary">Nombre: </h2>
                        <input type="text"  className="form-control" name="name" required onChange={(e)=> handleChange(e)} placeholder="Escribe tu nombre"/>
                    </div>

                    <div className="mt-2 d-flex justify-content-end ">
                            <input type="submit" value="Guardar pasatiempo" className="btn btn-success " />
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}