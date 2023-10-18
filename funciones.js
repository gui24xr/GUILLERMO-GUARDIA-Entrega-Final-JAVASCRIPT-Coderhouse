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
    case "a":
      nuevoNodo.href = item.direccion
      nuevoNodo.textContent = item.label
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
                              archivoPosts = dataArchivoPosts;
                             //Ya tengo ambos archivos, Ahora puedo crear la base de datos y vincularla a mi variable.
                              baseDatosApp = new baseDatos(archivoUsuarios,archivoPosts)
                              //Ahora le agrego perfiles mediante API
                              creacionDePerfilesAleatorios(); //Le agrega perfiles y posts 'falsos' para poblar la BD
                              
                              
                      })
                    })


}











function comprobarUsuario (){
    
  //Capturo usuario y contraseña ingresados por el usuario. 
 let usuarioIngresado = document.getElementById('login-form-user-input').value
 let passwordIngresado= document.getElementById('login-form-password-input').value

 console.log(usuarioIngresado,passwordIngresado,baseDatosApp.validarPasswordUsuario(usuarioIngresado,passwordIngresado))

 //Pregunto a la base de datos si el usuario ingresado tiene la contraseña ingresada.
 //De esta todo OK seteo al usuario como logueado e inicio su sesion
 baseDatosApp.validarPasswordUsuario(usuarioIngresado,passwordIngresado)
 ? abrirSesionUsuario(usuarioIngresado)
 : alert("Usuario incorrecto")   ///Aca meter sweet alert
 }



function abrirSesionUsuario(usuario){

  usuarioLogueado = usuario

  mostrarMensaje('Se logueo el usuario: ' + usuario + '!!','success','Aceptar')
  
  let { userName:nombreUsuario, fotoPerfil} = baseDatosApp.getUserInfo(usuarioLogueado)
  //Abro los banners de sesion iniciada.
  bannerSesionActual.iniciarSesion(nombreUsuario,fotoPerfil)

  /*Aprovecho aca por cuestiones de asincronia a meter los comentarios nuevos ya que en este momento se crearon todos los perfiles aleatorios y 
  de esta manera les puedo asignar estos comentarios aleatorios y reparto 250 comentarios entre los user genuinos y aleatorios creados x la api */
  baseDatosApp.setArchivoComentarios(getArchivoComentarios(250,baseDatosApp))
 
  //Renderizo screen
  renderizarScreenUsuarioLogueado()
  



}

function cerrarSesionUsuario (){

  selectBackgroundScreen(false)
  desrenderizarScreenActual()
  configurarMainContainer('home')
  
  renderizarScreenLogin()
 


}






function comprobarRegistroUsuario(){



  const usernameIngresado = document.getElementById('register-form-user-input').value
  const passwordIngresado = document.getElementById('register-form-password-input').value
  const passwordRepeatIngresado = document.getElementById('register-form-re-password-input').value
  const emailIngresado = document.getElementById('register-form-email-input').value 
  const fotoPerfilIngresada = document.getElementById('register-form-perfil-img').src

  //Condiciones
  let condicion1 = !baseDatosApp.existeUsuario(usernameIngresado) //Existe usuario?
  let condicion2 = baseDatosApp.passwordAceptado(passwordIngresado) //Es un password valido??
  let condicion3 = passwordIngresado == passwordRepeatIngresado  //Coinciden los passwords ingresados?
  let condicion4 = esEmailValido(emailIngresado) //Es un email valido el ingresado?

  //Si todas estas condiciones proceso a crear el usuario, si no emito un mensaje de error.
  if (condicion1 && condicion2 && condicion3 && condicion4){

    //Si lo creo de forma satisfactoria aviso mando a iniciar sesion
      if (baseDatosApp.agregarNuevoUsuario(usernameIngresado,passwordIngresado,emailIngresado,fotoPerfilIngresada)) {
      mostrarMensaje('El usuario ' + usernameIngresado + ' se registro exitosamente, ya podes iniciar sesion !!','success','Aceptar')
      //Vamos a crear un postInicial de bienvenida para cada nuevo user que le diga que haga su primer posteo con los sigeintes datos..
           
      baseDatosApp.agregarNuevoPost(baseDatosApp.getUserInfo(usernameIngresado).userID,getFechaActual().fechaString,getFechaActual().horaString,'Bienvenido a Motogram ' + usernameIngresado + 'subi tu primer foto !',PICPOSTBIENVENIDA)
      
      desrenderizarScreenActual();
      renderizarScreenLogin()
    }
  }
  else{
        
    //Decido que mensaje de errpr dar segun lo que suceda. Mensaje de error es sumatoria


    if (!condicion1) mostrarMensaje('El usuario ' + usernameIngresado + ' ya existe!!','warning','Aceptar')
    if (!condicion2) mostrarMensaje('La contraseña ingresada no es seguro ! Utilice al menos 6 letras y solamente numeros y letras !!','warning','Aceptar')
    if (!condicion3) mostrarMensaje('Las contraseñas ingresadas no coinciden !!','warning','Aceptar')
    if (!condicion4) mostrarMensaje('El email ingresado no es un email valido !!','warning','aceptar')
  

  }

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
          //Vamos a crear por cada usuario nuevo entre 1 y 6 posts con fotos de unplash y categoria al azar respecto a la tematica del sitio.
          
          
        
          let cantidadNuevosPost = generarValorAleatorio(1, 6);
          
          
          let texto = "Este post es de" + registro.username; //Despues lo generamos aleatorio.
          let categoria = getDatoAleatoriaArray(categoriasImagenes); //console.log("Catego: ", categoria)
          //Le pido la cantidad deseada a unplas y por cada imagen creo un post
          fetch(unplashURLCategoria(categoria, cantidadNuevosPost))
            .then((response) => response.json())
            .then((data) => {
              //tenemos un array con la cantidad pedida de objetos, lo recorro y voy creando posts para este user
              let idUsuarioActual = baseDatosApp.getUserInfo(registro.username).userID
              data.results.forEach((x) => { 
                
                let fechaHora = getFechaAleatoria()
                let horaPost = fechaHora.horaString
                let fechaPost = fechaHora.fechaString
                let hashtagLists =getHashTagsList(generarValorAleatorio(1,8))//Entre 1 y 8 hashtags a cada post creado

                baseDatosApp.agregarNuevoPost(idUsuarioActual,fechaPost,horaPost,texto,hashtagLists,x.urls.regular);});
              //console.log("wwwwwwwwwwwwww",baseDatosApp.getPostsUsuario('20'))
              //console.log("BASE DE DATOS: \n",baseDatosApp.getAllPosts())
            });
            

        }
      });
      
      
    })
    
  }




  function esEmailValido(email) {
    
      var condiciones = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
   if (condiciones.test(email)) return true; return false // El email es válido.
  }


  function mostrarMensaje (mensajeMostrado,iconoMostrado,mensajeBotonConfirmar){

    Swal.fire({
      title: mensajeMostrado,
      icon: iconoMostrado,
      confirmButtonText: mensajeBotonConfirmar

    }
    
    )

  }


  //-----------------------------------------------------------------------------------------------//
