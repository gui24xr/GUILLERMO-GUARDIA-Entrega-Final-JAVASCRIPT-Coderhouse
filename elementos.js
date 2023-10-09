
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
    id: "header-banner-logo",
    listaClases: ["headerbar-logo"],
    listaAcciones: undefined,
    source: "./imagenes/icons/ico_logomoto.png",
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
    listaAcciones: [{evento:'click',accion: ()=> desrenderizarScreenActual()}] ,
    innerText: "NUEVO POST",
  },
  {
    tag: "h1",
    id: "id-banner-solapas-boton",
    listaClases: ["banner-solapas-text"],
    listaAcciones: [{evento:'click',accion: ()=>{desrenderizarScreenActual(), renderizarSolapaOtrosMoteros()}}],
    innerText: "OTROS MOTEROS",
  },
  {
    tag: "h1",
    id: "id-banner-solapas-boton",
    listaClases: ["banner-solapas-text"],
    listaAcciones: [{evento:'click',accion: ()=> {desrenderizarScreenActual(),renderizarGaleria()}}],
    innerText: "GALERIA",
  },

]

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

  {
    tag: "h1",
    id: "register-form-nuevo",
    listaClases: ["login-form-text"],
    listaAcciones: [{evento:'mousemove',accion:()=>document.getElementById('register-form-nuevo').classList.toggle('login-form-text-grande')},
    {evento:'click',accion:()=>{desrenderizarScreenActual(),renderizarScreenRegistro()}},

                      ],
    innerText: "Registro",
  },

  

  
];

//Items



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
    id: "register-form-email-input",
    listaClases: ["login-form-input"],
    listaAcciones: undefined,
    type: "email",
    placeHolder: "E-mail",
  },

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

  {
    tag: "input",
    id: "register-form-estado-input",
    listaClases: ["login-form-input"],
    listaAcciones: undefined,
    type: "text",
    placeHolder: "Estado",
  },

  {
    tag: "h1",
    id: "register-form-label-imagen-perfil",
    listaClases: ["login-form-text"],
    listaAcciones: undefined,
    innerText: "Url foto de perfil",
  },

  {
    tag: "input",
    id: "register-form-fotoperfil-input",
    listaClases: ["login-form-input"],
    listaAcciones: undefined,
    type: "url",
    placeHolder: "Foto de perfil",
  },



  {
    tag: "input",
    id: "register-form-submit-input",
    listaClases: ["login-form-button"],
    listaAcciones: undefined,
    type: "submit",
    value: "Aceptar",
  },

  {
    tag: "h1",
    id: "register-form-atras",
    listaClases: ["login-form-text"],
    listaAcciones: [{evento:'mousemove',accion:()=>document.getElementById('register-form-nuevo').classList.toggle('login-form-text-grande')},
    {evento:'click',accion:()=>{desrenderizarScreenActual(),renderizarLoginScreen()}},

                      ],
    innerText: "Atras",
  },

 
];