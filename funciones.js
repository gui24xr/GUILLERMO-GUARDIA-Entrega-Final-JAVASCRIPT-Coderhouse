
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
     //Tomo lls hijos
     
 
 item.hijos.forEach( hijo => {
  //Construyo un nuevo hijo y lo agrego al padre que sera el nuevo container div
  let nuevoHijo = transformarObjetoEnNodo(hijo)
  nuevoNodo.appendChild(nuevoHijo)
}
  )

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
                             //Ya tengo ambos archivos, Ahora puedo crear la base de datos y vincularla a mi variable.
                              baseDatosApp = new baseDatos(archivoUsuarios,archivoPosts)

                            
                      })
                    })


}

function renderizarScreenRegistro(){
  registerForm.engancharEnNodo(mainContainer)
  renderizarSelectorFotoPerfil()
}



function renderizarScreenUsuarioLogueado(){

//Pido los post del user a la base de datos para luego renderizarlo en los containers
let postsUsuarioLogueado = baseDatosApp.getPostsUsuario(usuarioLogueado)
// Si tiene post procedo a renderizar, de lo contrario doy algun aviso.

if (postsUsuarioLogueado.length > 0){


       //Inicializo  en el primer post.
       postUserViewer = new postViewer('id-post-viewer-usuario-logueado','post-viewer-container',postsUsuarioLogueado[0],transformarObjetoEnNodo)
    
      
    //Renderizo el objeto que selecciona los post
    selectorPostViewer = new selectorPosts( 'id-selector-Posts-usuario','selector-posts-container',postsUsuarioLogueado,postUserViewer,transformarObjetoEnNodo)
    selectorPostViewer.engancharEnNodo(mainContainer)
    postUserViewer.engancharEnNodo(mainContainer)
    


}
else alert("Usuario no tiene post") //Usar sweet alkert

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

  //selectBackgroundScreen(true)
  configurarMainContainer(true)
  //Seteo la variable global con el nombre de usuario que se logueo y usare para todi
  usuarioLogueado = usuario
  //Doy la bienvenida y quita de la visualizacion los componentes de form
  alert('Se logueo el usuario: ' + usuario)  //Usar sweet alert.
  mainFormLogin.desengancharDeDom()
  //mainContainer.className = 'class-main-container-sesion-iniciada'
  //Inicio sesion en la barra superior pero antes pido a la base de datos los datos del usuario logueado.
  //Sabemos que nos devuelve un objeto. Lo deconstructuro.
  
  let { userName:nombreUsuario, fotoPerfil} = baseDatosApp.getUserInfo(usuarioLogueado)
  //Abro los banners de sesion iniciada.
  bannerSesionActual.iniciarSesion(nombreUsuario,fotoPerfil)
  //bannerSolapas = new wrapperElements('id-banner-solapas','banner-solapas',elementosBannerSolapas,transformarObjetoEnNodo)
  //bannerSolapas.engancharEnNodo(headerContainer)
  //Renderizo los container que muestran las cosas del usuario.
  renderizarScreenUsuarioLogueado()
  



}

function cerrarSesion (){

  selectBackgroundScreen(false)
  configurarMainContainer(false)
   //Vuelve todo estado inicial.
  //mainContainer.className = 'class-main-container'
  bannerSesionActual.cerrarSesion()
  desrenderizarScreenActual()
  //renderizarLoginScreen()
  //bannerSolapas.desengancharDeDom()

}


function cambiarPostActual(unPostViewer,idPostNuevo){

  //Tomo un post de la base de datos

  let unPost = baseDatosApp.getPostID(idPostNuevo)//baseDatosApp.getPostsUsuario(usuarioLogueado)
   unPostViewer.cambiarPost(unPost)
}




