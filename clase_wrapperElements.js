class wrapperElements {
  constructor(wrapperId, wrapperClass, wrapperData,renderFunction) {
    //this.nodoPadre = nodoPadre;
    this.container = document.createElement("div");
    this.container.id = wrapperId; //La utilizo para manejarme
    this.container.className = wrapperClass;
    this.data = wrapperData;
    this.renderFunction = renderFunction
    this.nodoGancho = undefined;
    this.referenciaNodo = undefined;

    this.procesarObjetosIngresados()

  }

  
  /*ocultar = () => this.container.classList.toggle("clase-invisible");
  mostrar = () => this.container.classList.toggle("clase-invisible");*/
  procesarObjetosIngresados(){

    let nuevoNodo;
    
    this.data.forEach((item) => {
      nuevoNodo = this.renderFunction(item);
      this.container.appendChild(nuevoNodo);

    });
    
  }

engancharAlNodoPadre(nodoPadre) { //Construye y engancha.
   
    
    nodoPadre.appendChild(this.container);
  }



  engancharEnNodo = (nodoPadre) => {
    //Lo engancho al nodo padre y tomo una referencia del nodo padre para usarla luego al eliminar el nodo.
    nodoPadre.appendChild(this.container);
    //Me guardo la referencia al engancharlo
    this.referenciaNodo = document.getElementById(this.container.id)
    //ME agarro una referencia al nodo donde lo enganche
    this.nodoGancho = document.getElementById(nodoPadre.id)
    console.log(this.nodoGancho)
  
  }

  desengancharDeDom = () => {


     if (this.nodoGancho != undefined) {
  
       this.nodoGancho.removeChild(this.referenciaNodo)
        this.nodoGancho = undefined;
    this.referenciaNodo = undefined;
  }  
  
}



setBackground(imagen){

this.container.style.backgroundImage = 'url(' + imagen + ')'
//this.container.style.backgroundColor = "red";
}

}