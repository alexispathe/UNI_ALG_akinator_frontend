export const usersDB =[
    {
      name: "Alexis",
      hobbies: ["Peliculas", "Cine", "Tequila", "Correr", "GYM"]
    },
    {
      name: "Fernando",
      hobbies: ["Fiestas", "Bailar", "Actuacion", "GYM", "Musica"]
    },
    {
      name: "Perla",
      hobbies: ["Correr"]
    },
    {
      name: "Julio",
      hobbies: ["Gym"]
    },
    {
      name: "Pedro",
      hobbies: ["Cine", "Jugar Videojuegos", "Musica"]
    }
  ]

  //LOS HOBBIES ES EL FILTRO QUE TENDRA PARA LAS PREGUNTAS DEL JUEGO PARA ASI LUEGO HACER LA BUSQUEDA CON LOS HOBBIES DEL USUARIO
export const hobbies = [ 
  {name: "Jugar videojuegos", idUser:[4]}, 
  {name: "Musica", idUser:[1, 4]},
  {name:"GYM", idUser:[0,1,3]}, 
  {name:"Bailar", idUser:[1]}, 
  {name:"Tequila", idUser:[0]} ,
  {name:"Actuacion", idUser:[1]},
  {name:"Cine", idUser:[4,0]}, 
  {name:"Peliculas", idUser:[0]}, 
  {name:"Correr", idUser:[0,2]},
  {name: "Fiestas", idUser:[1]} 

];

// IDEAS PARA RESOLVERLO
/*
1. Una vez que el usuario diga cuales son los pasatiempos de su personaje
hacer una  busqueda de esos hobbies pero que este contenga a su vez el id del usuario para hacer mas rapida la busqueda y no
hacerla usuario por usuario

2. Una vez que tengamos ese filtro hacer agrupacion para ver que id tiene mas esos hobbies
2.1 Si existe 2 usuarios o mas con la misma cantidad de coencidencias, hacer mas preguntas y volver a repetir el paso 1

*/



// 
// const quitarPregunta =(value)=>{
//   /*Con esta funcion estamos quitando la pregunta que se le mostro al usuario para pasar con la siguiente*/ 
//   console
//   // setQuestions(questions.filter(questions => questions.name != value));
//   // console.log("Nuevas preguntas", questions)
// }