function comprobarRegistroUsuario(){



  const usernameIngresado = document.getElementById('register-form-user-input').value
  const passwordIngresado = document.getElementById('register-form-password-input').value
  const passwordRepeatIngresado = document.getElementById('register-form-re-password-input').value
  const emailIngresado = document.getElementById('register-form-email-input').value 
  const fotoPerfilIngresada = document.getElementById('register-form-perfil-img').src

  //Existe usuario?
  let condicion1 = !baseDatosApp.existeUsuario(usernameIngresado)
  let condicion2 = baseDatosApp.passwordAceptado(passwordIngresado) 
  let condicion3 = passwordIngresado == passwordRepeatIngresado 
  let condicion4 = esEmailValido(emailIngresado)

  //Si todas estas condiciones proceso a crear el usuario, si no emito un mensaje de error.
  if (condicion1 && condicion2 && condicion3 && condicion4){

    //Si lo creo de forma satisfactoria aviso mando a iniciar sesion
    console.log(fotoPerfilIngresada.source)
    if (baseDatosApp.agregarNuevoUsuario(usernameIngresado,passwordIngresado,emailIngresado,fotoPerfilIngresada)) alert("todo ok")
  }
  else{
    alert("mensaje de error con switch")
  }

}


function renderizarSolapaOtrosMoteros(){

  //Quito todos posibles objetos que estan en el contenedor main.
  //postUserViewer.desengancharDeDom()
  //selectorPostViewer.desengancharDeDom()
  
  //Creo los nuevos objetos para mostar los datos de todo y los engancho al dom
  //Antes le pido a la BD un post al azar para dibujar primero
  let  postIngresado = baseDatosApp.getPostID('1') 
  let todosLosPosts = baseDatosApp.getAllPosts()
  postViewerGeneral = new postViewer('id-post-viewer-general','post-viewer-container',postIngresado,transformarObjetoEnNodo)
  selectorViewerGeneral = new selectorPosts('id-selector-Posts-general','selector-posts-container',todosLosPosts,postViewerGeneral,transformarObjetoEnNodo)

  selectorViewerGeneral.engancharEnNodo(mainContainer)
  postViewerGeneral.engancharEnNodo(mainContainer)

}


function darLike(postIDClickeado){

  //Postviewer pone marcas al cambiar de post y me pasa el parametr postIDclikeado 
  //entonces le doy like al post y el like es el ID user.
  //Quien da like es el user logueado siempre y cuando no haya loqueado.
  //luego de eso actualizo la cantidad de likes

  //setLikes(postID,usuario)    (postIDClikeado,usuarioLogueado)
  baseDatosApp.setLikes(postIDClickeado,usuarioLogueado)
  //Actualizo los MG renderizando de nuevo el postViewer
  //COmo se el Id del post que me mando el lik puedo usarlo para actualizarlo.
  cambiarPostActual(postUserViewer,postIDClickeado)
  cambiarPostActual(postViewerGeneral,postIDClickeado)
}

function renderizarGaleria(){

  //Muestra una galeria de fotos bajadas de unplash. Recorro el json de unplash.
  const url = "https://api.unsplash.com/search/photos?query=moto&per_page=50&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";
  
  //const imageDiv = document.querySelector('.image');
    fetch(unplashURLCategoria('moto','60'))
        .then(response =>  response.json())
        .then(data => {

            let arrayElementos = []
            let nuevoObjeto;
            //console.log(/*data.results[3].urls.regular)*/data.results)
            let resultados = data.results
            //console.log(data.results[3].urls)
      
            //tomo cada url para constuir un pbjeto y meterlo al array que le voy a dar a renderizar a mi wrapper container.
            resultados.forEach(    x => //console.log (x.urls.small)
                                    
              
              {
                nuevoObjeto = {tag: "div",  //Solo los div con hijos tendran el atributo tipo?? e hijos.
                              id: "container-galeria-pic",
                              listaClases: ["div-like-comentarios"],
                              listaAcciones: undefined,
                
                              hijos:[ 
                                  { tag: "img",
                                    id: 'imggaleria',
                                    listaClases: ["grid-post-select-pic"],
                                    listaAcciones: undefined,
                                    source: x.urls.small
                                  }]
                }

                arrayElementos.push(nuevoObjeto)
            }



        )
        containerGaleriaFotos  = new wrapperElements('id-wrapper-galeria','grid-galeria-container',arrayElementos,transformarObjetoEnNodo)
        containerGaleriaFotos.engancharEnNodo(mainContainer)
      }
        
        
        
        )


}




