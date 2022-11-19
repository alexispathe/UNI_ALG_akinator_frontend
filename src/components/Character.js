import '../Styles/Character.css';
export const  Character =({name})=>{
    const reload =()=>{
        window.location.href = '/'
    }
    return(
        <>
        <div className="cuadro">

        </div>
            <div className="character-container">
                <div className="character">
                    <h1>Tu personaje es {name} </h1>
                    <div>
                        <button onClick={reload} className="btn btn-primary">Reiniciar Juego</button>
                    </div>
                </div>
            </div>
        </>
    );
}