// FUNCIONES DE TIEMPO 
//-----------------------------------------------------------------------------------------------//


  function getFechaActual(){

    //Devuelve un objeto que tiene 2 propiedades que son string fecha y hora pero con el formato de la base de datos.
   

    //Obtengo el objeto con la hora actual
    let { year,month,day,hour,minute } = DateTime.now().c

    //Devuelvo un objeto con 2 propiedades ( fechaActualString y horaActualString) que son la fecha y hóra actual en formato deseado.

    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    if (hour < 10) hour = '0' + hour
    if (minute < 10) minute = '0' + minute

    return { fechaString: day+'-'+month+'-'+year, horaString: hour+':'+minute}

   
  }


  function getFechaAleatoria(){

    //Devuelve un objeto con una fecha y hora aleatorias y 5 año anteriores que tiene 2 propiedades que son string fecha y hora pero con el formato de la base de datos.
 
       
        /* Trabajo con el metodo plus */
        /*Genero una cantidad aleatoria de dias y minutos para restar que sea entre 0 y 5 años (0 y 1825 dias)
        lo multiplico * -1  para que el metodo plus reste*/

        let cantDiasRestar = generarValorAleatorio(1,1825) * -1
        let cantMinutos = generarValorAleatorio(1,1439)*-1
        let nuevaFechaHoraAleatoria = DateTime.now().plus({days:cantDiasRestar,minutes:cantMinutos})
       
        //Deconstructuro el resultado para trabajar mas comdoo en la sintaxis.
        let { year,month,day,hour,minute } = nuevaFechaHoraAleatoria.c
        //Para que no me quede formato 6:6 x ejemplo en vez de 6.6 agrego un cero
       if (month < 10) month = '0' + month
       if (day < 10) day = '0' + day
       if (hour < 10) hour = '0' + hour
       if (minute < 10) minute = '0' + minute
      
      //Devuelvo el objeto con el formato deseado.
      return { fechaString: day+'-'+month+'-'+year, horaString: hour+':'+minute}
    
  }







function getMinutosTranscurrido(fechaIngresada,horaIngresada){

//Devuelve la cantidad de minutos transcurridos desde la fecha y hora ingresada

//Tenemos en la BD formato '01-01-2023' y '09:34' por lo tanto:
let numDia= fechaIngresada.slice(0,2)
let numMes = fechaIngresada.slice(3,5)
let numAnio = fechaIngresada.slice(6,10)
let numHora = horaIngresada.slice(0,2)
let numMins = horaIngresada.slice(3,5)

//Formo la cadena para pasarle al metodo fromISO
let fechaHoraIngresadaFormatoISO = numAnio+'-'+numMes+'-'+numDia+'T'+numHora+':'+numMins


//Obtengo la fecha y hora actual y formo la cadena para el metodo fromISO
let { year,month,day,hour,minute } = DateTime.now().c

       if (month < 10) month = '0' + month
       if (day < 10) day = '0' + day
       if (hour < 10) hour = '0' + hour
       if (minute < 10) minute = '0' + minute

let fechaHoraActualFormatoISO = year+'-'+month+'-'+day+'T'+hour+':'+minute


//Ahora conta Date.Time.iso obtengo la diferencia horaria en milisegundos y la divido para obtenerlo en minutos.
const horaInicio = DateTime.fromISO(fechaHoraIngresadaFormatoISO)/1000/60
const horaFin = DateTime.fromISO(fechaHoraActualFormatoISO)/1000/60

return horaFin-horaInicio

}

