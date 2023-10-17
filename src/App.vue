<template>
  <AppHeader></AppHeader>
  <div class="h-[80px]" id="divToScroll"></div>
  <router-view />
  <!-- Auth Section -->
  <Transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <AppAuth
      v-if="
        this.generalVariablesStore.AuthModalIsOpen && !this.userStore.isAuth
      "
    />
  </Transition>
  <AppFooter />
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppAuth from "@/components/authentication/AppAuth.vue";

import { mapStores, mapActions } from "pinia";
import useGeneralVariablesStore from "@/stores/generalVariables";
import useUserStore from "@/stores/user";

import axios from "axios";

export default {
  name: "App",
  components: {
    AppHeader,
    AppAuth,
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
          "http://localhost:5600/isAuthenticated",
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
};
</script>

<style scoped>
.animate__animated.animate__fadeIn,
.animate__animated.animate__fadeOut {
  --animate-duration: 300ms;
}
</style>
