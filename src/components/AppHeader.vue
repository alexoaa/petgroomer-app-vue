<template>
  <!-- class="header-sidebar" -->
  <header
    class="bg-stone-200 encoded-sans font-semibold tracking-wide text-neutral-800 mb-16 relative z-1"
  >
    <div class="header-sidebar-title">
      <router-link :to="{ name: 'home' }" tabindex="0">Dog Barber</router-link>
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
        <SideBar v-if="isNavOpen" id="nav-content" tabindex="0"> </SideBar>
      </Transition>
    </div>
  </header>
</template>

<script>
import { mapStores } from "pinia";
import useModalStore from "@/stores/authModal";
import SideBar from "@/components/SideBar.vue";

export default {
  name: "AppHeader",
  components: {
    SideBar,
  },
  data() {
    return {
      isNavOpen: false,
    };
  },
  computed: {
    ...mapStores(useModalStore),
    sidebarBtn1() {
      return this.isNavOpen
        ? `transform: translate3d(0, 8px, 0) rotate(45deg);`
        : "";
    },
    sidebarBtn2() {
      return this.isNavOpen ? `opacity: 0;` : "";
    },
    sidebarBtn3() {
      return this.isNavOpen
        ? `transform: translate3d(0, -8px, 0) rotate(-45deg);`
        : "";
    },
    bgSideBar() {
      return this.isNavOpen ? `visibility: visible; opacity: 0.6;` : "";
    },
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen;
    },
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
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
