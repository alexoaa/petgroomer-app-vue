import { createRouter, createWebHistory } from "vue-router";
// Views
import Home from "@/views/HomeView.vue";
import Estetica from "@/views/EsteticaView.vue";
import ConfigurarCuenta from "@/views/user/UserConfigurarCuenta.vue";
import Tienda from "@/views/TiendaView.vue";
import RecuperarContraseña from "@/views/password/RecuperarContraseña.vue";
import RestablecerContraseña from "@/views/password/RestablecerContraseña.vue";
import UserConsultarCitas from "@/views/user/UserConsultarCitas.vue";
// Admin Views
import AdminConsultarCitas from "@/views/admin/AdminConsultarCitas.vue";
import AdminAgendarCita from "@/views/admin/AdminAgendarCita.vue";
//  Stores
import useUserStore from "@/stores/user";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  { name: "estetica", path: "/estetica", component: Estetica },
  {
    name: "misCitas",
    path: "/mis-citas",
    component: UserConsultarCitas,
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (userStore.isAuth) next();
      else {
        next({ name: "home" });
      }
    },
  },

  {
    name: "configurarCuenta",
    path: "/cuenta",
    component: ConfigurarCuenta,
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (userStore.isAuth) next();
      else {
        next({ name: "home" });
      }
    },
  },
  {
    name: "recuperarContraseña",
    path: "/recuperar-contrasena",
    component: RecuperarContraseña,
    beforeEnter: (to, from, next) => {
      const userStore = useUserStore();
      if (!userStore.isAuth) next();
      else {
        next({ name: "home" });
      }
    },
  },
  {
    name: "restablecerContraseña",
    path: "/recover-password/confirm/:user",
    component: RestablecerContraseña,
    props: true,
  },
  {
    name: "tienda",
    path: "/tienda",
    component: Tienda,
  },
  {
    name: "admin",
    path: "/admin",
    meta: {
      requiresAdmin: false,
    },
    children: [
      {
        name: "consultarCitas",
        path: "consultar-citas",
        component: AdminConsultarCitas,
      },
      {
        name: "agendar",
        path: "agendar-cita",
        component: AdminAgendarCita,
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    // redirect: { name: "404Page"}
    redirect: { name: "home" },
  },
];
const routeTitles = {
  "/": "DogBarber",
  "/tienda": "DogBarber - Tienda",
  "/estetica": "Agenda una cita para tu peludo",
  "/mis-citas": "Mis citas",
  "/cuenta": "Cuenta",
  "/recuperar-contrasena":
    "¿Olvidaste tu contraseña? | No puedes iniciar sesión",
  "/recover-password/confirm/${userId}/${token}": "Restablece tu contraseña",
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById("divToScroll").scrollIntoView();
    return;
  },
  linkExactActiveClass: "link-active-class",
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // // Checking if the route doesn't require to be auth
  // if (!to.meta.requiresAuth) {
  //   next();
  //   return;
  // }
  // // Checking if the user has admin
  // if (userStore.isAuth) next();
  // else {
  //   next({ name: "home" });
  // }

  // Checking if the route doesn't require a meta field - if route doesn't require to be admin
  if (!to.meta.requiresAdmin) {
    next();
    return;
  }
  // Checking if the user has admin
  if (userStore.isAdmin) next();
  else {
    next({ name: "home" });
  }
});

router.afterEach((to) => {
  const title = routeTitles[to.path];
  if (title) {
    document.title = title;
  }
});
export default router;
