//----------------------------------------------------------------------------------

class Usuario {
  constructor(userName, datosUsuario) {
    //Toma datos del archivo Json
    this.datos = datosUsuario
    //Atributos:

    this.userName = userName
    this.fotoPerfil = this.datos.fotoPerfil
    this.estado = this.datos.estado
    this.seguidores = this.datos.seguidores //Array de objetos-seguidores(tienen un no bre y foto de perfil)
    this.seguidos = this.datos.seguidos //Array de objetos-seguidores(tienen un no bre y foto de perfil)
    this.posts = this.datos.posts //Array de objetos de post {idPost,fotoPost,descripcionPost,fecha,hora} //Mas adelante agrego el resto
    this.historias = this.datos.historias //Arrat de objetos historias {id historia, fotoHistoria,feacha,hora}
    
  }

  //Getters
  getUserName = () => this.userName;
  getRegistros = () => this.datos; //Retorna objeto usuario.
  getFotoPerfil = () => this.fotoPerfil; // Retorna foto de perfil.
  getEstado = () => this.estado;
  getSeguidores = () => this.seguidores; //Array de objetos-seguidores(tienen un no bre y foto de perfil)
  getSeguidos = () => this.seguidos; //Array de objetos-seguidores(tienen un no bre y foto de perfil)
  getPosts = () => this.posts; //Array de objetos de post {idPost,fotoPost,descripcionPost,fecha,hora} //Mas adelante agrego el resto
  getPostLikesArray =  (idPost) =>{ return this.getPosts().filter(x=> x.postID == idPost)} //Devuelvo el array de likes.
  //getCantLikesPost = (idPost) => { return this.getPostLikesArray(idPost)}

  addPost = (fecha,hora,texto,foto,likes)=>{

    let nuevoPost = {postID: 24,fecha: fecha, hora:hora, texto: texto, foto:foto,likes:likes}
    this.posts.push(nuevoPost)
    console.log(nuevoPost)
    console.log(this.posts)
    return nuevoPost
  }


  
}



