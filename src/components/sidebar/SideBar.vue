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
        text="Agendar una cita"
        svg="true"
        svgRef="paw"
      />
    </li>
    <li class="li-item" v-if="this.userStore.isAuth && !this.userStore.isAdmin">
      <CustomRouterLink
        to="/mis-citas"
        text="Mis citas"
        svg="true"
        svgRef="calendar"
      />
    </li>
    <li class="li-item" v-if="this.userStore.isAuth && this.userStore.isAdmin">
      <CustomRouterLink
        to="/admin/consultar-citas"
        text="Consultar Citas"
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
    <li v-if="!this.userStore.isAuth" id="loginSignBtn" class="li-item">
      <CustomRouterLink
        to="/iniciar-sesion"
        text="Iniciar sesión / Registrarse"
        svg="true"
        svgRef="login"
      />
    </li>
    <li v-if="this.userStore.isAuth" class="li-item">
      <button
        type="button"
        class="btnCerrarSesion"
        @click="this.closeSession()"
      >
        <svg>
          <use href="/icons/icons.svg#logout" />
        </svg>
        Cerrar sesión
      </button>
    </li>
  </ul>
</template>

<script>
import { mapStores, mapWritableState, mapActions } from "pinia";

import useGeneralVariablesStore from "@/stores/generalVariables";
import { useUserStore } from "@/stores/user";

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
    ...mapStores(useUserStore, useGeneralVariablesStore),

    fullName() {
      return `${this.userStore.userName} ${this.userStore.userLastName} `;
    },
  },
  methods: {
    ...mapActions(useUserStore, ["logout"]),

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
  width: 80%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--background-main-color);
  z-index: 1;
  pointer-events: painted;

  .li-item {
    display: flex;
    align-items: center;
    transition: color 0.1s;
    color: var(--black-text-color);
    font-size: 1rem;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid var(--black-text-color);
    span {
      color: var(--black-text-color);
    }
    a {
      border-radius: 5px;
      font-weight: 500;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 1rem 20px;
    }
    svg {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      fill: var(--black-text-color);
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
      border-radius: 5px;
      font-weight: 500;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 1rem 20px;
      border: none;
      transition: color 0.1s;
      font-weight: 700;
      svg {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        fill: var(--black-text-color);
      }
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
