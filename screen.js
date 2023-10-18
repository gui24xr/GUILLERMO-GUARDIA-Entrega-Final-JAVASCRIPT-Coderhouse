function configurarMainContainer(configuracion){

    //Setea el mainContainer segun la pagina y desrenderiza la screen actual
    desrenderizarScreenActual()
  
    let hScreenContainer = window.screen.availHeight
    let hBannerHeader = document.getElementById('id-banner-header').clientHeight
    let hBannerSesion = document.getElementById('id-banner-sesion').clientHeight
  
  
    //Asigno la nueva altura al main container.
    nuevaAlturaMainContainer = hScreenContainer-hBannerHeader-hBannerSesion-hBannerHeader-hBannerSesion
    mainContainer.style.height = nuevaAlturaMainContainer.toString() + 'px'
    
    switch(configuracion){
     
  
  
  
  
        case 'home':
          mainContainer.className = 'clase-main-container-screen-home'
        
          break;
        case 'login':
          mainContainer.className = 'clase-main-container-screen-login'
          
          break;
  
          case 'registro':
            mainContainer.className = 'clase-main-container-screen-registro'
         break;
         case 'instagram':
            mainContainer.className = 'clase-main-container-screen-instagram'
         break;
         case 'galeria':
           
            mainContainer.className = 'clase-main-container-screen-galeria'
         break;
         case 'nuevoPost':
          mainContainer.className = 'clase-main-container-screen-registro'
       break;






  
      case 'sesion-abierta':
      mainContainer.style.display = 'flex'
        mainContainer.style.justifyContent = 'space-between'
        mainContainer.style.backgroundImage = 'none'
        mainContainer.style.backgroundColor = 'white'
      break;
    case 'cerrada':
      mainContainer.style.display = 'flex'
      mainContainer.style.justifyContent = 'center'
      mainContainer.style.alignItems= 'center'
      break;
      default:
        console.log('ggg')
    }
    }


//---------------------------------------------

    function desrenderizarScreenActual(){

        //Agarro todos los elementos que estan enganchados en main container y los quito para
        //dar lugar a los nuevos
      let nodosHijos  = document.getElementById('main-container').childNodes
      
      let idNodosParaBorrar = [];
      
      nodosHijos.forEach( nodo => idNodosParaBorrar.push(nodo.id))
      //console.log(idNodosParaBorrar)
      
      idNodosParaBorrar.forEach( id => document.getElementById(id).remove())
      
      }

function renderizarScreenRegistro(){
  
    //Configuro el main y desrendeizo
    configurarMainContainer('registro')
  
    //Renderizo los elementos
    registerForm.engancharEnNodo(mainContainer)
    renderizarSelectorFotoPerfil()
  
    //Coloco la nueva clase al main
  
  }
  
  function renderizarScreenLogin(){
    
  
     //LIMPIO Y CONFOGURO PANTALLA.
    configurarMainContainer('login')
    //RENDERIZO ELEMENTOS
    mainFormLogin.engancharEnNodo(mainContainer)
  
  
  }


  function renderizarScreenUsuarioLogueado(){

    //Inicia mostrando todos los posts de la red igual que instagram, ahora como no hay amigos muestra
    configurarMainContainer('instagram')
     let todosLosPosts = baseDatosApp.getAllPosts()
      postRender1 = new PostsRender('id-selector-Posts-general2','un-container',transformarObjetoEnNodo,baseDatosApp,usuarioLogueado)
     postRender1.engancharEnNodo(mainContainer)
    
    
    
    }
  

