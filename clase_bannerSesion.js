class bannerSesion extends wrapperElements {
  constructor(wrapperId, wrapperClass, wrapperData, renderFunction) {
    super(wrapperId, wrapperClass, undefined, renderFunction);
   
    //Defincion de algunas acciones de la barra
    this.accionBotonConfiguracion = () => alert("Configuracion")
    this.accionBotonLogout = () =>{ this.cerrarSesionBarra(), cerrarSesionUsuario()}
    this.accionBotonUserName = () =>renderizarScreenLogin()
 
  }

  procesarObjetosIngresados(){ //Sobre escribo el metodo para crear la barra.


    this.loginbar = new wrapperElements('id-banner-sesion','banner-sesion-login-bar',elementosBannerSesion,transformarObjetoEnNodo)
    this.loginbar.engancharEnNodo(this.container)
    this.solapas = new wrapperElements('id-banner-solapas','banner-sesion-solapas-bar',elementosBannerSolapas,transformarObjetoEnNodo)

  }

  iniciarSesion(usuario,perfilPic){

   
    this.btnInicioSesion = document.getElementById('banner-sesion-iniciar-sesion')
    this.btnRegistrarse = document.getElementById('banner-sesion-registrarse')
    this.UserName = document.getElementById('banner-sesion-user-name')
    this.perfilPic = document.getElementById('banner-sesion-perfil-pic')
    this.iconoConfiguracion = document.getElementById('banner-sesion-icono-config')
    this.iconoLogout = document.getElementById('banner-sesion-icono-logout')

    this.UserName.innerText = usuario
    this.UserName.className = 'banner-sesion-user-name'
    this.btnInicioSesion.classList.toggle('clase-invisible')
    this.btnRegistrarse.classList.toggle('clase-invisible')
    this.perfilPic.src = perfilPic
    this.iconoConfiguracion.className = 'banner-sesion-iconos-encendidos'
    this.iconoConfiguracion.addEventListener('click' ,this.accionBotonConfiguracion)
    this.iconoLogout.className = 'banner-sesion-iconos-encendidos'
    this.iconoLogout.addEventListener('click' ,this.accionBotonLogout)
   
    this.solapas.engancharEnNodo(this.container)

  
   
    //document.getElementById('id-banner-solapas').setAttribute('style','position:fixed;top:300px;')

   
    //Renderizo


    
  }

 

  cerrarSesionBarra(){


    this.UserName.classList.toggle('clase-invisible')
    this.perfilPic.src =  "./imagenes/icons/ico_perfil.png",
    this.btnInicioSesion.classList.toggle('clase-invisible')
    this.btnRegistrarse.classList.toggle('clase-invisible')
    this.iconoConfiguracion.className = 'banner-sesion-iconos-apagados'
    this.iconoConfiguracion.removeEventListener('click' ,this.accionBotonConfiguracion)
    this.iconoLogout.className = 'banner-sesion-iconos-apagados'
    this.iconoLogout.removeEventListener('click' ,this.accionBotonLogout)
    
    //Oculto el menu de navegacion de secciones.
    this.solapas.desengancharDeDom()
   
  }
}











const elementosBannerSesion = [
  //Es el menu de la barra principal.
  
  {   
    tag: "h1",
    id: "banner-sesion-iniciar-sesion",
    listaClases: ['banner-sesion-user-name'],
    listaAcciones: [{evento:'click', accion: ()=> { renderizarScreenLogin()}},],//() => alert("imagen2"),
    innerText: 'LOGIN |'
  },

  {
    tag: "h1",
    id: "banner-sesion-registrarse",
    listaClases: ['banner-sesion-user-name'],
    listaAcciones: [/*{evento:'mousemove',accion:()=>document.getElementById('register-form-nuevo').classList.toggle('login-form-text-grande')},*/
                    {evento:'click',accion:()=>{renderizarScreenRegistro()}},
                    /*{evento:'click',accion:()=>{desrenderizarScreenActual();}}*/
                      ],
    innerText: "REGISTRARSE",
  },
  {   
    tag: "h1",
    id: "banner-sesion-user-name",
    listaClases: ['clase-invisible'],
    listaAcciones: [],//() => alert("imagen2"),
    innerText: 'USERNAME'
  },
  {
    
    tag: "img",
    id: "banner-sesion-perfil-pic",
    listaClases: ["banner-sesion-iconos-encendidos"],
    listaAcciones:undefined,//() => alert("imagen2"),
    source: "./imagenes/icons/ico_perfil.png",
  },

  {
    
    tag: "img",
    id: "banner-sesion-icono-config",
    listaClases: ["banner-sesion-iconos-apagados"],
    listaAcciones: undefined, //[{evento:'click',accion:()=>alert('ICONO CONF')}],//() => alert("imagen2"),
    source: "./imagenes/icons/ico_conf.png",
  },

  {
    tag: "img",
    id: "banner-sesion-icono-logout",
    listaClases: ["banner-sesion-iconos-apagados"],
    listaAcciones: undefined,//[{evento:'click',accion:()=>cerrarSesion()}],
    source: "./imagenes/icons/ico_cerrarsesion.png",
  },
];



const elementosBannerSesionAbierta = [
  //Es el menu de la barra principal.
  
  {   
    tag: "h1",
    id: "banner-sesion-user-name",
    listaClases: ['banner-sesion-user-name'],
    listaAcciones: [],//() => alert("imagen2"),
    innerText: 'NOMBRE USUARIO'
  },
  {
    
    tag: "img",
    id: "banner-sesion-perfil-pic",
    listaClases: ["banner-sesion-iconos-encendidos"],
    listaAcciones:undefined,//() => alert("imagen2"),
    source: "./imagenes/icons/ico_perfil.png",
  },

  {
    
    tag: "img",
    id: "banner-sesion-icono-config",
    listaClases: ["banner-sesion-iconos-encendidos"],
    listaAcciones: undefined, //[{evento:'click',accion:()=>alert('ICONO CONF')}],//() => alert("imagen2"),
    source: "./imagenes/icons/ico_conf.png",
  },

  {
    tag: "img",
    id: "banner-sesion-icono-logout",
    listaClases: ["banner-sesion-iconos-encendidos"],
    listaAcciones: [{evento:'click',accion:()=>cerrarSesionUsuario()}],
    source: "./imagenes/icons/ico_cerrarsesion.png",
  },
];



const elementosBannerSolapas = [


  {
    tag: "h1",
    id: "id-banner-solapas-boton",
    listaClases: ["banner-solapas-text"],
    listaAcciones: [{evento:'click',accion: ()=>{desrenderizarScreenActual(), renderizarScreenUsuarioLogueado()}}],
    innerText: "MI MOTOGRAM",
  },

  {
    tag: "h1",
    id: "id-banner-solapas-boton",
    listaClases: ["banner-solapas-text"],
    listaAcciones: [{evento:'click',accion: ()=> {desrenderizarScreenActual(),renderizarGaleria()}}],
    innerText: "NUEVO POST",
  },

]