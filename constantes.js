
//-----------------------------------------------------------------------------------------------//
// CONSTANTES DE LA APLICACION
//-----------------------------------------------------------------------------------------------//


//Constante para el uso de Luxon
const DateTime = luxon.DateTime

//Imagen que se coloca como post de bienvenida en la creacion de un nuevo user cuando el mismo inicia sesion
const PICPOSTBIENVENIDA = '../imagenes/postbienvenida.jpg'


//Array utilizado para generar hashtags aleatorios.
const hashtagsMotocicletas = [
  "#Motocicletas", "#Motos", "#Moteros", "#BikerLife", "#RutasEnMoto", "#CustomBikes", "#Motocross",
  "#CaféRacer", "#MotocicletasClásicas", "#ViajesEnMoto", "#AdventureBikes", "#MotoGP", "#Ducati",
  "#HarleyDavidson", "#Kawasaki","#Suzuki", "#Yamaha", "#Honda", "#Triumph", "#BMWmotos", "HJC", "Shoei",
  "#Arai",  "#AGV",  "#Bell", "#Scorpion", "#Nolan", "#Schuberth", "#LS2", "#Shark", "#Suzuki", "#Yamaha", "#Honda",
  "#Kawasaki", "#Ducati", "#Harley-Davidson", "Triumph", "#BMWMotorrad", "#KTM", "#Aprilia"];


//Array de categorias posibles para pasarle de forma aleatoria al parametro categoria de las URL de unplash.
const categoriasImagenes = ["helmet", "helmets", "motorbikes", "moto", "shoei","airoh", 
"dainese", "cbr","hjc", "alpinestars", "ktm", "ducati", "kawasaki", "motogp", "crf450",];


//Esta funcion la uso para obtener una URL de unplash con una cateoria deseada o irla cambiando segun lo que le pida
const unplashURLCategoria = (categoria, cantidad) =>
  "https://api.unsplash.com/search/photos?query=" +
  categoria +
  "&per_page=" +
  cantidad +
  "&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";

const urlPicsCBR =
  "https://api.unsplash.com/search/photos?query=motorbikes&per_page=50&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";
const urlPicsHelmet =
  "https://api.unsplash.com/search/photos?query=helmet&per_page=50&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";
const urlPicsMotorcycle =
  "https://api.unsplash.com/search/photos?query=motorcycle&per_page=50&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";






  
//---------------------------------------------------------------------------------------------------------------------//
// DATOS UTILIZADOS PARA CONSTRUIR LOS ARCHIVOS DE SERVIDOR LOCAL QUE ALIMENTAN AL INICIAR LA BASE DE DATOS
//---------------------------------------------------------------------------------------------------------------------//
/*

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
  
]*/



