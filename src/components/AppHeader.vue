<template>
  <nav
    class="navbar"
    :class="{
      'sidebar-open': this.sidebarIsOpen,
      'navbar-fixed': this.generalVariablesStore.isNavbarFixed,
      'navbar-home-color':
        this.generalVariablesStore.homePageNavbarColor &&
        !this.generalVariablesStore.isNavbarFixed,
    }"
  >
    <div class="navbar-title">
      <div
        class="nav-ham-button screen-mquery-s"
        tabindex="0"
        @click="toggleNav"
      >
        <span class="icon-bar" :style="sidebarBtn1"></span>
        <span class="icon-bar" :style="sidebarBtn2"></span>
        <span class="icon-bar" :style="sidebarBtn3"></span>
      </div>
      <div class="navbar-content">
        <div class="logo-container">
          <router-link
            :to="{ name: 'home' }"
            tabindex="0"
            exact-active-class="no-active"
            @click="closeNav"
            class="logo-image"
          >
            <img src="@/assets/images/dogbarber-white.png" alt="DOGBARBER" />
          </router-link>
        </div>
        <ul class="navbar-links">
          <li>
            <router-link to="/" text="Inicio" />
          </li>
          <li>
            <router-link
              to="/estetica"
              text="Nuestros servicios"
              v-if="!this.userStore.isAdmin"
            />
          </li>
          <li>
            <router-link
              :to="this.userStore.isAdmin ? '/admin/agendar-cita' : '/estetica'"
              text="Agendar una cita"
            />
          </li>
          <li v-if="!this.userStore.isAuth">
            <router-link
              to="/iniciar-sesion"
              text="Iniciar sesión"
              class="btn-primary"
            />
          </li>
          <li v-if="this.userStore.isAuth && this.userStore.isAdmin">
            <router-link to="/admin/consultar-citas" text="Consultar citas" />
          </li>
          <li v-if="this.userStore.isAuth && !this.userStore.isAdmin">
            <router-link to="/mis-citas" text="Mis citas" />
          </li>
        </ul>
        <div
          class="user-account-buttons"
          @click="userButton"
          v-if="this.userStore.isAuth"
        >
          <svg>
            <use href="/icons/icons.svg#user-circle" />
          </svg>
          <div class="hidden md:block ml-2">
            <span>{{ this.userStore.userName }}</span>
          </div>
        </div>
      </div>

      <!-- Sidebar container -->
      <div class="sidebar-container screen-mquery-s">
        <div class="sidebar-bg" @click="toggleNav" :style="bgSideBar"></div>
        <Transition name="slide">
          <Sidebar
            v-if="this.generalVariablesStore.sidebarIsOpen"
            id="sidebar-content"
          >
          </Sidebar>
        </Transition>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapWritableState, mapStores } from "pinia";
import useGeneralVariablesStore from "@/stores/generalVariables";
import { useUserStore } from "@/stores/user";
import Sidebar from "./sidebar/SideBar.vue";
import router from "../router";

export default {
  name: "AppHeader",
  components: {
    Sidebar,
  },
  data() {
    return {};
  },
  computed: {
    ...mapWritableState(useGeneralVariablesStore, ["sidebarIsOpen"]),
    ...mapStores(useGeneralVariablesStore, useUserStore),

    sidebarBtn1() {
      return this.generalVariablesStore.sidebarIsOpen
        ? `transform: translate3d(0, 9px, 0) rotate(45deg);`
        : "";
    },
    sidebarBtn2() {
      return this.generalVariablesStore.sidebarIsOpen ? `opacity: 0;` : "";
    },
    sidebarBtn3() {
      return this.generalVariablesStore.sidebarIsOpen
        ? `transform: translate3d(0, -9px, 0) rotate(-45deg);`
        : "";
    },
    bgSideBar() {
      return this.generalVariablesStore.sidebarIsOpen
        ? `visibility: visible; opacity: 0.6;`
        : "";
    },
  },
  methods: {
    userButton() {
      if (this.userStore.isAuth) router.push("/cuenta");
      this.closeNav();
    },
    toggleNav() {
      this.sidebarIsOpen = !this.sidebarIsOpen;
    },
    closeNav() {
      this.sidebarIsOpen = false;
    },
  },
};
</script>

