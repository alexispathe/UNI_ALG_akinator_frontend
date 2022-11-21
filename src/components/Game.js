import { useState,useEffect } from "react";
// import {usersDB} from '../database/users';
// import { hobbies as hobbiesDB } from '../database/users'; 
import { GameQuestions } from "./GameQuestions";
import { urlApi } from "../global";
import axios from 'axios';
export const Game =({btnHome})=>{
    const [questions, setQuestions] = useState([]);
    const [hobbiesDB, setHobbiesDB] = useState([]);
    const [users, setUsers]=useState([]);
    useEffect(()=>{
        // Estamos mandando a llamar a lo hobbies que se encuentran en la base de datos

        axios.get(urlApi+'hobbies').then(res=>{
            setQuestions([...res.data.data]);
            setHobbiesDB([...res.data.data]);
        }).catch(err=>{
            console.log(err)
        });
        axios.get(urlApi+'personajes').then(res=>{
            setUsers([...res.data.data]);
        }).catch(err=> console.log(err))
    }, [])

    // console.log(questions)
    
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