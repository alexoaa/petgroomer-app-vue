import { defineStore } from "pinia";

// Store for the general variables through the app
export default defineStore("generalVariables", {
  state: () => ({
    // General variables
    isNavbarFixed: false,
    homePageNavbarColor: false,
    // Sidebar variables
    sidebarIsOpen: false,
    sidebarServiciosIsOpen: false,
    //
    calendarEsteticaIsActive: false,
    calendarEsteticaIsFirst: false,

    // Modals Variables
    ConfirmationModalIsOpen: false,
    // API RUL
    apiURL: "https://us-central1-dogbarber-server.cloudfunctions.net/api",
  }),
  actions: {
    // Sidebar actions
    closeServicioSelectSidebar() {
      this.sidebarServiciosIsOpen = !this.sidebarServiciosIsOpen;
    },

    // Modals actions
    openConfirmationModal() {
      this.ConfirmationModalIsOpen = true;
    },
    closeConfirmationModal() {
      this.ConfirmationModalIsOpen = false;
    },
  },
});