function renderizarGaleria(){

    configurarMainContainer('galeria')

    //Informo al usuario que debe elegir una imagen para el post.
    mostrarMensaje('Elegi una imagen de la galeria para tu post !!','success','OK')
  
    //Muestra una galeria de fotos bajadas de unplash. Recorro el json de unplash.
    const url = "https://api.unsplash.com/search/photos?query=moto&per_page=50&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";
    
    //const imageDiv = document.querySelector('.image');
      fetch(unplashURLCategoria('moto','60'))
          .then(response =>  response.json())
          .then(data => {
              let arrayElementos = []
              let nuevoObjeto;
              let resultados = data.results
              //tomo cada url para constuir un pbjeto y meterlo al array que le voy a dar a renderizar a mi wrapper container.
              resultados.forEach( x =>   {  nuevoObjeto = { tag: "div",  //Solo los div con hijos tendran el atributo tipo?? e hijos.
                                                            id: "container-galeria-pic",
                                                            listaClases: ["clase-pic-grilla-galeria"],
                                                            listaAcciones: undefined,
                                
                                                            hijos:[ 
                                                                { tag: "img",
                                                                  id: 'imggaleria',
                                                                  listaClases: ["grid-post-select-pic"],
                                                                  listaAcciones: [{evento: 'click', accion: (e)=> renderizarFormularioNuevoPost(e.target)}],
                                                                  source: x.urls.small
                                                                },
                                                                ]
                                                          }
                                              arrayElementos.push(nuevoObjeto)
                                          })
                                       
  
                                          containerGaleriaFotos  = new wrapperElements('id-wrapper-galeria','grid-galeria-container',arrayElementos,transformarObjetoEnNodo)
                                          containerGaleriaFotos.engancharEnNodo(mainContainer)
                                        })
  
                                
  }



 function getTextoHashTags(texto){
 //Crea una lista de hashtags a partir de una cadena separada

      const hashtags = [];
      let palabraActual = "";

      for (let i = 0; i < texto.length; i++) {
        if (texto[i] !== " ") {
          palabraActual += texto[i];
        } else {
          if (palabraActual !== "") {
            hashtags.push('#'+palabraActual);
            palabraActual = "";
          }
        }
      }

      // Agregar la última palabra si no hay espacio al final del texto
      if (palabraActual !== "") {
        hashtags.push('#'+palabraActual);
      }

      return hashtags
      }


 

  function crearNuevoPost(){

    

    //El formulario esta engnchado al main container entonces podemos tomar el value ingresado.
    let textoNuevoPost = document.getElementById('nuevo-post-form-text-input').value
    let imagenNuevoPost = document.getElementById('nuevo-post-form-imagen-elegida').src
    let hashtagsNuevoPost = document.getElementById('nuevo-post-form-hashtags-input').value

    //Busco el ID del usuario logueado y la fecha actual para crear el post
    let userIDNuevoPost = baseDatosApp.getUserInfo(usuarioLogueado).userID
    let fechaHoraNuevoPost = getFechaActual()

    let listaHashtags = getTextoHashTags(hashtagsNuevoPost)
    console.log(listaHashtags)

    //console.log(textoNuevoPost,'\n',imagenNuevoPost,'\n',userIDNuevoPost,'\n',fechaHoraNuevoPost)
   baseDatosApp.agregarNuevoPost(userIDNuevoPost,fechaHoraNuevoPost.fechaString,fechaHoraNuevoPost.horaString,textoNuevoPost,listaHashtags,imagenNuevoPost)

   //Se creo el nuevo Post, ahora tengo que ir a mostrarlo.
   mostrarMensaje(usuarioLogueado + ' creaste un nuevo posteo !!!','success','Aceptar')

   //Ahora renderizo el screen del user Logueado, o sea el de ingreso.
   renderizarScreenUsuarioLogueado()

  }



  function renderizarFormularioNuevoPost(e){

    

    //Configuro main container.
    configurarMainContainer('nuevoPost')

    //Extraigo la imagen del e.target
    let srcImagenElegida = e.src

    //Creo los elementos del form con la imagen elegida
    let elementosNuevoPostForm = [
      {
        tag: "h1",
        id: "nuevo-post-form-titulo",
        listaClases: ["nuevo-post-form-titulo"],
        listaAcciones: undefined,
        innerText: "NUEVO POST",
      },
    
     

      {
        tag: "div",  
        id: "nuevo-post-form-imagen-container",
        listaClases: ["container-un-post-píc"],
        listaAcciones: undefined,
        hijos:[ 

          {
            tag: "img",
            id: "nuevo-post-form-imagen-elegida",
            listaClases: ["container-un-post-container-imagen-pic"],
            listaAcciones: undefined,
            source: e.src,
          },
     
    ]},
    
      {
        tag: "input",
        id: "nuevo-post-form-text-input",
        listaClases: ["nuevo-post-form-text-input"],
        listaAcciones: undefined,
        type: "text",
        placeHolder: "Escribir...",
      },

      {
        tag: "input",
        id: "nuevo-post-form-hashtags-input",
        listaClases: ["nuevo-post-form-text-input"],
        listaAcciones: undefined,
        type: "text",
        placeHolder: "Ingresa tus hashtags separados por espacios y sin #...",
      },
    
    
      {
        tag: "input",
        id: "nuevo-post-form-submit-input",
        listaClases: ["nuevo-post-form-submit-input"],
        listaAcciones: undefined,
        type: "submit",
        value: "Aceptar",
      },
    ];


    //let textoIngresado = document.getElementById('nuevoPost-form-text-input').value
    //console.log(textoIngresado)
    //Creo el form y cuando el user le de aceptar va a ejecutar crearNuevoPostForm()
    
    nuevoPostForm = new wrapperElements("id-nuevo-post-form","nuevo-post-form",elementosNuevoPostForm, transformarObjetoEnNodo, "javascript:crearNuevoPost()");
    nuevoPostForm.engancharEnNodo(mainContainer)

   
    //Configuro el main y desrendeizo
    
  
 


  }