/*-----------------------------------------------------------------------------------------------//
// CLASE BASE DE DATOS
//-----------------------------------------------------------------------------------------------//
  Inicialmente levanta dato de 2 archivos de JSON en servidor local y adiconalmente al iniciar la APP
  genera usuarios Aleatorios a partir de datos de APIS

--------------------------------------------------------------------------------------------------*/
class baseDatos {
  constructor(archivoUsuarios, archivoPosts) {
    this.usuarios = archivoUsuarios;
    this.posts = archivoPosts;
    this.comentarios = [];
  }

  setArchivoComentarios(archivoComentarios) {
    //Funcion provisoria para setear comentarios
    this.comentarios = archivoComentarios;
    //console.log('asasass',this.comentarios)
  }

  existeUsuario = (usuarioBuscado) => {
    if (this.getUserInfo(usuarioBuscado) != false) return true;
    else return false;
  };

  validarPasswordUsuario = (usuario, password) => {
    let objUsuario;
    let coincidenUserPass = false;

    if (this.existeUsuario(usuario)) {
      objUsuario = this.getUserInfo(usuario);
      if (objUsuario.password === password) {
        coincidenUserPass = true;
      }
    }

    return coincidenUserPass;
  };

  //Si existe devuelve el ID que usaremos para obtener luego los datos en todo el programa.
  //getInfoUsuario = () =>[ console.log("hola")]
  getPostID = (postID) => {
    //Busca el post, cruza los datos y devuelve el array con los datos del post, user y una lista de los likes y otra lista con los comentarios que le corresponden al post
    let data = this.posts;
    let postEncontrado = false;
    let i = 0;

    while (!postEncontrado && i < data.length) {
      if (data[i].postID == postID) {
        postEncontrado = true;
        break;
      } else i++;
      //console.log(data[i])
      //console.log('gui')
    }

    if (postEncontrado == true) {
      //Si el post existe busco los datos del su usuario cruzando los ID.

      let datosPostIdBuscado = data[i];
      let datosUsuarioEmisorPost = this.getInfoUserID(
        datosPostIdBuscado.userID
      );

      //console.log("aaaaaaaa",datosUsuarioEmisorPost)
      //armo una lista con los nombres de los usuarios likeadores.
      let userNameLikeadores = [];
      //console.log("likes: ", data[i].likes)
      data[i].likes.forEach((likeUser) =>
        userNameLikeadores.push(this.getInfoUserID(likeUser).userName)
      );

      let comentariosPost = [];
      this.comentarios.forEach((comentario) => {
        if (comentario.postID == postID) comentariosPost.push(comentario);
      });

      //console.log("Post: ", {...datosPostIdBuscado,...datosUsuarioEmisorPost,usersLikeadores:userNameLikeadores,comentariosPost:comentariosPost})
      return {
        ...datosPostIdBuscado,
        ...datosUsuarioEmisorPost,
        usersLikeadores: userNameLikeadores,
        comentariosPost: comentariosPost,
      };
    } else return false;
  };

  existePostID = (IdPostBuscado) => {
    if (this.getPostID(IdPostBuscado) != false) return true;
    else return false;
  };

  //Me devuelve un array con todos los Post de la BD pero los datos de post y usuarios cruzados
  //COmo ya tengo una funcion armada que me da los datos cruzados de cada post pasandole el postID la uso aqui tmb
  getAllPosts = () => {
    let arreglo = [];
    //getPostId devuelve el post pero con la info cruzada del user
    this.posts.forEach((post) => arreglo.push(this.getPostID(post.postID)));

    return arreglo;
  };

  getAllUsers = () => {
    return this.usuarios;
  };

  getPostsUsuario = (usuarioIngresado) => {
    let arreglo = [];
    //Si existe el usuario me traigo sus datos
    if (this.existeUsuario(usuarioIngresado)) {
      let usuarioBuscado = this.getUserInfo(usuarioIngresado); //ya tengo el usuario, no solo busco sus post si no datos suyos para que sean renderizados
      //const { userID, userName, fotoPerfil } = usuarioBuscado
      usuarioBuscado.password; //Saco el password xq no quiero que la base de datos de esa informacion, solo el resto que es renderizable

      //Se que existe el usuario, obtuve sus datos y ahora busco sus post en el array de post
      //Devuelvo un array con los posts e info del usuario para no tener que cruzar datos despues
      this.posts.forEach((post) => {
        if (post.userID === usuarioBuscado.userID)
          arreglo.push({ ...post, ...usuarioBuscado });
      });
    }

    return arreglo;
  };

  getUserInfo = (usuarioIngresado) => {
    //Dame el objeto de datos del usuario ingresado y si no esta retorna undefined

    let data = this.usuarios;
    let usuarioEncontrado = false;
    let i = 0;

    while (!usuarioEncontrado && i < data.length) {
      if (data[i].userName == usuarioIngresado) {
        usuarioEncontrado = true;

        break;
      } else i++;
      //console.log(data[i])
      //console.log('gui')
    }

    if (usuarioEncontrado == true) {
      //delete data[i].password //Quito el password para proteger info
      //console.log('objetoooooooooo: ',data[i])
      return data[i];
    } else return false;
  };

