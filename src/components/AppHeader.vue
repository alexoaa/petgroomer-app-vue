<template>
  <nav class="navbar">
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
            <img src="@/assets/images/logo.png" alt="DOGBARBER" />
          </router-link>
        </div>
        <ul class="navbar-links">
          <li>
            <router-link to="/estetica" text="Agenda una cita" />
          </li>
          <li v-if="this.userStore.isAuth && this.userStore.isAdmin">
            <router-link to="/consultar-citas" text="Consultar citas" />
          </li>
          <li v-if="this.userStore.isAuth && !this.userStore.isAdmin">
            <router-link to="/mis-citas" text="Mis citas" />
          </li>
        </ul>
        <div class="user-account-buttons" @click="userButton">
          <svg>
            <use href="@/assets/icons/icons.svg#user-circle" />
          </svg>
          <div class="hidden md:block ml-2">
            <span v-if="this.userStore.isAuth">{{
              this.userStore.userName
            }}</span>
            <span v-else>Cuenta</span>
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
import useUserStore from "@/stores/user";
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
    ...mapWritableState(useGeneralVariablesStore, ["AuthModalIsOpen"]),
    ...mapWritableState(useGeneralVariablesStore, ["sidebarIsOpen"]),
    // ...mapWritableState(useUserStore),
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
      if (!this.userStore.isAuth) this.AuthModalIsOpen = true;
      else {
        router.push("/cuenta");
      }
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
  z-index: 100;
  height: 80px;
  width: 100%;
  background: var(--main-color);
  color: var(--dark-text-color);
  display: flex;
  align-items: center;
  padding: 15px;
  box-shadow: 0 0px 6px 4px var(--main-color);

  .navbar-title {
    display: flex;
    width: 100%;
    align-items: center;
    font-size: 1.4rem;

    .nav-ham-button {
      margin-right: 20px;
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
        background: var(--dark-text-color);
        transition: 0.3s;
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
        width: 100%;
        max-width: 300px;
        .logo-image {
          img {
            width: 310px;
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
        margin-left: 15px;
        svg {
          width: 35px;
          height: 35px;
          fill: var(--dark-text-color);
          transition: fill 200ms ease-in-out;
        }
        span {
          color: var(--dark-text-color);
          font-weight: 500;
          transition: color 200ms ease-in-out, opacity 200ms ease-in-out;
        }
        &:hover {
          cursor: pointer;
          svg {
            fill: var(--dark-accent-color);
          }
          span {
            color: var(--dark-accent-color);
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
    top: 80px;
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
      background: var(--main-color);
      pointer-events: auto;
      z-index: -1;
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

@media screen and (min-width: 1024px) {
  .screen-mquery-s {
    display: none !important;
  }
  .navbar {
    padding-right: 30px;
  }
  .navbar-content {
    .logo-container {
      width: 300px;
      .logo-image {
      }
    }
    .navbar-links {
      width: 100%;
      margin-right: 15px;
      display: flex !important;
      justify-content: flex-end;
      li {
        a {
          position: relative;
          padding: 10px 20px;
          color: var(--dark-text-color);
          font-weight: 500;
          &::after {
            content: "";
            width: 0;
            height: 4px;
            position: absolute;
            bottom: -2px;
            left: 0;
            top: -1;
            background: var(--dark-accent-color);
            transition: width 300ms ease-in-out;
            border-radius: var(--rad);
          }
          &:hover {
            color: var(--dark-accent-color);
            &::after {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
