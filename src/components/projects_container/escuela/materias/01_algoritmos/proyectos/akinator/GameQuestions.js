import { useState } from "react";
import { Character } from "./Character"
import '../../../../../../../Styles/escuela/materias/algoritmos/proyectos/akinator/GameQuestions.css';
// import { Link } from "react-router-dom";
export const GameQuestions = ({ btnHome, hobbiesDB, users, resValue, questions, setQuestions, setResValue, unselectedHobbies, setUnselectedHobbies, characterName, setCharacterName, status, setStatus }) => {
    const [numQuestions, setNumQuestions] = useState(Math.floor(Math.random() * questions.length));
    const [iterador, setIterador] = useState(1);
    const [noValue, setNoValue] = useState(1);
    const [alert, setAlert] = useState(false);
    const [image, setImage] = useState();
    const questions2 = []
    let auxQuestions2 = [...questions];
    const aux = [];
    let resFilter = [];
    let idUsersEnHobbies = [];
    /* Con esta funcion "numPregunta()" nos permitira un numero aletorio dependiendo de la cantidad de hobbies almacenados, con ese numero comienza la pregunta*/
    const numPregunta = (preguntas) => setNumQuestions(Math.floor(Math.random() * (preguntas.length >= 1 ? preguntas.length - 1 : preguntas.length)))

    const preguntaRandom = () => {
        /*Con el iterador estamos haciendo una validacion para que solo se muestren 4 preguntas al usuario, despues lo que se hara 
        es hacer un filtro 
        */
        if (iterador < 6) {
            numPregunta(questions); //REALIZAREMOS UNA FUNCION QUE NOS DEVUELVA UN NUMERO ALEATORIO PARA LA PREGUNTA/
            setIterador(iterador + 1)//INCREMENTAMOS 1 EL ITERADOR POR CADA VEZ QUE PASE LA CONDICION
        } else {
            devolverHobbiesConID();  //CUANDO SE PASEN LAS 4 PREGUNTAS, LLAMAREMOS A LA FUNCION devolverHobbiesConID para que asi se nos devuelva UN ARREGLO CON LOS ID QUE TIENE ESE HOBBIE
        }
        //    
    }
    const preguntaRandomFase2 = () => {
    /***CON LA FUNCION "preguntaRandomFase2()" PASAREMOS A LAS NUEVAS PREGUNTAS PARA HACER EL USUARIO CONFORME A LOS HOBBIES QUE SE OBTUVIERON DEL PRIMER FILTRO***/

        // AQUI SOLO TE HARA 4 PREGUNTAS MAS 
        if (questions.length >= 0 && iterador <= 8) {
            // console.log("Este es el iterador ", iterador)
            setIterador(iterador + 1)
            numPregunta(questions2); // Pasamos un arreglo con los nuevos  hobbies que se obtuvieron  de la funcion "filtroPersonajes()"
        } else {
            devolverHobbiesConID(); //LLAMAREMOS A LA FUNCION PARA DEVOLVER LOS ID DE LOS USUARIOS QUE COENCIDIERON CON LAS RESPUESTAS DEL JUGADOR
        }
    }

    const capRespuestaDelJugador = (name) => {
        /*PASO 1 DEL PROGRAMA*/
        /*En esta funcion esta entraNdo el nombre del hobbie que el usuario a respondido que su personaje tien para luego guardarlo en el 'setValUser'*/
        if (name) {
            setResValue([...resValue, name]); //Este state nos permite tener un respaldo de los hobbies que el jugador esta poniendo que tiene su personaje
            quitarPregunta(name); //Una vez guardado el Hobbie en el state "resValue" la tendremos que eliminar para pasar a la siguente pregunta
            setNoValue(5) // En el noValue le colocamos 4 para que asi ya no pase las condiciones de la funcion "noHobbie()"; 
        } else {
            console.log("El nombre no existe")
        }
    }

    const devolverHobbiesConID = () => {
        /* PASO 3 DEL PROGRAMA 
        QUE CONSISTE EN BUSCAR LAS COENCIDENCIAS QUE HAYA EL VALOR GUARDADO DEL STATE EN "resValue" CON LOS DE LA BASE DE DATOS */
        if (resValue.length === 0) setAlert(true);
        resValue.map((valor) => {
            return resFilter.push(...hobbiesDB.filter(hobbie => hobbie.idHobbie === valor)); // "resFilter" es un filtro que nos permitira guardar los hobbiesDB donde haya coencidencia con lo que el jugadir y se devolvera con todo ID de los  personaje
        })
        devolverIDUsuerDeHobbies(); //Llamamos esta funcion para solo devolver los ID de personajes
    }

    const devolverIDUsuerDeHobbies = () => {
        /*PASO 4 ESTAMOS HACIENDO UNA FUNCION DONDE AHORA SE NOS DEVOLVERA LOS ID DEL PERSONAJE DONDE EL JUGADOR MENCIONO QUE ESE ERA SU PASATIEMPO*/
        resFilter.map((user) => {
            return idUsersEnHobbies.push(...user.idUsers) // idUsersEnHobbies nos devuelve un arreglo con los id que se encuentra en el hobbies.IDUsers de la base de datos.
        })
        filtroPersonajes(); //Hacemos un filtro con toda la informacion capturada
    }

    const filtroPersonajes = () => {
        /*PASO 5 Con el filtro de personaje lo que se hace es  devolver a todos los personajes que tienen almenos 1 hobbie con su respectivo nombre */
        const obj = idUsersEnHobbies.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {});  // Con reduce estamos contando cuantas veces se repiten los numeros, al final nos devuelve un objeto

        // ***********CONVIRTIENDO LAS KEYS DE UN OBJETO A UN ARREGLO []***************+
        const idCharacters = Object.keys(obj);
        const newCharacters = []; //>>> se guardan los personajes para sacar sus hobbies
        for (let i = 0; i < idCharacters.length; i++) {
            // newCharacters.push(users[idCharacters[i]])
            newCharacters.push(users[i])
        }
        let dataHobbies = []
        newCharacters.map(data => {
            // console.log(data)
            return dataHobbies.push(...data.hobbies)
        });
        // "PASO 5 todos los hobbies del los usuarios ya con el filtro "
        dataHobbies = dataHobbies.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {})
        // "PASO 5, se quitan los valores repeditos del arreglo dataHobbies"
        dataHobbies = Object.keys(dataHobbies);
        /*DESCARTAREMOS LOS HOBBIES QUE YA PASO EL PRIMER FILTRO DONDE SE OPTUVIERON LOS PRIMERO PERSONAJES*/
        resValue.map(data => {
            return dataHobbies = dataHobbies.filter(hobbie => hobbie !== data)
        });
        /**DATA HOBBIES SE ENCUENTRAS LOS HOBBIES DE TODOS LOS USUARIOS DONDE COENCIDIO ALMENOS UNO***/
        /*GUARDAREMOS LOS DATOS DE dataHobbies en questions2 para asi usarlas en la funcion 'preguntasRandomFase2()'*/
        if (iterador >= 4 && iterador < 8 && questions.length >= 1) {

            dataHobbies.map(data => {
                return aux.push(...auxQuestions2.filter(question => question.idHobbie === data));
            })
            questions2.push(...aux);
            setQuestions(questions2);
            // setIterador(1);
            // /*AQUI DEBEMOS DE MANDAR A LLAMAR EL NUEVO FILTRO DE LOS HOBBIES PARA HACER LAS NUEVAS PREGUNTAS*/
            preguntaRandomFase2();

        } else {
            // setQuestions([]); //AQUI BORRAMOS TODAS LAS PREGUNTAS QUE HAY EN EL STATE PARA QUE YA NO SIGA PREGUNTANDO 
            buscarPersonaje()
        }
    }

    const buscarPersonaje = () => {
        /* PASO 6
   con la funcion llamda buscarPersonaje haremos la busqueda con el personaje con el ID que mas se repita
   para asi devolver el personaje encontrado 
   */
        //   console.log("idUsers ", idUsersEnHobbies)
        // Con reduce estamos contando cuantas veces se repiten los numeros, al final nos devuelve un objeto
        const obj = idUsersEnHobbies.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {});
        // console.log("Users PASO 6", obj)

        // ***********CONVIRTIENDO LAS KEYS DE UN OBJETO A UN ARREGLO []***************+
        const keys = Object.keys(obj);
        // console.log("Keys ", keys)

        // ********CONVIRTIENDO LOS VALORES DE UN OBJETO A UN ARREGLO []*************
        const values = Object.values(obj);
        // console.log("Values", values)



        //**********DEVOLVER EL VALOR  MAXIMO  QUE HAY EN LA CONSTANTE "values"  ********;
        const max = Math.max(...values);
        // /****************ESTAMOS COMPROBADO SI NO HAY MAS DE UN PERSONAJE CON LA MISMA CANTIDAD DE HOBBIES CON DIFERENCIA DE -1****************************/
        let numUsers = 0;
        for (let i = 0; i < values.length; i++) {
            if (values[i] >= (max - 1)) {
                numUsers+=1;
                // console.log(`El usuario ${keys[i]} si es mayor`)
                // console.log("Cantidad de personajes encontrados iguales ", numUsers)
            }
        }
        if (numUsers >= 2 && iterador <=12 ) {
            // SI ESTA CONDICION SE CUMPLE SIGNIFICA QUE HAY MAS DE 2 USUARIOS CON LA MISMA CANTIDAD DE HOBBIES ASI QUE 
            // SE DEBE DE HACEN OTRAS 3 PREGUNTAS DE ESOS PERSONAJES PARA EVITAR ERRORES POR ESO EL ITERADOR SE INCREMENTA
            setIterador(iterador+1)
            // console.log("Se encontro coencidencia de mas de 2 personajes con la misma cantidad de hobbies")
            // console.log("Set iterador", iterador);
        } else {
            // console.log("n ", numUsers)
            setQuestions([]) //QUITAMOS TODAS LAS PREGUNTAS PARA AHORA SI DEVOLVER AL PERSONAJE
            /******************************************/
            // ******** DEVOLVER EL INDICE DE LA CONSTANTE "values"************
            const indexMax = values.indexOf(max)

            //****** DEVOLVER LA KEY = "ID DEL PERSONAJE" CON LA AYUDA DEL 'indexMax' ********++ */ 
            const indexKey = keys[indexMax];
            // ****
            const personaje = users.filter(user => user.idUser === indexKey);
            if (personaje.length > 0) {
                setCharacterName(personaje[0].name)
                setImage(personaje[0].image)
            };
            setStatus(true)

        }


    }
   
    const noHobbie = (value) => {
         /*Con esta funcion nosotros estamos previniendo que el jugadir coloque  4 veces "no" consecutivamente desde el principo
    para que asi nuevamente se vuelvan a repetir 5 preguntas
    primera fase
    */
        setUnselectedHobbies([...unselectedHobbies, value])
        // console.log(value);
        if (noValue < 4) {
            setNoValue(noValue + 1)
            quitarPregunta(value)
        } else if (noValue === 4 && iterador === 4) {
            quitarPregunta(value);
            setIterador(1);
            setNoValue(1);
        } else {
            quitarPregunta(value);
        }

    }
    const quitarPregunta = (value) => {
        /*Con esta funcion estamos quitando la pregunta que se le mostro al usuario para pasar con la siguiente*/

        if (iterador < 5) {
            setQuestions(questions.filter(questions => questions.idHobbie !== value));
            preguntaRandom();
        }

        else if (iterador === 5) {
            devolverHobbiesConID();
        }
        else {
            // ESTE ENTRA CUANDO YA PASAMOS AL SEGUNDO FILTRO DE LAS PREGUNTAS
            setQuestions(questions.filter(questions => questions.idHobbie !== value));
            preguntaRandomFase2();
        }

    }

    return (
        <>

            <div className="GameQuestions container text-center">
                {!characterName ? <h1>Adivino tu personaje</h1> : ''}
                {
                    questions.length >= 1 && questions[numQuestions] ?
                        <div className="questions-container">
                            <div className="questions" >
                                <h2 className="" style={{"textTransform": "uppercase"}} >¿Tu personaje {questions[numQuestions].name}?</h2>
                                <form>
                                    <div className="form-group d-flex justify-content-around">
                                        <input type="button" value="NO" className="btn btn-danger" onClick={() => noHobbie(questions[numQuestions].idHobbie)} />
                                        <input type="button" value="SI" className="btn btn-success" onClick={() => capRespuestaDelJugador(questions[numQuestions].idHobbie)} />
                                    </div>
                                </form>
                            </div>
                        </div> : <div className="w-100"></div>
                }
                {status === true && characterName ? <Character name={characterName} image={image} /> : ''}
                {alert === true ? <div className="alert alert-danger">Lo sentimos no hay ningun resultado.....<span className="link-primary" style={{ "cursor": "pointer" }} onClick={btnHome}>Regresar al inicio</span></div> : ''}
                {status === false && questions.length === 0 && alert === false ? <button className="btn btn-primary w-100" onClick={devolverHobbiesConID}>Guardar resultados</button> : ''}
            </div>
        </>
    );
}