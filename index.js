

const PICPOSTBIENVENIDA = '../imagenes/postbienvenida.jpg'
const DateTime = luxon.DateTime

//ESTE OBJETO VA A REPRESENTAR MI HORA ACTUAL PARA HACER CALCULOS Y PONER EN POSTS
/*const objetoTiempo = {diaActual:DateTime.now().day,
                      mesActual:DateTime.now().month,
                      anioActual:DateTime.now().year,
                      horaActual:DateTime.now().hour,
                      minutesActual:DateTime.now().minute,

}*/

//console.log(JSON.stringify(archivoPosts2))



//-----------------------------------------------------------------------------------------------//
// CATEGORIAS Y ARRAYS CON CONSTANTES.
//-----------------------------------------------------------------------------------------------//

//En este array guardo categorias posibles para pasarle de forma aleatoria al parametro categoria.
const categoriasImagenes = ["helmet", "helmets", "motorbikes", "moto", "shoei","airoh", 
"dainese", "cbr","hjc", "alpinestars", "ktm", "ducati", "kawasaki", "motogp", "crf450",];



const hashtagsMotocicletas = [
  "#Motocicletas", "#Motos", "#Moteros", "#BikerLife", "#RutasEnMoto", "#CustomBikes", "#Motocross",
  "#CaféRacer", "#MotocicletasClásicas", "#ViajesEnMoto", "#AdventureBikes", "#MotoGP", "#Ducati",
  "#HarleyDavidson", "#Kawasaki","#Suzuki", "#Yamaha", "#Honda", "#Triumph", "#BMWmotos", "HJC", "Shoei",
  "#Arai",  "#AGV",  "#Bell", "#Scorpion", "#Nolan", "#Schuberth", "#LS2", "#Shark", "#Suzuki", "#Yamaha", "#Honda",
  "#Kawasaki", "#Ducati", "#Harley-Davidson", "Triumph", "#BMWMotorrad", "#KTM", "#Aprilia"];

//-----------------------------------------------------------------------------------------------//
// URLS UNPLASH
//-----------------------------------------------------------------------------------------------//

//Esta funcion la uso para obtener una URL de unplash con una cateoria deseada o irla cambiando segun lo que le pida
const unplashURLCategoria = (categoria, cantidad) =>
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


//-----------------------------------------------------------------------------------------------//
// DECLARACION E INICIALIZICION VARIABLES GLOBALES DE INSTANCIAS
//-----------------------------------------------------------------------------------------------//

//archivoPosts2.forEach ( post => post.hashtagslist = getHashTagsList(generarValorAleatorio(1,10)) )
//console.log(JSON.stringify(archivoPosts2))


var nuevaAlturaMainContainer;

//Base de datos
var baseDatosApp = undefined; //= new baseDatos(archivoUsuarios,archivoPosts)
conectarBaseDatos(); //Crea la BD, levanta los archivos.




//En esta variable vamos a guardar el user que inicia sesion
var usuarioLogueado = undefined;

//Elementos principales de DOM
const headerContainer = document.getElementsByTagName("header")[0];
const mainContainer = document.getElementById("main-container");


//-----------------------------------------------------------------------------------------------//
// DECLARACION E INICIALIZICION VARIABLES GLOBALES DE INSTANCIAS
//-----------------------------------------------------------------------------------------------//

//Formulario de LOGIN (ingresar con usuario: guixr24 / pass: 123456)
var mainFormLogin = new wrapperElements("id-main-login-form","login-form", elementosLoginForm,transformarObjetoEnNodo, "javascript:comprobarUsuario()");

//Formulario de registro de nuevos usuario y eleccion de foto de perfil 
const registerForm = new wrapperElements("id-register-form","login-form",elementosRegisterForm, transformarObjetoEnNodo, "javascript:comprobarRegistroUsuario()");

var nuevoPostForm;
var bannerSolapas;
var postUserViewer;
var selectorPostViewer;
var selectorViewerGeneral;
var postViewerGeneral;
var containerGaleriaFotos;


// banner titulo del sitio
const bannerEncabezado = new wrapperElements("id-banner-header", "headerBar", elementosHeaderBanner, transformarObjetoEnNodo);
bannerEncabezado.engancharEnNodo(headerContainer);

// banner donde tenemos para ingresar al login form y secciones una vez la sesion se inicia.
const bannerSesionActual = new bannerSesion("id-banner-sesion","banner-sesion", transformarObjetoEnNodo);
bannerSesionActual.engancharEnNodo(headerContainer)

//En el footer solo genero un banner que quedara fijo, es solo de vista.
const footerBanner = new wrapperElements("id-footer-element","class-footer",elementosFooter,transformarObjetoEnNodo)
const footerContainer = document.getElementById('id-footer')
footerBanner.engancharEnNodo(footerContainer)
// Una vez creadas las Barras Configuro el tamaño del main container y pongo un fondo de pantalla aleatorio.
configurarMainContainer('home');
selectBackgroundScreen(false);



