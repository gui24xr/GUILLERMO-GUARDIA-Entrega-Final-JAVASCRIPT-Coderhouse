class selectorPosts  {

  constructor( wrapperId, wrapperClass, wrapperData , postViewer, renderFunction) {
      
    //Post Viewer es el post que va a manejar este selector
    console.log("Selector Posts.");
    this.container = document.createElement("div");
    this.container.id = wrapperId; //La utilizo para manejarme
    this.container.className = wrapperClass;
    this.wrapperData = wrapperData;
    this.contador = 0; /// Para el carrusel.
    this.elementos = []  //Recibe un array de posts, lo procesa y lo muestra.
    this.renderFunction = renderFunction
    this.postViewer = postViewer
    //const { postID,foto} = wrapperData;
    //console.log( "ur", postID, foto);

   
    this.procesarObjetosIngresados()
    console.log(this.elementos)

    //Por cada elemento del wrapper data agrego un elemento objeto renderizable
  }


  procesarObjetosIngresados(){

    //Recorro los posteos recibidos, armo objetos para transformar en nodo y los meto en el array
    this.wrapperData.forEach ( post => this.elementos.push(  {
      tag: "img",
      id: post.postID,
      listaClases: ["grid-post"],
      listaAcciones: [
                      {evento:'click',accion:()=>cambiarPostActual(this.postViewer,post.postID)},

                                        ],
      source: post.foto
    },) )


    //Ya tengo los datos, los mando a renderizar y agregar al container del objeto
    let nuevoNodo;
    
    this.elementos.forEach((item) => {
     nuevoNodo = this.renderFunction(item);
     this.container.appendChild(nuevoNodo);

     //nodoPadre.appendChild(this.container);
   });



  }

  /*
  ocultar = () => this.container.classList.toggle("clase-invisible")
  mostrar = () => this.container.classList.toggle("clase-invisible")
*/
  //Sobre escribo el metodo xq este wrapper se dibuja diferente
  engancharAlNodoPadre(nodoPadre) {

    //Agarro cada elemento del array recibido  lo transformo en lo que quiero para renderizar


   



    nodoPadre.appendChild(this.container)
   

}


borrar = () =>{

  let elementoBorrar = document.getElementById(this.container.id)
console.log(elementoBorrar)
if (elementoBorrar != null)  elementoBorrar.remove()
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









}

