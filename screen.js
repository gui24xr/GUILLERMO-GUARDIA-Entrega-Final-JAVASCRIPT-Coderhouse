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



  

function renderizarGaleria(){

    configurarMainContainer('galeria')
  
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





  function crearNuevoPost(){

    //El formulario esta engnchado al main container entonces podemos tomar el value ingresado.
    let textoNuevoPost = document.getElementById('nuevo-post-form-text-input').value
    let imagenNuevoPost = document.getElementById('nuevo-post-form-imagen-elegida').src

    //Busco el ID del usuario logueado y la fecha actual para crear el post
    let userIDNuevoPost = baseDatosApp.getUserInfo(usuarioLogueado).userID
    let fechaHoraNuevoPost = getFechaActual()

    //console.log(textoNuevoPost,'\n',imagenNuevoPost,'\n',userIDNuevoPost,'\n',fechaHoraNuevoPost)
   baseDatosApp.agregarNuevoPost(userIDNuevoPost,fechaHoraNuevoPost.fechaString,fechaHoraNuevoPost.horaString,textoNuevoPost,imagenNuevoPost)

   //Se creo el nuevo Post, ahora tengo que ir a mostrarlo.
   mostrarMensaje(usuarioLogueado + ' creaste un nuevo posteo !!!','success','Aceptar')

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
        id: "login-form-title",
        listaClases: ["login-form-text"],
        listaAcciones: undefined,
        innerText: "NUEVO POST",
      },
    
      {
        tag: "img",
        id: "nuevo-post-form-imagen-elegida",
        listaClases: ["headerbar-menu-iconos"],
        listaAcciones: undefined,
        source: e.src,
      },
    
      {
        tag: "input",
        id: "nuevo-post-form-text-input",
        listaClases: ["login-form-input"],
        listaAcciones: undefined,
        type: "text",
        placeHolder: "Usuario",
      },
    
    
      {
        tag: "input",
        id: "login-form-submit-input",
        listaClases: ["login-form-button"],
        listaAcciones: undefined,
        type: "submit",
        value: "Aceptar",
      },
    ];


    //let textoIngresado = document.getElementById('nuevoPost-form-text-input').value
    //console.log(textoIngresado)
    //Creo el form
    
    nuevoPostForm = new wrapperElements("id-register-form","login-form",elementosNuevoPostForm, transformarObjetoEnNodo, "javascript:crearNuevoPost()");
    
    
    
    nuevoPostForm.engancharEnNodo(mainContainer)

   
    //Configuro el main y desrendeizo
    
  
 


  }