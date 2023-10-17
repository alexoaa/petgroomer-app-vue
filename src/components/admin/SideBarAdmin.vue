<template>
  <ul>
    <li v-if="this.userStore.isAuth">
      <div class="li-item user-name">
        <div>
          <span class="block mb-3 text-lg">Bienvenido</span>
          <span class="text-[1.6rem]"> {{ this.fullName }} </span>
          <span v-if="this.userStore.isAdmin">*Admin</span>
          <!-- <li id="fechaHora"><span>Spetiembre 01, 2022 - 9:54 am</span></li> -->
        </div>
      </div>
    </li>
    <li v-if="this.userStore.isAuth && this.userStore.isAdmin">
      <CustomRouterLink
        to="/admin/agendar-cita"
        text="Agendar una cita"
        class="li-item"
      />
    </li>
    <!-- <li id="fechaHora"><span>Spetiembre 01, 2022 - 9:54 am</span></li> -->
    <li v-if="this.userStore.isAuth && this.userStore.isAdmin">
      <CustomRouterLink
        to="/admin/consultar-citas"
        text="Consultar citas"
        class="li-item"
      />
      <!-- <a href="#">Citas de hoy</a> -->
    </li>

    <!-- Creating a custom routerlink to be able to add a method that closes the sidebar each time an option on the sidebar is clicked, also it helps to reuse the component and pass only the route to go -->
    <!-- <li>
      <CustomRouterLink to="/tienda" text="Tienda" class="li-item" />
    </li> -->
    <li v-if="this.userStore.isAuth" class="bottom-sidebar-btn">
      <div class="li-item">
        <button
          type="button"
          class="btnCerrarSesion"
          @click="this.closeSession()"
        >
          Cerrar sesión
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapStores, mapWritableState, mapActions } from "pinia";

import useModalsStore from "@/stores/modalsStore";
import useUserStore from "@/stores/user";
import useSidebarStore from "@/stores/sidebar";
import useGeneralVarsStore from "@/stores/generalVars";
import CustomRouterLink from "./CustomRouterLink.vue";
import router from "../../router";

export default {
  name: "SideBar",
  components: {
    CustomRouterLink,
  },
  data() {
    return {
      isAuthModalOpen: false,
      buttonToggleServiciosRef: null,
    };
  },
  computed: {
    ...mapStores(useUserStore, useSidebarStore, useGeneralVarsStore),
    ...mapWritableState(useModalsStore, { modalVisibility: "AuthModalIsOpen" }),
    fullName() {
      return `${this.userStore.userName} ${this.userStore.userLastName} `;
    },
  },
  methods: {
    toggleAuthModal() {
      this.modalVisibility = !this.modalVisibility;
      this.sidebarStore.isOpen = false;
    },
    closeSession() {
      this.logout();
      this.sidebarStore.isOpen = false;
      router.push("/");
    },
    ...mapActions(useUserStore, { logout: "logout" }),
    toggleServicios() {
      this.sidebarStore.serviciosIsOpen = !this.sidebarStore.serviciosIsOpen;
    },
  },
};
</script>
