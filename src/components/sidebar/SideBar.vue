<template>
  <ul>
    <li v-if="this.userStore.isAuth" class="li-item">
      <div class="user-name">
        <span class="block mb-3 text-lg font-[500]">Bienvenido</span>
        <span class="text-xl">
          {{ this.fullName }}
        </span>
      </div>
    </li>
    <li class="li-item">
      <CustomRouterLink
        to="/estetica"
        text="Agendar cita"
        svg="true"
        svgRef="paw"
      />
    </li>
    <li class="li-item" v-if="this.userStore.isAuth">
      <CustomRouterLink
        to="/mis-citas"
        text="Mis citas"
        svg="true"
        svgRef="calendar"
      />
    </li>
    <li v-if="this.userStore.isAuth" class="li-item">
      <CustomRouterLink
        to="/cuenta"
        text="Configuracion de cuenta"
        svg="true"
        svgRef="config-gear"
      />
    </li>
    <li v-if="!this.userStore.isAuth" id="loginSiginBtn" class="li-item">
      <!-- As this btn is only to open the modal, is not necessary to add the CustomRouterLink -->
      <a href="#" @click.prevent="toggleAuthModal">
        <svg>
          <use href="@/assets/icons/icons.svg#login" />
        </svg>
        Iniciar sesión / Registrarse</a
      >
    </li>
    <li v-if="this.userStore.isAuth" class="li-item">
      <button
        type="button"
        class="btnCerrarSesion"
        @click="this.closeSession()"
      >
        <svg>
          <use href="@/assets/icons/icons.svg#logout" />
        </svg>
        Cerrar sesión
      </button>
    </li>
  </ul>
</template>

<script>
import { mapStores, mapWritableState, mapActions } from "pinia";

import useGeneralVariablesStore from "@/stores/generalVariables";
import useUserStore from "@/stores/user";

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
    };
  },
  computed: {
    ...mapWritableState(useGeneralVariablesStore, ["sidebarIsOpen"]),
    ...mapWritableState(useGeneralVariablesStore, ["sidebarServiciosIsOpen"]),
    ...mapWritableState(useGeneralVariablesStore, ["AuthModalIsOpen"]),
    ...mapStores(useUserStore, useGeneralVariablesStore),

    fullName() {
      return `${this.userStore.userName} ${this.userStore.userLastName} `;
    },
  },
  methods: {
    ...mapActions(useUserStore, ["logout"]),
    toggleAuthModal() {
      this.AuthModalIsOpen = !this.AuthModalIsOpen;
      this.sidebarIsOpen = false;
    },
    closeSession() {
      this.logout();
      this.sidebarIsOpen = false;
      router.push("/");
    },
  },
};
</script>

<style lang="scss">
#sidebar-content {
  padding: 0 5px;
  width: 80%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--background-main-color);
  z-index: 1;
  pointer-events: painted;

  .li-item {
    border-bottom: 1px solid var(--lighter-main-color);
    display: flex;
    align-items: center;
    transition: color 0.1s;
    color: var(--text-color);
    font-size: 1rem;
    width: 100%;
    text-align: left;
    a {
      font-weight: 500;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 1.25rem;
    }
    svg {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      fill: var(--text-color);
    }
    .user-name {
      flex-wrap: wrap;
      padding: 1.25rem;
      div {
        width: 100%;
        margin-bottom: 15px;
        span {
          padding-right: 8px;
          letter-spacing: 0.03em;
        }
      }
    }
    .btnCerrarSesion {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 1.25rem;
      border: none;
      transition: color 0.1s;
      font-weight: 700;
    }
  }
}

@media screen and (min-width: 768px) {
  #sidebar-content {
    width: 60%;
  }
}
@media screen and (min-width: 1200px) {
}
</style>
