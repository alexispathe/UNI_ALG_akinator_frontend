import { useState } from "react";
import {usersDB} from '../database/users';
import { hobbies as hobbiesDB } from '../database/users'; 
import { GameQuestions } from "./GameQuestions";
export const Game =({btnHome})=>{
    const [users, setUsers]=useState(usersDB);
    const [questions, setQuestions] = useState(hobbiesDB);
    const [resValue, setResValue]= useState([]); //Nos permite capturar la respuesta del jugador cuando presione  "si"
    const [status, setStatus ] = useState(false)
    const [characterName, setCharacterName]= useState('')
    return(
        <>
            <div className="">
                <GameQuestions
                    hobbiesDB={hobbiesDB}
                    users={users}
                    resValue={resValue}
                    setResValue={setResValue}
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