import { useState } from "react";
import { Character } from "./Character"
export const GameQuestions = ({ hobbiesDB, users, resFilter, resValue, idUsersEnHobbies, questions, setQuestions, setResValue, characterName, setCharacterName, status, setStatus }) => {
    const [numQuestions, setNumQuestions] = useState(0);
    const [iterador, setIterador] = useState(1);
    const [noValue, setNoValue] = useState(1);
    
    const questions2 =[]
    let auxQuestions2 = [...questions];
    const aux = [];
    // const [dataHobbies, setDataHobbies] = useState([]);
    
    /* Con esta funcion "numPregunta()" nos permitira buscar un hobbie para la  pregunta de forma aletoria */
    const numPregunta=(preguntas)=> setNumQuestions(Math.floor(Math.random() * (preguntas.length >=1 ? preguntas.length -1: preguntas.length )))
    

    const preguntaRandom = () => {
        /*Con el iterador estamos haciendo una validacion para que solo se muestren 4 preguntas al usuario, despues lo que se hara 
        es hacer un filtro 
        */ 
        if (iterador <5 ) { 
            // console.log("ITERADOR", iterador);^``
            
            numPregunta(questions); //REALIZAREMOS UNA FUNCION QUE NOS DEVUELVA UN NUMERO ALEATORIO PARA LA PREGUNTA/
            setIterador(iterador+1)//INCREMENTAMOS 1 EL ITERADOR POR CADA VEZ QUE PASE LA CONDICION

        } else {
            // console.log("Se termino de hacer las preguntas")
            devolverHobbiesConID();  //CUANDO SE PASEN LAS 4 PREGUNTAS, LLAMAREMOS A LA FUNCION devolverHobbiesConID para que asi se nos devuelva UN ARREGLO CON LOS ID QUE TIENE ESE HOBBIE
        }
        //    
    }
    /***CON LA FUNCION "preguntaRandomFase2()" PASAREMOS A LAS NUEVAS PREGUNTAS PARA HACER EL USUARIO CONFORME A LOS HOBBIES QUE SE OBTUVIERON DEL PRIMER FILTRO***/ 
    const preguntaRandomFase2 =()=>{
        if(questions.length >=0){
            // alert("Entro a la fase 2")
            // console.log("FASE 2 PREGUNTAS debe de coencidir con el aux", questions2);
            setIterador(iterador+1)
        
            numPregunta(questions2); // Pasamos un arreglo con los nuevos  hobbies que se obtuvieron  de la funcion "filtroPersonajes()"
        }else{
            // alert("termino por que ya no hay mas hobbies")
            devolverHobbiesConID(); //LLAMAREMOS A LA FUNCION PARA DEVOLVER LOS ID DE LOS USUARIOS QUE COENCIDIERON CON LAS RESPUESTAS DEL JUGADOR
        }
        

    }

    const capRespuestaDelJugador = (name) => {
        /*PASO 1 DEL PROGRAMA*/
        /*En esta funcion esta entraNdo el nombre del hobbie que el usuario a respondido que su personaje tien para luego guardarlo en el 'setValUser'*/
       if(name){
        // console.log(name)
        // setValUser(...valUser, name)
        setResValue([...resValue, name]); //Este state nos permite tener un respaldo de los hobbies que el jugador esta poniendo que tiene su personaje
        quitarPregunta(name); //Una vez guardado el Hobbie en el state "resValue" la tendremos que eliminar para pasar a la siguente pregunta
        setNoValue(5) // En el noValue le colocamos 4 para que asi ya no pase las condiciones de la funcion "noHobbie()"; 
       }else{
        console.log("El nombre no existe")
       }
    }
   
    const devolverHobbiesConID = () => {

        /* PASO 3 DEL PROGRAMA 
        QUE CONSISTE EN BUSCAR LAS COENCIDENCIAS QUE HAYA EL VALOR GUARDADO DEL STATE EN "resValue" CON LOS DE LA BASE DE DATOS */

        resValue.map((valor) => {
            resFilter.push(...hobbiesDB.filter(hobbie => hobbie.name === valor)); // "resFilter" es un filtro que nos permitira guardar los hobbiesDB donde haya coencidencia con lo que el jugadir y se devolvera con todo ID de los  personaje
        })
        devolverIDUsuerDeHobbies(); //Llamamos esta funcion para solo devolver los ID de personajes
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
        /*PASO 4 ESTAMOS HACIENDO UNA FUNCION DONDE AHORA SE NOS DEVOLVERA LOS ID DEL PERSONAJE DONDE EL JUGADOR MENCIONO QUE ESE ERA SU PASATIEMPO*/
        resFilter.map((user) => {
            idUsersEnHobbies.push(...user.idUser) // idUsersEnHobbies nos devuelve un arreglo con los id que se encuentra en el hobbies.IDUsers de la base de datos.
        })
        filtroPersonajes(); //Hacemos un filtro con toda la informacion capturada
    }
    
    const filtroPersonajes=()=>{
        /*PASO 5 Con el filtro de personaje lo que se hace es  devolver a todos los personajes que tienen almenos 1 hobbie con su respectivo nombre */ 
        const obj = idUsersEnHobbies.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {});  // Con reduce estamos contando cuantas veces se repiten los numeros, al final nos devuelve un objeto
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
        // console.log("Todos los hobbies de los personajes ", dataHobbies)
        // console.log("Hobbies del jugador en el primer filtro", resValue)
        resValue.map(data =>{
            dataHobbies = dataHobbies.filter( hobbie => hobbie !== data)
        });
        console.log("Hobbies donde ya no existen los datos que se encuentran en resValue ",dataHobbies)

        /*GUARDAREMOS LOS DATOS DE dataHobbies en questions2 para asi usarlas en la funcion 'preguntasRandomFase2()'*/ 
        
        if(iterador >= 4 && questions.length >=1){
            dataHobbies.map(data=>{
                aux.push(...auxQuestions2.filter(question => question.name === data));
                console.log("Estas son las nuevas preguntas  de hobbies pero desde aux  ", aux)
            })
            questions2.push(...aux);
            setQuestions(questions2);
            // /*AQUI DEBEMOS DE MANDAR A LLAMAR EL NUEVO FILTRO DE LOS HOBBIES PARA HACER LAS NUEVAS PREGUNTAS*/
            preguntaRandomFase2();
            
        }   else{
            // alert("Ya no paso por que no hay mas preguntas")
            buscarPersonaje()
            
            
        }
       

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
    /*Con esta funcion nosotros estamos previniendo que el jugadir coloque  4 veces "no" consecutivamente desde el principo
    para que asi nuevamente se vuelvan a repetir 5 preguntas
    primera fase
    */
    const noHobbie=(value)=>{
        if(noValue <4){
            setNoValue(noValue+1)
            quitarPregunta(value)
            // console.log("no", noValue)
            // console.log("i", iterador)
        } else if(noValue === 4 && iterador === 4) {
            // console.log("ne", noValue)
            // alert("jeje")
            setIterador(1);
            setNoValue(1);
            // quitarPregunta(value);
            // console.log("iterador del segundo if", iterador)
        }else{
            quitarPregunta(value);
            console.log("Ya entrooooooo")
        }
        
    }
    const quitarPregunta = (value) => {
        /*Con esta funcion estamos quitando la pregunta que se le mostro al usuario para pasar con la siguiente*/
        
        if (iterador <= 5) {
            // console.log("Viendo erro 1", questions[numQuestions].name)
            setQuestions(questions.filter(questions => questions.name !== value));
            preguntaRandom(); 
            // console.log("Viendo erro 2", questions[numQuestions].name)
        }else if(iterador === 6){
            // "Estra a pregunta random 2 "
            // alert("Llego a 7 ")
            // setQuestions(questions.filter(questions => questions.name !== value));
            devolverHobbiesConID();
            
        }else {
            // alert("llego a 8")
            setQuestions(questions.filter(questions => questions.name !== value));
            console.log("Cuando el filtro llego a 8 estas eran las preguntas", questions)
            preguntaRandomFase2();
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
                                        <input type="button" value="NO" className="btn btn-danger" onClick={() => noHobbie(questions[numQuestions].name)} />
                                        <input type="button" value="SI" className="btn btn-success" onClick={() => capRespuestaDelJugador(questions[numQuestions].name)} />
                                    </div>
                                </form>
                            </div>
                        </div> : <div className="w-100"></div>
                }
                {status === true && characterName ?
                    <Character name={characterName} /> : ''
                }
                {
                    status === false && questions.length === 0 ? <button className="btn btn-primary w-100" onClick={devolverHobbiesConID}>Guardar resultados</button> : ''
                }
            </div>
        </>
    );
}