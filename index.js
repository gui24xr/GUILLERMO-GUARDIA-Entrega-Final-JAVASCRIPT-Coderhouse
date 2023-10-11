//-----------------------------------------------------------------------------------------------//
// CATEGORIAS
//-----------------------------------------------------------------------------------------------//

//En este array guardo categorias posibles para pasarle de forma aleatoria al parametro categoria.
const categoriasImagenes = [
  "helmet",
  "helmets",
  "motorbikes",
  "moto",
  "shoei",
  "airoh",
  "dainese",
  "cbr",
  "hjc",
  "alpinestars",
  "ktm",
  "ducati",
  "kawasaki",
  "motogp",
  "crf450",
];

//-----------------------------------------------------------------------------------------------//
// URLS PEXELS
//-----------------------------------------------------------------------------------------------//

const pexelsApiKey = "fmFgYvzBmqrmYXnqjyyU2AccYSOiJnXXsxOdyNvvcMRoI2W75gqwG7r7";
const urlPexels = "https://api.pexels.com/v1/search?query=people";
//const urlPexelsCat

//-----------------------------------------------------------------------------------------------//
// URLS UNPLASH
//-----------------------------------------------------------------------------------------------//

//Esta funcion la uso para obtener una URL de unplash con una cateoria deseada o irla cambiando segun lo que le pida
const unplashURLCategoria = (categoria, cantidad, datosAcceso) =>
  "https://api.unsplash.com/search/photos?query=" +
  categoria +
  "&per_page=" +
  cantidad +
  "&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";

const urlPicsCBR =
  "https://api.unsplash.com/search/photos?query=motorbikes&per_page=50&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";
const urlPicsHelmet =
  "https://api.unsplash.com/search/photos?query=helmet&per_page=50&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";
const urlPicsMotorcycle =
  "https://api.unsplash.com/search/photos?query=motorcycle&per_page=50&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";

var nuevaAlturaMainContainer;
//-----------------------------------------------------------------------------------------------//
// DECLARACION E INICIALIZICION VARIABLES GLOBALES DE INSTANCIAS
//-----------------------------------------------------------------------------------------------//
//Base de datos
var baseDatosApp = undefined; //= new baseDatos(archivoUsuarios,archivoPosts)
conectarBaseDatos();
var usuarioLogueado = undefined;

//Elementos de DOM
const headerContainer = document.getElementsByTagName("header")[0];
const mainContainer = document.getElementById("main-container");

//Componentes que usaremos.
var mainFormLogin = new wrapperElements(
  "id-main-login-form",
  "login-form",
  elementosLoginForm,
  transformarObjetoEnNodo,
  "javascript:comprobarUsuario()"
);
const registerForm = new wrapperElements(
  "id-register-form",
  "login-form",
  elementosRegisterForm,
  transformarObjetoEnNodo,
  "javascript:comprobarRegistroUsuario()"
);

//registerForm.engancharAlNodoPadre(mainContainer,transformarObjetoEnNodo)
//const formPrueba = new wrapperElements('id-register-formp','login-form',elementosRegisterForm,transformarObjetoEnNodo,"javascript:comprobarRegistroUsuario()")
//formPrueba.engancharAlNodoPadre(mainContainer)

//const bannerEncabezado = new barraSuperior('id-banner-header','headerBar',transformarObjetoEnNodo)
//bannerEncabezado.engancharAlNodoPadre(headerContainer)
const bannerEncabezado = new wrapperElements(
  "id-banner-header",
  "headerBar",
  elementosHeaderBanner,
  transformarObjetoEnNodo
);
bannerEncabezado.engancharEnNodo(headerContainer);

const bannerSesionActual = new bannerSesion(
  "id-banner-sesion",
  "banner-sesion",
  elementosBannerSesion,
  transformarObjetoEnNodo
);
bannerSesionActual.engancharAlNodoPadre(headerContainer);

// Una vez creadas las varras Configuro el tamaño del main container y pongo un fondo de pantalla aleatorio.
configurarMainContainer(false);
selectBackgroundScreen(false);

var bannerSolapas;
var postUserViewer;
var selectorPostViewer;
var selectorViewerGeneral;
var postViewerGeneral;
var containerGaleriaFotos;

function creacionDePerfilesAleatorios() {
  
  const cantidadRegistrosPedidos = 10;
  const urlApiDatos = "https://random-data-api.com/api/v2/users?size=" + cantidadRegistrosPedidos + "&is_xml=true";

  //La idea es generar mediante API 10 user al azar e insertar a la base de datos al iniciar la APP y ademas a esos user ponerles fotos de perfil y generarle algunos posts.
  fetch(urlApiDatos)
    .then((response) => response.json())
    .then((data) => {
      //Voy a tomar username,,password, email, perfil y el estado lo hago como "hola soy + nombree de perfil"
        data.forEach((registro) => {
        //COn esta los creamos y sabemos si esa creacion fue satisfactoria.
        if (baseDatosApp.agregarNuevoUsuario(registro.username,registro.password,registro.email,registro.avatar, "Hola, soy " + registro.username) == true){
          //Vamos a crear por cada usuario nuevo entre 1 y 10 posts con fotos de unplash y categoria al azar respecto a la tematica del sitio.
          let cantidadNuevosPost = generarValorAleatorio(1, 4);
          let horaPost = "09:30"; //Despues genero esto de manera aleatorio
          let fechaPost = "6-10-23"; //Despues genero esto de manera aleatorio
          let texto = "Este post es de" + registro.username; //Despues lo generamos aleatorio.
          let categoria = getDatoAleatoriaArray(categoriasImagenes); //console.log("Catego: ", categoria)
          //Le pido la cantidad deseada a unplas y por cada imagen creo un post
          fetch(unplashURLCategoria(categoria, cantidadNuevosPost))
            .then((response) => response.json())
            .then((data) => {
              //tenemos un array con la cantidad pedida de objetos, lo recorro y voy creando posts para este user
              data.results.forEach((x) => { baseDatosApp.agregarNuevoPost(registro.username,fechaPost,horaPost,texto,x.urls.regular);});
            });
        }
      });

      
    })
  }

creacionDePerfilesAleatorios();
