//------------------------------------------------------------------------------------------
// Urls unplash
const generarAleatorio = (min,max) => Math.floor((Math.random() * (max - min + 1)) + min)
const urlPicsCBR = "https://api.unsplash.com/search/photos?query=cbr&per_page=50&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";
const urlPicsHelmet = "https://api.unsplash.com/search/photos?query=helmet&per_page=50&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";
const urlPicsMotorcycle = "https://api.unsplash.com/search/photos?query=motorcycle&per_page=50&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";
//Base de datos
var baseDatosApp = undefined; //= new baseDatos(archivoUsuarios,archivoPosts)
var usuarioLogueado = undefined;


//Elementos de DOM
const headerContainer=document.getElementsByTagName('header')[0]
const mainContainer=document.getElementById('main-container')

//Componentes que usaremos.

var mainFormLogin = new wrapperElements('id-main-login-form','login-form',elementosLoginForm,transformarObjetoEnNodo,"javascript:conectarBaseDatos()")

//mainFormLogin.engancharEnNodo(mainContainer)

const registerForm= new wrapperElements('id-register-form','login-form',elementosRegisterForm,transformarObjetoEnNodo,"javascript:comprobarRegistroUsuario()")
//registerForm.engancharAlNodoPadre(mainContainer,transformarObjetoEnNodo)
//const formPrueba = new wrapperElements('id-register-formp','login-form',elementosRegisterForm,transformarObjetoEnNodo,"javascript:comprobarRegistroUsuario()")
//formPrueba.engancharAlNodoPadre(mainContainer)

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



//console.log(window.screen.height)
//console.log(document.getElementById('id-banner-header').clientHeight)
//console.log(document.getElementById('main-container').clientHeight)

//Obtengo tamaño ventana, le resto el de las barras y se lo asigno al main

function resizeMainCOntainer(sesion){

  let hScreenContainer = window.screen.availHeight
let hBannerHeader = document.getElementById('id-banner-header').clientHeight
let hBannerSesion = document.getElementById('id-banner-sesion').clientHeight

let mainContainerNodo = document.getElementById('main-container')

let nuevaAlturaMainContainer = hScreenContainer-hBannerHeader-hBannerSesion
console.log(nuevaAlturaMainContainer + 'px')

 if (sesion == 'cerrada') {

//console.log(hMainContainer,hBannerHeader,hBannerSesion)




//Pongo imagen aleatoria de unplash;

fetch(urlPicsCBR)
.then(response =>  response.json())
.then(data => {

    let arrayElementos = []
    let nuevoObjeto;
    console.log(/*data.results[3].urls.regular)*/data.results)
    let resultados = data.results
    let nuevaImage = resultados[generarAleatorio(0,resultados.length -1)].urls.small
   mainContainer.style.backgroundImage = 'url(' + nuevaImage +')'

   mainContainerNodo.style.height = nuevaAlturaMainContainer + 'px'
//mainContainer.style.backgroundImage = 'url(' +'../imagenes/fondopic.jpg' +')'

mainContainerNodo.style.display = 'flex'
mainContainerNodo.style.justifyContent = 'center'
mainContainer.style.alignItems= 'center'
mainContainer.style.backgroundSize = 'cover'
mainContainer.style.backgroundRepeat = 'no-repeat'

  
  })

}
else if (sesion == 'abierta'){



}

}

resizeMainCOntainer('cerrada')