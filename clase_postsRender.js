class PostsRender {
  constructor(
    wrapperId,
    wrapperClass,
    renderFunction,
    baseDatos,
    userLogueado
  ) {
    //ViewTipe es el tipo de visualizacion que quiero darle y tiene variois valores
    //Post Viewer es el post que va a manejar este selector
    //console.log("Selector Posts.");
    this.baseDatos = baseDatos;
    this.userLogueado = userLogueado;
    this.container = document.createElement("div");
    this.container.id = wrapperId; //La utilizo para manejarme
    this.container.className = wrapperClass;
    this.container.className = "un-container"; //CLASE CUANDO MUESTRA POSTS
    this.dataARenderizar = this.baseDatos.getAllPosts();
    this.contador = 0; /// Para el carrusel.
    this.elementosMostrados = this.dataARenderizar.reverse(); //Recibe un array de posts, lo procesa y lo muestra y l,o invierte xq se supone los post no vienen en orden inversoi.
    /* Pero esto es provisorio hasta construir el metodo que ordena por fecha y hora los objetos del array"*/
    this.renderFunction = renderFunction;

    //Primer renderizado
    this.getCajaPostsEnteros();
  }

  getCajaPostsEnteros() {
    //Siempre antes de renderizar debo limpiar y pedir a la base de datos la indo actual
    this.limpiarContainer();

    //this.elementosMostrados = this.baseDatos.getAllPosts().reverse()

    //Recorre el array elementos mostrados y arma
    //cada wrapper lo tiene que enganchar al this container
    //luego engancho el this-container por fuera

    let elementosParaRenderizar;
    let unWrapper;
    let listaWrappers = [];
    this.elementosMostrados.forEach((post) => {
      //Sabemos cuantos likes tiene cada post entonces...
      //console.log("Likeadores: ", post.usersLikeadores)
      let leyendaLikes =
        post.usersLikeadores.length > 0
          ? "Le gusta a " + post.usersLikeadores
          : "Aun no tienes likes !!!";
      let leyendaTiempoTranscurrido = getLeyendaTiempoTranscurrido(
        post.fecha,
        post.hora
      );
      //console.log('P: ',post.fecha , '    ',post.hora)

      /*En la info del post tambien nos viene la lista de hashtag, formo una cadena para mostrarlo*/
      let hashtagsString = "";
      post.hashtagslist.forEach(
        (x) => (hashtagsString = hashtagsString + " " + x)
      );

      /*Cantidad de comentarios. COn operador ternario*/
      let leyendaCantidadComentarios =
        post.comentariosPost.length == 0
          ? "Aun no tienes comentarios"
          : post.comentariosPost.length == 1
          ? "1 comentario..."
          : "Ver los " + post.comentariosPost.length + " comentarios...";

      elementosParaRenderizar = [
        {
          tag: "div", //Solo los div con hijos tendran el atributo tipo?? e hijos.
          id: "id-postviewer-div-head",
          listaClases: ["container-un-post-header"],
          listaAcciones: undefined,
          //innerText: likesPost.length + ' Me gusta'
          hijos: [
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
              listaAcciones: [
                {
                  evento: "click",
                  accion: () => this.renderizarUsuarioGrilla(post.userName),
                },
              ],
              innerText: post.userName,
            },

            {
              tag: "img",
              id: "id-postviewer-div-botoncerrar",
              listaClases: ["container-un-post-header-iconos"],
              listaAcciones: undefined,
              source: "./imagenes/icons/ico_menupuntos.png",
            },
          ],
        },

        {
          //EL postID del div lo usamos para ir a ese div
          tag: "div", //Solo los div con hijos tendran el atributo tipo?? e hijos.
          id: "idcontainer-un-post-píc-" + post.postID,
          listaClases: ["container-un-post-píc"],
          listaAcciones: undefined,
          //innerText: likesPost.length + ' Me gusta'
          hijos: [
            {
              tag: "img",
              id: "header-banner-icodn3",
              listaClases: ["container-un-post-container-imagen-pic"],
              listaAcciones: [
                {
                  evento: "dblclick",
                  accion: () => this.darLike(post.postID, usuarioLogueado),
                },
              ],
              source: post.foto,
            },
          ],
        },

        {
          tag: "div", //Solo los div con hijos tendran el atributo tipo?? e hijos.
          id: "id-postviewer-div-interaccion",
          listaClases: ["container-un-post-div-interaccion"],
          listaAcciones: undefined,
          //innerText: likesPost.length + ' Me gusta'
          hijos: [
            {
              tag: "img",
              id: "corazon" + "PostID" + post.postID,
              listaClases: ["container-un-post-iconos-likes"],
              listaAcciones: [
                {
                  evento: "click",
                  accion: () => this.darLike(post.postID, usuarioLogueado),
                },
              ],
              source: "./imagenes/icons/ico_like.png",
            },
            {
              tag: "p",
              id: "id-postviewer-div-head-username",
              listaClases: ["container-un-post-legusta"],
              listaAcciones: undefined,
              innerText: leyendaLikes,
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
              tag: "h1",
              id: "id-postviewer-div-head-username",
              listaClases: ["container-un-post-usertexto"],
              listaAcciones: [
                {
                  evento: "click",
                  accion: () => this.renderizarUsuarioGrilla(post.userName),
                },
              ],
              innerText: post.userName + ":",
            },

            {
              tag: "p",
              id: "id-postviewer-div-head-username",
              listaClases: ["container-un-post-texto"],
              listaAcciones: undefined,
              innerText: post.texto,
            },

            {
              tag: "p",
              id: "id-postviewer-div-interacciones-hashtags",
              listaClases: ["container-un-post-hashtags"],
              listaAcciones: undefined,
              innerText: hashtagsString,
            },
            {
              tag: "p",
              id: "id-postviewer-div-head-hora",
              listaClases: ["container-un-post-agregar-comentario"],
              listaAcciones: [
                {
                  evento: "click",
                  accion: () => this.getComentarios(post.postID),
                },
              ],
              innerText: leyendaCantidadComentarios,
            },
            {
              tag: "p",
              id: "id-postviewer-div-head-hora",
              listaClases: ["container-un-post-tiempo-transcurrido"],
              listaAcciones: [],
              innerText: leyendaTiempoTranscurrido, //post.fecha +' '+ post.hora
            },
          ],
        },
      ];

      unWrapper = new wrapperElements(
        "idPost" + post.postID,
        "container-un-post",
        elementosParaRenderizar,
        transformarObjetoEnNodo
      );
      listaWrappers.push(unWrapper);
    });

    //AHora tengo una lista de wrapper, los tengo que recorrer y enganchar al this.container
    listaWrappers.forEach((wrapper) => wrapper.engancharEnNodo(this.container));
  }

  renderizarUsuarioLista(userNameRenderizar) {
    // Filtra solo los datos del user pedido y luego reRenderiza enganchando y desenganchgando del ddom
    this.filtrarDatos(userNameRenderizar);
    //Borro los datos que ya tiene el this.container
    this.limpiarContainer();
    //Vuelvo  construir los elementos yrenderizarlos enganchandolos a DOM
    this.getCajaPostsEnteros();
    //cambio la clase
    this.container.className = "un-container"; //CLASE CUANDO MUESTRA POSTS
  }

  getComentarios(postID) {
    //Muestra los comentarios del postID y pone un formulario de nuevos comentarios y una vez hecho va al post.

    //Pido a la Base de datos la info del post donde ya se que tengo un objeto con los comentarios x lo cual tengo una lista de obj.
    let comentariosPost = this.baseDatos.getPostID(postID).comentariosPost;
    let arrayObjetosRenderizar = [];
    //console.log('len: ', comentariosPost.length)
    let userComentario;
    let leyendaTiempo;
    let textoComentario;

    //Agrego el div titulo.
    arrayObjetosRenderizar.push({
      tag: "div", //Solo los div con hijos tendran el atributo tipo?? e hijos.
      id: "id-container-comentarios",
      listaClases: ["container-comentarios-division-titulo"],
      listaAcciones: undefined,
      hijos: [
        {
          tag: "p",
          id: "id-postviewer-div-head-username",
          listaClases: ["container-comentarios-titulo"],
          listaAcciones: undefined,
          innerText: "COMENTARIOS",
        },
      ],
    });

    //Agrego el form arriba
    arrayObjetosRenderizar.push({
      tag: "div", //Solo los div con hijos tendran el atributo tipo?? e hijos.
      id: "id-container-comentarios",
      listaClases: ["container-comentario-division-form"],
      listaAcciones: undefined,
      hijos: [
        {
          tag: "input",
          id: "id-container-comentarios-ingreso",
          listaClases: ["container-comentarios-ingreso"],
          listaAcciones: undefined,
          type: "text",
          placeHolder: "Ingresa tu comentario....",
        },
        {
          tag: "input",
          id: "container-comentarios-submit",
          listaClases: ["login-form-button"],
          listaAcciones: [
            { evento: "click", accion: (e) => this.agregarComentario(postID) },
          ],
          type: "submit",
          value: "Aceptar",
        },
      ],
    });

    //SI tiene comentarios armo lo que voy a mandar a renderizar, si no renderizo algo que diga vacio.
    if (comentariosPost.length > 0) {
      comentariosPost.forEach((c) => {
        /*
  console.log('texto: ',c)
  console.log('comentador',this.baseDatos.getInfoUserID(c.userID).userName)
  console.log('texto: ',c.texto)
  console.log('Hacw: ',getLeyendaTiempoTranscurrido(c.fecha,c.hora))
*/
        userComentario = this.baseDatos.getInfoUserID(c.userID).userName;
        textoComentario = c.texto;
        leyendaTiempo = getLeyendaTiempoTranscurrido(c.fecha, c.hora);

        arrayObjetosRenderizar.push({
          tag: "div", //Solo los div con hijos tendran el atributo tipo?? e hijos.
          id: "id-container-comentarios",
          listaClases: ["container-comentario-division-padre"],
          listaAcciones: undefined,
          hijos: [
            {
              tag: "p",
              id: "id-postviewer-div-head-username",
              listaClases: ["container-comentarios-usuario"],
              listaAcciones: undefined,
              innerText: userComentario,
            },
            {
              tag: "p",
              id: "id-postviewer-div-head-username",
              listaClases: ["container-comentarios-tiempo"],
              listaAcciones: undefined,
              innerText: leyendaTiempo,
            },
            {
              tag: "img",
              id: "corazon" + "comentario-id" + c.comentarioID,
              listaClases: ["container-comentarios-icono-like"],
              listaAcciones: [
                {
                  evento: "click",
                  accion: () => alert("Funcion aun no implementada"),
                },
              ],
              source: "./imagenes/icons/ico_like_b.png",
            },

            {
              tag: "p",
              id: "id-postviewer-div-head-username",
              listaClases: ["container-comentarios-texto"],
              listaAcciones: undefined,
              innerText: textoComentario,
            },
            {
              tag: "p",
              id: "id-postviewer-div-head-username",
              listaClases: ["container-comentarios-responder"],
              listaAcciones: [
                {
                  evento: "click",
                  accion: () => alert("Funcion aun no implementada"),
                },
              ],
              innerText: "Responder",
            },
            {
              tag: "p",
              id: "id-postviewer-div-head-username",
              listaClases: ["container-comentarios-vertraduccion"],
              listaAcciones: [
                {
                  evento: "click",
                  accion: () => alert("Funcion aun no implementada"),
                },
              ],
              innerText: "Ver traduccion",
            },
          ],
        });
      });
    } else {
      arrayObjetosRenderizar.push({
        tag: "div", //Solo los div con hijos tendran el atributo tipo?? e hijos.
        id: "id-postviewer-div-interaccion",
        listaClases: ["container-comentarios-division-padre"],
        listaAcciones: undefined,
        hijos: [
          {
            tag: "p",
            id: "id-postviewer-div-head-username",
            listaClases: ["container-comentarios-texto"],
            listaAcciones: undefined,
            innerText: "Aun no tiene comentarios.",
          },
        ],
      });
    }

    //Ya tenemos el array. Generamos el wrapper
    let wrapperComentariosPost = new wrapperElements(
      "id-wrapper-comentarios-post" + postID,
      "container-comentarios",
      arrayObjetosRenderizar,
      transformarObjetoEnNodo
    );

    this.limpiarContainer();
    wrapperComentariosPost.engancharEnNodo(this.container);
  }

  agregarComentario(postID) {
    console.log(postID);
    let comentarioIngresado = document.getElementById(
      "id-container-comentarios-ingreso"
    ).value;
    let fechaHora = getFechaActual();
    let usuarioComentador = baseDatosApp.getUserInfo(this.userLogueado).userID;

    //Agrego a la base de datos el nuevo comentario
    this.baseDatos.agregarComentarioPost(
      postID,
      usuarioComentador,
      fechaHora.fechaString,
      fechaHora.horaString,
      comentarioIngresado
    );
    //Voy a la ventana de comentarios nuevamente
    this.getComentarios(postID);
  }

  filtrarDatos(userNameBuscado) {
    //Toma el array this.dataARenderizar, lo recorre y arma uno nuevo con solo los post/datos del user fitrado.

    this.elementosMostrados = []; //Lo vacio al elementosMostrados para luego volver a llenarlo.

    this.dataARenderizar.forEach((post) => {
      if (post.userName == userNameBuscado) this.elementosMostrados.push(post);
    });
    //console.log("Filtrado: ", this.elementosMostrados)
  }

  limpiarContainer() {
    //Toma al this.Container y le borra todos los hijos
    let nodosHijos = this.container.childNodes;
    let idNodosParaBorrar = [];

    nodosHijos.forEach((nodo) => idNodosParaBorrar.push(nodo.id));
    //console.log(idNodosParaBorrar)

    idNodosParaBorrar.forEach((id) => document.getElementById(id).remove());
  }

  renderizarUsuarioGrilla(userNameRenderizar) {
    // Filtra solo los datos del user pedido y luego reRenderiza enganchando y desenganchgando del ddom
    this.filtrarDatos(userNameRenderizar);
    //Borro los datos que ya tiene el this.container
    this.limpiarContainer();
    //Vuelvo  construir los elementos yrenderizarlos enganchandolos a DOM
    this.getGrilla();
    //cambio la clase para que se vea como grilla
    this.container.className = "selector-posts-container";
  }

  getGrilla() {
    //Recorre elementos mostrados y forma la grilla poniendo elementos //Posiblemente va a cambiar la clase del this.COntainer

    let elementosParaRenderizar;
    let unWrapper;
    let listaWrappers = [];
    this.elementosMostrados.forEach((post) => {
      elementosParaRenderizar = [
        {
          tag: "img",
          id: post.postID,
          listaClases: [/*"grid-post"*/ "clase-wrappers-grilla-posts-imagen"],
          listaAcciones: [
            {
              evento: "click",
              accion: () => this.irAPostUser(post.postID, post.userName),
            },
          ],
          source: post.foto,
        },
      ];

      unWrapper = new wrapperElements(
        "idPostGrilla" + post.postID,
        "clase-wrappers-grilla-comentarios",
        elementosParaRenderizar,
        transformarObjetoEnNodo
      );
      listaWrappers.push(unWrapper);
    });

    //AHora tengo una lista de wrapper, los tengo que recorrer y enganchar al this.container
    listaWrappers.forEach((wrapper) => wrapper.engancharEnNodo(this.container));
  }

  /*
  ocultar = () => this.container.classList.toggle("clase-invisible")
  mostrar = () => this.container.classList.toggle("clase-invisible")
*/

  b;

  //Renderiza, engancha, muestra el contenedor de post.
  //Esta clase como forma distintos tipos de container el procesar objetos lo hace al enganchar al nodo padre
  engancharEnNodo = (nodoPadre) => {
    //this.procesarObjetosIngresados()
    nodoPadre.appendChild(this.container);
    //Me guardo la referencia al engancharlo
    this.referenciaNodo = document.getElementById(this.container.id);
    //ME agarro una referencia al nodo donde lo enganche
    this.nodoGancho = document.getElementById(nodoPadre.id);
    //console.log(this.nodoGancho)
  };

  desengancharDeDom = () => {
    if (this.nodoGancho != undefined) {
      this.nodoGancho.removeChild(this.referenciaNodo);
      this.nodoGancho = undefined;
      this.referenciaNodo = undefined;
    }
  };

  getPosicionPostIDElementosMostrados(postID) {
    let encontrado = false;
    let i = 0;
    let posicionPost;

    while (!encontrado && i < this.elementosMostrados.length) {
      if (this.elementosMostrados[i].postID == postID) {
        posicionPost = i;
        encontrado = true;
      } else i++;
    }

    return i;
  }

  darLike(postID) {
    //hace la animacion del like y luego setea en la BD el like, manda todo a renderizar de nuevo y posicionarse en el post donde se dio like.

    let idBuscadoCorazon = "corazonPostID" + postID;
    let corazonPost = document.getElementById(idBuscadoCorazon);

    corazonPost.classList.add("container-un-post-container-imagen-animacion");
    corazonPost.src = "./imagenes/icons/ico_likeclick.png";

    setTimeout(() => {
      corazonPost.classList.remove(
        "container-un-post-container-imagen-animacion"
      );
      corazonPost.src = "./imagenes/icons/ico_like.png";

      //Hasta aca la animacion, ahora la accion de la BD.
      this.baseDatos.setLikes(postID, this.userLogueado);

      /*AHora tengo que actualizar en mi elementosMostrados el post para no volver a pedir a la BD toda la data 
        Esto es para actualizar el post likeado provisorio, luego al mostrar toda la BD*/
      //Le piudo a la BD solo ese post y lo reemnpazp en elementos mostrados
      let postActualizado = this.baseDatos.getPostID(postID);
      console.log("post actual: ", postActualizado);
      let posicionElementos = this.getPosicionPostIDElementosMostrados(postID);
      this.elementosMostrados[posicionElementos] = postActualizado;

      //Renderizo todo de nuevo para mostrar con el nuevo like
      this.getCajaPostsEnteros();
      this.irAPost(postID);
    }, 1000);
  }

  guardarPostEnColeccion(postID) {
    //Guarda el post ID en la coleccion del user
  }

  cambiarPostActual(idPostNuevo) {
    //Tomo un post de la base de datos

    let unPost = this.baseDatos.getPostID(idPostNuevo); //baseDatosApp.getPostsUsuario(usuarioLogueado)
    this.irAPost(unPost);
    this.cambiarPosicion("f");
  }

  //Este metodo me lleva a un post en particular si esta renderizado.
  irAPost(postID) {
    location.hash = "#" + "idPost" + postID;
  }

  //Este metodo primero renderiza la lista de un usuario y luego me dirige a un post
  irAPostUser(postID, userBuscado) {
    this.renderizarUsuarioLista(userBuscado);
    location.hash = "#" + "idPost" + postID;
  }
}
