
function transformarObjetoEnNodo(item) {
  
  /* Esta funcion es un constructor de nodos que recibe un objeto del tipo 
  {
    tag: "img",
    id: "img1",
    listaClases: ["login-form-pic"],
    listaAcciones: undefined,
    source: "./imagenes/icons/ico_perfil.png",
  },
  
  y de acuerdo al objeto va creando los elementos y agregando id, clases, eventos y dandole los atributos segun corresponda.
  
  */

  // En estas 4 lineas creamos el nodo segun el tipo de tag y luego le colocamos las caracteristicas que todos tienen (id, lista de clases y lista de acciones(de no tener clases o acciones se pasa undefined))
   let nuevoNodo = document.createElement(item.tag);
   nuevoNodo.id = item.id;
   if (item.listaClases != undefined) item.listaClases.forEach((x) => nuevoNodo.classList.add(x));
  //nuevoNodo.addEventListener("click", item.listaAcciones);
  if (item.listaAcciones != undefined) item.listaAcciones.forEach(x => nuevoNodo.addEventListener(x.evento, x.accion))//nuevoNodo.addEventListener(x.evento,x.accion))


  //Individual segun tipo de objeto.
  switch (item.tag) {
    case "h1":
      nuevoNodo.innerText = item.innerText;
      break;
    case "p":
      nuevoNodo.innerText = item.innerText;
      break;
    case "img":
      nuevoNodo.src = item.source;
    break;
    case "input":
      nuevoNodo.type = item.type
      if (item.type == 'text') nuevoNodo.placeholder = item.placeHolder;
      if (item.type == 'submit') nuevoNodo.value = item.value

    break;

    case "div":
     if (item.tipo == 'portrait'){
      nuevoNodo.style.backgroundImage = "url(" + item.source + ")";
      console.log("tipo portait")
     }

    break;
    default:
      console.log("FUNCION CONSTRUIR NODO");
  }

  return nuevoNodo
}



function conectarBaseDatos (){

let archivoUsuarios;
let archivoPosts;

 /*Pido al servidor local los archivos para crear la base de datos , primero pido datos usuarios */
 fetch('./data/datos_usuarios.json')
 .then( response => response.json())
 .then( (dataArchivoUsuarios) => { 
                    //Levanto el archivo usuarios
                    archivoUsuarios = dataArchivoUsuarios; //console.log(archivoUsuarios)
                    //Ahora mediante otro fetch pido al server local el archivo de posts.
                    fetch('./data/datos_posts.json')
                    .then( response => response.json())
                    .then( (dataArchivoPosts) => {
                              archivoPosts = dataArchivoPosts ;
                               //console.log(dataArchivoPosts)
                              //Ya tengo varios archivos, Ahora puedo crear la base de datos y vincularla a mi variable.
                              baseDatosApp = new baseDatos(archivoUsuarios,archivoPosts)
                              //console.log(baseDatosApp.existeUsuario('guixr24'))
                              //TENEMOS LA DATA DE BASES VINCULADA, SUPONIENDO QUE TODO SALIO OK COMPROBAMOS USUARIO Y CONTRASEÑA
                              comprobarUsuario()
                              })
                    })


}


function comprobarUsuario (){
    
  //Capturo usuario y contraseña ingresados por el usuario. 
 let usuarioIngresado = document.getElementById('login-form-user-input').value
 let passwordIngresado= document.getElementById('login-form-password-input').value

 //Pregunto a la base de datos si el usuario ingresado tiene la contraseña ingresada.
 //De esta todo OK seteo al usuario como logueado e inicio su sesion
 baseDatosApp.validarPasswordUsuario(usuarioIngresado,passwordIngresado)
 ? abrirSesionUsuario(usuarioIngresado)
 : alert("Usuario incorrecto")   ///Aca meter sweet alert
 }



