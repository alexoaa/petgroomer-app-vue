<template>
  <ul>
    <li>
      <a href="#" id="nombreUsuario"
        >Alejandro Olvera<span>Web Developer</span></a
      >
    </li>
    <!-- <li id="fechaHora"><span>Spetiembre 01, 2022 - 9:54 am</span></li> -->
    <li><a href="#">Citas de hoy</a></li>

    <li><a href="#">Agendar una cita</a></li>
    <li><a href="#">Configuracion de cuenta</a></li>
    <li>
      <a class="px-2" href="#" @click.prevent="toggleAuthModal"
        >Iniciar sesión / Registrarse</a
      >
    </li>

    <li>
      <form action="/logout?_method=DELETE" method="POST">
        <button type="submit" class="btnCerrarSesion">Cerrar sesión</button>
      </form>
    </li>

    <!-- <li><a href="#0" >Cerrar sesión</a></li> -->
    <li class="item-small">
      <a href="#0">Facebook</a><a href="#0">Instagram</a>
    </li>
  </ul>
</template>

<script>
import { mapWritableState } from "pinia";
import useAuthModalStore from "@/stores/authModal";

export default {
  name: "SideBar",
  data() {
    return {
      isAuthModalOpen: false,
    };
  },
  computed: {
    ...mapWritableState(useAuthModalStore, { modalVisibility: "isOpen" }),
  },
  methods: {
    toggleAuthModal() {
      this.modalVisibility = !this.modalVisibility;
    },
  },
};
</script>
