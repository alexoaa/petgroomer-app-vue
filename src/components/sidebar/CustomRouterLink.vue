<template>
  <div @click="toggleNav">
    <router-link :to="to" tabindex="0">{{ text }}</router-link>
  </div>
</template>

<script>
import { mapWritableState } from "pinia";
import useSidebarStore from "@/stores/sidebar";

export default {
  name: "CustomRouterLink",
  props: {
    to: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapWritableState(useSidebarStore, { sidebarOpen: "isOpen" }),
  },
  methods: {
    toggleNav() {
      console.log("togglenav");
      this.sidebarOpen = !this.sidebarOpen;
    },
  },
};
</script>
