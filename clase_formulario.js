class formulario {
  constructor(
    formId,
    formClass,
    formElements,
    formAction,
    renderFunction

  ) {
    //this.nodoPadre = nodoPadre;
    this.container = document.createElement("form");
    this.container.id = formId; //La utilizo para manejarme
    this.container.className = formClass;
    this.container.action = formAction;
    this.data = formElements;
    this.renderFunction = renderFunction
    this.nodoGancho = undefined;
    this.referenciaNodo = undefined;

    this.procesarObjetosIngresados()

    
  }

  procesarObjetosIngresados(){

    let nuevoNodo;

    this.data.forEach((item) => {
      nuevoNodo = this.renderFunction(item);
      this.container.appendChild(nuevoNodo);

     
    });

    
  }

 
  //RENDER FUNCTION ES LA REFERENCIA A UNA FUNCION
  engancharEnNodo = (nodoPadre) => {
    //Lo engancho al nodo padre y tomo una referencia del nodo padre para usarla luego al eliminar el nodo.
    nodoPadre.appendChild(this.container);
    //Me guardo la referencia al engancharlo
    this.referenciaNodo = document.getElementById(this.container.id)
    //ME agarro una referencia al nodo donde lo enganche
    this.nodoGancho = document.getElementById(nodoPadre.id)
    //console.log(this.nodoGancho)
  
  }

  desengancharDeDom = () => {
 
     if (this.nodoGancho != undefined) {
       this.nodoGancho.removeChild(this.referenciaNodo)
        this.nodoGancho = undefined;
    this.referenciaNodo = undefined;
  }  
  
}

}