function getLeyendaTiempoTranscurrido(fechaIngresada,horaIngresada){



  /*Toma fecha y hora ingresadas extraidas de la BD y devuelve una leyenda como instagram depende el 
  tiempo transcurrido */
 let minutosTranscurridos = getMinutosTranscurrido(fechaIngresada,horaIngresada)
 //console.log("Minutos transcurridos: ", minutosTranscurridos)

//Entre 1 y 10 minutos
 if (minutosTranscurridos>=0 && minutosTranscurridos<=10) return 'Hace un momento.'
 
 //Entre 11 y 59 minutos
 if (minutosTranscurridos>10 && minutosTranscurridos<=59) return 'Hace ' + minutosTranscurridos + ' minutos'

 //Entre 1 y 2 horas
 if (minutosTranscurridos>59 && minutosTranscurridos<=119) return 'Hace ' + (minutosTranscurridos/60).toFixed(0) + ' hora.'
  
 //Entre 2 y 23 horas
 if (minutosTranscurridos>=120 && minutosTranscurridos<=1439) return 'Hace ' + (minutosTranscurridos/60).toFixed(0) + ' horas'

////Entre 1 dia y una semana
 if (minutosTranscurridos>=1440 && minutosTranscurridos<=10080) return 'Hace ' + (minutosTranscurridos/60/24).toFixed(0) + ' dias'

 ////Entre una semana 4 semanas
 if (minutosTranscurridos>=10080 && minutosTranscurridos<=40319) return 'Hace ' + (minutosTranscurridos/60/24/7).toFixed(0) + ' Semanas'
// Entre 4 semanas y 12 meses y pedimos el nombre del mes
if (minutosTranscurridos>=40320 && minutosTranscurridos<=525600) return + fechaIngresada.slice(0,2) + ' de ' + getNombreMes(fechaIngresada.slice(3,5)) 

////Un Año o mas
if (minutosTranscurridos>=525600) return + fechaIngresada.slice(0,2) + ' de ' + getNombreMes(fechaIngresada.slice(3,5)) + ' de ' + fechaIngresada.slice(6,10)
}


function getNombreMes(numMes){

  const nombreMeses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio', 'Agosto', 'Septiembre', 'Octubre','Noviembre','Diciembre'];

  if (numMes[0] == '0') numMes = numMes[1]
  return nombreMeses[numMes-1]

  //Recibe un numero de mes, si es '05' le quita el cero y devuelve el nombre de mes
}





function getArchivoComentarios(cantidadComentarios,unaBaseDatos){

  //Esta funcion va a generar un array de objetos comentarios para usar aunque mas adelante la idea es usar un API

  let arrayComentarios = []
  let i=1;
  let unaFechaHora;

  for(i;i<cantidadComentarios+1;i++){

    unaFechaHora = getFechaAleatoria()

    let objetoComentario = {

      comentarioID: i, //Identificador del comentario.
      postID: generarValorAleatorio(1,unaBaseDatos.getCantidadPosts()), //Comentario al que pertenece el comentario.
      userID: generarValorAleatorio(1,unaBaseDatos.getCantidadUsuarios()), //user que hizo el comentario
      texto: 'Hola! Este es el comentario ID ' + i, //Texto del comentario.
      fecha: unaFechaHora.fechaString,
      hora: unaFechaHora.horaString
    }

  //Ahora a la lista de hashtag le meto entre 3 y 8 hashtags de motoicletas en forma aleatoria.
  /*j=1;

  

  while (j<generarCantidadHashtag){
    objetoComentario.hashtagList.push(hashtagsMotocicletas[generarValorAleatorio(0,hashtagsMotocicletas.length-1)])
    j++;

  }*/

    arrayComentarios.push(objetoComentario)

}

return arrayComentarios

}


function getHashTagsList(cantidadMaxima){

  //Devuelve una lista de hashtags generada a partir del array 'hashtagmotocicletas'.
  //Los posts de los usuarios pueden tener 0,1 o muchos hashtag.

  let j =0;
  let hashtagList = []
  
  while (j<cantidadMaxima){
    //Agrego a la lista una cantidad deseada de hashtags y los eligo de manera aleatoria del array hashtagmoticletas.
    hashtagList.push(hashtagsMotocicletas[generarValorAleatorio(0,hashtagsMotocicletas.length-1)])
    j++;
  }

  return hashtagList

}