/*/DATOS DE UN USUARIO ----------------------------------------------------------------------------------------------------------------//

let unUsuario = {
  userName: "gui24xr",
  fotoPerfil:
    "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",
  estado: "Hola. Estoy usando Messenger !!",
  posts: [
    {
      postID: 1,
      fecha: "20/09/23",
      hora: "09:30",
      texto: "Hola amigo. Como estas?",
      foto: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2020/04/23/bikepics-2818235-full.jpg",
      likes: ['usuario1','usuario2','usuario3'],
    },
    {
      postID: 7,
      fecha: "20/09/23",
      hora: "09:30",
      texto: "Hola amigo. Como estas?",
      foto: "https://bikepics.com/wp-content/uploads/2023/03/How-Much-Does-It-Cost-to-Change-Motorcycle-Tires-1024x683.jpg.webp",
      likes: ['usuario1','usuario2','usuario3'],
    },
    {
      postID: 2,
      fecha: "20/09/23",
      hora: "09:35",
      texto: "Buenos dia",
      foto: "https://bikepics.com/wp-content/uploads/2023/06/LS2-Helmets-Assault-Full-Face-Motorcycle-Helmet-W_SunShield-1.webp",
      likes: ['usuario1','usuario3','usuario4'],
    },
    {
      postID: 3,
      fecha: "20/09/23",
      hora: "09:33",
      texto: "Hoy es Martes",
      foto: "https://bikepics.com/wp-content/uploads/2023/06/7-Best-Motorcycle-Helmet-Cost-Average-Cost-of-Motorcycle-Helmets-1024x683.webp",
      likes: ['usuario1','usuario2','usuario3','usuario4'],
    },
    {
      postID: 5,
      fecha: "20/09/23",
      hora: "09:33",
      texto: "Hoy es Martes",
      foto: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2014/03/04/bikepics-2647805-full.jpg",
      likes: ['usuario1','usuario2','usuario3','usuario4'],
    },
    {
      postID: 3,
      fecha: "20/09/23",
      hora: "09:33",
      texto: "Hoy es Martes",
      foto: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2016/09/27/bikepics-2794067-full.jpg",
      likes: ['usuario1','usuario2','usuario3','usuario4'],
    },
    {
      postID: 6,
      fecha: "20/09/23",
      hora: "09:33",
      texto: "Hoy es Martes",
      foto: "https://bikepics.com/wp-content/uploads/2023/04/9kwhpigr4na-1-1024x683.jpg.webp",
      likes: ['usuario1','usuario2','usuario3','usuario4','Pepe','Ramon'],
    },
  ],

  historias: [
    {
      fecha: "20/09/23",
      hora: "09:30",
      texto: "Hola amigo. Como estas?",
      foto: "https://bikepics.com/wp-content/uploads/2023/03/How-Much-Does-It-Cost-to-Change-Motorcycle-Tires-1024x683.jpg.webp",
    },
    {
      fecha: "20/09/23",
      hora: "09:35",
      texto: "Burn dia",
      foto: "https://www.nobbot.com/wp-content/uploads/2023/09/PD-137x137.jpg",
    },
    {
      fecha: "20/09/23",
      hora: "09:33",
      texto: "Hoy es Martes",
      foto: "https://www.nobbot.com/wp-content/uploads/2023/09/PD-137x137.jpg",
    },
  ],

  seguidores: [
    {
      nombreUsuario: "seguidor1",
      fotoPerfil:
        "https://nagoregarciasanz.com/wp-content/uploads/2021/01/foto_blog_nagore@2x.jpg",
    },
    {
      nombreUsuario: "seguidor2",
      fotoPerfil:
        "https://imgs.search.brave.com/uEzDD6iava2w3gwayzZl77YQTKAglSyTa7lcgrXtcC0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YmxvZ2RlbGZvdG9n/cmFmby5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjIvMDEv/bG9iby1mb3RvLXBl/cmZpbC53ZWJw",
    },
  ],

  seguidos: [
    {
      nombreUsuario: "seguido24",
      fotoPerfil:
        "https://imgs.search.brave.com/539We53vkPSt__WdfxyxBWn3smsNKXhLYsV7rvDQ5sE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YmxvZ2RlbGZvdG9n/cmFmby5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjIvMDEv/Z2F0by1kaXZlcnRp/ZG8ud2VicA",
    },
    {
      nombreUsuario: "seguidor25",
      fotoPerfil:
        "https://imgs.search.brave.com/-Dh5TEqCNHZJVwnmVyGQ4K5-DPrKFefWAS3ZzoohXus/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YmxvZ2RlbGZvdG9n/cmFmby5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjIvMDEv/cGVycm8tZ2FmYXMu/d2VicA",
    },
  ],
};
//----------------------------------------------------------------------------------------------------------------------




const archivoUsuarios=[

  {userID: 1, userName: 'guixr24', password: '123456',fotoPerfil: "https://bikepics.com/wp-content/uploads/2023/06/7-Best-Motorcycle-Helmet-Cost-Average-Cost-of-Motorcycle-Helmets-300x200.webp",estado: 'Soy el user Gui',email:'guillermo24@gmail.com'},
  {userID: 2, userName: 'usuario2', password: '123456',fotoPerfil: https://s3.amazonaws.com/bikepics.com/Pics-Web/2011/10/28/bikepics-2293903-full.jpg,estado: 'Soy el user 2',email:'usuario2@gmail.com'},
  {userID: 3, userName: 'usuario3', password: '123456',fotoPerfil: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",estado: 'Soy el user 3',email:'usuario3@gmail.com'},
  {userID: 4, userName: 'usuario4', password: '123456',fotoPerfil: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",estado: 'Soy el user 4',email:'usuario4@gmail.com'},
  {userID: 5, userName: 'usuario5', password: '123456',fotoPerfil: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",estado: 'Soy el user 5',email:'usuario5@gmail.com'},
  {userID: 6, userName: 'usuario6', password: '123456',fotoPerfil: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",estado: 'Soy el user 6',email:'usuario6@gmail.com'},
  {userID: 7, userName: 'usuario7', password: '123456',fotoPerfil: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",estado: 'Soy el user 7',email:'usuario7@gmail.com'},
  {userID: 8, userName: 'usuario8', password: '123456',fotoPerfil: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",estado: 'Soy el user 8',email:'usuario8@gmail.com'},
  {userID: 9, userName: 'usuario9', password: '123456',fotoPerfil: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",estado: 'Soy el user 9',email:'usuario9@gmail.com'},
  {userID: 10, userName: 'usuario10', password: '123456',fotoPerfil: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",estado: 'Soy el user 10',email:'usuario10@gmail.com'},
  {userID: 11, userName: 'usuario11', password: '123456',fotoPerfil: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",estado: 'Soy el user 11',email:'guillermo11@gmail.com'},
  {userID: 12, userName: 'usuario12', password: '123456',fotoPerfil: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",estado: 'Soy el user 12',email:'usuario12@gmail.com'},
  {userID: 13, userName: 'usuario13', password: '123456',fotoPerfil: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",estado: 'Soy el user 13',email:'usuario13@gmail.com'},
  {userID: 14, userName: 'usuario14', password: '123456',fotoPerfil: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",estado: 'Soy el user 14',email:'usuario14@gmail.com'},
  {userID: 15, userName: 'usuario15', password: '123456',fotoPerfil: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",estado: 'Soy el user 15',email:'usuario15@gmail.com'},
  {userID: 16, userName: 'ufuario16', password: '123456',fotoPerfil: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",estado: 'Soy el user 16',email:'guillermo16@gmail.com'},
  {userID: 17, userName: 'usuario17', password: '123456',fotoPerfil: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",estado: 'Soy el user 17',email:'usuario17@gmail.com'},
  {userID: 18, userName: 'usuario18', password: '123456',fotoPerfil: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",estado: 'Soy el user 18',email:'usuario18@gmail.com'},
  {userID: 19, userName: 'usuario19', password: '123456',fotoPerfil: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",estado: 'Soy el user 19',email:'usuario19@gmail.com'},
  {userID: 20, userName: 'usuario20', password: '123456',fotoPerfil: "https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/07/08/bikepics-2749152-full.jpg",estado: 'Soy el user 20',email:'usuario20@gmail.com'},
  
]



const archivoPosts=[
  {postID: 1, userID:1, fecha: '6-10-23',hora:'09:30',texto:'Texto Post 1',likes:[2,4,3,1,7],comentarios:[1,4,6,7],foto:"https://bikepics.com/wp-content/uploads/2023/03/How-Much-Does-It-Cost-to-Change-Motorcycle-Tires-1024x683.jpg.webp"},
  {postID: 2, userID:1, fecha: '6-10-23',hora:'09:32',texto:'Texto Post 2',likes:[2,5,3,1,8],comentarios:[1,4,6,7],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2011/10/28/bikepics-2293903-full.jpg"},
  {postID: 3, userID:1, fecha: '6-10-23',hora:'09:40',texto:'Texto Post 3',likes:[2,5],comentarios:[1,4,6,7],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2016/09/27/bikepics-2794067-full.jpg"},
  {postID: 4, userID:2, fecha: '6-10-23',hora:'19:30',texto:'Texto Post 4',likes:[2,5],comentarios:[1,4,6,7],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2014/05/07/bikepics-2666626-full.jpg"},
  {postID: 5, userID:2, fecha: '6-10-23',hora:'09:33',texto:'Texto Post 5',likes:[2],comentarios:[1,4,6,7],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2018/10/29/bikepics-2810714-full.jpg"},
  {postID: 6, userID:2, fecha: '6-10-23',hora:'02:30',texto:'Texto Post 6',likes:[1],comentarios:[1,4,6,7],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2017/09/16/bikepics-2803339-full.jpg"},
  {postID: 7, userID:3, fecha: '6-10-23',hora:'01:30',texto:'Texto Post 7',likes:[1],comentarios:[1,4,6,7],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2014/10/21/bikepics-2704123-full.jpg"},
  {postID: 8, userID:3, fecha: '6-10-23',hora:'08:30',texto:'Texto Post 8',likes:[1],comentarios:[1,4,6,7],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2016/11/03/bikepics-2794995-full.jpg"},
  {postID: 9, userID:3, fecha: '6-10-23',hora:'07:30',texto:'Texto Post 9',likes:[2,10,3,1],comentarios:[1,4,6,7],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2014/07/22/bikepics-2684675-full.jpg"},
  {postID: 10, userID:3, fecha: '6-10-23',hora:'09:40',texto:'Texto Post 10',likes:[2,11,3,1],comentarios:[1,4,6,7],foto:"https://bikepics.com/wp-content/uploads/2023/06/LS2-Helmets-Assault-Full-Face-Motorcycle-Helmet-W_SunShield-1.webp"},
  {postID: 11, userID:4, fecha: '6-10-23',hora:'10:30',texto:'Texto Post 11',likes:[12,5,3,1],comentarios:[1,4,6,7],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2014/05/20/bikepics-2669930-full.jpg"},
  {postID: 12, userID:4, fecha: '6-10-23',hora:'09:25',texto:'Texto Post 12',likes:[2,15,3,1],comentarios:[1,4,6,7],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2013/07/29/bikepics-2581949-full.jpg"},
  {postID: 13, userID:4, fecha: '6-10-23',hora:'09:11',texto:'Texto Post 13',likes:[2,5,3,1],comentarios:[1,4,6,7],foto:"https://bikepics.com/wp-content/uploads/2023/06/7-Best-Motorcycle-Helmet-Cost-Average-Cost-of-Motorcycle-Helmets-300x200.webp"},
  {postID: 14, userID:4, fecha: '6-10-23',hora:'09:25',texto:'Texto Post 14',likes:[2,15,3,1],comentarios:[1,4,6,7],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2012/08/15/bikepics-2442412-full.jpg"},
  {postID: 15, userID:5, fecha: '6-10-23',hora:'09:10',texto:'Texto Post 15',likes:[2,5,3,1],comentarios:[1,4,6,7],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2012/12/10/bikepics-2489019-full.jpg"},
  {postID: 16, userID:5, fecha: '6-10-23',hora:'09:12',texto:'Texto Post 16',likes:[2,5,3,14],comentarios:[1,4,6,7],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2016/11/20/bikepics-2795491-full.jpg"},
  {postID: 17, userID:5, fecha: '6-10-23',hora:'09:31',texto:'Texto Post 17',likes:[2,5,3,1],comentarios:[1,4,6,7],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/04/01/bikepics-2733876-full.jpg"},
  {postID: 18, userID:1, fecha: '6-10-23',hora:'09:39',texto:'Texto Post 18',likes:[20,15,3,11],comentarios:[1,4,6,7],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2014/04/11/bikepics-2659314-full.jpg"},
  {postID: 19, userID:1, fecha: '6-10-23',hora:'09:54',texto:'Texto Post 19',likes:[12,5,13,1],comentarios:[1,4,6,7],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2014/05/12/bikepics-2667780-full.jpg"},
  {postID: 20, userID:1, fecha: '6-10-23',hora:'09:00',texto:'Texto Post 20',likes:[13],comentarios:[1,4,6,7],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2014/02/05/bikepics-2639135-full.jpg"},



]

*/

