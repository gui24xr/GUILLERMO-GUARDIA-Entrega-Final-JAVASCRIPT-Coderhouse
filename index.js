//-----------------------------------------------------------------------------------------------//
// URLS UNPLASH
//-----------------------------------------------------------------------------------------------//

const generarValorAleatorio = (min,max) => Math.floor((Math.random() * (max - min + 1)) + min)

//Esta funcion la uso para obtener una URL de unplash con una cateoria deseada o irla cambiando segun lo que le pida
const unplashURLCategoria = (categoria,cantidad) => 'https://api.unsplash.com/search/photos?query=' + categoria + '&per_page='+ cantidad +'&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k';

//En este array guardo categorias posibles para pasarle de forma aleatoria al parametro categoria.
const categoriasImagenes = ['helmet','helmets','motorbikes','moto','shoei','airoh','dainese','cbr','hjc','alpinestars','ktm','ducati','kawasaki','motogp','crf450']

const urlPicsCBR = "https://api.unsplash.com/search/photos?query=motorbikes&per_page=50&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";
const urlPicsHelmet = "https://api.unsplash.com/search/photos?query=helmet&per_page=50&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";
const urlPicsMotorcycle = "https://api.unsplash.com/search/photos?query=motorcycle&per_page=50&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";



var nuevaAlturaMainContainer;
//-----------------------------------------------------------------------------------------------//
// DECLARACION E INICIALIZICION VARIABLES GLOBALES DE INSTANCIAS
//-----------------------------------------------------------------------------------------------//
//Base de datos
var baseDatosApp = undefined; //= new baseDatos(archivoUsuarios,archivoPosts)
conectarBaseDatos ()
var usuarioLogueado = undefined;


//Elementos de DOM
const headerContainer=document.getElementsByTagName('header')[0]
const mainContainer=document.getElementById('main-container')





//Componentes que usaremos.
var mainFormLogin = new wrapperElements('id-main-login-form','login-form',elementosLoginForm,transformarObjetoEnNodo,"javascript:comprobarUsuario()")
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


// Una vez creadas las varras Configuro el tamaño del main container y pongo un fondo de pantalla aleatorio.
configurarMainContainer(false)
selectBackgroundScreen(false)



var bannerSolapas;
var postUserViewer;
var selectorPostViewer;
var selectorViewerGeneral;
var postViewerGeneral;
var containerGaleriaFotos;


function creacionDePerfilesAleatorios(){
 
 /* const url = 'https://dawn2k-random-german-profiles-and-names-generator-v1.p.rapidapi.com/?format=json&gender=b&cc=all&email=gmail.com%2Cyahoo.com&pwlen=12&ip=a&phone=l%2Ct%2Co&seed=helloworld&count=10&maxage=40&minage=30&uuid=1&color=1&lic=1&images=1';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '00273837a8msh24955f80bea6a7cp1377c4jsn7688509e0d88',
		'X-RapidAPI-Host': 'dawn2k-random-german-profiles-and-names-generator-v1.p.rapidapi.com'
	}
}*/

const cantidadRegistrosPedidos = 10;
const url = 'https://random-data-api.com/api/v2/users?size=' + cantidadRegistrosPedidos + '&is_xml=true'
  
  //La idea es generar mediante API 10 user al azar e insertar a la base de datos al iniciar la APP
  //A esos user ponerles fotos de perfil y generarle algunos posts.
    fetch(url, /*options*/)
    .then( response => response.json())
    .then( data => { //Voy a tomar username,,password, email, perfil y el estado lo hago como "hola soy + nombree de perfil"
                   
                      //console.log(data)
                    data.forEach( registro => { 
                                           
                                            baseDatosApp.agregarNuevoUsuario(registro.username, registro.password,registro.email,registro.avatar,'Hola, soy '+ registro.username)                                        
                                            
                                          
                                          })

                                        //Ya poble de user aleatorios, ahora invento 20 posts y los asigno de manera aleatoria
    
    }
    
          
    ).catch("API Error")

  
  }






  creacionDePerfilesAleatorios() 