<style scoped lang="scss">
.navbar {
  position: fixed;
  top: 0;
  z-index: 100;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms ease-in-out;
  background: var(--background-main-color);

  .navbar-title {
    display: flex;
    width: 90%;
    align-items: center;
    font-size: 1.4rem;

    .nav-ham-button {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      z-index: 2;
      -webkit-appearance: none;
      border: 0;
      background: transparent;
      border-radius: 0;
      width: 30px;
      cursor: pointer;
      pointer-events: auto;
      touch-action: manipulation;
      .icon-bar {
        display: block;
        width: 100%;
        height: 3px;
        background: var(--black-text-color);
        transition: 0.3s;
        border-radius: 6px;
      }
      .icon-bar + .icon-bar {
        margin-top: 6px;
      }
    }
    .navbar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .logo-container {
        width: fit-content;
        margin: 0 auto;
        .logo-image {
          img {
            transition: all 200ms ease-in-out;
            width: 230px;
            filter: brightness(0%);
          }
        }
      }
      .navbar-links {
        display: none;
      }

      .user-account-buttons {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        svg {
          width: 35px;
          height: 35px;
          fill: var(--black-text-color);

          transition: fill 200ms ease-in-out;
        }
        span {
          color: var(--black-text-color);
          transition: color 200ms ease-in-out, opacity 200ms ease-in-out;
        }
        &:hover {
          cursor: pointer;
          svg {
            fill: var(--main-color);
          }
          span {
            color: var(--main-color);
          }
        }
        &:active {
          opacity: 0.9;
        }
      }
    }
  }

  .sidebar-container {
    position: fixed;
    height: 100dvh;
    width: 100%;
    left: 0;
    top: 60px;
    pointer-events: none;
    .sidebar-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.3s;
      background: var(--background-dark-color);
      pointer-events: auto;
      z-index: -1;
    }
  }
}

.navbar-fixed {
  background: var(--background-main-color) !important;
  box-shadow: 0 0 7px 4px var(--gray-color);
  .icon-bar {
    background: var(--black-text-color) !important;
  }
  .navbar-links {
    li {
      a {
        color: var(--black-text-color) !important;
        &:hover {
          color: var(--main-color) !important;
        }
      }
    }
    .btn-primary {
      color: var(--white-text-color) !important;
    }
  }
}
.navbar-home-color {
  background: transparent;
  box-shadow: none !important;
  .icon-bar {
    background: var(--white-text-color) !important;
  }
  .navbar-links {
    li {
      a {
        color: var(--white-text-color) !important;
        &:hover {
          color: var(--main-color) !important;
        }
      }
    }
  }
  .user-account-buttons {
    svg {
      fill: var(--white-text-color) !important;
    }
    span {
      color: var(--white-text-color) !important;
    }
    &:hover {
      svg {
        fill: var(--main-color) !important;
      }
      span {
        color: var(--main-color) !important;
      }
    }
  }
  .logo-image {
    img {
      filter: none !important;
    }
  }
}
.sidebar-open {
  background: var(--main-color) !important;
  box-shadow: 0 0 7px 4px var(--light-gray-color);
  .icon-bar {
    background: var(--white-text-color) !important;
  }
  .logo-image {
    img {
      filter: none !important;
    }
  }

  .user-account-buttons {
    svg {
      fill: var(--white-text-color) !important;
    }
    span {
      color: var(--white-text-color) !important;
    }
  }
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-enter-active {
  transition: transform 300ms ease-out;
}
.slide-leave-to {
  transition: transform 300ms ease-in;
  transform: translateX(-100%);
}
.btn-primary {
  margin: 0;
}

@media screen and (min-width: 1024px) {
  .screen-mquery-s {
    display: none !important;
  }
  .navbar-content {
    .logo-container {
      width: 100% !important;
      max-width: 230px;
      margin: 0 !important;
      .logo-image {
      }
    }
    .navbar-links {
      width: 100%;
      display: flex !important;
      justify-content: flex-end;
      align-items: center;
      li {
        a {
          font-size: 1.2rem;
          font-weight: 500;
          position: relative;
          padding: 10px 20px;
          transition: 100ms ease-in-out;

          &:hover {
            color: var(--main-color);
          }
        }
      }
    }
    .user-account-buttons {
      padding-left: 20px;
      svg {
      }
      span {
      }
    }
  }
}
</style>
