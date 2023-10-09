class bannerSesion extends wrapperElements {
  constructor(wrapperId, wrapperClass, wrapperData, renderFunction) {
    super(wrapperId, wrapperClass, wrapperData, renderFunction);
   
    
    this.accionBotonConfiguracion = () => alert("Configuracion")
    this.accionBotonLogout = () => cerrarSesion()
 
  }

  procesarObjetosIngresados(){ //Sobre escribo el metodo

    this.loginbar = new wrapperElements('id-banner-sesion','banner-sesion-login-bar',elementosBannerSesion,transformarObjetoEnNodo)
    this.loginbar.engancharAlNodoPadre(this.container)
    this.solapas = undefined


  }

  iniciarSesion(usuario,perfilPic){

   

    this.UserName = document.getElementById('banner-sesion-user-name')
    this.perfilPic = document.getElementById('banner-sesion-perfil-pic')
    this.iconoConfiguracion = document.getElementById('banner-sesion-icono-config')
    this.iconoLogout = document.getElementById('banner-sesion-icono-logout')

    this.UserName.innerText = usuario
    this.UserName.className = 'banner-sesion-user-name'
    this.perfilPic.src = perfilPic
    this.iconoConfiguracion.className = 'banner-sesion-iconos-encendidos'
    this.iconoConfiguracion.addEventListener('click' ,this.accionBotonConfiguracion)
    this.iconoLogout.className = 'banner-sesion-iconos-encendidos'
    this.iconoLogout.addEventListener('click' ,this.accionBotonLogout)
   

    this.solapas = new wrapperElements('id-banner-solapas','banner-sesion-solapas-bar',elementosBannerSolapas,transformarObjetoEnNodo)
   
    this.solapas.engancharAlNodoPadre(this.container)
    this.loginbar.engancharAlNodoPadre(this.container)

  
  }

  cerrarSesion(){


    this.UserName.innerText = 'INICIAR SESION'
    this.perfilPic.src =  "./imagenes/icons/ico_perfil.png",
    this.iconoConfiguracion.className = 'banner-sesion-iconos-apagados'
    this.iconoConfiguracion.removeEventListener('click' ,this.accionBotonConfiguracion)
    this.iconoLogout.className = 'banner-sesion-iconos-apagados'
    this.iconoLogout.removeEventListener('click' ,this.accionBotonLogout)
    


  }
}











const elementosBannerSesion = [
  //Es el menu de la barra principal.
  
  {

    
    
    
    tag: "h1",
    id: "banner-sesion-user-name",
    listaClases: ['banner-sesion-user-name'],
    listaAcciones: [{evento:'click', accion: ()=> mainFormLogin.engancharEnNodo(mainContainer)}],//() => alert("imagen2"),
    innerText: 'INICIAR SESION'
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