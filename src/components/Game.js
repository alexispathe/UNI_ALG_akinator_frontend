import { useState } from "react";
import {usersDB} from '../database/users';
import { hobbies as hobbiesDB } from '../database/users'; 
import { GameQuestions } from "./GameQuestions";
export const Game =()=>{
    const [users, setUsers]=useState(usersDB);
    const [questions, setQuestions] = useState(hobbiesDB);
    const [resValue, setResValue]= useState([]);
    const [status, setStatus ] = useState(false)
    const [characterName, setCharacterName]= useState('')
    let resFilter = [];
    let idUsersEnHobbies = [];
    // Esta funcion nos permitira regresarnos al inicio
    const btnHome = () => {
        window.location.href = "/"
    }
   
    return(
        <>
            <div className="">
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
                    btnHome={btnHome}
                /> 
            </div>
        </>
    )
}