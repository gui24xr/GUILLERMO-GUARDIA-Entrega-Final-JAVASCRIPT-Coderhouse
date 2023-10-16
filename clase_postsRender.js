class PostsRender  {

  constructor( wrapperId, wrapperClass, wrapperData , renderFunction) {
      //ViewTipe es el tipo de visualizacion que quiero darle y tiene variois valores
    //Post Viewer es el post que va a manejar este selector
    //console.log("Selector Posts.");
    this.container = document.createElement("div");
    this.container.id = wrapperId; //La utilizo para manejarme
    this.container.className = wrapperClass;
    this.container.className = 'un-container' //CLASE CUANDO MUESTRA POSTS
    this.wrapperData = wrapperData;
    this.contador = 0; /// Para el carrusel.
    this.elementosMostrados = this.wrapperData.reverse()  //Recibe un array de posts, lo procesa y lo muestra y l,o invierte xq se supone los post no vienen en orden inversoi.
    
    this.renderFunction = renderFunction
   
  

    //Primer renderizado
    this.getCajaPostsEnteros()
  }



  getCajaPostsEnteros(){


    //Recorre el array elementos mostrados y arma
    //cada wrapper lo tiene que enganchar al this container
    //luego engancho el this-container por fuera

    let elementosParaRenderizar;
    let unWrapper; 
    let listaWrappers = []
    this.elementosMostrados.forEach ( post => {  

     //Sabemos cuantos likes tiene cada post entonces...
     //console.log("Likeadores: ", post.usersLikeadores)
     let leyendaLikes = post.usersLikeadores.length > 0 ? 'Le gusta a ' + post.usersLikeadores : "Aun no tienes likes !!!"

     
    elementosParaRenderizar= [                        

                                  
                                  {

                                    tag: "div",  //Solo los div con hijos tendran el atributo tipo?? e hijos.
                                    id: "id-postviewer-div-head",
                                    listaClases: ["container-un-post-header"],
                                    listaAcciones: undefined,
                                    //innerText: likesPost.length + ' Me gusta'
                                    hijos:[ 
                                      {
                                        tag: "img",
                                        id: "id-postviewer-div-head-perfilPic",
                                        listaClases: ["container-un-post-header-perfilPic"],
                                        listaAcciones: undefined,
                                        source: post.fotoPerfil,
                                      },
                                      {
                                        tag: "h1",
                                        id: "id-postviewer-div-head-username",
                                        listaClases: ["container-un-post-header-username"],
                                        listaAcciones: [{evento:'click',accion:()=>this.renderizarUsuarioGrilla(post.userName)}],
                                        innerText: post.userName,
                                      },
                            
                                      {
                                        tag: "img",
                                        id: "id-postviewer-div-botoncerrar",
                                        listaClases: ["container-un-post-header-iconos"],
                                        listaAcciones: undefined,
                                        source: "./imagenes/icons/ico_menupuntos.png",
                                      },
                                                                      
                                      ]
                                    },

                                    {//EL postID del div lo usamos para ir a ese div
                                    tag: "div",  //Solo los div con hijos tendran el atributo tipo?? e hijos.
                                    id: "idcontainer-un-post-píc-"+post.postID,
                                    listaClases: ["container-un-post-píc"],
                                    listaAcciones: undefined,
                                    //innerText: likesPost.length + ' Me gusta'
                                    hijos:[ 

                                      {
                                        tag: "img",
                                        id: "header-banner-icodn3",
                                        listaClases: ["container-un-post-container-imagen-pic"],
                                        listaAcciones: [{evento:'dblclick',accion:()=> animacionLike(post.postID)}],
                                        source: post.foto,
                                      },
                                 
                                ]},

                                {

                                  tag: "div",  //Solo los div con hijos tendran el atributo tipo?? e hijos.
                                  id: "id-postviewer-div-interaccion",
                                  listaClases: ["container-un-post-div-interaccion"],
                                  listaAcciones: undefined,
                                  //innerText: likesPost.length + ' Me gusta'
                                  hijos:[ 
                                     {
                                      tag: "img",
                                      id: "corazon"+"PostID"+post.postID,
                                      listaClases: ["container-un-post-iconos-likes"],
                                      listaAcciones: undefined,
                                      source: "./imagenes/icons/ico_like.png",
                                    },
                                    {
                                      tag: "img",
                                      id: "id-postviewer-div-botoncerrar",
                                      listaClases: ["container-un-post-iconos-comentarios"],
                                      listaAcciones: undefined,
                                      source: "./imagenes/icons/ico_comment.png",
                                    },
                                    {
                                      tag: "img",
                                      id: "id-postviewer-div-botoncerrar",
                                      listaClases: ["container-un-post-iconos-guardar"],
                                      listaAcciones: undefined,
                                      source: "./imagenes/icons/ico_guardar.png",
                                    },

                                    {
                                      tag: "p",
                                      id: "id-postviewer-div-head-username",
                                      listaClases: ["container-un-post-legusta"],
                                      listaAcciones: undefined,
                                      innerText: leyendaLikes
                                    },

                                    {
                                      tag: "h1",
                                      id: "id-postviewer-div-head-username",
                                      listaClases: ["container-un-post-usertexto"],
                                      listaAcciones:  [{evento:'click',accion:()=>this.renderizarUsuarioGrilla(post.userName)}],
                                      innerText:post.userName + ':'
                                    },
                                    
                                    {
                                      tag: "p",
                                      id: "id-postviewer-div-head-username",
                                      listaClases: ["container-un-post-texto"],
                                      listaAcciones: undefined,
                                      innerText: post.texto
                                    },
                                    {
                                      tag: "p",
                                      id: "id-postviewer-div-head-hora",
                                      listaClases: ["container-un-post-texto"],
                                      listaAcciones: [{evento:'click',accion:()=>'Funcionalidad aun no implementada !'}],
                                      innerText: 'Agregar un comentario...'
                                    },
                                    {
                                      tag: "p",
                                      id: "id-postviewer-div-head-hora",
                                      listaClases: ["container-un-post-texto"],
                                      listaAcciones: [],
                                      innerText: post.fecha +' '+ post.hora
                                    },
                                    ]
                                  },

                              
                              
                              
                              
                              
                              
                              
                              ]
                           




        unWrapper = new wrapperElements('idPost'+post.postID,'container-un-post',elementosParaRenderizar,transformarObjetoEnNodo)          
        listaWrappers.push(unWrapper)
                            
      
      })

      //AHora tengo una lista de wrapper, los tengo que recorrer y enganchar al this.container
       listaWrappers.forEach ( wrapper => wrapper.engancharEnNodo(this.container))

    }



 renderizarUsuarioLista(userNameRenderizar){


// Filtra solo los datos del user pedido y luego reRenderiza enganchando y desenganchgando del ddom
this.filtrarDatos(userNameRenderizar)
//Borro los datos que ya tiene el this.container
this.limpiarContainer()
//Vuelvo  construir los elementos yrenderizarlos enganchandolos a DOM
this.getCajaPostsEnteros()
//cambio la clase
this.container.className = 'un-container' //CLASE CUANDO MUESTRA POSTS

 }





filtrarDatos(userNameBuscado){

//Toma el array this.wrapperData, lo recorre y arma uno nuevo con solo los post/datos del user fitrado.

this.elementosMostrados = [] //Lo vacio al elementosMostrados para luego volver a llenarlo.

this.wrapperData.forEach ( post =>{ if (post.userName == userNameBuscado) this.elementosMostrados.push(post)})
//console.log("Filtrado: ", this.elementosMostrados)


}

limpiarContainer (){

//Toma al this.Container y le borra todos los hijos
let nodosHijos = this.container.childNodes
let idNodosParaBorrar = [];

nodosHijos.forEach( nodo => idNodosParaBorrar.push(nodo.id))
//console.log(idNodosParaBorrar)

idNodosParaBorrar.forEach( id => document.getElementById(id).remove())



}


renderizarUsuarioGrilla(userNameRenderizar){


  // Filtra solo los datos del user pedido y luego reRenderiza enganchando y desenganchgando del ddom
  this.filtrarDatos(userNameRenderizar)
  //Borro los datos que ya tiene el this.container
  this.limpiarContainer()
  //Vuelvo  construir los elementos yrenderizarlos enganchandolos a DOM
  this.getGrilla()
  //cambio la clase para que se vea como grilla
  this.container.className  = 'selector-posts-container'
  
   }
  

irAPost(postID, userBuscado){
  this.renderizarUsuarioLista(userBuscado)
  location.hash = '#' + 'idPost'+ post.postID
}

  
getGrilla(){

//Recorre elementos mostrados y forma la grilla poniendo elementos //Posiblemente va a cambiar la clase del this.COntainer

let elementosParaRenderizar;
    let unWrapper; 
    let listaWrappers = []
    this.elementosMostrados.forEach ( post => {  

     
    elementosParaRenderizar= [                        
      {
        tag: "img",
        id: post.postID,
      listaClases: [/*"grid-post"*/'clase-wrappers-grilla-posts-imagen'],
      listaAcciones: [{evento:'click',accion:()=> this.irAPost(post.postID,post.userName)}, ],
      source: post.foto
      }
                                  
       ]
                           




        unWrapper = new wrapperElements('idPostGrilla'+post.postID,'clase-wrappers-grilla-posts',elementosParaRenderizar,transformarObjetoEnNodo)          
        listaWrappers.push(unWrapper)
                            
      
      })

      //AHora tengo una lista de wrapper, los tengo que recorrer y enganchar al this.container
       listaWrappers.forEach ( wrapper => wrapper.engancharEnNodo(this.container))


}




  /*
  ocultar = () => this.container.classList.toggle("clase-invisible")
  mostrar = () => this.container.classList.toggle("clase-invisible")
*/


b


  //Renderiza, engancha, muestra el contenedor de post.
  //Esta clase como forma distintos tipos de container el procesar objetos lo hace al enganchar al nodo padre
  engancharEnNodo = (nodoPadre) => {
   
    //this.procesarObjetosIngresados()
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









}