/*
const archivoPosts=[
  {postID: 1, userID:1, fecha: '06-10-23',hora:'09:30',texto:'Texto Post 1',hashtagslist: [],likes:[2,4,3,1,7],foto:"https://bikepics.com/wp-content/uploads/2023/03/How-Much-Does-It-Cost-to-Change-Motorcycle-Tires-1024x683.jpg.webp"},
  {postID: 2, userID:1, fecha: '07-10-23',hora:'09:32',texto:'Texto Post 2',hashtagslist: [],likes:[2,5,3,1,8],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2011/10/28/bikepics-2293903-full.jpg"},
  {postID: 3, userID:1, fecha: '08-10-23',hora:'09:40',texto:'Texto Post 3',hashtagslist: [],likes:[2,5],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2016/09/27/bikepics-2794067-full.jpg"},
  {postID: 4, userID:2, fecha: '09-12-22',hora:'19:30',texto:'Texto Post 4',hashtagslist: [],likes:[2,5],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2014/05/07/bikepics-2666626-full.jpg"},
  {postID: 5, userID:2, fecha: '06-05-23',hora:'09:33',texto:'Texto Post 5',hashtagslist: [],likes:[2],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2018/10/29/bikepics-2810714-full.jpg"},
  {postID: 6, userID:2, fecha: '06-03-23',hora:'02:30',texto:'Texto Post 6',hashtagslist: [],likes:[1],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2017/09/16/bikepics-2803339-full.jpg"},
  {postID: 7, userID:3, fecha: '06-02-23',hora:'01:30',texto:'Texto Post 7',hashtagslist: [],likes:[1],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2014/10/21/bikepics-2704123-full.jpg"},
  {postID: 8, userID:3, fecha: '06-10-23',hora:'08:30',texto:'Texto Post 8',hashtagslist: [],likes:[1],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2016/11/03/bikepics-2794995-full.jpg"},
  {postID: 9, userID:3, fecha: '06-10-23',hora:'07:30',texto:'Texto Post 9',hashtagslist: [],likes:[2,10,3,1],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2014/07/22/bikepics-2684675-full.jpg"},
  {postID: 10, userID:3, fecha: '06-10-23',hora:'09:40',texto:'Texto Post 10',hashtagslist: [],likes:[2,11,3,1],foto:"https://bikepics.com/wp-content/uploads/2023/06/LS2-Helmets-Assault-Full-Face-Motorcycle-Helmet-W_SunShield-1.webp"},
  {postID: 11, userID:4, fecha: '06-10-23',hora:'10:30',texto:'Texto Post 11',hashtagslist: [],likes:[12,5,3,1],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2014/05/20/bikepics-2669930-full.jpg"},
  {postID: 12, userID:4, fecha: '06-10-22',hora:'09:25',texto:'Texto Post 12',hashtagslist: [],likes:[2,15,3,1],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2013/07/29/bikepics-2581949-full.jpg"},
  {postID: 13, userID:4, fecha: '06-10-23',hora:'09:11',texto:'Texto Post 13',hashtagslist: [],likes:[2,5,3,1],foto:"https://bikepics.com/wp-content/uploads/2023/06/7-Best-Motorcycle-Helmet-Cost-Average-Cost-of-Motorcycle-Helmets-300x200.webp"},
  {postID: 14, userID:4, fecha: '06-03-23',hora:'09:25',texto:'Texto Post 14',hashtagslist: [],likes:[2,15,3,1],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2012/08/15/bikepics-2442412-full.jpg"},
  {postID: 15, userID:5, fecha: '06-02-23',hora:'09:10',texto:'Texto Post 15',hashtagslist: [],likes:[2,5,3,1],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2012/12/10/bikepics-2489019-full.jpg"},
  {postID: 16, userID:5, fecha: '06-10-23',hora:'09:12',texto:'Texto Post 16',hashtagslist: [],likes:[2,5,3,14],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2016/11/20/bikepics-2795491-full.jpg"},
  {postID: 17, userID:5, fecha: '06-01-23',hora:'09:31',texto:'Texto Post 17',hashtagslist: [],likes:[2,5,3,1],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2015/04/01/bikepics-2733876-full.jpg"},
  {postID: 18, userID:1, fecha: '04-10-21',hora:'09:39',texto:'Texto Post 18',hashtagslist: [],likes:[20,15,3,11],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2014/04/11/bikepics-2659314-full.jpg"},
  {postID: 19, userID:1, fecha: '06-01-18',hora:'09:54',texto:'Texto Post 19',hashtagslist: [],likes:[12,5,13,1],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2014/05/12/bikepics-2667780-full.jpg"},
  {postID: 20, userID:1, fecha: '05-10-17',hora:'09:00',texto:'Texto Post 20',hashtagslist: [],likes:[13],foto:"https://s3.amazonaws.com/bikepics.com/Pics-Web/2014/02/05/bikepics-2639135-full.jpg"},
]*/

