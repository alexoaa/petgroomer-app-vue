import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import Agendar from "@/views/AgendarView.vue";
import ConfigurarCuenta from "@/views/User/UserConfigurarCuenta.vue";
import ConsultarCitas from "@/views/User/UserConsultarCitas.vue";

const routes = [
  { name: "home", path: "/", component: Home },
  { name: "agendar", path: "/agendar", component: Agendar },
  { name: "configurarCuenta", path: "/cuenta", component: ConfigurarCuenta },
  {
    name: "consultarCitas",
    path: "/consultar-citas",
    component: ConsultarCitas,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
});

export default router;
