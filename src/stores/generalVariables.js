import { defineStore } from "pinia";

// Store for the general variables through the app
export default defineStore("generalVariables", {
  state: () => ({
    // Sidebar variables
    sidebarIsOpen: false,
    sidebarServiciosIsOpen: false,

    //
    calendarEsteticaIsActive: false,
    calendarEsteticaIsFirst: false,

    // Modals Variables
    AuthModalIsOpen: false,
    ConfirmationModalIsOpen: false,
  }),
  actions: {
    // Sidebar actions
    closeServicioSelectSidebar() {
      this.sidebarServiciosIsOpen = !this.sidebarServiciosIsOpen;
    },

    // Modals actions
    openAuthModal() {
      this.AuthModalIsOpen = true;
    },
    closeAuthModal() {
      this.AuthModalIsOpen = false;
    },
    openConfirmationModal() {
      this.ConfirmationModalIsOpen = true;
    },
    closeConfirmationModal() {
      this.ConfirmationModalIsOpen = false;
    },
  },
});
