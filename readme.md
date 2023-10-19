
/*******************************************************************************************************************************************************************

                                                                        MOTOGRAM
La idea de este proyecto para el curso de javascript en coderhouse consiste en una especie de simulador-copia de instagram pero con la tematica de motocicletas.

CURSO JAVASCRIPT CODERHOUSE
CREADOR: GUILLERMO GUARDIA


/******************************************************************************************************************************************************************
/---------------------------------------------------------------------------------------------------------------------------------------------------------
INICIO DE SESION:    user: guixr24   pass:123456     nota: alternativamente se puede usar usuario2, usuario3, usuario4 y el pass es el mismo siempre.
/---------------------------------------------------------------------------------------------------------------------------------------------------------


/----------------------------------------------------------------------------------------------------------------------------------------------------------
 FUNCIONALIDADES AL DIA DE LA FECHA:

  * CARGA EL PROGRAMA CON IMAGEN DE FONDO ALEATORIA PROVENIENTE DEL API UNPLASH.
  * INICIO/CIERRA DE SESION
  * REGISTRO DE NUEVO USUARIO CON ELECCION DE FOTO DE PERFIL
  * CREACION DE PERFILES ALEATORIOS A PARTIR DE API random-data-api.
  * CREACION DE POSTS DE FORMA ALEATORIA Y TAMBIEN MANUAL. DE FORMA MANUAL SE PERMITE ELEGIR UNA FOTO DE UNA GALERIA CONSTRUIDA A PARTIR DE UNPLASH.
  * CREACION DE COMENTARIOS DE FORMA ALEATORIA Y TAMBIEN MANUAL
  * DAR LIKES A POSTS POR PARTE DEL USER LOGUEADO.
  * MUESTRA LA LISTA DE USUARIO A LOS QUE LE GUSTA UNA DETERMINADA PUBLICACION
  * MUESTRA EL POST SIMILAR A INSTAGRAM A PARTIR DE CALCULOS DE FECHAS, HORAS, CANTIDAD DE COMENTARIOS.
  * DA MENSAJES MEDIANTE SWEET ALERT.
  * AL CLICKEAR EL NOMBRE DEL USUARIO EN UN POST LLEVA A LA CUADRICULA DE FOTOS DEL USER AL IGUAL QUE INSTAGRAM.
  
  * A FUTURO PLANEO AGREGAR FUNCIONALIDADES DE AMIGOS, ETIQUETADOS, ETC.


Inicialmente me propuse el desafio de generar absolutamente todo manipulando el DOM y asi es como cree la funcion 'transformarObjetoEnNodo' la cual recibe un objeto con determinado formato y a partir del mismo crea y retorna un nodo. Por ejemplo:

            {
              tag: "img",
              id: "header-banner-icodn3",
              listaClases: ["container-un-post-container-imagen-pic"],
              listaAcciones: [{evento: "dblclick", accion: () => this.darLike(post.postID, usuarioLogueado),},],
              source: post.foto,
            },

al leer:
* tag: crea un elemento imagen  ----> let elemento = documente.createElement('img')
* id: le agrega al nodo el id   -----> elemento.id = id
* listaClases: lee el array con lista de clases y una a una le agrega al nodo.
* listaDeAcciones: Toma un array que tiene uno o mas objetos y esos objetos tienen evento y que accion se dara al darse dicho evento.
* source: en el caso de imagenes setea  source, en caso de p y h1 setea inner text y asi sucecivamente.

Finalmente y siguiendo el algoritmo termina de construir el nodo y lo devuelve para ser utilizado.

Esta funcion la pase como parametro para construir ya que me parece que a futuro podria hacer lo mismo utilizando una funcion alternativa utilizando otros criterios, entonces podria ir pasando como parametro una u otra funcion para renderizar.



CLASES PRINCIPALES:

WRAPPER ELEMENTS : 

Esta clase es un envoltorio, un div con nodos agrupados y sin ninguna funcion en particular. Puede ser un simple div o un form, si es un form se le pasa en su constructor un 6to parametro con el formAction. Luego de construido podemos engancharlo a un nodo determinado mediente un metodo que le cree que se llama 'engancharEnNodo(nodopadre)' donde nodoPadre es el nodo al cual queremos enganchar y de este modo lo ponemos, lo quitamos del DOM o incluso lo usamos en otro lugar.

EJemplo
    var mainFormLogin = new wrapperElements("id-main-login-form","login-form", elementosLoginForm,transformarObjetoEnNodo, "javascript:comprobarUsuario()");

En enste caso construi un wrapper que es el form login, le di el id 'id-main-form-login', la clase 'login-form',lo construi a travez del array de elementos 'elementosFormLogin', utilice la funcion transformarObjetoEnNodo para procesar los elementos y le pase el formAction 'javascript:comprobarUsuario()'

CLASE BANNERSESION:

A partir de esta clase cree la barra para acceder a formulario y manejar los inicios/cierra de sesion, acceso a crear nuevo post, registrarse, etc.

CLASE BASEDATOS:

La clase base de datos es donde almaceno todos los datos de mi aplicacion y la cual ire leyendo para renderizar la app.
Tiene basicamente 3 secciones... Usuarios,posts,comentarios los cuales a travez de metodos permite obtener informacion y cruzamiento de datos entre ellos para poder renderizar, agregar nuevos, etc.

La poble de 3 maneras. Inicialmente a mano, escribi los primeros registros de usuarios y posts, luego a partir de utilizar datos de un api con fetch creo aleatoriamente perfiles falsos y a cada perfil falso le genero posts con la utilizacion del API UNPLASH. Y la 3era forma de poblar la BD es escribiendo comentarios, creando nuevos usuarios, etc utilizando la aplicacion.


CLASE POSTRENDERS:

Toma esta informacion

class PostsRender {
  constructor(
    wrapperId,
    wrapperClass,
    renderFunction,
    baseDatos,
    userLogueado
  )

  y a partir de la misma renderiza basicamente toda la informacion de la base de datos y permite interactuar con la misma. Basicamente seria la simulacion de instagram.


ARCHIVOS:

Dividi el proyecto en varios archivos para mantener un orden.

screen.js: 
    Estan las funciones relacionadas a renderizar las pantallas principales como login,registro, o cuando el user abre/cierra sesion, cuando aparece para elegir foto de la galeria y hacer el post, el manejo de que a cada actualizacion se ponga de fondo de pantalla diferentes imagenes que obtengo mediante fetch desde unplash.

index.js:
     Se crean algunas variables que se usaran de manera global, confoguraciones iniciales, se ejecuta el metodo que mediante fetch hace la primera carga de base de datos desde el servidor local, etc.


funciones.js:
    contiene algunas funciones de uso general en el programa como por ejemplo lo inherente a fechas, horas, generacion de hastag y comentarios para poblar la base de datos, renderizacion, comprobar usuarios, contraseñas, etc.

constantes:
    contiene las contantes generales que se utilizan en todo el programa, arrays con elementos para la creacion de nodos mediante la funcion transformarOjetoEnNodo, etc.

clase_una.js:
    contienen las distintas clases y sus metodos.


LIBRERIAS:

  Utilice sweetAlert y luxon.


BUGS:
    Queda dando vueltas que por algun motivo en los usuarios creados a mano no muestra la leyenda de cuando fue hecho el post, yo creo que tiene que ver con la lectura desde el archivo de servidor local en como se convierte y entonces alguna funcion no lo puede leer bien ya que en user aleatorios, o user nuevos creados manualmente funciona bien, es un problema exclusivo de los user creados a partir de los datos de servidor local.

Actualizaciones:
    El proyecto empezo de una forma y se fue transformando a medida que investigue y mas me gusto y me meti por lo cual fui haciendo algunos commit para mejorarlo cada vez mas y poder aprender mas. A veces tal vez se volvio engorroso el codigo pero eso me ayudo a familiarizarme mas por lo cual una vez entregado decidi continuarlo y continuarlo hasta el di de la fecha y que en algunas semanas seguira creciendo ya que por cuestiones de trabajo me es imposible en estos dias. Un Saludo.