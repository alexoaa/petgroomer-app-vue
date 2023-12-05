<template>
  <AppHeader id="navbar" />
  <div id="divToScroll" class="h-[60px] absolute" />
  <main id="pageContent">
    <router-view />
  </main>
  <AppFooter />
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

import { mapStores, mapActions } from "pinia";
import useGeneralVariablesStore from "@/stores/generalVariables";
import { useUserStore } from "@/stores/user";

import axios from "axios";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },

  computed: {
    ...mapStores(useGeneralVariablesStore, useUserStore),
  },
  methods: {
    ...mapActions(useUserStore, { loadData: "loadData" }),
    ...mapActions(useUserStore, { resetData: "resetData" }),
    ...mapActions(useUserStore, { logout: "logout" }),
  },
  async created() {
    if (localStorage.isAuthenticated) {
      try {
        const axiosRequest = await axios.get(
          `${import.meta.env.VITE_VUE_APP_API_URL}/isAuthenticated`,
          // In order to accept cookies from server, this option must be true and configured in the server
          { withCredentials: true }
        );
        //
        this.loadData(axiosRequest.data.data);
      } catch (axiosError) {
        this.userStore.resetData();
      }
    } else if (document.cookie.indexOf("connect.sid") !== -1) {
      this.logout();
    }
  },
  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.generalVariablesStore.isNavbarFixed = false;
          } else {
            this.generalVariablesStore.isNavbarFixed = true;
          }
        });
      },
      {
        rootMargin: "10px 0px 0px 0px",
      }
    );
    observer.observe(document.getElementById("divToScroll"));
  },
};
</script>

<style scoped>
.animate__animated.animate__fadeIn,
.animate__animated.animate__fadeOut {
  --animate-duration: 300ms;
}
</style>