  getInfoUserID = (idBuscado) => {
    let data = this.usuarios;
    let usuarioEncontrado = false;
    let i = 0;

    while (!usuarioEncontrado && i < data.length) {
      if (data[i].userID == idBuscado) {
        usuarioEncontrado = true;

        break;
      } else i++;
    }

    if (usuarioEncontrado == true) {
      //delete data[i].password //Quito el password para proteger info
      return data[i];
    } else return false;
  };

  setLikes(postID, usuarioLikeador) {
    //console.log(postID,usuarioLikeador)

    let infoUserLikeador = this.getUserInfo(usuarioLikeador);
    const { userID } = infoUserLikeador;
    //Agrego el userID a la lista de likes del post que me pasan por parametro.
    let posicionEnArrayPostID;

    let postEncontrado = false;
    let i = 0;

    while (!postEncontrado && i < this.posts.length) {
      if (this.posts[i].postID == postID) {
        postEncontrado = true;

        break;
      } else i++;
    }
    if (postEncontrado == true) posicionEnArrayPostID = i;
    //console.log(this.posts[i].likes)
    //Ya estoy posicionado sobre el objeto post que yo debo agregar el id del usuario que dio like.
    //console.log(this.posts[i].likes.indexOf(userID))
    if (this.posts[i].likes.indexOf(userID) < 0)
      this.posts[i].likes.push(userID);
    //else console.log("Ya esta")
    // console.log('likes:'+ this.posts[i].likes)
  }

  //Retorna el ID para un nuevo usuario a post y ese ID siempre sera el siguiente al ultimo registro
  //Este metodo es privado ya que la BD es quien asigna id.
  asignarNuevoUserID() {
    //Me paro en el ulti registro.
    const ultimoRegistro = this.usuarios[this.usuarios.length - 1];
    //console.log('Numero ultimo registro: ', ultimoRegistro.userID)
    return ultimoRegistro.userID + 1;
  }

  asignarNuevoPostID() {
    //Me paro en el ulti registro.
    const ultimoRegistro = this.posts[this.posts.length - 1];
    return ultimoRegistro.postID + 1;
  }

  asignarNuevoComentarioID() {
    //Me paro en el ulti registro.
    const ultimoRegistro = this.comentarios[this.comentarios.length - 1];
    return ultimoRegistro.comentarioID + 1;
  }

  //Construye un nuevo usuario con los parametros recibidos y los mete a la BD
  //Estado generamos algo vacio x ahora.
  //LO va a crear siempr y cuando el userName no exista en la BD, entonces lo crea y devueve true o false
  agregarNuevoUsuario(userName, password, email, urlFotoPerfil, estado) {
    if (!this.existeUsuario(userName)) {
      let nuevoUsuario = {
        userID: this.asignarNuevoUserID(),
        userName: userName,
        password: password,
        fotoPerfil: urlFotoPerfil,
        email: email,
        estado: estado,
      };

      //console.log("Nuevo Usuario: ", nuevoUsuario)
      this.usuarios.push(nuevoUsuario);

      //console.log(this.usuarios)
      return true;
    } else return false;
  }

  agregarNuevoPost(userID, fecha, hora, texto, hashtagList, foto) {
    let nuevoPost = {
      postID: this.asignarNuevoPostID(),
      userID: userID,
      fecha: fecha,
      hora: hora,
      texto: texto,
      hashtagslist: hashtagList,
      likes: [], //Comentarios y likes inician vacios.
      foto: foto, //Recibe URL
    };

    this.posts.push(nuevoPost);
    //console.log(nuevoPost)
  }

  agregarNuevoPostDesdeArchivo(userID, fecha, hora, texto, foto, likes) {
    let nuevoPost = {
      postID: this.asignarNuevoPostID(),
      userID: userID,
      fecha: fecha,
      hora: hora,
      texto: texto,
      likes: likes, //Comentarios y likes inician vacios.
      foto: foto, //Recibe URL
    };

    this.posts.push(nuevoPost);
    //console.log(nuevoPost)
  }

  //Paswords aceptdos por la BD.
  passwordAceptado(password) {
    const condiciones = /^[a-zA-Z0-9]{6,8}$/;

    if (condiciones.test(password)) return true;
    else return false; // La palabra no es válida.
  }

  guardarPostAColeccion() {
    console.log("Cfsfsfsfsfsfs");
  }

  //Devuelven cantidad de registros de posts o usuarios
  getCantidadPosts = () => this.posts.length;

  getCantidadUsuarios = () => this.usuarios.length;

  agregarComentarioPost(postID, userID, fecha, hora, texto) {
    let nuevoComentario = {
      comentarioID: this.asignarNuevoComentarioID(),
      postID: postID,
      userID: userID, //user que hizo el comentario
      texto: texto,
      fecha: fecha,
      hora: hora,
    };

    console.log("Nuevo comen: ", nuevoComentario);
    this.comentarios.push(nuevoComentario);
  }
}