function desrenderizarScreenActual(){

  //Agarro todos los elementos que estan enganchados en main container y los quito para
  //dar lugar a los nuevos
let nodosHijos  = document.getElementById('main-container').childNodes

let idNodosParaBorrar = [];

nodosHijos.forEach( nodo => idNodosParaBorrar.push(nodo.id))
console.log(idNodosParaBorrar)

idNodosParaBorrar.forEach( id => document.getElementById(id).remove())

}


function renderizarSelectorFotoPerfil(){

    //Tomo fotos de unplash para que el usuario seleccione para foto de perfil. Los recolecto en un array y luego los mando a renderizar

    fetch(unplashURLCategoria('alpinestars',10))
        .then(response =>  response.json())
        .then(data => {

            
            let arrayElementos = []
            let nuevoObjeto;
            console.log(/*data.results[3].urls.regular)*/data.results)
            let resultados = data.results
            //tomo cada url para constuir un pbjeto y meterlo al array que le voy a dar a renderizar a mi wrapper container.
            resultados.forEach(  x => {
              //console.log (x.urls.small)
              nuevoObjeto = { tag: "img",id: 'perfilPicSelector-pic',listaClases: ['selector-picperfil-container-pics'],
                            listaAcciones: [{evento:'click',accion:()=>{document.getElementById('register-form-perfil-img').src = x.urls.thumb}}],
                            source: x.urls.small}
                            
                            //Ya prepare los objetos a renderizar y a cada imagen le puse la accion de que seleccione el input y le coloque el valor de url 
                            //De la imagen que mostrara y ahora la meto al array de elementos para mandar a renderizar.
                            arrayElementos.push(nuevoObjeto)
                            })
        
        //Construyo el wrapper donde mostrare las fotos de perfil a elegir
        containerGaleriaFotos  = new wrapperElements('id-wrapper-perfilpic-selector','selector-picperfil-container',arrayElementos,transformarObjetoEnNodo)
        //Ejecutar quitar elementos de otras pantallas

       // postUserViewer.desengancharDeDom()
        //selectorPostViewer.desengancharDeDom()
        //postViewerGeneral.desengancharDeDom()
        //selectorViewerGeneral.desengancharDeDom()

        containerGaleriaFotos.engancharEnNodo(mainContainer)
      }
        
        
        
        )


}

/*

function renderizarLoginScreen(){

  mainFormLogin =new wrapperElements('id-main-login-form','login-form',elementosLoginForm,transformarObjetoEnNodo,"javascript:conectarBaseDatos()")
 mainFormLogin.engancharEnNodo(mainContainer)

}


*/





function configurarMainContainer(sesionAbierta){


  let hScreenContainer = window.screen.availHeight
  let hBannerHeader = document.getElementById('id-banner-header').clientHeight
  let hBannerSesion = document.getElementById('id-banner-sesion').clientHeight


  //Asigno la nueva altura al main container.
  nuevaAlturaMainContainer = hScreenContainer-hBannerHeader-hBannerSesion
  mainContainer.style.height = nuevaAlturaMainContainer.toString() + 'px'
  //console.log(nuevaAlturaMainContainer + 'px')
     
  if (sesionAbierta){
    mainContainer.style.display = 'flex'
    mainContainer.style.justifyContent = 'space-around'
    mainContainer.style.backgroundImage = 'none'
    mainContainer.style.backgroundColor = 'white'
  }
  else{

    
    //mainContainer.style.alignItems= 'center'

    mainContainer.style.display = 'flex'
    mainContainer.style.justifyContent = 'center'
    mainContainer.style.alignItems= 'center'
  }
                  
}




