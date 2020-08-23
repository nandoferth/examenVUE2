import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
var firebase = require("firebase/app");
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/registro",
      name: "registro",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Registro.vue")
    },
    {
      path: "confirm",
      name: "confirm",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Confirm.vue"),
        meta: {
          requiresAuth: true
        }
    },
    {
      path: "registrodata",
      name: "registrodata",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Registro2.vue"),

    },
    {
      path: "/trabajo/:id",
      name: "trabajo",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Trabajo.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/CoordTrabajo/:id/:id2/:id3",
      name: "CoordTrabajo",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/CoordTrabajo.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/CoordAddTrabajo/:id/:id2/:id3",
      name: "CoordAddTrabajo",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/CoordAddTrabajo.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/cliente/:id",
      name: "cliente",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Cliente.vue"),
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/sucursal/:id",
      name: "sucursal",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Sucursal.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/CoordSucursal/:id/:id2",
      name: "CoordSucursal",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/CoordSucursal.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/CoordAddSucursal/:id/:id2",
      name: "CoordAddSucursal",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/CoordAddSucursal.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/pago/:id/:id2/:id3/:id4",
      name: "pago",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Pago.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/documento/:id/:id2/:id3/:id4",
      name: "documento",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Documento.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/comprobante/:id/:id2/:id3/:id4/:id5",
      name: "comprobante",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Comprobante.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/modificartrabajo/:id",
      name: "ModificarTrabajo",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/ModificarTrabajo.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/ModificarCliente/:id",
      name: "ModificarCliente",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/ModificarCliente.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/ModificarSucursal/:id",
      name: "ModificarSucursal",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/ModificarSucursal.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/ModificarDoc/:id:/:id2",
      name: "ModificarDoc",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/ModificarDoc.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/ModificarPago/:id/:id2/:id3",
      name: "ModificarPago",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/ModificarPago.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/ModificarComprobante/:id/:id2/:id3/:id4",
      name: "ModificarComprobante",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/ModificarComprobante.vue"),
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/AddTrabajo/:id",
      name: "AddTrabajo",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/AddTrabajo.vue"),
      meta: {
        requiresAuth: true
      }
    },
    //pruebascliente
    {
      path: "/AddCliente/:id",
      name: "AddCliente",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/AddCliente.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/AddSucursal/:id",
      name: "AddSucursal",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/AddSucursal.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/AddDoc/:id/:id2/:id3/:id4",
      name: "AddDoc",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/AddDoc.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/AddComprobante/:id/:id2/:id3/:id4/:id5",
      name: "AddComprobante",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/AddComprobante.vue"),
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/Upload/:id/:id2/:id3/:id4",
      name: "Upload",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/Upload.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/UploadComprobante/:id/:id2/:id3/:id4/:id5/:id6",
      name: "UploadComprobante",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/UploadComprobante.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/AddPago/:id/:id2/:id3/:id4",
      name: "AddPago",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/AddPago.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/AddPendiente/:id",
      name: "AddPendiente",
      component: () =>
        import( /* webpackChunkName: "about" */ "./views/AddPendiente.vue"),
      meta: {
        requiresAuth: true
      }
    },
      {
        path: "/Asignar/:id",
        name: "Asignar",
        component: () =>
          import( /* webpackChunkName: "about" */ "./views/Asignar.vue"),
        meta: {
          requiresAuth: true
        }
      },
    {
      path: "/Actividad/:id",
      name: "Actividad",
      component: () =>
          import( /* webpackChunkName: "about" */ "./views/Actividad.vue"),
      meta: {
        requiresAuth: true
      }
    },
  ]
});

router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some(record => record.meta.requiresAuth);
  var user = firebase.auth().currentUser;
  if (rutaProtegida === true && user === null) {
    next({
      name: "home"
    });
  } else {
    next();
  }
});

export default router;