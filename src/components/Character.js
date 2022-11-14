export const  Character =({name})=>{
    const reload =()=>{
        window.location.href = '/'
    }
    return(
        <>
            <div className="character-container">
                <h1>Tu personaje es {name} </h1>
                <div>
                    <button onClick={reload} className="btn btn-warning">Reiniciar Juego</button>
                </div>
            </div>
        </>
    );
}