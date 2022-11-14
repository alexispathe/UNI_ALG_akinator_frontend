import { useState } from "react";
import {usersDB} from '../database/users';
import { hobbies as hobbiesDB } from '../database/users'; 
import { GameQuestions } from "./GameQuestions";
export const Game =()=>{
    const [users, setUsers]=useState(usersDB);
    const [start, setStart]= useState(false);
    const [questions, setQuestions] = useState(hobbiesDB);
    const [resValue, setResValue]= useState([]);
    const [status, setStatus ] = useState(false)
    const [characterName, setCharacterName]= useState('')
    // let status = true;

    // let characterName = "";

    // let resValue = [];
    let resFilter = [];
    let idUsersEnHobbies = [];
   
    
    const startGame=()=>{
        setStart(true);
    }
   
    return(
        <>
            <div className="container text-center">
                <h1>Adivino tu personaje</h1>
                
                {!start? <button onClick={startGame} className="btn btn-primary"  >Comenzar juego</button>:  
                <GameQuestions
                    hobbiesDB={hobbiesDB}
                    users={users}
                    resValue={resValue}
                    setResValue={setResValue}
                    resFilter={resFilter}
                    idUsersEnHobbies ={idUsersEnHobbies}
                    questions = {questions}
                    setQuestions = {setQuestions}
                    characterName = {characterName}
                    setCharacterName = {setCharacterName}
                    status = {status}
                    setStatus = {setStatus}
                /> }
        {/* <button onClick={buscarCoencidencias}>Ver coencidencia</button> */}
      
            </div>
        </>
    )
}