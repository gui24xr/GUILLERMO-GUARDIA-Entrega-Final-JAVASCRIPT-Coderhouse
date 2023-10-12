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

    this.containerPostPic = []
    this.containerPostInfo = [] //En este container muestro los datos del post.

    this.postIDActual = undefined;
    //this.containerPostInfo.setBackground(fotoPost)
    this.procesarObjetosIngresados()
    
    
  }


  procesarObjetosIngresados(){

    

    const {postID,fecha: fechaPost, userName, hora: horaPost, texto: textoPost,foto: fotoPost,likes: likesPost} = this.wrapperData;
    //console.log( "Deconstructur", fechaPost, horaPost, textoPost, fotoPost,likesPost);
    
   
    //AL contenedor padre le pongo de fondo la imagen del post.
   /* this.container.style.backgroundImage = 'url(' + fotoPost + ')' 

    this.container.style.backgroundSize = '90% 90%'
    this.container.style.backgroundRepeat ='no-repeat'
    this.container.style.backgroundPosition = 'center'*/
    

    let picPost = [

      {
        tag: "img",
        id: "id-post-viewer-container-pic-pic",
        listaClases: ["post-viewer-container-pic-pic"],
        listaAcciones: [{evento:'click',accion: ()=> darLike(this.postIDActual)}],
        source: fotoPost,
      }
]



    this.containerPostPic = new wrapperElements('id-post-viewer-pic','post-viewer-container-pic',picPost,this.renderFunction)
    this.containerPostPic.engancharEnNodo(this.container)


    this.postIDActual = postID;
    //preparo los objetos que voy a renderizar dentro del contenedor que contiene lo que quiero mostrar del post.
    let objetosRenderizar = [
    
      {
        tag: "h1",
        id: "postviewer-fechahora",
        listaClases: ["postviewer-hora"],
        listaAcciones: undefined,
        innerText: fechaPost + " " + horaPost,
      },

        {

          tag: "div",  //Solo los div con hijos tendran el atributo tipo?? e hijos.
          id: "div-texto-fecha",
          listaClases: ["div-texto-comentarios"],
          listaAcciones: undefined,
          //innerText: likesPost.length + ' Me gusta'
          hijos:[ 
            {
              tag: "p",
              id: "postviewer-username",
              listaClases: ["postviewer-texto"],
              listaAcciones: undefined,
              innerText: userName,
            },
            {
              tag: "p",
              id: "postviewer-texto",
              listaClases: ["postviewer-texto"],
              listaAcciones: undefined,
              innerText: textoPost,
            },
            
            ]
        },
        {
          tag: "div",  //Solo los div con hijos tendran el atributo tipo?? e hijos.
          id: "cantidad-likes-comentarios",
          listaClases: ["div-like-comentarios"],
          listaAcciones: undefined,
          //innerText: likesPost.length + ' Me gusta'
          hijos:[   {
            tag: "h1",
            id: "postviewer-cantidad-likes",
            listaClases: ["postviewer-likes-texto"],
            listaAcciones: undefined,
            innerText: likesPost.length + ' Me gusta'
          },
          {
            tag: "img",
            id: "postviewer-ico-like",
            listaClases: ["iconos-post-viewer"],
            listaAcciones: [{evento:'click',accion: ()=> darLike(this.postIDActual)}],
            source: "./imagenes/icons/ico_like.png",
          },
          {
            tag: "img",
            id: "postviewer-ico-comment",
            listaClases: ["iconos-post-viewer"],
            listaAcciones: undefined,
            source: "./imagenes/icons/ico_comment.png",
          },]},
     
    ];


    // Creo el wrapper donde iran los elementos mostrados y los asigno a containerPostInfo
    this.containerPostInfo = new wrapperElements('postviewer-container-info', 'container-post-info', objetosRenderizar,this.renderFunction);
    this.containerPostInfo.engancharEnNodo(this.container);


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
    const {  postID, fecha: fechaPost,  hora: horaPost, texto: textoPost,  foto: fotoPost, likes: likesPost} = nuevaData;
    //console.log( "Nueva Data", fechaPost, horaPost, textoPost, fotoPost,  likesPost );
    this.postIDActual = postID;
    document.getElementById('postviewer-fechahora').innerText = fechaPost + " " + horaPost
   
    //this.container.style.backgroundImage = 'url(' + fotoPost + ')'
    document.getElementById('id-post-viewer-container-pic-pic').src = fotoPost
    
    document.getElementById('postviewer-texto').innerText = textoPost
    document.getElementById('postviewer-cantidad-likes').innerText = likesPost.length + ' Me gusta'



  };









}






