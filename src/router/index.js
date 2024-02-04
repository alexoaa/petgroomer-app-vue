import { createRouter, createWebHistory } from "vue-router";
// Views
import Home from "@/views/HomeView.vue";
import AboutUs from "@/views/AboutUsView.vue";
import LoginView from "@/views/LoginView.vue";
import SignupView from "@/views/SignupView.vue";
import ConfigurarCuenta from "@/views/user/UserConfigurarCuenta.vue";
import RecuperarContraseña from "@/views/password/RecuperarContraseña.vue";
import RestablecerContraseña from "@/views/password/RestablecerContraseña.vue";
import UserConsultarCitas from "@/views/user/UserConsultarCitas.vue";
// Admin Views
import AdminHomeView from "@/views/admin/AdminHomeView.vue";
import AdminConsultarCitas from "@/views/admin/AdminConsultarCitas.vue";
import AdminAgendarCita from "@/views/admin/AdminAgendarCita.vue";
//  Stores
import { useUserStore } from "@/stores/user";
import useGeneralVariablesStore from "@/stores/generalVariables";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
    meta: {
      requiresAdmin: false,
    },
  },
  {
    name: "estetica",
    path: "/estetica",
    component: () => import("@/views/EsteticaView.vue"),
    meta: {
      requiresAdmin: false,
    },
  },
  {
    name: "login",
    path: "/iniciar-sesion",
    component: LoginView,
  },
  {
    name: "signup",
    path: "/registrar",
    component: SignupView,
  },
  {
    name: "misCitas",
    path: "/mis-citas",
    component: UserConsultarCitas,
    meta: {
      requiresAuth: true,
      requiresAdmin: false,
    },
  },
  {
    name: "configurarCuenta",
    path: "/cuenta",
    component: ConfigurarCuenta,
    meta: {
      requiresAuth: true,
    },
  },
  {
    name: "recuperarContraseña",
    path: "/recuperar-contrasena",
    component: RecuperarContraseña,
  },
  {
    name: "restablecerContraseña",
    path: "/recover-password/confirm/:user",
    component: RestablecerContraseña,
    props: true,
  },
  {
    name: "admin",
    path: "/admin",
    redirect: "adminHome",
    meta: {
      requiresAdmin: true,
      requiresAuth: true,
    },
    children: [
      {
        name: "adminHome",
        path: "home",
        component: AdminHomeView,
      },
      {
        name: "adminConsultarCitas",
        path: "consultar-citas",
        component: AdminConsultarCitas,
      },
      {
        name: "adminAgendar",
        path: "agendar-cita",
        component: AdminAgendarCita,
      },
    ],
  },
  {
    name: "aboutUs",
    path: "/acerca-de-nosotros",
    component: AboutUs,
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];
const routeTitles = {
  "/": "DogBarber",
  "/estetica": "Agenda una Cita para tu Peludo",
  "/iniciar-sesion": "DogBarber - Iniciar Sesión",
  "/registrar": "DogBarber - Registrarse",
  "/mis-citas": "Mis Citas",
  "/cuenta": "Tu Cuenta",
  "/recuperar-contrasena":
    "¿Olvidaste tu contraseña? | No puedes iniciar sesión",
  "/recover-password/confirm/${userId}/${token}": "Restablece tu Contraseña",
  // Admin routes
  "/admin/home": "DogBarber Admin",
  "/admin/consultar-citas": "DogBarber Admin - Consultar citas",
  "/admin/agendar-cita": "DogBarber Admin - Agendar una cita",
};

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    document.getElementById("divToScroll").scrollIntoView();
    return;
  },
  linkExactActiveClass: "link-active-class",
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const generalVariablesStore = useGeneralVariablesStore();
  // Gives style to the navbar depending if the user is in the home page or not
  if (to.name == "home") generalVariablesStore.homePageNavbarColor = true;
  else generalVariablesStore.homePageNavbarColor = false;
  if (from.name == "adminHome" && to.name == "home")
    generalVariablesStore.homePageNavbarColor = false;

  if (!to.meta.requiresAuth && !userStore.isAdmin) {
    next();
    return;
  }
  // Checking if the user is auth
  if (userStore.isAuth) {
    // Checking if the route requires admin and if user has admin role
    if (to.meta.requiresAdmin) {
      if (userStore.isAdmin) {
        next();
        return;
      } else {
        next({ name: "home" });
        return;
      }
    } else {
      // Checking if the route doesn't needs admin and if the user is not an admin, as admin users cannot access nonadmin routes
      if (userStore.isAdmin) {
        next({ name: "adminHome" });
        return;
      } else {
        next();
      }
    }
  } else {
    next({ name: "home" });
  }
  return;
});

router.afterEach((to) => {
  const title = routeTitles[to.path];
  if (title) {
    document.title = title;
  }
});
export default router;
