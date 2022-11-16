import { useState } from "react";
import { Character } from "./Character"
export const GameQuestions = ({ hobbiesDB, users, resFilter, resValue, idUsersEnHobbies, questions, setQuestions, setResValue, characterName, setCharacterName, status, setStatus }) => {
    const [numQuestions, setNumQuestions] = useState(0);
    const [iterador, setIterador] = useState(1);
    // const [dataHobbies, setDataHobbies] = useState([]);
    const preguntaRandom = () => {
        /*Con el iterador estamos haciendo una validacion para que solo se muestren 6 preguntas al usuario, despues lo que se hara 
        es hacer un filtro 
        */ 
        if (iterador <=6 ) { 

            // console.log("Questions en pregunta", questions)
            setNumQuestions(Math.floor(Math.random() * (questions.length >=1 ? questions.length -1: questions.length )))
            //    console.log("1 ", numQuestions)
            //    console.log("Numero rando", Math.floor(Math.random()*numQuestions));
            setIterador(iterador+1)
            // console.log("i ", iterador)
        } else {
            console.log("Se termino de hacer las preguntas")
            guardarDatosAlValUser();

        }
        //    
    }
    

    const caputarRespuesta = (name) => {
        /*PASO 1 DEL PROGRAMA*/
        /*En esta funcion estan entrado el el nombre del hobbie que el usuario a dicho que su personaje cuenta 
          con uno de estos para asi guardarlos en la variable 'aux' para luego guardarlo en el 'setValUser'
        */
       if(name){
        // console.log(name)
        // setValUser(...valUser, name)
        setResValue([...resValue, name])
        // console.log("PASO 1, ",resValue)
        quitarPregunta(name)
        // resValue =["as", ""]
       }else{
        console.log("El nombre no existe")
       }
    }
   
    const guardarDatosAlValUser = () => {

        /*
        PASO 3 DEL PROGRAMA QUE CONSISTE EN BUSCAR LAS COENCIDENCIAS QUE HAYA EL VALOR GUARDADO DEL STATE EN "valUser" CON
        LOS DE LA BASE DE DATOS 
       */
        // console.log("Hobbies que selecciono el usuario", resValue);

        resValue.map((valor) => {
            // console.log(valor)
            // "resFilter" nos permitira guardar los hobbiesDB donde haya coencidencia con lo que el usuario selecciono como verdadero
            resFilter.push(...hobbiesDB.filter(hobbie => hobbie.name === valor));
        })
        console.log("Aqui devuelve los hobbies con el id del usuario", resFilter)
        devolverIDUsuerDeHobbies();
    }
    /*
     con la funcion devolverIDUsuerDeHobbies estamos guardando el id de  cada personaje que se encuentra registrado en cada hobbie
     ya que cuando se crea un nuevo personaje sus hobbie que este tiene queda almacenado en un arreglo diferente con el id del personaje 
     ejemplo - 3 y 20 = El ID del personaje que le gusta ver peliculas 
     [
      {
        peliculas:[3, 20]
      }
     ] 
    */
    const devolverIDUsuerDeHobbies = () => {
        /*PASO 4 ESTAMOS HACIENDO UNA FUNCION DONDE AHORA SE NOS DEVOLVER LOS ID DEL USUARIO DONDE ESTE PERSONAJE MENCIONO QUE ESE ERA SU PASATIEMPO*/
        resFilter.map((user) => {
            // console.log("id", user)
            idUsersEnHobbies.push(...user.idUser)
        })
        
        // idUsersEnHobbies nos devuelve un arreglo con los id que se encuentra en el hobbies.IDUsers de la base de datos.
        // console.log("ID de los personajes que tienen los hobbies seleccionados por el jugador " ,idUsersEnHobbies)
        filtroPersonajes();
        // buscarPersonaje(); >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    }
    
    const filtroPersonajes=()=>{
        /*PASO 5 Con el filtro de personaje lo que se hace es  devolver a todos los personajes que tienen almenos 1 hobbie con su respectivo nombre */ 
        console.log("ID de los personajes que tienen los hobbies seleccionados por el jugador " ,idUsersEnHobbies)
        // Con reduce estamos contando cuantas veces se repiten los numeros, al final nos devuelve un objeto
        const obj = idUsersEnHobbies.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {});
        // console.log("OBJETO ", obj)
        // ***********CONVIRTIENDO LAS KEYS DE UN OBJETO A UN ARREGLO []***************+
        const idCharacters = Object.keys(obj); 
        const newCharacters = []; //>>> se guardan los personajes para sacar sus hobbies
        // console.log("PASO 5 ID de los usuarios ", idCharacters)
        for(let i = 0; i < idCharacters.length; i++){
        // console.log(idCharacters[i]);
            newCharacters.push(users[idCharacters[i]])
        }
        let dataHobbies = []
        newCharacters.map(data =>{
            dataHobbies.push(...data.hobbies)
        });
        // console.log("PASO 5 nuevos personajes", newCharacters)
        // "PASO 5 todos los hobbies del los usuarios ya con el filtro "
        // console.log("PASO 5 todos los hobbies del los usuarios ya con el filtro ", dataHobbies);
        dataHobbies = dataHobbies.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {})
        // "PASO 5, se quitan los valores repeditos del arreglo dataHobbies"
        // console.log("PASO 5, se quitan los valores repeditos del arreglo dataHobbies", dataHobbies)
        dataHobbies = Object.keys(dataHobbies);
        // console.log("devolvemos solo las keys de objeto para devolver asi solo los datos ", dataHobbies)
        /*DESCARTAREMOS LOS HOBBIES QUE YA PASO EL PRIMER FILTRO DONDE SE OPTUVIERON LOS PRIMERO PERSONAJES*/ 
        console.log("Todos los hobbies de los personajes ", dataHobbies)
        console.log("Hobbies del jugador en el primer filtro", resValue)
        resValue.map(data =>{
            dataHobbies = dataHobbies.filter( hobbie => hobbie != data)
        });
        console.log("Hobbies donde ya no existen los datos que se encuentran en resValue ",dataHobbies)
            



    }   

    const buscarPersonaje = () => {
        /* PASO 6
   con la funcion llamda buscarPersonaje haremos la busqueda con el personaje con el ID que mas se repita
   para asi devolver el personaje encontrado 
   */
        // console.log("ID Guardados", idUsersEnHobbies);
        // Con reduce estamos contando cuantas veces se repiten los numeros, al final nos devuelve un objeto
        const obj = idUsersEnHobbies.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {});
        // console.log("OBJETO ", obj)

        // ***********CONVIRTIENDO LAS KEYS DE UN OBJETO A UN ARREGLO []***************+
        const keys = Object.keys(obj); 

        // ********CONVIRTIENDO LOS VALORES DE UN OBJETO A UN ARREGLO []*************
        const values = Object.values(obj);

        //**********DEVOLVER EL VALOR  MAXIMO  QUE HAY EN LA CONSTANTE "values"  ********;
        const max = Math.max(...values);
        // console.log("Valor MAx ",max);
        
        // ******** DEVOLVER EL INDICE DE LA CONSTANTE "values"************
        const indexMax = values.indexOf(max)

        //****** DEVOLVER LA KEY = "ID DEL PERSONAJE" CON LA AYUDA DEL 'indexMax' ********++ */ 
       
        const indexKey = keys[indexMax];
        // ****
        // console.log(indexMax);

        setCharacterName(users[indexKey].name);
        setStatus(true)
        // console.log("nombre ", characterName, " status ", status)
        setResValue([]);
        resFilter = []
        idUsersEnHobbies = []
       
    }
    const quitarPregunta = (value) => {
        /*Con esta funcion estamos quitando la pregunta que se le mostro al usuario para pasar con la siguiente*/
        
        if (questions) {
            // console.log("Viendo erro 1", questions[numQuestions].name)
            setQuestions(questions.filter(questions => questions.name !== value));
            preguntaRandom(); 
            // console.log("Viendo erro 2", questions[numQuestions].name)
        }
    }
    return (
        <>
            <div className="">
                {

                    questions.length >= 1 && questions[numQuestions] ?
                    
                        <div className="questions">
                            <div >
                                <h2 className="">¿Tu personaje le gusta {questions[numQuestions].name}</h2>
                                <form>
                                    <div className="form-group d-flex justify-content-around">
                                        <input type="button" value="NO" className="btn btn-danger" onClick={() => quitarPregunta(questions[numQuestions].name)} />
                                        <input type="button" value="SI" className="btn btn-success" onClick={() => caputarRespuesta(questions[numQuestions].name)} />
                                    </div>
                                </form>
                            </div>
                        </div> : <div className="w-100"></div>
                }
                {status === true && characterName ?
                    <Character name={characterName} /> : ''
                }
                {
                    status === false && questions.length === 0 ? <button className="btn btn-primary w-100" onClick={guardarDatosAlValUser}>Guardar resultados</button> : ''
                }
            </div>
        </>
    );
}