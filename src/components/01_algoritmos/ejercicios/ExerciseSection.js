import {Link} from 'react-router-dom';
export const ExerciseSection =()=>{
    return(
        <>
            <div className="container">
                <div className='list-exercise-container'>
                    <ul className='list-exercise'>
                        <li className='list-exercise-item'><Link to="conversiones">Ejercicios de conversiones</Link></li>
                    </ul>
                </div>
               
            </div>
        </>
    )
}