const elementosHeaderBanner = [
    //Es el menu de la barra principal.
  
    {
      tag: "h1",
      id: "header-banner-title",
      listaClases: ["headerbar-titulo"],
      listaAcciones: undefined,
      innerText: "MOTOGRAM",
    },
  
    {
      tag: "img",
      id: "header-banner-icon1",
      listaClases: ["headerbar-menu-iconos"],
      listaAcciones: undefined,
      source: "./imagenes/icons/ico_logomoto.png",
    },
    {
      tag: "img",
      id: "header-banner-icon2",
      listaClases: ["headerbar-menu-iconos"],
      listaAcciones: undefined,
      source: "./imagenes/icons/ico_logomoto2.png",
    },
    {
      tag: "img",
      id: "header-banner-icon3",
      listaClases: ["headerbar-menu-iconos"],
      listaAcciones: undefined,
      source: "./imagenes/icons/ico_logomoto3.png",
    },
  ];
  
  const elementosLoginForm = [
    {
      tag: "h1",
      id: "login-form-title",
      listaClases: ["login-form-text"],
      listaAcciones: undefined,
      innerText: "INICIAR SESION",
    },
  
    {
      tag: "img",
      id: "login-form-perfil-img",
      listaClases: ["login-form-pic"],
      listaAcciones: undefined,
      source: "./imagenes/icons/ico_perfil.png",
    },
  
    {
      tag: "input",
      id: "login-form-user-input",
      listaClases: ["login-form-input"],
      listaAcciones: undefined,
      type: "text",
      placeHolder: "Usuario",
    },
  
    {
      tag: "input",
      id: "login-form-password-input",
      listaClases: ["login-form-input"],
      listaAcciones: undefined,
      type: "text",
      placeHolder: "Password",
    },
  
    {
      tag: "input",
      id: "login-form-submit-input",
      listaClases: ["login-form-button"],
      listaAcciones: undefined,
      type: "submit",
      value: "Ingresar",
    },
  ];
  
  const elementosRegisterForm = [
    {
      tag: "h1",
      id: "register-form-title",
      listaClases: ["login-form-text"],
      listaAcciones: undefined,
      innerText: "NUEVO USUARIO",
    },
  
    {
      tag: "input",
      id: "register-form-user-input",
      listaClases: ["login-form-input"],
      listaAcciones: undefined,
      type: "text",
      placeHolder: "Usuario",
    },
  
    {
      tag: "input",
      id: "register-form-password-input",
      listaClases: ["login-form-input"],
      listaAcciones: undefined,
      type: "text",
      placeHolder: "Password",
    },
  
    {
      tag: "input",
      id: "register-form-re-password-input",
      listaClases: ["login-form-input"],
      listaAcciones: undefined,
      type: "text",
      placeHolder: "Repetir Password",
    },
    /*
    {
      tag: "h1",
      id: "register-form-label-fecha-nac",
      listaClases: ["login-form-text"],
      listaAcciones: undefined,
      innerText: "E-mail",
    },
  
    {   //Hasta que arregle lo del form renderizo un input comun y lo valido.
      tag: "input",
      id: "register-form-email-input",
      listaClases: ["login-form-input"],
      listaAcciones: undefined,
      type: "email",
      placeHolder: "Email",
    },*/
  
    {
      tag: "input",
      id: "register-form-email-input",
      listaClases: ["login-form-input"],
      listaAcciones: undefined,
      type: "text",
      placeHolder: "Email",
    },
    /*
    {
      tag: "h1",
      id: "register-form-label-fecha-nac",
      listaClases: ["login-form-text"],
      listaAcciones: undefined,
      innerText: "Fecha de Nacimiento.",
    },
  
    {
      tag: "input",
      id: "register-form-fechanacimiento-input",
      listaClases: ["login-form-input"],
      listaAcciones: undefined,
      type: "date",
      placeHolder: "Fecha de nacimiento",
    },
   */
  
    {
      tag: "h1",
      id: "register-form-label-imagen-perfil",
      listaClases: ["login-form-text"],
      listaAcciones: undefined,
      innerText: "Url foto de perfil",
    },
    /*
    {
      tag: "input",
      id: "register-form-fotoperfil-input",
      listaClases: ["login-form-input"],
      listaAcciones: undefined,
      type: "url",
      placeHolder: "Foto de perfil",
    },
  */
    {
      tag: "img",
      id: "register-form-perfil-img",
      listaClases: ["selector-picperfil-container-pics"],
      listaAcciones: undefined,
      source: "./imagenes/icons/ico_perfil.png",
    },
  
    {
      tag: "input",
      id: "register-form-submit-input",
      listaClases: ["login-form-button"],
      listaAcciones: undefined,
      type: "submit",
      value: "Aceptar",
    },
    /*
    {
      tag: "h1",
      id: "register-form-atras",
      listaClases: ["login-form-text"],
      listaAcciones: [{evento:'mousemove',accion:()=>document.getElementById('register-form-nuevo').classList.toggle('login-form-text-grande')},
      {evento:'click',accion:()=>{desrenderizarScreenActual(),renderizarLoginScreen()}},
  
                        ],
      innerText: "Atras",
    },
  */
  ];
  
  const elementosFooter = [
    //Es el menu de la barra principal.
  
    {
      tag: "h1",
      id: "id-footer-banner-title",
      listaClases: ["footer-banner-title"],
      listaAcciones: undefined,
      innerText: "MOTOGRAM@Todos los derechos reservados 2023",
    },
  ];
  