export const GameQuestions = ({ hobbies, users, setUsers, setValUser, valUser }) => {
    let aux = [];
    let x = [];
    let idUsersEnHobbies = [];
    // const preguntarAlUsuario = () => {
    //     /*Estamos haciendo un for para recorrer los hobbies ya predefinidos para preguntarle al usuario si su personaje cuenta 
    //       con uno de estos y si es asi guardarlos en la variable 'aux' para luego guardarlo en el 'setValUser'
    //     */
    //     for (let i = 0; i < hobbies.length; i++) {

    //         setValUser(...valUser, [hobbies[i]])
    //         // console.log(i)
    //         const val = prompt(`Tu personaje le gusta ${hobbies[i].name} `)
    //         if (val === "si") {
    //             aux.push(hobbies[i].name)

    //         } else {
    //             console.log("Di que no >:v")
    //         }

    //     }
        


    // };

    const caputarRespuesta=(data)=>{
        /*PASO 1 DEL PROGRAMA*/ 
        /*En esta funcion estan entrado el el nombre del hobbie que el usuario a dicho que su personaje cuenta 
          con uno de estos para asi guardarlos en la variable 'aux' para luego guardarlo en el 'setValUser'
        */
        // console.log(data)
        // setValUser(...valUser, data)
        aux.push(data)
        console.log("PASO 1, ",aux)

        
    }
    // const guardarDatosAlValUser=()=>{
    //     /*PASO 2 DEL PROGRAMA*/ 
    //     setValUser(aux)
    //     setTimeout(()=>{
    //     console.log("PASO 2 ", valUser)

    //     }, 2000)
    //     // buscarCoencidencias();
        
    // }
    const guardarDatosAlValUser = () => {
        /*
        PASO 3 DEL PROGRAMA QUE CONSISTE EN BUSCAR LAS COENCIDENCIAS QUE HAYA EL VALOR GUARDADO DEL STATE EN "valUser" CON
        LOS DE LA BASE DE DATOS 
       */ 
        aux.map((valor) => {
            // console.log(valor)
            // "x" nos permitira guardar los hobbies donde haya coencidencia con lo que el usuario selecciono como verdadero
            x.push(...hobbies.filter(hobbie => hobbie.name=== valor));
            // console.log("G ", hobbies.filter(hobbie=> hobbie.name=== valor))
        })
        // console.log("Terminado", x);
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
        x.map((user) => {
            // console.log("id", user)
            idUsersEnHobbies.push(...user.idUser)
        })
        // console.log("ID " ,idUsersEnHobbies)

        buscarPersonaje();
    }
   
    const buscarPersonaje = () => {
         /* PASO 5 
    con la funcion llamda buscarPersonaje haremos la busqueda con el personaje con el ID que mas se repita
    para asi devolver el personaje encontrado 
    */
        // console.log("ID Guardados", idUsersEnHobbies);
        // Con reduce estamos contando cuantas veces se repiten los numeros, al final nos devuelve un objeto
        const obj = idUsersEnHobbies.reduce((prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev), {});
        console.log(obj)
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
        console.log("Tu personaje es: ", users[indexMax].name);
        // DEBEMOS DE PONER EN 0 EL ARR
        aux = [];
        x = []
        // console.log(users)
    }
    //   preguntarAlUsuario();
    return (
        <>
            <div>
                <h1 className="text-center">Primer pregunta</h1>
                <div className="questions">
                    {
                        hobbies.map((element, index) => (
                            <div key={index}>
                                <h2 className="text-center">¿Tu personaje le gusta {element.name}</h2>
                                <form>
                                    <div className="form-group d-flex justify-content-around">
                                        <input type="button" value="NO" className="btn btn-danger" />
                                        <input type="button" value="SI" className="btn btn-success" onClick={()=> caputarRespuesta(element.name)} />
                                    </div>
                                </form>
                            </div>
                        ))
                        // console.log(element.name)


                    }
                </div>
                <button className="btn btn-primary" onClick={guardarDatosAlValUser}>Guardar resultados</button>
                {/* <button className="btn btn-primary" onClick={buscarPersonaje}>Ver tu personaje</button> */}
            </div>
        </>
    );
}