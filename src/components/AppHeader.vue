<template>
  <!-- class="header-sidebar" -->
  <header
    class="bg-stone-200 encoded-sans font-semibold tracking-wide text-neutral-800 mb-16 relative z-1"
  >
    <div class="header-sidebar-title">
      <router-link
        :to="{ name: 'home' }"
        tabindex="0"
        exact-active-class="no-active"
        >Dog Barber</router-link
      >
    </div>
    <div id="nav-container">
      <div class="bg" @click="toggleNav" :style="bgSideBar"></div>
      <div class="nav-button" tabindex="0" @click="toggleNav">
        <span class="icon-bar" :style="sidebarBtn1"></span>
        <span class="icon-bar" :style="sidebarBtn2"></span>
        <span class="icon-bar" :style="sidebarBtn3"></span>
      </div>
      <Transition
        name="slide"
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutLeft"
      >
        <Sidebar v-if="this.sidebarStore.isOpen" id="nav-content" tabindex="0">
        </Sidebar>
      </Transition>
    </div>
  </header>
</template>

<script>
import { mapStores } from "pinia";
import useModalStore from "@/stores/authModal";
import useSidebarStore from "@/stores/sidebar";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "AppHeader",
  components: {
    Sidebar,
  },
  data() {
    return {};
  },
  computed: {
    ...mapStores(useModalStore, useSidebarStore),
    sidebarBtn1() {
      return this.sidebarStore.isOpen
        ? `transform: translate3d(0, 8px, 0) rotate(45deg);`
        : "";
    },
    sidebarBtn2() {
      return this.sidebarStore.isOpen ? `opacity: 0;` : "";
    },
    sidebarBtn3() {
      return this.sidebarStore.isOpen
        ? `transform: translate3d(0, -8px, 0) rotate(-45deg);`
        : "";
    },
    bgSideBar() {
      return this.sidebarStore.isOpen
        ? `visibility: visible; opacity: 0.6;`
        : "";
    },
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
    },
    toggleNav() {
      this.sidebarStore.isOpen = !this.sidebarStore.isOpen;
    },
    togl() {
      console.log("a");
    },
  },
};
</script>

<style>
/* Animating enter/leave frame for the SideBar  */
/* .slide-enter-from {
  transform: translateX(-100%);
}
.slide-enter-active {
  transition: transform 0.4s;
}
.slide-leave-to {
  transition: transform 0.4s;
  transform: translateX(-100%);
} */
/* Override animate class and duration */
.animate__animated {
  animation-duration: 0.4s;
}
</style>
