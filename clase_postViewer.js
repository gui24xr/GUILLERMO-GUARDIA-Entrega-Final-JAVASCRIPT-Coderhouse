class postViewer {
  constructor(wrapperId, wrapperClass, wrapperData,renderFunction) {
    this.wrapperId = wrapperId;
    this.wrapperClass = wrapperClass;
    this.wrapperData = wrapperData
    this.renderFunction = renderFunction
    this.nodoGancho = undefined;
    this.referenciaNodo = undefined;

    //Genero el contenedor padre
    this.container = document.createElement('div')
    this.container.id = this.wrapperId
    this.container.className = this.wrapperClass
    this.containerPostInfo = [] //En este container muestro los datos del post.


    //this.containerPostInfo.setBackground(fotoPost)
    this.procesarObjetosIngresados()
    
    
  }


  procesarObjetosIngresados(){

    

    const {fecha: fechaPost, hora: horaPost, texto: textoPost,foto: fotoPost,likes: likesPost} = this.wrapperData;
    //console.log( "Deconstructur", fechaPost, horaPost, textoPost, fotoPost,likesPost);
    
   
    //AL contenedor padre le pongo de fondo la imagen del post.
    this.container.style.backgroundImage = 'url(' + fotoPost + ')'
    
   
    //preparo los objetos que voy a renderizar dentro del contenedor que contiene lo que quiero mostrar del post.
    let objetosRenderizar = [
    /*  {
        tag: "img",
        id: "postviewer-foto",
        listaClases: ["login-form-pic"],
        listaAcciones: undefined,
        source: fotoPost,
      },*/
      {
        tag: "h1",
        id: "postviewer-fechahora",
        listaClases: ["post-fecha-hora"],
        listaAcciones: undefined,
        innerText: fechaPost + " " + horaPost,
      },
      {
        tag: "p",
        id: "postviewer-texto",
        listaClases: ["login-form-text"],
        listaAcciones: undefined,
        innerText: textoPost,
      },
      {
        tag: "img",
        id: "postviewer-ico-like",
        listaClases: ["login-form-pic"],
        listaAcciones: undefined,
        source: "./imagenes/icons/ico_like.png",
      },
      {
        tag: "h1",
        id: "postviewer-cantidad-likes",
        listaClases: ["post-fecha-hora"],
        listaAcciones: undefined,
        innerText: likesPost.length + ' Me gusta'
      },
      {
        tag: "img",
        id: "postviewer-ico-comment",
        listaClases: ["login-form-pic"],
        listaAcciones: undefined,
        source: "./imagenes/icons/ico_comment.png",
      },
    ];


    // Creo el wrapper donde iran los elementos mostrados y los asigno a containerPostInfo
    this.containerPostInfo = new wrapperElements('postviewer-container-info', 'container-post-info', objetosRenderizar,this.renderFunction);
    this.containerPostInfo.engancharAlNodoPadre(this.container);


  }



  //Renderiza, engancha, muestra el contenedor de post.
  engancharEnNodo = (nodoPadre) => {
   
   nodoPadre.appendChild(this.container)
   //Me guardo la referencia al engancharlo
   this.referenciaNodo = document.getElementById(this.container.id)
   //ME agarro una referencia al nodo donde lo enganche
   this.nodoGancho = document.getElementById(nodoPadre.id)
   //console.log(this.nodoGancho)
   
  };

  desengancharDeDom = () => {
 
    if (this.nodoGancho != undefined) {
        this.nodoGancho.removeChild(this.referenciaNodo)
        this.nodoGancho = undefined;
      this.referenciaNodo = undefined;
 }  

  }


  cambiarPost = (nuevaData) => {
    const {  fecha: fechaPost, hora: horaPost, texto: textoPost,  foto: fotoPost, likes: likesPost} = nuevaData;
    console.log( "Nueva Data", fechaPost, horaPost, textoPost, fotoPost,  likesPost );

    document.getElementById('postviewer-fechahora').innerText = fechaPost + " " + horaPost
   
    this.container.style.backgroundImage = 'url(' + fotoPost + ')'
    document.getElementById('postviewer-texto').innerText = textoPost
    document.getElementById('postviewer-cantidad-likes').innerText = likesPost.length + ' Me gusta'



  };









}






