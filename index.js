

//------------------------------------------------------------------------------------------

//Base de datos
var baseDatosApp = undefined; //= new baseDatos(archivoUsuarios,archivoPosts)
var usuarioLogueado = undefined;


//Elementos de DOM
const headerContainer=document.getElementsByTagName('header')[0]
const mainContainer=document.getElementsByTagName('main')[0]

//Componentes

var mainFormLogin = new formulario('id-main-login-form','login-form',elementosLoginForm,"javascript:conectarBaseDatos()",transformarObjetoEnNodo)
mainFormLogin.engancharEnNodo(mainContainer)

const registerForm= new formulario('id-register-form','login-form',elementosRegisterForm,"javascript:comprobarRegistroUsuario()",transformarObjetoEnNodo)
//registerForm.engancharAlNodoPadre(mainContainer,transformarObjetoEnNodo)

//const bannerEncabezado = new barraSuperior('id-banner-header','headerBar',transformarObjetoEnNodo)
//bannerEncabezado.engancharAlNodoPadre(headerContainer)
const bannerEncabezado = new wrapperElements('id-banner-header','headerBar',elementosHeaderBanner,transformarObjetoEnNodo)
bannerEncabezado.engancharEnNodo(headerContainer)

const bannerSesionActual = new bannerSesion('id-banner-sesion','banner-sesion',elementosBannerSesion,transformarObjetoEnNodo)
bannerSesionActual.engancharAlNodoPadre(headerContainer)

var bannerSolapas;
var postUserViewer;
var selectorPostViewer;
var selectorViewerGeneral;
var postViewerGeneral;
var containerGaleriaFotos;




/* Estas variables las voy a utilizar para manejar la aparicion y desaparicion de pantallas */

var galeriaVisible = false;
var solapaRegistroUsuario = false;

var solapaTodosLosusuarios = false;
var solapaUsuarioLogueado = false;
var loginScreenVisible = true; //Empieza en true xq al arrancar muesra el login form



function renderizarLoginScreen(){

  mainFormLogin = new formulario('id-main-login-form','login-form',elementosLoginForm,"javascript:conectarBaseDatos()",transformarObjetoEnNodo)
 mainFormLogin.engancharEnNodo(mainContainer)

}




