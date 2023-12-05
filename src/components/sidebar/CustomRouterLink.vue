<template>
  <router-link :to="to" tabindex="0" @click="scrollToTop(), toggleNav()">
    <svg v-if="svg">
      <use :href="hrefSvg" />
    </svg>
    {{ text }}
  </router-link>
</template>

<script>
import { mapWritableState } from "pinia";
import useGeneralVariablesStore from "@/stores/generalVariables";

export default {
  name: "CustomRouterLink",
  data() {
    return {
      hrefSvg: `/src/assets/icons/icons.svg#${this.svgRef}`,
    };
  },
  props: {
    to: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    svg: {
      type: String,
    },
    svgRef: {
      type: String,
    },
  },
  computed: {
    ...mapWritableState(useGeneralVariablesStore, ["sidebarIsOpen"]),
  },
  methods: {
    toggleNav() {
      this.sidebarIsOpen = !this.sidebarIsOpen;
    },
    scrollToTop() {
      document.getElementById("divToScroll").scrollIntoView();
    },
  },
};
</script>
