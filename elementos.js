
const elementosHeaderBanner = [
  //Es el menu de la barra principal.

  {
    tag: "h1",
    id: "header-banner-title",
    listaClases: ["headerbar-titulo"],
    listaAcciones: undefined,
    innerText: "MOTOGRAM",
  },

  {
    tag: "img",
    id: "header-banner-icon1",
    listaClases: ['headerbar-menu-iconos'],
    listaAcciones: undefined,
    source: "./imagenes/icons/ico_logomoto.png",
  },
  {
    tag: "img",
    id: "header-banner-icon2",
    listaClases: ["headerbar-menu-iconos"],
    listaAcciones: undefined,
    source: "./imagenes/icons/ico_logomoto2.png",
  },
  {
    tag: "img",
    id: "header-banner-icon3",
    listaClases: ["headerbar-menu-iconos"],
    listaAcciones: undefined,
    source: "./imagenes/icons/ico_logomoto3.png",
  },
];



const elementosLoginForm = [
  {
    tag: "h1",
    id: "login-form-title",
    listaClases: ["login-form-text"],
    listaAcciones: undefined,
    innerText: "INICIAR SESION",
  },

  {
    tag: "img",
    id: "login-form-perfil-img",
    listaClases: ["login-form-pic"],
    listaAcciones: undefined,
    source: "./imagenes/icons/ico_perfil.png",
  },

  {
    tag: "input",
    id: "login-form-user-input",
    listaClases: ["login-form-input"],
    listaAcciones: undefined,
    type: "text",
    placeHolder: "Usuario",
  },

  {
    tag: "input",
    id: "login-form-password-input",
    listaClases: ["login-form-input"],
    listaAcciones: undefined,
    type: "text",
    placeHolder: "Password",
  },

  {
    tag: "input",
    id: "login-form-submit-input",
    listaClases: ["login-form-button"],
    listaAcciones: undefined,
    type: "submit",
    value: "Ingresar",
  },
];




const elementosRegisterForm = [
  {
    tag: "h1",
    id: "register-form-title",
    listaClases: ["login-form-text"],
    listaAcciones: undefined,
    innerText: "NUEVO USUARIO",
  },





  {
    tag: "input",
    id: "register-form-user-input",
    listaClases: ["login-form-input"],
    listaAcciones: undefined,
    type: "text",
    placeHolder: "Usuario",
  },

  {
    tag: "input",
    id: "register-form-password-input",
    listaClases: ["login-form-input"],
    listaAcciones: undefined,
    type: "text",
    placeHolder: "Password",
  },

  {
    tag: "input",
    id: "register-form-re-password-input",
    listaClases: ["login-form-input"],
    listaAcciones: undefined,
    type: "text",
    placeHolder: "Repetir Password",
  },
/*
  {
    tag: "h1",
    id: "register-form-label-fecha-nac",
    listaClases: ["login-form-text"],
    listaAcciones: undefined,
    innerText: "E-mail",
  },

  {   //Hasta que arregle lo del form renderizo un input comun y lo valido.
    tag: "input",
    id: "register-form-email-input",
    listaClases: ["login-form-input"],
    listaAcciones: undefined,
    type: "email",
    placeHolder: "Email",
  },*/

  {
    tag: "input",
    id: "register-form-email-input",
    listaClases: ["login-form-input"],
    listaAcciones: undefined,
    type: "text",
    placeHolder: "Email",
  },
  /*
  {
    tag: "h1",
    id: "register-form-label-fecha-nac",
    listaClases: ["login-form-text"],
    listaAcciones: undefined,
    innerText: "Fecha de Nacimiento.",
  },

  {
    tag: "input",
    id: "register-form-fechanacimiento-input",
    listaClases: ["login-form-input"],
    listaAcciones: undefined,
    type: "date",
    placeHolder: "Fecha de nacimiento",
  },
 */
 

  {
    tag: "h1",
    id: "register-form-label-imagen-perfil",
    listaClases: ["login-form-text"],
    listaAcciones: undefined,
    innerText: "Url foto de perfil",
  },
 /*
  {
    tag: "input",
    id: "register-form-fotoperfil-input",
    listaClases: ["login-form-input"],
    listaAcciones: undefined,
    type: "url",
    placeHolder: "Foto de perfil",
  },
*/
  {
    tag: "img",
    id: "register-form-perfil-img",
    listaClases: ["selector-picperfil-container-pics"],
    listaAcciones: undefined,
    source: "./imagenes/icons/ico_perfil.png",
  },



  {
    tag: "input",
    id: "register-form-submit-input",
    listaClases: ["login-form-button"],
    listaAcciones: undefined,
    type: "submit",
    value: "Aceptar",
  },
/*
  {
    tag: "h1",
    id: "register-form-atras",
    listaClases: ["login-form-text"],
    listaAcciones: [{evento:'mousemove',accion:()=>document.getElementById('register-form-nuevo').classList.toggle('login-form-text-grande')},
    {evento:'click',accion:()=>{desrenderizarScreenActual(),renderizarLoginScreen()}},

                      ],
    innerText: "Atras",
  },
*/
 
];



const elementosFooter = [
  //Es el menu de la barra principal.

  {
    tag: "h1",
    id: "id-footer-banner-title",
    listaClases: ["footer-banner-title"],
    listaAcciones: undefined,
    innerText: "MOTOGRAM@Todos los derechos reservados 2023",
  },

 
];