function selectBackgroundScreen (sesionAbierta){


//Elijo una categoria de forma aleatoria.
let categoriaElegida = categoriasImagenes[generarValorAleatorio(0,categoriasImagenes.length-1)]
    
//Pido 20 imagenes de la categoria
fetch(unplashURLCategoria(categoriaElegida,'20'))
.then(response =>  response.json())
.then(data => {

            //Busco una imagen horizontal dentro del array de forma aleatoria para lo cual entro al while y mientras no sea horizontal seguira buscando
            let imagenSeleccionada;
            let imagenCorrecta = false;

            while (!imagenCorrecta){
              imagenSeleccionada = data.results[generarValorAleatorio(0,data.results.length -1)]/*.urls.small*/
              if ( imagenSeleccionada.width > imagenSeleccionada.height ) imagenCorrecta = true
            }

          //Obtengo un objeto que pertenece a una imagen horizontal y del mismo tomo la informacion que necesito.
          const {urls, width:imagenSeleccionadaWidth, height:imagenSeleccionadaHeight} = imagenSeleccionada //urls es tamnien objeto

          //Asigno la imagen al fondo del main container.
            mainContainer.style.backgroundImage = 'url(' + urls.regular +')'
            
            /*sesionAbierta 
            ? mainContainer.style.filter = 'grayscale(60%)' 
            : mainContainer.style.filter = ''
              */
           /* sesionAbierta 
            ? mainContainer.style.backgroundAttachment
            : mainContainer.style.filter = ''*/

            //Calculo el tamaño que usare.
           let widthContainer = mainContainer.clientWidth 
            backgroundHeight = nuevaAlturaMainContainer
       

            //Setep las caracterstisticas para estirar la imagen de manera deseada en main container.
            mainContainer.style.backgroundRepeat = 'no-repeat'
            mainContainer.style.backgroundSize = widthContainer.toString()+'px '+backgroundHeight.toString()+'px'
        })



        
}



//Esta la usare para pasar array con datos predeterminados y que me devuelva aleatoriamente uno de los valores contenidos, ejemplo el de categoria de imagenes.
const getDatoAleatoriaArray = (unArray) => { 
  //Se supone es un array no vacio.
       if (unArray.length >0) return unArray[generarValorAleatorio(0,unArray.length-1)]
         else return unArray[0]
}


const generarValorAleatorio = (min,max) => Math.floor((Math.random() * (max - min + 1)) + min)


function creacionDePerfilesAleatorios() {
  
  const cantidadRegistrosPedidos = 10;
  const urlApiDatos = "https://random-data-api.com/api/v2/users?size=" + cantidadRegistrosPedidos + "&is_xml=true";

  //La idea es generar mediante API 10 user al azar e insertar a la base de datos al iniciar la APP y ademas a esos user ponerles fotos de perfil y generarle algunos posts.
  fetch(urlApiDatos)
    .then((response) => response.json())
    .then((data) => {
      //Voy a tomar username,,password, email, perfil y el estado lo hago como "hola soy + nombree de perfil"
        data.forEach((registro) => {
        //COn esta los creamos y sabemos si esa creacion fue satisfactoria.
        if (baseDatosApp.agregarNuevoUsuario(registro.username,registro.password,registro.email,registro.avatar, "Hola, soy " + registro.username) == true){
          //Vamos a crear por cada usuario nuevo entre 1 y 10 posts con fotos de unplash y categoria al azar respecto a la tematica del sitio.
          let cantidadNuevosPost = generarValorAleatorio(1, 4);
          let horaPost = "09:30"; //Despues genero esto de manera aleatorio
          let fechaPost = "6-10-23"; //Despues genero esto de manera aleatorio
          let texto = "Este post es de" + registro.username; //Despues lo generamos aleatorio.
          let categoria = getDatoAleatoriaArray(categoriasImagenes); //console.log("Catego: ", categoria)
          //Le pido la cantidad deseada a unplas y por cada imagen creo un post
          fetch(unplashURLCategoria(categoria, cantidadNuevosPost))
            .then((response) => response.json())
            .then((data) => {
              //tenemos un array con la cantidad pedida de objetos, lo recorro y voy creando posts para este user
              data.results.forEach((x) => { baseDatosApp.agregarNuevoPost(registro.username,fechaPost,horaPost,texto,x.urls.regular);});
            });
        }
      });

      
    })
  }




  function esEmailValido(email) {
    
      var condiciones = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
   if (condiciones.test(email)) return true; return false // El email es válido.
  }