class baseDatos {

  constructor(archivoUsuarios,archivoPosts){

/*    fetch(archivoUsuarios)
    .then( response => response.json())
    .then( (response) =>  this.usuarios = response)

    fetch(archivoPosts)
    .then( response =>  response.json())
    .then( (response ) => { this.posts = response ; console.log(this.posts)})

    console.log(this.usuarios)
    console.log(this.posts)
*/
    this.usuarios = archivoUsuarios
    this.posts= archivoPosts 

    // this.usuarios = archivoUsuarios
   // this.posts= archivoPosts */
  }


  existeUsuario = (usuarioBuscado) => { 
    if (this.getUserInfo(usuarioBuscado) != false) return true; else return false
}

  validarPasswordUsuario = (usuario,password) =>{

    let objUsuario;
    let coincidenUserPass = false;
    
    if (this.existeUsuario(usuario)){ 
       objUsuario = this.getUserInfo(usuario)
       if (objUsuario.password === password) coincidenUserPass = true
    }

      return coincidenUserPass

  } 
  
  //Si existe devuelve el ID que usaremos para obtener luego los datos en todo el programa.
  //getInfoUsuario = () =>[ console.log("hola")]
  getPostID = (postID)=> {

    //Busca el post, cruza los datos y devuelve el array
    let data = this.posts;
    let postEncontrado = false; 
    let i=0;

        while (!postEncontrado && i<data.length){ 
                      if(data[i].postID == postID){
                        postEncontrado=true;
                        break;
                      }
                      else i++;
                      //console.log(data[i])
                      //console.log('gui')
                      }
    
  if (postEncontrado == true) {
    //Si el post existe busco los datos del su usuario cruzando los ID.
    
    let datosPostIdBuscado = data[i]
    let datosUsuarioEmisorPost = this.getInfoUserID(datosPostIdBuscado.userID)
    

    
    
    return {...datosPostIdBuscado,...datosUsuarioEmisorPost}}
    else return false


  }


