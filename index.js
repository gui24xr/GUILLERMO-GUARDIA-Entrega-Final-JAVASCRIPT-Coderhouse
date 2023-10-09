
function apiunplash(){

const url = "https://api.unsplash.com/search/photos?query=cbr&per_page=20&client_id=gK52De2Tm_dL5o1IXKa9FROBAJ-LIYqR41xBdlg3X2k";
  //const imageDiv = document.querySelector('.image');
    fetch(url)
        .then(response =>  response.json())
        .then(data => {console.log(/*data.results[3].urls.regular)*/data.results)

        let resultados = data.results
        console.log("fdfxhcg", resultados)
      
      
        resultados.forEach( x => console.log (x.urls.small)
        )
      }
        
        
        
        )
    }




//------------------------------------------------------------------------------------------

//Base de datos
var baseDatosApp = undefined; //= new baseDatos(archivoUsuarios,archivoPosts)
var usuarioLogueado = undefined;


//Elementos de DOM
const headerContainer=document.getElementsByTagName('header')[0]
const mainContainer=document.getElementsByTagName('main')[0]

//Componentes

const mainFormLogin = new formulario('id-main-login-form','login-form',elementosLoginForm,"javascript:conectarBaseDatos()",transformarObjetoEnNodo)
mainFormLogin.engancharEnNodo(mainContainer)

const registerForm= new formulario('id-register-form','register-form',elementosRegisterForm,"javascript:comprobarRegistroUsuario()",transformarObjetoEnNodo)
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









//Porquerias sueltas de prueba
//const objeto = {"postID":1,"fecha":"20/09/23","hora":"09:30","texto":"Hola amigo. Como estas?","foto":"https://s3.amazonaws.com/bikepics.com/Pics-Web/2020/04/23/bikepics-2818235-full.jpg","likes":["usuario1","usuario2","usuario3","esgdssg"]}
//const objeto2 = {"postID":1,"fecha":"20/09/23","hora":"09:8880","texto":"Hola amigo. Codssssfsefmo estas?","foto":"https://imgs.search.brave.com/lgyMa_jnEcVAH6whNaNKQhOS5Vbbznjjhkb0qjsRRn4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9ibG9n/LmxvZ3JvY2tldC5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjIvMDQvYnVpbGQt/aW1hZ2UtY2Fyb3Vz/ZWwtZnJvbS1zY3Jh/dGNoLXZhbmlsbGEt/amF2YXNjcmlwdC5w/bmc","likes":["usuario1","usuario2","usuario3"]}
const botonPrueba = document.getElementById('botonprueba').addEventListener('click', ()=> mainFormLogin.desengancharDeDom())
const botonPrueba2 = document.getElementById('botonprueba2').addEventListener('click', ()=> mainFormLogin.engancharEnNodo(mainContainer))