<template>
  <ul>
    <li>
      <a href="#" id="nombreUsuario"
        >Alejandro Olvera<span>Web Developer</span></a
      >
    </li>
    <!-- <li id="fechaHora"><span>Spetiembre 01, 2022 - 9:54 am</span></li> -->
    <li>
      <CustomRouterLink to="/consultar-citas" text="Consultar citas" />
      <!-- <a href="#">Citas de hoy</a> -->
    </li>

    <li>
      <!-- Creating a custom routerlink to be able to add a method that closes the sidebar each time an option on the sidebar is clicked, also it helps to reuse the component and pass only the route to go -->
      <CustomRouterLink to="/agendar" text="Agendar cita" />
    </li>
    <li>
      <CustomRouterLink to="/cuenta" text="Configuracion de cuenta" />
      <!-- <a href="#">Configuracion de cuenta</a> -->
    </li>
    <li>
      <!-- Since this btn is only to open the modal, is not necessary to add the CustomRouterLink -->
      <a class="px-2" href="#" @click.prevent="toggleAuthModal"
        >Iniciar sesión / Registrarse</a
      >
    </li>

    <li>
      <form action="/logout?_method=DELETE" method="POST">
        <button type="submit" class="btnCerrarSesion">Cerrar sesión</button>
      </form>
    </li>

    <!-- <li><a href="#0" >Cerrar sesión</a></li> -->
    <li class="item-small">
      <a href="#0">Facebook</a><a href="#0">Instagram</a>
    </li>
  </ul>
</template>

<script>
import { mapWritableState } from "pinia";
import useAuthModalStore from "@/stores/authModal";
import CustomRouterLink from "./sidebar/CustomRouterLink.vue";

export default {
  name: "SideBar",
  components: {
    CustomRouterLink,
  },
  data() {
    return {
      isAuthModalOpen: false,
    };
  },
  computed: {
    ...mapWritableState(useAuthModalStore, { modalVisibility: "isOpen" }),
  },
  methods: {
    toggleAuthModal() {
      this.modalVisibility = !this.modalVisibility;
    },
  },
};
</script>