  existePostID = (IdPostBuscado) => { 
    if (this.getPostID(IdPostBuscado) != false) return true; else return false
}


  //Me devuelve un array con todos los Post de la BD pero los datos de post y usuarios cruzados
  //COmo ya tengo una funcion armada que me da los datos cruzados de cada post pasandole el postID la uso aqui tmb
  getAllPosts = () => {

    let arreglo = []

    this.posts.forEach( post  => arreglo.push(this.getPostID(post.postID)))

    return arreglo
  }
  
  






  getPostsUsuario = (usuarioIngresado) => {

    let arreglo = []
    //Si existe el usuario me traigo sus datos
    if (this.existeUsuario(usuarioIngresado)){
      let usuarioBuscado = this.getUserInfo(usuarioIngresado); //ya tengo el usuario, no solo busco sus post si no datos suyos para que sean renderizados
      //const { userID, userName, fotoPerfil } = usuarioBuscado
      delete usuarioBuscado.password //Saco el password xq no quiero que la base de datos de esa informacion, solo el resto que es renderizable
      
      //Se que existe el usuario, obtuve sus datos y ahora busco sus post en el array de post
      //Devuelvo un array con los posts e info del usuario para no tener que cruzar datos despues
      this.posts.forEach( post => {if (post.userID === usuarioBuscado.userID) arreglo.push({...post,...usuarioBuscado})})

    }

    return arreglo
  
  }
  
  
  
  
  getUserInfo= (usuarioIngresado) => {  //Dame el objeto de datos del usuario ingresado y si no esta retorna undefined
    
    let data = this.usuarios;
    let usuarioEncontrado = false; 
    let i=0;

        while (!usuarioEncontrado && i<data.length){ 
                      if(data[i].userName == usuarioIngresado){
                        usuarioEncontrado=true;
                      
                        break;
                      }
                      else i++;
                      //console.log(data[i])
                      //console.log('gui')
                      }
    
  if (usuarioEncontrado == true) {
    //delete data[i].password //Quito el password para proteger info
    //console.log(data[i])
    return data[i]
  }
    else return false


}

getInfoUserID = (idBuscado) => {

  let data = this.usuarios;
    let usuarioEncontrado = false; 
    let i=0;

        while (!usuarioEncontrado && i<data.length){ 
                      if(data[i].userID == idBuscado){
                        usuarioEncontrado=true;
                      
                        break;
                      }
                      else i++;
                
                      }
    
  if (usuarioEncontrado == true) {
    
    delete data[i].password //Quito el password para proteger info
    return data[i]
  }
    else return false
}


setLikes(postID,usuarioLikeador){

let infoUserLikeador = this.getUserInfo(usuarioLikeador)
const {userID} = infoUserLikeador
//Agrego el userID a la lista de likes del post que me pasan por parametro.
let posicionEnArrayPostID;

let postEncontrado = false; 
let i=0;

    while (!postEncontrado && i<this.posts.length){ 
                  if(this.posts[i].postID == postID){
                    postEncontrado=true;
                    
                    break;
                  }
                  else i++;
            
                  }
    if (postEncontrado == true) posicionEnArrayPostID = i;
    //console.log(this.posts[i].likes)
    //Ya estoy posicionado sobre el objeto post que yo debo agregar el id del usuario que dio like.
    console.log(this.posts[i].likes.indexOf(userID))
    if (this.posts[i].likes.indexOf(userID) < 0) this.posts[i].likes.push(userID)
    //else console.log("Ya esta")
    //console.log(this.posts[i].likes)


}
}