function abrirSesionUsuario(usuario){

  //Seteo la variable global con el nombre de usuario que se logueo y usare para todi
  usuarioLogueado = usuario
  //Doy la bienvenida y quita de la visualizacion los componentes de form
  alert('Se logueo el usuario: ' + usuario)  //Usar sweet alert.
  mainFormLogin.desengancharDeDom()
  mainContainer.className = 'class-main-container-sesion-iniciada'
  //Inicio sesion en la barra superior pero antes pido a la base de datos los datos del usuario logueado.
  //Sabemos que nos devuelve un objeto. Lo deconstructuro.
  
  let { userName:nombreUsuario, fotoPerfil} = baseDatosApp.getUserInfo(usuarioLogueado)
  //Abro los banners de sesion iniciada.
  bannerSesionActual.iniciarSesion(nombreUsuario,fotoPerfil)
  bannerSolapas = new wrapperElements('id-banner-solapas','banner-solapas',elementosBannerSolapas,transformarObjetoEnNodo)
  bannerSolapas.engancharEnNodo(headerContainer)
  //Renderizo los container que muestran las cosas del usuario.
 
  //Pido los post del user a la base de datos para luego renderizarlo en los containers
  let postsUsuarioLogueado = baseDatosApp.getPostsUsuario(usuarioLogueado)
  // Si tiene post procedo a renderizar, de lo contrario doy algun aviso.
  
  if (postsUsuarioLogueado.length > 0){
  
  
         //Inicializo  en el primer post.
         postUserViewer = new postViewer('id-post-viewer-usuario-logueado','carrousel',postsUsuarioLogueado[0],transformarObjetoEnNodo)
      
        
      //Renderizo el que selecciona los post
      selectorPostViewer = new selectorPosts( 'id-selector-Posts-usuario','selector-posts-container',postsUsuarioLogueado,postUserViewer,transformarObjetoEnNodo)
      selectorPostViewer.engancharEnNodo(mainContainer)
      postUserViewer.engancharEnNodo(mainContainer)
      
 
  //console.log(primerPostUsuarioLogueado[0])
}
 else alert("Usuario no tiene post") //Usar sweet alkert
  

}

function cerrarSesion (){

   //Vuelve todo estado inicial.
  mainContainer.className = 'class-main-container'
  bannerSesionActual.cerrarSesion()
  bannerSolapas.desengancharDeDom()
  bannerSolapas =undefined;
  baseDatosApp = undefined;
  usuarioLogueado = undefined;
  postUserViewer.desengancharDeDom()
  postUserViewer=undefined;
  selectorPostViewer.desengancharDeDom()
  selectorPostViewer= undefined;
  mainFormLogin.engancharEnNodo(mainContainer)

}


function cambiarPostActual(unPostViewer,idPostNuevo){

  //Tomo un post de la base de datos

  let unPost = baseDatosApp.getPostID(idPostNuevo)//baseDatosApp.getPostsUsuario(usuarioLogueado)
   unPostViewer.cambiarPost(unPost)
}


function irARegistrar(){

//Accionado desde el boton entonces primero cierro todo y pongo el form de registro

 registerForm.engancharEnNodo(mainContainer)
 
}

function comprobarRegistroUsuario(){

  let nodos = document.getElementById('id-register-form').children
  console.log(nodos)

}


function renderizarSolapaOtrosMoteros(){

  //Quito todos posibles objetos que estan en el contenedor main.
  postUserViewer.desengancharDeDom()
  selectorPostViewer.desengancharDeDom()
  
  //Creo los nuevos objetos para mostar los datos de todo y los engancho al dom
  //Antes le pido a la BD un post al azar para dibujar primero
  let  postIngresado = baseDatosApp.getPostID('1') 
  let todosLosPosts = baseDatosApp.getAllPosts()
  postViewerGeneral = new postViewer('id-post-viewer-general','carrousel',postIngresado,transformarObjetoEnNodo)
  selectorViewerGeneral = new selectorPosts('id-selector-Posts-general','selector-posts-container',todosLosPosts,postViewerGeneral,transformarObjetoEnNodo)

  selectorViewerGeneral.engancharEnNodo(mainContainer)
  postViewerGeneral.engancharEnNodo(mainContainer)

}

