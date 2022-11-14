import { Character } from "./Character"
export const GameQuestions = ({ hobbiesDB, users, resFilter, resValue, idUsersEnHobbies, questions, setQuestions,setResValue,characterName, setCharacterName, status, setStatus}) => { 
    
    // const preguntarAlUsuario = () => {
    //     /*Estamos haciendo un for para recorrer los hobbies ya predefinidos para preguntarle al usuario si su personaje cuenta 
    //       con uno de estos y si es asi guardarlos en la variable 'resValue' para luego guardarlo en el 'setValUser'
    //     */
    //     for (let i = 0; i < hobbies.length; i++) {

    //         setValUser(...valUser, [hobbies[i]])
    //         // console.log(i)
    //         const val = prompt(`Tu personaje le gusta ${hobbies[i].name} `)
    //         if (val === "si") {
    //             resValue.push(hobbies[i].name)

    //         } else {
    //             console.log("Di que no >:v")
    //         }

    //     }



    // };
    const caputarRespuesta = (name) => {
        /*PASO 1 DEL PROGRAMA*/
        /*En esta funcion estan entrado el el nombre del hobbie que el usuario a dicho que su personaje cuenta 
          con uno de estos para asi guardarlos en la variable 'resValue'
        */
        // console.log(name)
        // setValUser(...valUser, name)
        setResValue([...resValue,name])
        // console.log("PASO 1, ",resValue)
        quitarPregunta(name)
        // resValue =["as", ""]


    }

    const guardarDatosAlValUser = () => {
        
        /*
        PASO 2 DEL PROGRAMA QUE CONSISTE EN BUSCAR LAS COENCIDENCIAS QUE HAYA EL VALOR GUARDADO EN "resValue" CON
        LOS DE LA BASE DE DATOS 
       */
        // console.log("Paso 2", resValue)

        resValue.map((valor) => {
            // console.log(valor)
            // "resFilter" nos permitira guardar los hobbiesDB donde haya coencidencia con lo que el usuario selecciono como verdadero
            resFilter.push(...hobbiesDB.filter(hobbie => hobbie.name === valor));
            // console.log("G ", hobbiesDB.filter(hobbie=> hobbie.name=== valor))
        })
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
        /*PASO 3 ESTAMOS HACIENDO UNA FUNCION DONDE AHORA SE NOS DEVOLVER LOS ID DEL USUARIO DONDE ESTE PERSONAJE MENCIONO QUE ESE ERA SU PASATIEMPO*/
        resFilter.map((user) => {
            // console.log("id", user)
            idUsersEnHobbies.push(...user.idUser)
        })
        // console.log("ID " ,resFilter)

        buscarPersonaje();
    }

    const buscarPersonaje = () => {
        /* PASO 4 
   con la funcion llamda buscarPersonaje haremos la busqueda con el personaje con el ID que mas se repita
   para asi devolver el personaje encontrado 
   */
        // console.log("ID Guardados", idUsersEnHobbies);
        // Con reduce estamos contando cuantas veces se repiten los numeros, al final nos devuelve un objeto
        const obj = idUsersEnHobbies.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {});

        // console.log(obj)
        // ********CONVIRTIENDO LA KEY Y EL VALOR EN ARREGLO****
        // const arrayIDUser =  Object.keys(obj)
        // console.log(arrayIDUser)
        // const arrayValueIDUser = Object.values(obj);
        // console.log(arrayValueIDUser);

        //**********NUMERO MAXIMO DEL OBJETO ********;
        const max = Math.max(...Object.values(obj));
        // console.log(max);
        const indexMax = Object.values(obj).indexOf(max)
        // console.log(indexMax);

        // ********Buscar el id con mas coencidencias *****
        // console.log("Tu personaje es: ", users[indexMax].name);
        // DEBEMOS DE PONER EN 0 LOS SIGUIENTES ARREGLOS
        setCharacterName(users[indexMax].name);
        setStatus(true)
        // console.log("nombre ", characterName, " status ", status)
        setResValue([]);
        resFilter = []
        idUsersEnHobbies = []
        
        // setUsers([]);
        // 
        // console.log(users)
    }
    const quitarPregunta = (value) => {
        /*Con esta funcion estamos quitando la pregunta que se le mostro al usuario para pasar con la siguiente*/
        // console.log(value)
        let z = questions.filter(questions => questions.name != value)
        setQuestions(z);
        // console.log("Nuevas preguntas", questions)
    }
    return (
        <>
            <div className="">
                {
                    questions.length >= 1 ?
                        <div className="questions">
                            <div >
                                <h2 className="">¿Tu personaje le gusta {questions[0].name}</h2>
                                <form>
                                    <div className="form-group d-flex justify-content-around">
                                        <input type="button" value="NO" className="btn btn-danger" onClick={() => quitarPregunta(questions[0].name)} />
                                        <input type="button" value="SI" className="btn btn-success" onClick={() => caputarRespuesta(questions[0].name)} />
                                    </div>
                                </form>
                            </div>
                        </div> : <div className="w-100">
                    
                    
                </div>
                }
                { status == true && characterName? 
                    <Character name={characterName}/>: ''
                }
                {
                    status ==false && questions.length == 0?<button className="btn btn-primary w-100" onClick={guardarDatosAlValUser}>Guardar resultados</button>:''
                }
            </div>
        </>
    );
}