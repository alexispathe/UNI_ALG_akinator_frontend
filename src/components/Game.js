import { useState } from "react";
import {usersDB} from '../database/users';
import { hobbies } from '../database/users'; 
export const Game =()=>{
    const [users, setUsers]=useState(usersDB);
    let [valUser, setValUser ]= useState([]);
    // const [hobbies, setHobbies] = useState(hobbies);
    // useEffect(()=>{
    //   juego();
  
    // },[])
    const aux = [];
    const x = [];
    const idUsersEnHobbies = [];
    const preguntarAlUsuario =()=>{
      /*Estamos haciendo un for para recorrer los hobbies ya predefinidos para preguntarle al usuario si su personaje cuenta 
        con uno de estos y si es asi guardarlos en la variable 'aux' para luego guardarlo en el 'setValUser'
      */ 
      for (let i = 0; i < hobbies.length; i++ ){
      
        setValUser(...valUser, [hobbies[i]])
        // console.log(i)
          const val = prompt(`Tu personaje le gusta ${hobbies[i].name} ` )
          if(val === "si"){
            aux.push(hobbies[i].name)
            
          }else{
            console.log("Di que no >:v")
          }
          
      }
      // Estamos llamando la funcion para hacer la busqueda de la coencidencia de los hobbies con los personajes guardados
      setValUser(aux)
    
      
    };
  
    const buscarCoencidencias=()=>{
      
      valUser.map((valor)=>{
        // console.log(valor)
        // "x" nos permitira guardar los hobbies donde haya coencidencia con lo que el usuario selecciono como verdadero
        x.push(...hobbies.filter(h => h.name === valor));
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
    const devolverIDUsuerDeHobbies =()=>{
      x.map((user)=>{
        // console.log("id", user)
        idUsersEnHobbies.push(...user.idUser)
      })
      buscarPersonaje();
    }
    /*
    con la funcion llamda buscarPersonaje haremos la busqueda con el personaje con el ID que mas se repita
    para asi devolver el personaje encontrado 
    */ 
    const buscarPersonaje= ()=>{
      // console.log("ID Guardados", idUsersEnHobbies);
      // Con reduce estamos contando cuantas veces se repiten los numeros, al final nos devuelve un objeto
      const obj  =idUsersEnHobbies.reduce((prev, cur)=> ((prev[cur] = prev[cur]+1 || 1), prev),{});
      
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
          // console.log(users)
    }
    return(
        <>
            <div className="container">
                <h1>Adivino tu personaje</h1>
                <button onClick={preguntarAlUsuario}>Comenzar juego</button>
        <button onClick={buscarCoencidencias}>Ver coencidencia</button>
      
            </div>
        </>
    )
}