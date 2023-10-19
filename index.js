



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



