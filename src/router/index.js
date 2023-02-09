import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";

const routes = [{ name: "home", path: "/", component: Home }];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
