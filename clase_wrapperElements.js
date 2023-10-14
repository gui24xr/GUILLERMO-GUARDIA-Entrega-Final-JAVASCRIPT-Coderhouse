
/*ESTA CLASE CONSTRUYE UN DIV O ENVOLTORIO CON ELEMENTOS A PARTIR DE OBJETOS UTILIZANDO LA RENDER FUNCTION PASADA POR PARAMETRO.
SI RECIBE 4 ARGUMENTOS SE SUPONE ES UN SIMPLE ENVOLTORIO, SI RECIBE 6 ASUMO QUE ES UN FORM Y ESE 5TO PARAMETROS ES EL FORMACTION */

/* UNA VEZ CREADO EL DIV HAY QUE ENGANCHARLO O DESENGANCHARLO DEL DOM SEGUN NECESIDAD */

class wrapperElements {
  constructor(wrapperId, wrapperClass, wrapperElements,renderFunction,formAction) {
    
    /* 4 Argumentos es xq simplemente sera un div
    /5 Argumentos es xq sera un form y en el 5to parametro viene un string con el formAction */
    if (arguments.length == 4) this.container = document.createElement("div");
    else if (arguments.length == 5){
      this.container = document.createElement("form");
      this.container.action = formAction;

    }

    this.container.id = wrapperId; //La utilizo para manejarme
    this.container.className = wrapperClass;
    this.data = wrapperElements;
    this.renderFunction = renderFunction
    this.nodoGancho = undefined;
    this.referenciaNodo = undefined;

    this.procesarObjetosIngresados()
  
  }

  
 

  /*mostrar = () => this.container.classList.toggle("clase-invisible");*/



  procesarObjetosIngresados(){

    //Toma todos los elementos pasados por parametro en forma de objeto, los pasa por la render function y asi construye el div.
    let nuevoNodo;
    this.data.forEach((item) => {
      nuevoNodo = this.renderFunction(item);
      this.container.appendChild(nuevoNodo);
    });
    }


    ocultar = () => {

      let elementoBorrar = document.getElementById(this.container.id)
      elementoBorrar.setAttribute('style','display:none')
    }

  engancharEnNodo = (nodoPadre) => {
    //Lo engancho al nodo padre y tomo una referencia del nodo padre para usarla luego al eliminar el nodo.
    nodoPadre.appendChild(this.container);
    //Me guardo la referencia al engancharlo.
    this.referenciaNodo = document.getElementById(this.container.id)
    //ME agarro una referencia al nodo donde lo enganche.
    this.nodoGancho = document.getElementById(nodoPadre.id)
   
  }

  desengancharDeDom = () => {

    //Borra al elemento del DOm
    let elementoBorrar = document.getElementById(this.container.id)
    //Busco al papa
    let padre = elementoBorrar.parentNode
    //Le digo al padre que lo borre
    padre.removeChild(elementoBorrar)
    


}


setBackgroundImage(urlImage){
  this.container.style.backgroundImage = 'url(' + urlImage + ')'

}


ejecutarAccion(instancia){

  
}


}

//SE MODIFICA NOMBRE DE WRAPPER DATA POR WRAPPER ELEMENTS YA QUE EL WRAPPER RENDERIZA ELEMENTOS A TRAVEZ DE OBJETOS Y FORMA UN CONTENEDOR